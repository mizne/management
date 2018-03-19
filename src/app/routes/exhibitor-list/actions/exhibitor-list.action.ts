import { Action } from '@ngrx/store'

import { Exhibitor } from '@core/models/exhibitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_EXHIBITORS = '[Exhibitor List] Fetch Exhibitors'
export const FETCH_EXHIBITORS_SUCCESS =
    '[Exhibitor List] Fetch Exhibitors Success'
export const FETCH_EXHIBITORS_FAILURE =
    '[Exhibitor List] Fetch Exhibitors Failure'

export const FETCH_EXHIBITORS_COUNT = '[Exhibitor List] Fetch Exhibitors Count'
export const FETCH_EXHIBITORS_COUNT_SUCCESS =
    '[Exhibitor List] Fetch Exhibitors Count Success'
export const FETCH_EXHIBITORS_COUNT_FAILURE =
    '[Exhibitor List] Fetch Exhibitors Count Failure'

export const SINGLE_DELETE_EXHIBITOR =
    '[Exhibitor List] Single Delete Exhibitor'
export const SINGLE_DELETE_EXHIBITOR_SUCCESS =
    '[Exhibitor List] Single Delete Exhibitor Success'
export const SINGLE_DELETE_EXHIBITOR_FAILURE =
    '[Exhibitor List] Single Delete Exhibitor Failure'

export const BATCH_DELETE_EXHIBITORS =
    '[Exhibitor List] Batch Delete Exhibitors'
export const BATCH_DELETE_EXHIBITORS_SUCCESS =
    '[Exhibitor List] Batch Delete Exhibitors Success'
export const BATCH_DELETE_EXHIBITORS_FAILURE =
    '[Exhibitor List] Batch Delete Exhibitors Failure'

export const ENSURE_PAGE_PARAMS = '[Exhibitor List] Ensure Page Params'

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
}
export class FetchExhibitorsCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITORS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchExhibitorsCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITORS_COUNT_FAILURE
}

export class SingleDeleteExhibitorAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR
    constructor(public id: string) {}
}
export class SingleDeleteExhibitorSuccessAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_SUCCESS
}
export class SingleDeleteExhibitorFailureAction implements Action {
    readonly type = SINGLE_DELETE_EXHIBITOR_FAILURE
}

export class BatchDeleteExhibitorsAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITORS
    constructor(public ids: string[]) {}
}
export class BatchDeleteExhibitorsSuccessAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITORS_SUCCESS
}
export class BatchDeleteExhibitorsFailureAction implements Action {
    readonly type = BATCH_DELETE_EXHIBITORS_FAILURE
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
    | SingleDeleteExhibitorAction
    | SingleDeleteExhibitorSuccessAction
    | SingleDeleteExhibitorFailureAction
    | BatchDeleteExhibitorsAction
    | BatchDeleteExhibitorsSuccessAction
    | BatchDeleteExhibitorsFailureAction
    | EnsurePageParamsAction
