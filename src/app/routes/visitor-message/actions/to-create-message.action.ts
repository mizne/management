import { Action } from '@ngrx/store'
import { Visitor } from '@core/models/visitor.model'

export const SEARCH_VISITORS = '[Visitor Message] Search Visitors'
export const SEARCH_VISITORS_SUCCESS =
    '[Visitor Message] Search Visitors Success'
export const SEARCH_VISITORS_FAILURE =
    '[Visitor Message] Search Visitors Failure'

export const SEARCH_MORE_VISITORS = '[Visitor Message] Search More Visitors'
export const SEARCH_MORE_VISITORS_SUCCESS =
    '[Visitor Message] Search More Visitors Success'
export const SEARCH_MORE_VISITORS_FAILURE =
    '[Visitor Message] Search More Visitors Failure'

export const INIT_FETCH_VISITORS = '[Visitor Message] Init Fetch Visitors'
export const INIT_FETCH_VISITORS_SUCCESS =
    '[Visitor Message] Init Fetch Visitors Success'
export const INIT_FETCH_VISITORS_FALIURE =
    '[Visitor Message] Init Fetch Visitors Failure'

export class SearchVisitorsAction implements Action {
    readonly type = SEARCH_VISITORS
    constructor(public searchText: string) {}
}
export class SearchVisitorsSuccessAction implements Action {
    readonly type = SEARCH_VISITORS_SUCCESS
    constructor(public visitors: Visitor[]) {}
}
export class SearchVisitorsFailureAction implements Action {
    readonly type = SEARCH_VISITORS_FAILURE
}

export class SearchMoreVisitorsAction implements Action {
    readonly type = SEARCH_MORE_VISITORS
    constructor(public searchText: string) {}
}
export class SearchMoreVisitorsSuccessAction implements Action {
    readonly type = SEARCH_MORE_VISITORS_SUCCESS
    constructor(public visitors: Visitor[]) {}
}
export class SearchMoreVisitorsFailureAction implements Action {
    readonly type = SEARCH_MORE_VISITORS_FAILURE
}

export class InitFetchVisitorsAction implements Action {
    readonly type = INIT_FETCH_VISITORS
}
export class InitFetchVisitorsSuccessAction implements Action {
    readonly type = INIT_FETCH_VISITORS_SUCCESS
    constructor(public visitors: Visitor[]) {}
}
export class InitFetchVisitorsFailureAction implements Action {
    readonly type = INIT_FETCH_VISITORS_FALIURE
}

export type Actions =
    | SearchVisitorsAction
    | SearchVisitorsSuccessAction
    | SearchVisitorsFailureAction
    | SearchMoreVisitorsAction
    | SearchMoreVisitorsSuccessAction
    | SearchMoreVisitorsFailureAction
    | InitFetchVisitorsAction
    | InitFetchVisitorsSuccessAction
    | InitFetchVisitorsFailureAction
