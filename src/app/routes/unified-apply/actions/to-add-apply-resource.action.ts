import { Action } from '@ngrx/store'

import { PaginationParams } from '@core/models/pagination.model'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    FetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/unified-apply.model'

export const FETCH_ADDABLE_APPLY_RESOURCE =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource'
export const FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource Success'
export const FETCH_ADDABLE_APPLY_RESOURCE_FAILURE =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource Failure'

export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource Count'
export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT_SUCCESS =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource Count Success'
export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT_FAILURE =
    '[Unified To Add Apply Resource] Fetch Addable Apply Resource Count Failure'

export const ENSURE_PAGE_PARAMS = '[Unified To Add Apply Resource] Ensure Page Params'

export class FetchAddableApplyResourceAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE
    constructor(
        public payload: FetchAddableApplyResourceParams = defaultFetchAddableApplyResourceParams
    ) {}
}
export class FetchAddableApplyResourceSuccessAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS
    constructor(public resources: ApplyResource[]) {}
}
export class FetchAddableApplyResourceFailureAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_FAILURE
}

export class FetchAddableApplyResourceCountAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT
    constructor(
        public payload: FetchAddableApplyResourceCountParams = defaultFetchAddableApplyResourceCountParams
    ) {}
}
export class FetchAddableApplyResourceCountSuccessAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchAddableApplyResourceCountFailureAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchAddableApplyResourceAction
    | FetchAddableApplyResourceSuccessAction
    | FetchAddableApplyResourceFailureAction
    | FetchAddableApplyResourceCountAction
    | FetchAddableApplyResourceCountSuccessAction
    | FetchAddableApplyResourceCountFailureAction
    | EnsurePageParamsAction
