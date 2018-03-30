import * as fromSystemLoggerList from '../actions/system-logger-list.action'
import { SystemLogger } from '@core/models/system-logger.model'

export interface State {
    loading: boolean
    loggers: SystemLogger[]
    loggersCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    loggers: [],
    loggersCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromSystemLoggerList.Actions
): State {
    switch (action.type) {
        case fromSystemLoggerList.FETCH_SYSTEM_LOGGERS:
            return {
                ...state,
                loading: true
            }
        case fromSystemLoggerList.FETCH_SYSTEM_LOGGERS_SUCCESS:
            return {
                ...state,
                loggers: action.loggers,
                loading: false
            }
        case fromSystemLoggerList.FETCH_SYSTEM_LOGGERS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromSystemLoggerList.FETCH_SYSTEM_LOGGERS_COUNT_SUCCESS:
            return {
                ...state,
                loggersCount: action.count
            }

        case fromSystemLoggerList.ENSURE_PAGE_PARAMS:
            return {
                ...state,
                pageIndex: action.params.pageIndex,
                pageSize: action.params.pageSize
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getLoggers = (state: State) => state.loggers
export const getLoggersCount = (state: State) => state.loggersCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
