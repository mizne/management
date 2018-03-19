import { Action } from '@ngrx/store'

import { Visitor } from '@core/models/visitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_VISITORS = '[Visitor List] Fetch Visitors'
export const FETCH_VISITORS_SUCCESS = '[Visitor List] Fetch Visitors Success'
export const FETCH_VISITORS_FAILURE = '[Visitor List] Fetch Visitors Failure'

export const FETCH_VISITORS_COUNT = '[Visitor List] Fetch Visitors Count'
export const FETCH_VISITORS_COUNT_SUCCESS =
    '[Visitor List] Fetch Visitors Count Success'
export const FETCH_VISITORS_COUNT_FAILURE =
    '[Visitor List] Fetch Visitors Count Failure'

export const SINGLE_DELETE_VISITOR = '[Visitor List] Single Delete Visitor'
export const SINGLE_DELETE_VISITOR_SUCCESS =
    '[Visitor List] Single Delete Visitor Success'
export const SINGLE_DELETE_VISITOR_FAILURE =
    '[Visitor List] Single Delete Visitor Failure'

export const BATCH_DELETE_VISITORS = '[Visitor List] Batch Delete Visitors'
export const BATCH_DELETE_VISITORS_SUCCESS =
    '[Visitor List] Batch Delete Visitors Success'
export const BATCH_DELETE_VISITORS_FAILURE =
    '[Visitor List] Batch Delete Visitors Failure'

export const ENSURE_PAGE_PARAMS = '[Visitor List] Ensure Page Params'

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
}
export class FetchVisitorsCountSuccessAction implements Action {
    readonly type = FETCH_VISITORS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchVisitorsCountFailureAction implements Action {
    readonly type = FETCH_VISITORS_COUNT_FAILURE
}

export class SingleDeleteVisitorAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR
    constructor(public id: string) {}
}
export class SingleDeleteVisitorSuccessAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_SUCCESS
}
export class SingleDeleteVisitorFailureAction implements Action {
    readonly type = SINGLE_DELETE_VISITOR_FAILURE
}

export class BatchDeleteVisitorsAction implements Action {
    readonly type = BATCH_DELETE_VISITORS
    constructor(public ids: string[]) {}
}
export class BatchDeleteVisitorsSuccessAction implements Action {
    readonly type = BATCH_DELETE_VISITORS_SUCCESS
}
export class BatchDeleteVisitorsFailureAction implements Action {
    readonly type = BATCH_DELETE_VISITORS_FAILURE
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
    | SingleDeleteVisitorAction
    | SingleDeleteVisitorSuccessAction
    | SingleDeleteVisitorFailureAction
    | BatchDeleteVisitorsAction
    | BatchDeleteVisitorsSuccessAction
    | BatchDeleteVisitorsFailureAction
    | EnsurePageParamsAction
