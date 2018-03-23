import { Action } from '@ngrx/store'

import {
    ResourceInfo,
    FetchResourceInfoesCountParams
} from '@core/models/distribution-treasury.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_RESOURCE_INFOES = '[Resource Entry] Fetch Resource Infoes'
export const FETCH_RESOURCE_INFOES_SUCCESS =
    '[Resource Entry] Fetch Resource Infoes Success'
export const FETCH_RESOURCE_INFOES_FAILURE =
    '[Resource Entry] Fetch Resource Infoes Failure'

export const FETCH_RESOURCE_INFOES_COUNT =
    '[Resource Entry] Fetch Resource Infoes Count'
export const FETCH_RESOURCE_INFOES_COUNT_SUCCESS =
    '[Resource Entry] Fetch Resource Infoes Count Success'
export const FETCH_RESOURCE_INFOES_COUNT_FAILURE =
    '[Resource Entry] Fetch Resource Infoes Count Failure'

export const CREATE_RESOURCE_INFO = '[Resource Entry] Create Resource Info'
export const CREATE_RESOURCE_INFO_SUCCESS =
    '[Resource Entry] Create Resource Info Success'
export const CREATE_RESOURCE_INFO_FAILURE =
    '[Resource Entry] Create Resource Info Failure'

export const EDIT_RESOURCE_INFO = '[Resource Entry] Edit Resource Info'
export const EDIT_RESOURCE_INFO_SUCCESS =
    '[Resource Entry] Edit Resource Info Success'
export const EDIT_RESOURCE_INFO_FAILURE =
    '[Resource Entry] Edit Resource Info Failure'

export const ENSURE_PAGE_PARAMS = '[Resource Entry] Ensure Page Params'

export class FetchResourceInfoesAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) { }
}
export class FetchResourceInfoesSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES_SUCCESS
    constructor(public resourceInfoes: ResourceInfo[]) { }
}
export class FetchResourceInfoesFailureAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES_FAILURE
}

export class FetchResourceInfoesCountAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES_COUNT
    constructor(public params: Partial<FetchResourceInfoesCountParams> = {}) { }
}
export class FetchResourceInfoesCountSuccessAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES_COUNT_SUCCESS
    constructor(public count: number) { }
}
export class FetchResourceInfoesCountFailureAction implements Action {
    readonly type = FETCH_RESOURCE_INFOES_COUNT_FAILURE
}

export class CreateResourceInfoAction implements Action {
    readonly type = CREATE_RESOURCE_INFO
    constructor(public resourceInfo: ResourceInfo) { }
}
export class CreateResourceInfouccessAction implements Action {
    readonly type = CREATE_RESOURCE_INFO_SUCCESS
}
export class CreateResourceInfoFailureAction implements Action {
    readonly type = CREATE_RESOURCE_INFO_FAILURE
}

export class EditResourceInfoAction implements Action {
    readonly type = EDIT_RESOURCE_INFO
    constructor(public resourceInfo: ResourceInfo) { }
}
export class EditResourceInfouccessAction implements Action {
    readonly type = EDIT_RESOURCE_INFO_SUCCESS
}
export class EditResourceInfoFailureAction implements Action {
    readonly type = EDIT_RESOURCE_INFO_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) { }
}

export type Actions =
    | FetchResourceInfoesAction
    | FetchResourceInfoesSuccessAction
    | FetchResourceInfoesFailureAction
    | FetchResourceInfoesCountAction
    | FetchResourceInfoesCountSuccessAction
    | FetchResourceInfoesCountFailureAction
    | CreateResourceInfoAction
    | CreateResourceInfouccessAction
    | CreateResourceInfoFailureAction
    | EditResourceInfoAction
    | EditResourceInfouccessAction
    | EditResourceInfoFailureAction
    | EnsurePageParamsAction
