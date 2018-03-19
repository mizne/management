import { Action } from '@ngrx/store'

import { Visitor } from '@core/models/visitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams,
    FetchItemsCountParams,
    defaultFetchItemsCountParams
} from '@core/models/pagination.model'

export const FETCH_VISITORS = '[Visitor Result] Fetch Visitors'
export const FETCH_VISITORS_SUCCESS = '[Visitor Result] Fetch Visitors Success'
export const FETCH_VISITORS_FAILURE = '[Visitor Result] Fetch Visitors Failure'

export const FETCH_VISITORS_COUNT = '[Visitor Result] Fetch Visitors Count'
export const FETCH_VISITORS_COUNT_SUCCESS =
    '[Visitor Result] Fetch Visitors Count Success'
export const FETCH_VISITORS_COUNT_FAILURE =
    '[Visitor Result] Fetch Visitors Count Failure'

export const ENSURE_PAGE_PARAMS = '[Visitor Result] Ensure Page Params'

export class FetchVisitorsAction implements Action {
    readonly type = FETCH_VISITORS
    constructor(public params: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchVisitorsSuccessAction implements Action {
    readonly type = FETCH_VISITORS_SUCCESS
    constructor(public visitors: Visitor[]) {}
}
export class FetchVisitorsFailureAction implements Action {
    readonly type = FETCH_VISITORS_FAILURE
}

export class FetchVisitorsCountAction implements Action {
    readonly type = FETCH_VISITORS_COUNT
    constructor(
        public params: FetchItemsCountParams = defaultFetchItemsCountParams
    ) {}
}
export class FetchVisitorsCountSuccessAction implements Action {
    readonly type = FETCH_VISITORS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVisitorsCountFailureAction implements Action {
    readonly type = FETCH_VISITORS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchVisitorsAction
    | FetchVisitorsSuccessAction
    | FetchVisitorsFailureAction
    | FetchVisitorsCountAction
    | FetchVisitorsCountSuccessAction
    | FetchVisitorsCountFailureAction
    | EnsurePageParamsAction
