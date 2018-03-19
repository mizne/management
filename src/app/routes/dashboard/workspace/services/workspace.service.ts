import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'
import { InvitationActivity } from '../models/workspace.model'
import { Exhibition, ExhibitionStatistics } from '@core/models/exhibition.model'
import { ExhibitionService } from '@core/services/exhibition.service'
import { TenantService } from '@core/services/tenant.service'
import { VisitorInvitationService } from '@core/services/visitor-invitation.service'
import { ExhibitorInvitationService } from '@core/services/exhibitor-invitation.service'
import { ErrorLoggerService } from '@core/services/error-logger.service'

@Injectable()
export class WorkspaceService {
    constructor(
        private exhibitionService: ExhibitionService,
        private tenantService: TenantService,
        private visitorInvitationService: VisitorInvitationService,
        private exhibitorInvitationService: ExhibitorInvitationService,
        private errorLogger: ErrorLoggerService
    ) {}

    fetchActivities(): Observable<InvitationActivity[]> {
        return Observable.forkJoin(
            this.visitorInvitationService.fetchVisitorInvitations({
                condition: {
                    ExhibitionId: this.tenantService.getExhibitionID()
                }
            }),
            this.exhibitorInvitationService.fetchExhibitorInvitations({
                condition: {
                    ExhibitionId: this.tenantService.getExhibitionID()
                }
            })
        )
            .map(([visitorInvitations, exhibitorInvitations]) => {
                const visitors = visitorInvitations.map(
                    InvitationActivity.convertFromVisitorInvitation
                )
                const exhibitors = exhibitorInvitations.map(
                    InvitationActivity.convertFromExhibitorInvitation
                )

                return [...visitors, ...exhibitors]
                    .sort((a, b) => {
                        const aMills = moment(
                            a.time,
                            'YYYY-MM-DD HH:mm:ss'
                        ).valueOf()
                        const bMills = moment(
                            b.time,
                            'YYYY-MM-DD HH:mm:ss'
                        ).valueOf()
                        return bMills - aMills
                    })
                    .slice(0, 6)
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'WorkspaceService',
                    method: 'fetchActivities',
                    error: e
                })
            })
    }

    fetchStatistics(): Observable<ExhibitionStatistics> {
        return this.exhibitionService
            .fetchLatestExhibition(this.tenantService.getTenantID())
            .mergeMap(exhibition => {
                return this.exhibitionService
                    .fetchExhibitionStatistics()
                    .map(statistics => ({
                        ...statistics,
                        ...exhibition
                    }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'WorkspaceService',
                    method: 'fetchStatistics',
                    error: e
                })
            })
    }
}
