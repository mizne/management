import { Action } from '@ngrx/store'

import {
    ResourceUseInfo,
    FetchResourceUseInfoesCountParams
} from '@core/models/distribution-treasury.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_RESOURCE_USE_INFOES =
    '[Resource Assign] Fetch Resource Use Infoes'
export const FETCH_RESOURCE_USE_INFOES_SUCCESS =
    '[Resource Assign] Fetch Resource Use Infoes Success'
export const FETCH_RESOURCE_USE_INFOES_FAILURE =
    '[Resource Assign] Fetch Resource Use Infoes Failure'

export const FETCH_RESOURCE_USE_INFOES_COUNT =
    '[Resource Assign] Fetch Resource Use Infoes Count'
export const FETCH_RESOURCE_USE_INFOES_COUNT_SUCCESS =
    '[Resource Assign] Fetch Resource Use Infoes Count Success'
export const FETCH_RESOURCE_USE_INFOES_COUNT_FAILURE =
    '[Resource Assign] Fetch Resource Use Infoes Count Failure'

export const EDIT_RESOURCE_USE_INFO = '[Resource Assign] Edit Resource Use Info'
export const EDIT_RESOURCE_USE_INFO_SUCCESS =
    '[Resource Assign] Edit Resource Use Info Success'
export const EDIT_RESOURCE_USE_INFO_FAILURE =
    '[Resource Assign] Edit Resource Use Info Failure'

export const ENSURE_PAGE_PARAMS = '[Resource Assign] Ensure Page Params'

export class FetchResourceUseInfoesAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchResourceUseInfoesSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES_SUCCESS
    constructor(public resourceUseInfoes: ResourceUseInfo[]) {}
}
export class FetchResourceUseInfoesFailureAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES_FAILURE
}

export class FetchResourceUseInfoesCountAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES_COUNT
    constructor(public params: FetchResourceUseInfoesCountParams = {}) {}
}
export class FetchResourceUseInfoesCountSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchResourceUseInfoesCountFailureAction implements Action {
    readonly type = FETCH_RESOURCE_USE_INFOES_COUNT_FAILURE
}

export class EditResourceUseInfoAction implements Action {
    readonly type = EDIT_RESOURCE_USE_INFO
    constructor(public resourceUseInfo: ResourceUseInfo) {}
}
export class EditResourceUseInfouccessAction implements Action {
    readonly type = EDIT_RESOURCE_USE_INFO_SUCCESS
}
export class EditResourceUseInfoFailureAction implements Action {
    readonly type = EDIT_RESOURCE_USE_INFO_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchResourceUseInfoesAction
    | FetchResourceUseInfoesSuccessAction
    | FetchResourceUseInfoesFailureAction
    | FetchResourceUseInfoesCountAction
    | FetchResourceUseInfoesCountSuccessAction
    | FetchResourceUseInfoesCountFailureAction
    | EditResourceUseInfoAction
    | EditResourceUseInfouccessAction
    | EditResourceUseInfoFailureAction
    | EnsurePageParamsAction
