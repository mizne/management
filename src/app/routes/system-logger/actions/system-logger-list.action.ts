import { Action } from '@ngrx/store'

import { SystemLogger } from '@core/models/system-logger.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_SYSTEM_LOGGERS = '[System Logger List] Fetch System Loggers'
export const FETCH_SYSTEM_LOGGERS_SUCCESS =
    '[System Logger List] Fetch System Loggers Success'
export const FETCH_SYSTEM_LOGGERS_FAILURE =
    '[System Logger List] Fetch System Loggers Failure'

export const FETCH_SYSTEM_LOGGERS_COUNT =
    '[System Logger List] Fetch System Loggers Count'
export const FETCH_SYSTEM_LOGGERS_COUNT_SUCCESS =
    '[System Logger List] Fetch System Loggers Count Success'
export const FETCH_SYSTEM_LOGGERS_COUNT_FAILURE =
    '[System Logger List] Fetch System Loggers Count Failure'

export const ENSURE_PAGE_PARAMS = '[System Logger List] Ensure Page Params'

export class FetchSystemLoggersAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchSystemLoggersSuccessAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS_SUCCESS
    constructor(public loggers: SystemLogger[]) {}
}
export class FetchSystemLoggersFailureAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS_FAILURE
}

export class FetchSystemLoggersCountAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS_COUNT
    constructor(public searchText: string = '') {}
}
export class FetchSystemLoggersCountSuccessAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchSystemLoggersCountFailureAction implements Action {
    readonly type = FETCH_SYSTEM_LOGGERS_COUNT_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchSystemLoggersAction
    | FetchSystemLoggersSuccessAction
    | FetchSystemLoggersFailureAction
    | FetchSystemLoggersCountAction
    | FetchSystemLoggersCountSuccessAction
    | FetchSystemLoggersCountFailureAction
    | EnsurePageParamsAction
