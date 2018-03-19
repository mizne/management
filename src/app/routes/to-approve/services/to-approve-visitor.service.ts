import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    FetchItemsParams,
    PaginationParams
} from '@core/models/pagination.model'
import {
    VisitorInvitation,
    RejectVisitorInvitationParams,
    BatchRejectVisitorInvitationsParams,
    VisitorInvitationStatus
} from '@core/models/visitor-invitation.model'

import { VisitorInvitationService } from '@core/services/visitor-invitation.service'
import { ErrorLoggerService } from '@core/services/error-logger.service';

@Injectable()
export class ToApproveVisitorService {
    constructor(
        private visitorInvitationService: VisitorInvitationService,
        private errorLoggerService: ErrorLoggerService
    ) { }
    fetchVisitorApprovals(
        params: PaginationParams
    ): Observable<VisitorInvitation[]> {
        const attachStateParams: FetchItemsParams = {
            condition: {
                State: VisitorInvitationStatus.UN_AUDIT
            },
            options: params
        }
        return this.visitorInvitationService.fetchVisitorInvitations(
            attachStateParams
        )
    }

    fetchVisitorApprovalDetail(id: string): Observable<VisitorInvitation> {
        return this.visitorInvitationService
            .fetchVisitorInvitations({
                condition: { RecordId: id }
            })
            .mergeMap(e => {
                return e.length > 0 ? Observable.of(e[0]) : Observable.throw(new Error(`Not found visitor approval for id: ${id};`))
            })
            .catch(e => {
                return this.errorLoggerService.httpError({
                    module: 'ToApproveVisitorService',
                    method: 'fetchVisitorApprovalDetail',
                    error: e
                })
            })
    }

    fetchVisitorApprovalsCount(): Observable<number> {
        const params = {
            condition: { State: { $in: [VisitorInvitationStatus.UN_AUDIT] } }
        }
        return this.visitorInvitationService.fetchVisitorInvitationsCount(
            params
        )
    }

    ensureRejectVisitorApproval(
        params: RejectVisitorInvitationParams
    ): Observable<any> {
        return this.visitorInvitationService.singleAuditFailed(params)
    }

    ensureAgreeVisitorApproval(id: string): Observable<any> {
        return this.visitorInvitationService.singleAgree(id)
    }

    ensureBatchAgreeVisitorApproval(ids: string[]): Observable<any> {
        return this.visitorInvitationService.batchAuditSucceed(ids)
    }

    ensureBatchRejectVisitorApproval(
        params: BatchRejectVisitorInvitationsParams
    ): Observable<any> {
        return this.visitorInvitationService.batchAuditFailed(params)
    }

    ensureAllAgreeVisitorApproval(): Observable<any> {
        return this.visitorInvitationService.allAuditSucceed()
    }

    ensureAllRejectVisitorApproval(): Observable<any> {
        return this.visitorInvitationService.allAuditFailed()
    }
}
