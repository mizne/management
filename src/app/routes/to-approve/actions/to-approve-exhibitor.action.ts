import { Action } from '@ngrx/store'
import {
    ExhibitorInvitation,
    RejectExhibitorInvitationParams,
    BatchRejectExhibitorInvitationsParams,
    AllRejectExhibitorInvitationsParams
} from '@core/models/exhibitor-invitation.model'
import {
    PaginationParams,
    defaultPaginationParams
} from '@core/models/pagination.model'

export const FETCH_EXHIBITOR_APPROVALS =
    '[To Approve] Fetch Exhibitor Approvals'
export const FETCH_EXHIBITOR_APPROVALS_SUCCESS =
    '[To Approve] Fetch Exhibitor Approvals Success'
export const FETCH_EXHIBITOR_APPROVALS_FAILURE =
    '[To Approve] Fetch Exhibitor Approvals Failure'

// export const FETCH_EXHIBITOR_APPROVALS_COUNT =
//     '[To Approve] Fetch Exhibitor Approvals Count'
// export const FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS =
//     '[To Approve] Fetch Exhibitor Approvals Count Success'
// export const FETCH_EXHIBITOR_APPROVALS_COUNT_FAILURE =
//     '[To Approve] Fetch Exhibitor Approvals Count Failure'

export const ENSURE_REJECT_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure Reject Exhibitor Approval'
export const ENSURE_REJECT_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Reject Exhibitor Approval Success'
export const ENSURE_REJECT_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Reject Exhibitor Approval Failure'

export const ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure Batch Reject Exhibitor Approval'
export const ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Batch Reject Exhibitor Approval Success'
export const ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Batch Reject Exhibitor Approval Failure'

export const ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure All Reject Exhibitor Approval'
export const ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure All Reject Exhibitor Approval Success'
export const ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure All Reject Exhibitor Approval Failure'

export const ENSURE_AGREE_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure Agree Exhibitor Approval'
export const ENSURE_AGREE_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Agree Exhibitor Approval Success'
export const ENSURE_AGREE_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Agree Exhibitor Approval Failure'

export const ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure Batch Agree Exhibitor Approval'
export const ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure Batch Agree Exhibitor Approval Success'
export const ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure Batch Agree Exhibitor Approval Failure'

export const ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL =
    '[To Approve] Ensure All Agree Exhibitor Approval'
export const ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_SUCCESS =
    '[To Approve] Ensure All Agree Exhibitor Approval Success'
export const ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_FAILURE =
    '[To Approve] Ensure All Agree Exhibitor Approval Failure'

export const ENSURE_EXHIBITOR_PAGE_PARAMS =
    '[To Approve] Ensure Exhibitor Page Params'

export class FetchExhibitorApprovalsAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS
    constructor(public params: PaginationParams = defaultPaginationParams) {}
}
export class FetchExhibitorSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS_SUCCESS
    constructor(public exhibitorApprovals: ExhibitorInvitation[]) {}
}
export class FetchExhibitorFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS_FAILURE
}

// export class FetchExhibitorApprovalsCountAction implements Action {
//     readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT
// }
// export class FetchExhibitorApprovalsCountSuccessAction implements Action {
//     readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS
//     constructor(public count: number) {}
// }
// export class FetchExhibitorApprovalsCountFailureAction implements Action {
//     readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT_FAILURE
// }

export class EnsureAgreeExhibitorApprovalAction implements Action {
    readonly type = ENSURE_AGREE_EXHIBITOR_APPROVAL
    constructor(public id: string) {}
}
export class EnsureAgreeExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_AGREE_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureAgreeExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_AGREE_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureBatchAgreeExhibitorApprovalAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL
    constructor(public ids: string[]) {}
}
export class EnsureBatchAgreeExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureBatchAgreeExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_BATCH_AGREE_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureAllAgreeExhibitorApprovalAction implements Action {
    readonly type = ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL
}
export class EnsureAllAgreeExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureAllAgreeExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_ALL_AGREE_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureRejectExhibitorApprovalAction implements Action {
    readonly type = ENSURE_REJECT_EXHIBITOR_APPROVAL
    constructor(public params: RejectExhibitorInvitationParams) {}
}
export class EnsureRejectExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_REJECT_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureRejectExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_REJECT_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureBatchRejectExhibitorApprovalAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL
    constructor(public params: BatchRejectExhibitorInvitationsParams) {}
}
export class EnsureBatchRejectExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureBatchRejectExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_BATCH_REJECT_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureAllRejectExhibitorApprovalAction implements Action {
    readonly type = ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL
    constructor(public params: AllRejectExhibitorInvitationsParams) {}
}
export class EnsureAllRejectExhibitorApprovalSuccessAction implements Action {
    readonly type = ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_SUCCESS
}
export class EnsureAllRejectExhibitorApprovalFailureAction implements Action {
    readonly type = ENSURE_ALL_REJECT_EXHIBITOR_APPROVAL_FAILURE
}

export class EnsureExhibitorPageParamsAction implements Action {
    readonly type = ENSURE_EXHIBITOR_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchExhibitorApprovalsAction
    | FetchExhibitorSuccessAction
    | FetchExhibitorFailureAction
    // | FetchExhibitorApprovalsCountAction
    // | FetchExhibitorApprovalsCountSuccessAction
    // | FetchExhibitorApprovalsCountFailureAction
    | EnsureAgreeExhibitorApprovalAction
    | EnsureAgreeExhibitorApprovalSuccessAction
    | EnsureAgreeExhibitorApprovalFailureAction
    | EnsureBatchAgreeExhibitorApprovalAction
    | EnsureBatchAgreeExhibitorApprovalSuccessAction
    | EnsureBatchAgreeExhibitorApprovalFailureAction
    | EnsureAllAgreeExhibitorApprovalAction
    | EnsureAllAgreeExhibitorApprovalSuccessAction
    | EnsureAllAgreeExhibitorApprovalFailureAction
    | EnsureRejectExhibitorApprovalAction
    | EnsureRejectExhibitorApprovalSuccessAction
    | EnsureRejectExhibitorApprovalFailureAction
    | EnsureBatchRejectExhibitorApprovalAction
    | EnsureBatchRejectExhibitorApprovalSuccessAction
    | EnsureBatchRejectExhibitorApprovalFailureAction
    | EnsureAllRejectExhibitorApprovalAction
    | EnsureAllRejectExhibitorApprovalSuccessAction
    | EnsureAllRejectExhibitorApprovalFailureAction
    | EnsureExhibitorPageParamsAction
