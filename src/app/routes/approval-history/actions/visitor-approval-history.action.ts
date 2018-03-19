import { Action } from '@ngrx/store'

import { VisitorInvitation } from '@core/models/visitor-invitation.model'
import {
    PaginationParams,
    defaultPaginationParams
} from '@core/models/pagination.model'

export const FETCH_VISITOR_APPROVAL_HISTORY =
    '[Approval History] Fetch Visitor Approval History'
export const FETCH_VISITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Fetch Visitor Approval History Success'
export const FETCH_VISITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Fetch Visitor Approval History Failure'

export const FETCH_VISITOR_APPROVAL_HISTORY_COUNT =
    '[Approval History] Fetch Visitor Approval History Count'
export const FETCH_VISITOR_APPROVAL_HISTORY_COUNT_SUCCESS =
    '[Approval History] Fetch Visitor Approval History Count Success'
export const FETCH_VISITOR_APPROVAL_HISTORY_COUNT_FAILURE =
    '[Approval History] Fetch Visitor Approval History Count Failure'

export const SINGLE_DELETE_VISITOR_APPROVAL_HISTORY =
    '[Approval History] Single Delete Visitor Approval History'
export const SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Single Delete Visitor Approval History Success'
export const SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Single Delete Visitor Approval History Failure'

export const BATCH_DELETE_VISITOR_APPROVAL_HISTORY =
    '[Approval History] Batch Delete Visitor Approval History'
export const BATCH_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Batch Delete Visitor Approval History Success'
export const BATCH_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Batch Delete Visitor Approval History Failure'

export const ENSURE_VISITOR_PAGE_PARAMS =
    '[Approval History] Ensure Visitor Page Params'

export class FetchVisitorApprovalHistoryAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY
    constructor(public payload: PaginationParams = defaultPaginationParams) {}
}
export class FetchVisitorApprovalHistorySuccessAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY_SUCCESS
    constructor(public visitorInvitations: VisitorInvitation[]) {}
}
export class FetchVisitorApprovalHistoryFailureAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY_FAILURE
}

export class FetchVisitorApprovalHistoryCountAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY_COUNT
}
export class FetchVisitorApprovalHistoryCountSuccessAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVisitorApprovalHistoryCountFailureAction implements Action {
    readonly type = FETCH_VISITOR_APPROVAL_HISTORY_COUNT_FAILURE
}

export class SingleDeleteVisitorApprovalHistoryAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_APPROVAL_HISTORY
    constructor(public id: string) {}
}
export class SingleDeleteVisitorApprovalHistorySuccessAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS
}
export class SingleDeleteVisitorApprovalHistoryFailureAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE
}

export class BatchDeleteVisitorApprovalHistoryAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_APPROVAL_HISTORY
    constructor(public ids: string[]) {}
}
export class BatchDeleteVisitorApprovalHistorySuccessAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_APPROVAL_HISTORY_SUCCESS
}
export class BatchDeleteVisitorApprovalHistoryFailureAction implements Action {
    readonly type = BATCH_DELETE_VISITOR_APPROVAL_HISTORY_FAILURE
}

export class EnsureVisitorPageParamsAction implements Action {
    readonly type = ENSURE_VISITOR_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchVisitorApprovalHistoryAction
    | FetchVisitorApprovalHistorySuccessAction
    | FetchVisitorApprovalHistoryFailureAction
    | FetchVisitorApprovalHistoryCountAction
    | FetchVisitorApprovalHistoryCountSuccessAction
    | FetchVisitorApprovalHistoryCountFailureAction
    | SingleDeleteVisitorApprovalHistoryAction
    | SingleDeleteVisitorApprovalHistorySuccessAction
    | SingleDeleteVisitorApprovalHistoryFailureAction
    | BatchDeleteVisitorApprovalHistoryAction
    | BatchDeleteVisitorApprovalHistorySuccessAction
    | BatchDeleteVisitorApprovalHistoryFailureAction
    | EnsureVisitorPageParamsAction
