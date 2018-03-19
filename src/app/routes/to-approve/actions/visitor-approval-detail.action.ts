import { Action } from '@ngrx/store'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'

export const FETCH_VISITOR_APPROVAL_DETAIL =
    '[Visitor Approval Detail] Fetch Visitor Approval Detail'
export const FETCH_VISITOR_APPROVAL_DETAIL_SUCCESS =
    '[Visitor Approval Detail] Fetch Visitor Approval Detail Success'
export const FETCH_VISITOR_APPROVAL_DETAIL_FAILURE =
    '[Visitor Approval Detail] Fetch Visitor Approval Detail Failure'

export class FetchVisitorApprovalDetailAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_DETAIL
    constructor(public id: string) {}
}
export class FetchVisitorApprovalDetailSuccessAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_DETAIL_SUCCESS
    constructor(public visitorApproval: VisitorInvitation) {}
}
export class FetchVisitorApprovalDetailFailureAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_DETAIL_FAILURE
}

export type Actions =
    | FetchVisitorApprovalDetailAction
    | FetchVisitorApprovalDetailSuccessAction
    | FetchVisitorApprovalDetailFailureAction
