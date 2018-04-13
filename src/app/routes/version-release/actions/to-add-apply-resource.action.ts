import { Action } from '@ngrx/store'

import { PaginationParams } from '@core/models/pagination.model'
import {
    ApplyInfo,
    Approver,
    FetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/version-release.model'
import { ResourceInfo } from '@core/models/resource-info.model'


export const FETCH_ADDABLE_APPLY_RESOURCE =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource'
export const FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource Success'
export const FETCH_ADDABLE_APPLY_RESOURCE_FAILURE =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource Failure'

export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource Count'
export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT_SUCCESS =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource Count Success'
export const FETCH_ADDABLE_APPLY_RESOURCE_COUNT_FAILURE =
    '[Version Release To Add Apply Resource] Fetch Addable Apply Resource Count Failure'

export const ENSURE_PAGE_PARAMS =
    '[Version Release To Add Apply Resource] Ensure Page Params'

export class FetchAddableApplyResourceAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE
    constructor(
        public payload: Partial<FetchAddableApplyResourceParams> = defaultFetchAddableApplyResourceParams
    ) { }
}
export class FetchAddableApplyResourceSuccessAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS
    constructor(public resources: ResourceInfo[]) { }
}
export class FetchAddableApplyResourceFailureAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_FAILURE
}

export class FetchAddableApplyResourceCountAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT
    constructor(
        public payload: Partial<FetchAddableApplyResourceCountParams> = defaultFetchAddableApplyResourceCountParams
    ) { }
}
export class FetchAddableApplyResourceCountSuccessAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT_SUCCESS
    constructor(public count: number) { }
}
export class FetchAddableApplyResourceCountFailureAction implements Action {
    readonly type = FETCH_ADDABLE_APPLY_RESOURCE_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) { }
}

export type Actions =
    | FetchAddableApplyResourceAction
    | FetchAddableApplyResourceSuccessAction
    | FetchAddableApplyResourceFailureAction
    | FetchAddableApplyResourceCountAction
    | FetchAddableApplyResourceCountSuccessAction
    | FetchAddableApplyResourceCountFailureAction
    | EnsurePageParamsAction
