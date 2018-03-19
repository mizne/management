import { Action } from '@ngrx/store'

export const FETCH_VISITOR_APPROVALS_COUNT = '[Header] Fetch Visitor Approvals Count'
export const FETCH_VISITOR_APPROVALS_COUNT_SUCCESS =
    '[Header] Fetch Visitor Approvals Count Success'
export const FETCH_VISITOR_APPROVALS_COUNT_FAILURE =
    '[Header] Fetch Visitor Approvals Count Failure'

export const FETCH_EXHIBITOR_APPROVALS_COUNT = '[Header] Fetch Exhibitor Approvals Count'
export const FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS =
    '[Header] Fetch Exhibitor Approvals Count Success'
export const FETCH_EXHIBITOR_APPROVALS_COUNT_FAILURE =
    '[Header] Fetch Exhibitor Approvals Count Failure'

export class FetchVisitorApprovalsCountAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS_COUNT
}
export class FetchVisitorApprovalsCountSuccessAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS_COUNT_SUCCESS
    constructor(public count: number) { }
}
export class FetchVisitorApprovalsCountFailureAction implements Action {
    readonly type = FETCH_VISITOR_APPROVALS_COUNT_FAILURE
}

export class FetchExhibitorApprovalsCountAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT
}
export class FetchExhibitorApprovalsCountSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS
    constructor(public count: number) { }
}
export class FetchExhibitorApprovalsCountFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_APPROVALS_COUNT_FAILURE
}

export type Actions =
    | FetchVisitorApprovalsCountAction
    | FetchVisitorApprovalsCountSuccessAction
    | FetchVisitorApprovalsCountFailureAction
    | FetchExhibitorApprovalsCountAction
    | FetchExhibitorApprovalsCountSuccessAction
    | FetchExhibitorApprovalsCountFailureAction
