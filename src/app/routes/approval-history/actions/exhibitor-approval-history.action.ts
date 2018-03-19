import { Action } from '@ngrx/store'

import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams,
    defaultPaginationParams
} from '@core/models/pagination.model'

export const FETCH_EXHIBITOR_APPROVAL_HISTORY =
    '[Approval History] Fetch Exhibitor Approval History'
export const FETCH_EXHIBITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Fetch Exhibitor Approval History Success'
export const FETCH_EXHIBITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Fetch Exhibitor Approval History Failure'

export const FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT =
    '[Approval History] Fetch Exhibitor Approval History Count'
export const FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT_SUCCESS =
    '[Approval History] Fetch Exhibitor Approval History Count Success'
export const FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT_FAILURE =
    '[Approval History] Fetch Exhibitor Approval History Count Failure'

export const SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY =
    '[Approval History] Single Delete Exhibitor Approval History'
export const SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Single Delete Exhibitor Approval History Success'
export const SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Single Delete Exhibitor Approval History Failure'

export const BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY =
    '[Approval History] Batch Delete Exhibitor Approval History'
export const BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS =
    '[Approval History] Batch Delete Exhibitor Approval History Success'
export const BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE =
    '[Approval History] Batch Delete Exhibitor Approval History Failure'

export const ENSURE_EXHIBITOR_PAGE_PARAMS =
    '[Approval History] Ensure Exhibitor Page Params'

export class FetchExhibitorApprovalHistoryAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY
    constructor(public payload: PaginationParams = defaultPaginationParams) {}
}
export class FetchExhibitorApprovalHistorySuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY_SUCCESS
    constructor(public exhibitorInvitations: ExhibitorInvitation[]) {}
}
export class FetchExhibitorApprovalHistoryFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY_FAILURE
}

export class FetchExhibitorApprovalHistoryCountAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT
}
export class FetchExhibitorApprovalHistoryCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchExhibitorApprovalHistoryCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT_FAILURE
}

export class SingleDeleteExhibitorApprovalHistoryAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY
    constructor(public id: string) {}
}
export class SingleDeleteExhibitorApprovalHistorySuccessAction
    implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS
}
export class SingleDeleteExhibitorApprovalHistoryFailureAction
    implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE
}

export class BatchDeleteExhibitorApprovalHistoryAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY
    constructor(public ids: string[]) {}
}
export class BatchDeleteExhibitorApprovalHistorySuccessAction
    implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_SUCCESS
}
export class BatchDeleteExhibitorApprovalHistoryFailureAction
    implements Action {
    readonly type = BATCH_DELETE_EXHIBITOR_APPROVAL_HISTORY_FAILURE
}

export class EnsureExhibitorPageParamsAction implements Action {
    readonly type = ENSURE_EXHIBITOR_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchExhibitorApprovalHistoryAction
    | FetchExhibitorApprovalHistorySuccessAction
    | FetchExhibitorApprovalHistoryFailureAction
    | FetchExhibitorApprovalHistoryCountAction
    | FetchExhibitorApprovalHistoryCountSuccessAction
    | FetchExhibitorApprovalHistoryCountFailureAction
    | SingleDeleteExhibitorApprovalHistoryAction
    | SingleDeleteExhibitorApprovalHistorySuccessAction
    | SingleDeleteExhibitorApprovalHistoryFailureAction
    | BatchDeleteExhibitorApprovalHistoryAction
    | BatchDeleteExhibitorApprovalHistorySuccessAction
    | BatchDeleteExhibitorApprovalHistoryFailureAction
    | EnsureExhibitorPageParamsAction
