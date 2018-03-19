import { Action } from '@ngrx/store'
import {
    VisitorInvitation,
    RejectVisitorInvitationParams,
    BatchRejectVisitorInvitationsParams,
    AllRejectVisitorInvitationsParams
} from '@core/models/visitor-invitation.model'
import {
    PaginationParams,
    defaultPaginationParams
} from '@core/models/pagination.model'

export const FETCH_VISITOR_APPROVALS = '[To Approve] Fetch Visitor Approvals'
export const FETCH_VISITOR_APPROVALS_SUCCESS =
    '[To Approve] Fetch Visitor Approvals Success'
export const FETCH_VISITOR_APPROVALS_FAILURE =
    '[To Approve] Fetch Visitor Approvals Failure'

// export const FETCH_VISITOR_APPROVALS_COUNT =
//     '[To Approve] Fetch Visitor Approvals Count'
// export const FETCH_VISITOR_APPROVALS_COUNT_SUCCESS =
//     '[To Approve] Fetch Visitor Approvals Count Success'
// export const FETCH_VISITOR_APPROVALS_COUNT_FAILURE =
//     '[To Approve] Fetch Visitor Approvals Count Failure'

export const ENSURE_REJECT_VISITOR_APPROVAL =
    '[To Approve] Ensure Reject Visitor Approval'
export const ENSURE_REJECT_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Reject Visitor Approval Success'
export const ENSURE_REJECT_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Reject Visitor Approval Failure'

export const ENSURE_BATCH_REJECT_VISITOR_APPROVAL =
    '[To Approve] Ensure Batch Reject Visitor Approval'
export const ENSURE_BATCH_REJECT_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Batch Reject Visitor Approval Success'
export const ENSURE_BATCH_REJECT_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Batch Reject Visitor Approval Failure'

export const ENSURE_ALL_REJECT_VISITOR_APPROVAL =
    '[To Approve] Ensure All Reject Visitor Approval'
export const ENSURE_ALL_REJECT_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure All Reject Visitor Approval Success'
export const ENSURE_ALL_REJECT_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure All Reject Visitor Approval Failure'

export const ENSURE_AGREE_VISITOR_APPROVAL =
    '[To Approve] Ensure Agree Visitor Approval'
export const ENSURE_AGREE_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Agree Visitor Approval Success'
export const ENSURE_AGREE_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Agree Visitor Approval Failure'

export const ENSURE_BATCH_AGREE_VISITOR_APPROVAL =
    '[To Approve] Ensure Batch Agree Visitor Approval'
export const ENSURE_BATCH_AGREE_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Batch Agree Visitor Approval Success'
export const ENSURE_BATCH_AGREE_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Batch Agree Visitor Approval Failure'

export const ENSURE_ALL_AGREE_VISITOR_APPROVAL =
    '[To Approve] Ensure All Agree Visitor Approval'
export const ENSURE_ALL_AGREE_VISITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure All Agree Visitor Approval Success'
export const ENSURE_ALL_AGREE_VISITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure All Agree Visitor Approval Failure'

export const ENSURE_VISITOR_PAGE_PARAMS =
    '[To Approve] Ensure Visitor Page Params'

export class FetchVisitorApprovalsAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS
    constructor(public params: PaginationParams = defaultPaginationParams) {}
}
export class FetchVisitorApprovalsSuccessAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS_SUCCESS
    constructor(public visitorApprovals: VisitorInvitation[]) {}
}
export class FetchVisitorApprovalsFailureAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS_FAILURE
}

export class EnsureRejectVisitorApprovalAction implements Action {
    readonly type = ENSURE_REJECT_VISITOR_APPROVAL
    constructor(public params: RejectVisitorInvitationParams) {}
}
export class EnsureRejectVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_REJECT_VISITOR_APPROVAL_SUCCESS
}
export class EnsureRejectVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_REJECT_VISITOR_APPROVAL_FAILURE
}

export class EnsureBatchRejectVisitorApprovalAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_VISITOR_APPROVAL
    constructor(public params: BatchRejectVisitorInvitationsParams) {}
}
export class EnsureBatchRejectVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_VISITOR_APPROVAL_SUCCESS
}
export class EnsureBatchRejectVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_VISITOR_APPROVAL_FAILURE
}

export class EnsureAllRejectVisitorApprovalAction implements Action {
    readonly type = ENSURE_ALL_REJECT_VISITOR_APPROVAL
    constructor(public params: AllRejectVisitorInvitationsParams) {}
}
export class EnsureAllRejectVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_ALL_REJECT_VISITOR_APPROVAL_SUCCESS
}
export class EnsureAllRejectVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_ALL_REJECT_VISITOR_APPROVAL_FAILURE
}

export class EnsureAgreeVisitorApprovalAction implements Action {
    readonly type = ENSURE_AGREE_VISITOR_APPROVAL
    constructor(public id: string) {}
}
export class EnsureAgreeVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_AGREE_VISITOR_APPROVAL_SUCCESS
}
export class EnsureAgreeVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_AGREE_VISITOR_APPROVAL_FAILURE
}

export class EnsureBatchAgreeVisitorApprovalAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_VISITOR_APPROVAL
    constructor(public ids: string[]) {}
}
export class EnsureBatchAgreeVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_VISITOR_APPROVAL_SUCCESS
}
export class EnsureBatchAgreeVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_VISITOR_APPROVAL_FAILURE
}

export class EnsureAllAgreeVisitorApprovalAction implements Action {
    readonly type = ENSURE_ALL_AGREE_VISITOR_APPROVAL
}
export class EnsureAllAgreeVisitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_ALL_AGREE_VISITOR_APPROVAL_SUCCESS
}
export class EnsureAllAgreeVisitorApprovalFailureAction implements Action {
    readonly type = ENSURE_ALL_AGREE_VISITOR_APPROVAL_FAILURE
}

// export class FetchVisitorApprovalsCountAction implements Action {
//     readonly type = FETCH_VISITOR_APPROVALS_COUNT
// }
// export class FetchVisitorApprovalsCountSuccessAction implements Action {
//     readonly type = FETCH_VISITOR_APPROVALS_COUNT_SUCCESS
//     constructor(public count: number) {}
// }
// export class FetchVisitorApprovalsCountFailureAction implements Action {
//     readonly type = FETCH_VISITOR_APPROVALS_COUNT_FAILURE
// }

export class EnsureVisitorPageParamsAction implements Action {
    readonly type = ENSURE_VISITOR_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchVisitorApprovalsAction
    | FetchVisitorApprovalsSuccessAction
    | FetchVisitorApprovalsFailureAction
    // | FetchVisitorApprovalsCountAction
    // | FetchVisitorApprovalsCountSuccessAction
    // | FetchVisitorApprovalsCountFailureAction
    | EnsureAgreeVisitorApprovalAction
    | EnsureAgreeVisitorApprovalSuccessAction
    | EnsureAgreeVisitorApprovalFailureAction
    | EnsureBatchAgreeVisitorApprovalAction
    | EnsureBatchAgreeVisitorApprovalSuccessAction
    | EnsureBatchAgreeVisitorApprovalFailureAction
    | EnsureAllAgreeVisitorApprovalAction
    | EnsureAllAgreeVisitorApprovalSuccessAction
    | EnsureAllAgreeVisitorApprovalFailureAction
    | EnsureRejectVisitorApprovalAction
    | EnsureRejectVisitorApprovalSuccessAction
    | EnsureRejectVisitorApprovalFailureAction
    | EnsureBatchRejectVisitorApprovalAction
    | EnsureBatchRejectVisitorApprovalSuccessAction
    | EnsureBatchRejectVisitorApprovalFailureAction
    | EnsureAllRejectVisitorApprovalAction
    | EnsureAllRejectVisitorApprovalSuccessAction
    | EnsureAllRejectVisitorApprovalFailureAction
    | EnsureVisitorPageParamsAction
