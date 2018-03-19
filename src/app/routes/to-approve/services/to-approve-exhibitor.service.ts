import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    FetchItemsParams,
    PaginationParams
} from '@core/models/pagination.model'
import {
    ExhibitorInvitation,
    RejectExhibitorInvitationParams,
    BatchRejectExhibitorInvitationsParams,
    ExhibitorInvitationStatus
} from '@core/models/exhibitor-invitation.model'

import { ExhibitorInvitationService } from '@core/services/exhibitor-invitation.service'
import { ErrorLoggerService } from '@core/services/error-logger.service';

@Injectable()
export class ToApproveExhibitorService {
    constructor(
        private exhibitorInvitationService: ExhibitorInvitationService,
        private errorLoggerService: ErrorLoggerService
    ) { }
    fetchExhibitorApprovals(
        params: PaginationParams
    ): Observable<ExhibitorInvitation[]> {
        const attachStateParams: FetchItemsParams = {
            condition: {
                State: ExhibitorInvitationStatus.UN_AUDIT
            },
            options: params
        }
        return this.exhibitorInvitationService.fetchExhibitorInvitations(
            attachStateParams
        )
    }

    fetchExhibitorApprovalDetail(id: string): Observable<ExhibitorInvitation> {
        return this.exhibitorInvitationService
            .fetchExhibitorInvitations({
                condition: { RecordId: id }
            })
            .mergeMap(e => {
                return e.length > 0 ? Observable.of(e[0]) : Observable.throw(new Error(`Not found exhibitor approval for id: ${id};`))
            })
            .catch(e => {
                return this.errorLoggerService.httpError({
                    module: 'ToApproveExhibitorService',
                    method: 'fetchExhibitorApprovalDetail',
                    error: e
                })
            })
    }

    fetchExhibitorApprovalsCount(): Observable<number> {
        const params = {
            condition: { State: { $in: [ExhibitorInvitationStatus.UN_AUDIT] } }
        }
        return this.exhibitorInvitationService.fetchExhibitorInvitationsCount(
            params
        )
    }

    ensureRejectExhibitorApproval(
        params: RejectExhibitorInvitationParams
    ): Observable<any> {
        return this.exhibitorInvitationService.singleAuditFailed(params)
    }

    ensureAgreeExhibitorApproval(id: string): Observable<any> {
        return this.exhibitorInvitationService.singleAuditSucceed(id)
    }

    ensureBatchAgreeExhibitorApproval(ids: string[]): Observable<any> {
        return this.exhibitorInvitationService.batchAuditSucceed(ids)
    }

    ensureBatchRejectExhibitorApproval(
        params: BatchRejectExhibitorInvitationsParams
    ): Observable<any> {
        return this.exhibitorInvitationService.batchAuditFailed(params)
    }

    ensureAllAgreeExhibitorApproval(): Observable<any> {
        return this.exhibitorInvitationService.allAuditSucceed()
    }

    ensureAllRejectExhibitorApproval(): Observable<any> {
        return this.exhibitorInvitationService.allAuditFailed()
    }
}
