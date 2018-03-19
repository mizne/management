import { Action } from '@ngrx/store'
import { Visitor } from '@core/models/visitor.model'

export const FETCH_VISITOR_DETAIL = '[Visitor Detail] Fetch Visitor Detail'
export const FETCH_VISITOR_DETAIL_SUCCESS =
    '[Visitor Detail] Fetch Visitor Detail Success'
export const FETCH_VISITOR_DETAIL_FAILURE =
    '[Visitor Detail] Fetch Visitor Detail Failure'

export class FetchVisitorDetailAction implements Action {
    readonly type = FETCH_VISITOR_DETAIL
    constructor(public id: string) {}
}
export class FetchVisitorDetailSuccessAction implements Action {
    readonly type = FETCH_VISITOR_DETAIL_SUCCESS
    constructor(public visitor: Visitor) {}
}
export class FetchVisitorDetailFailureAction implements Action {
    readonly type = FETCH_VISITOR_DETAIL_FAILURE
}

export type Actions =
    | FetchVisitorDetailAction
    | FetchVisitorDetailSuccessAction
    | FetchVisitorDetailFailureAction
