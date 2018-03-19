import { Action } from '@ngrx/store'

import { Exhibitor } from '@core/models/exhibitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams,
    FetchItemsCountParams,
    defaultFetchItemsCountParams
} from '@core/models/pagination.model'

export const FETCH_EXHIBITORS = '[Exhibitor Result] Fetch Exhibitors'
export const FETCH_EXHIBITORS_SUCCESS =
    '[Exhibitor Result] Fetch Exhibitors Success'
export const FETCH_EXHIBITORS_FAILURE =
    '[Exhibitor Result] Fetch Exhibitors Failure'

export const FETCH_EXHIBITORS_COUNT =
    '[Exhibitor Result] Fetch Exhibitors Count'
export const FETCH_EXHIBITORS_COUNT_SUCCESS =
    '[Exhibitor Result] Fetch Exhibitors Count Success'
export const FETCH_EXHIBITORS_COUNT_FAILURE =
    '[Exhibitor Result] Fetch Exhibitors Count Failure'

export const ENSURE_PAGE_PARAMS = '[Exhibitor Result] Ensure Page Params'

export class FetchExhibitorsAction implements Action {
    readonly type = FETCH_EXHIBITORS
    constructor(public params: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchExhibitorsSuccessAction implements Action {
    readonly type = FETCH_EXHIBITORS_SUCCESS
    constructor(public exhibitors: Exhibitor[]) {}
}
export class FetchExhibitorsFailureAction implements Action {
    readonly type = FETCH_EXHIBITORS_FAILURE
}

export class FetchExhibitorsCountAction implements Action {
    readonly type = FETCH_EXHIBITORS_COUNT
    constructor(
        public params: FetchItemsCountParams = defaultFetchItemsCountParams
    ) {}
}
export class FetchExhibitorsCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITORS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchExhibitorsCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITORS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchExhibitorsAction
    | FetchExhibitorsSuccessAction
    | FetchExhibitorsFailureAction
    | FetchExhibitorsCountAction
    | FetchExhibitorsCountSuccessAction
    | FetchExhibitorsCountFailureAction
    | EnsurePageParamsAction
