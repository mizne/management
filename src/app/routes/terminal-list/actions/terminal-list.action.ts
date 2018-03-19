import { Action } from '@ngrx/store'

import { Terminal } from '@core/models/terminal.model'
import { Exhibitor } from '@core/models/exhibitor.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_TERMINALS = '[Terminal List] Fetch Terminals'
export const FETCH_TERMINALS_SUCCESS = '[Terminal List] Fetch Terminals Success'
export const FETCH_TERMINALS_FAILURE = '[Terminal List] Fetch Terminals Failure'

export const FETCH_TERMINALS_COUNT = '[Terminal List] Fetch Terminals Count'
export const FETCH_TERMINALS_COUNT_SUCCESS =
    '[Terminal List] Fetch Terminals Count Success'
export const FETCH_TERMINALS_COUNT_FAILURE =
    '[Terminal List] Fetch Terminals Count Failure'

export const CREATE_TERMINAL = '[Terminal List] Create Terminal'
export const CREATE_TERMINAL_SUCCESS = '[Terminal List] Create Terminal Success'
export const CREATE_TERMINAL_FAILURE = '[Terminal List] Create Terminal Failure'

export const SINGLE_DELETE_TERMINAL = '[Terminal List] Single Delete Terminal'
export const SINGLE_DELETE_TERMINAL_SUCCESS =
    '[Terminal List] Single Delete Terminal Success'
export const SINGLE_DELETE_TERMINAL_FAILURE =
    '[Terminal List] Single Delete Terminal Failure'

export const BATCH_DELETE_TERMINALS = '[Terminal List] Batch Delete Terminals'
export const BATCH_DELETE_TERMINALS_SUCCESS =
    '[Terminal List] Batch Delete Terminals Success'
export const BATCH_DELETE_TERMINALS_FAILURE =
    '[Terminal List] Batch Delete Terminals Failure'

export const ENSURE_PAGE_PARAMS = '[Terminal List] Ensure Page Params'

export const ASSIGN_TERMINAL = '[Terminal List] Assign Terminal'
export const ASSIGN_TERMINAL_SUCCESS = '[Terminal List] Assign Terminal Success'
export const ASSIGN_TERMINAL_FAILURE = '[Terminal List] Assign Terminal Failure'

export const SEARCH_EXHIBITORS = '[Terminal List] Search Exhibitors'
export const SEARCH_EXHIBITORS_SUCCESS =
    '[Terminal List] Search Exhibitors Success'
export const SEARCH_EXHIBITORS_FAILURE =
    '[Terminal List] Search Exhibitors Failure'

export const INIT_FETCH_EXHIBITORS = '[Terminal List] Init Fetch Exhibitors'
export const INIT_FETCH_EXHIBITORS_SUCCESS =
    '[Terminal List] Init Fetch Exhibitors Success'
export const INIT_FETCH_EXHIBITORS_FALIURE =
    '[Terminal List] Init Fetch Exhibitors Failure'

export class FetchTerminalsAction implements Action {
    readonly type = FETCH_TERMINALS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchTerminalsSuccessAction implements Action {
    readonly type = FETCH_TERMINALS_SUCCESS
    constructor(public terminals: Terminal[]) {}
}
export class FetchTerminalsFailureAction implements Action {
    readonly type = FETCH_TERMINALS_FAILURE
}

export class FetchTerminalsCountAction implements Action {
    readonly type = FETCH_TERMINALS_COUNT
}
export class FetchTerminalsCountSuccessAction implements Action {
    readonly type = FETCH_TERMINALS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchTerminalsCountFailureAction implements Action {
    readonly type = FETCH_TERMINALS_COUNT_FAILURE
}

export class CreateTerminalAction implements Action {
    readonly type = CREATE_TERMINAL
    constructor(public params: Terminal) {}
}
export class CreateTerminalSuccessAction implements Action {
    readonly type = CREATE_TERMINAL_SUCCESS
}
export class CreateTerminalFailureAction implements Action {
    readonly type = CREATE_TERMINAL_FAILURE
}

export class SingleDeleteTerminalAction implements Action {
    readonly type = SINGLE_DELETE_TERMINAL
    constructor(public id: string) {}
}
export class SingleDeleteTerminalSuccessAction implements Action {
    readonly type = SINGLE_DELETE_TERMINAL_SUCCESS
}
export class SingleDeleteTerminalFailureAction implements Action {
    readonly type = SINGLE_DELETE_TERMINAL_FAILURE
}

export class BatchDeleteTerminalsAction implements Action {
    readonly type = BATCH_DELETE_TERMINALS
    constructor(public ids: string[]) {}
}
export class BatchDeleteTerminalsSuccessAction implements Action {
    readonly type = BATCH_DELETE_TERMINALS_SUCCESS
}
export class BatchDeleteTerminalsFailureAction implements Action {
    readonly type = BATCH_DELETE_TERMINALS_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export class AssignTerminalAction implements Action {
    readonly type = ASSIGN_TERMINAL
    constructor(public payload: { id: string; exhibitorId: string }) {}
}
export class AssignTerminalSuccessAction implements Action {
    readonly type = ASSIGN_TERMINAL_SUCCESS
}
export class AssignTerminalFailureAction implements Action {
    readonly type = ASSIGN_TERMINAL_FAILURE
}

export class SearchExhibitorsAction implements Action {
    readonly type = SEARCH_EXHIBITORS
    constructor(public searchText: string) {}
}
export class SearchExhibitorsSuccessAction implements Action {
    readonly type = SEARCH_EXHIBITORS_SUCCESS
    constructor(public exhibitors: Exhibitor[]) {}
}
export class SearchExhibitorsFailureAction implements Action {
    readonly type = SEARCH_EXHIBITORS_FAILURE
}

export class InitFetchExhibitorsAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS
}
export class InitFetchExhibitorsSuccessAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS_SUCCESS
    constructor(public exhibitors: Exhibitor[]) {}
}
export class InitFetchExhibitorsFailureAction implements Action {
    readonly type = INIT_FETCH_EXHIBITORS_FALIURE
}

export type Actions =
    | FetchTerminalsAction
    | FetchTerminalsSuccessAction
    | FetchTerminalsFailureAction
    | FetchTerminalsCountAction
    | FetchTerminalsCountSuccessAction
    | FetchTerminalsCountFailureAction
    | CreateTerminalAction
    | CreateTerminalSuccessAction
    | CreateTerminalFailureAction
    | SingleDeleteTerminalAction
    | SingleDeleteTerminalSuccessAction
    | SingleDeleteTerminalFailureAction
    | BatchDeleteTerminalsAction
    | BatchDeleteTerminalsSuccessAction
    | BatchDeleteTerminalsFailureAction
    | EnsurePageParamsAction
    | AssignTerminalAction
    | AssignTerminalSuccessAction
    | AssignTerminalFailureAction
    | SearchExhibitorsAction
    | SearchExhibitorsSuccessAction
    | SearchExhibitorsFailureAction
    | InitFetchExhibitorsAction
    | InitFetchExhibitorsSuccessAction
    | InitFetchExhibitorsFailureAction
