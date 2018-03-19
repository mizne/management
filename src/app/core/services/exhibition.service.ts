import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'

import { PaginationParams } from '../models/pagination.model'
import { Exhibition, ExhibitionStatistics } from '../models/exhibition.model'
import { TenantService } from './tenant.service'
import { ErrorLoggerService } from './error-logger.service'
import { ExhibitorService } from './exhibitor.service'
import { VisitorService } from './visitor.service'
import { TerminalService } from './terminal.service'
import { ExhibitorInvitationService } from './exhibitor-invitation.service'
import { VisitorInvitationService } from './visitor-invitation.service'

@Injectable()
export class ExhibitionService {
    private createUrl = '/data/insert/Exhibition'
    private queryUrl = '/data/queryList/Exhibition'
    private queryCountUrl = '/data/queryCount/Exhibition'
    private deleteUrl = '/data/delete/Exhibition'
    private updateUrl = '/data/update/Exhibition'

    constructor(
        private http: HttpClient,
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService,
        private exhibitorService: ExhibitorService,
        private visitorService: VisitorService,
        private terminalService: TerminalService,
        private exhibitorInvitationService: ExhibitorInvitationService,
        private visitorInvitationService: VisitorInvitationService
    ) {}

    fetchLatestExhibition(tenantId: string): Observable<Exhibition> {
        return this.http
            .post(this.queryUrl, {
                tenantId,
                // userId: this.tenantService.getUserID(),
                params: {
                    condition: {}
                }
            })
            .map(res => (res as any).result.map(Exhibition.convertFromResp))
            .map(exhibitions => Exhibition.findLatestExhibition(exhibitions))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitionService',
                    method: 'fetchLatestExhibition',
                    error: e
                })
            })
    }

    fetchExhibitions(): Observable<Exhibition[]> {
        return this.http
            .post(this.queryUrl, {
                tenantId: this.tenantService.getTenantID(),
                userId: this.tenantService.getUserID(),
                params: {
                    condition: {}
                }
            })
            .map(res => (res as any).result.map(Exhibition.convertFromResp))
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitionService',
                    method: 'fetchExhibitions',
                    error: e
                })
            })
    }

    fetchExhibitionStatistics(): Observable<ExhibitionStatistics> {
        return Observable.forkJoin(
            this.exhibitorService.fetchExhibitorsCount(),
            this.visitorService.fetchVisitorsCount(),
            this.terminalService.fetchTerminalsCount(),
            this.visitorInvitationService.fetchVisitorInvitationsCount(),
            this.exhibitorInvitationService.fetchExhibitorInvitationsCount()
        )
            .map(
                ([
                    exhibitorCount,
                    visitorCount,
                    terminalCount,
                    visitorInvitationCount,
                    exhibitorInvitationCount
                ]) => {
                    return {
                        exhibitorCount,
                        visitorCount,
                        terminalCount,
                        invitationCount:
                            visitorInvitationCount + exhibitorInvitationCount
                    }
                }
            )
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'ExhibitionService',
                    method: 'fetchExhibitionStatistics',
                    error: e
                })
            })
    }
}
