import * as fromTerminalList from '../actions/terminal-list.action'
import { Terminal } from '@core/models/terminal.model'
import { Exhibitor } from '@core/models/exhibitor.model'

export interface State {
    loading: boolean
    terminals: Terminal[]
    terminalsCount: number
    pageIndex: number
    pageSize: number

    searchExhibitors: Exhibitor[]
}

const initialState: State = {
    loading: false,
    terminals: [],
    terminalsCount: 0,
    pageIndex: 1,
    pageSize: 10,

    searchExhibitors: []
}

export function reducer(
    state: State = initialState,
    action: fromTerminalList.Actions
): State {
    switch (action.type) {
        case fromTerminalList.FETCH_TERMINALS:
            return {
                ...state,
                loading: true
            }
        case fromTerminalList.FETCH_TERMINALS_SUCCESS:
            return {
                ...state,
                terminals: action.terminals,
                loading: false
            }
        case fromTerminalList.FETCH_TERMINALS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromTerminalList.FETCH_TERMINALS_COUNT_SUCCESS:
            return {
                ...state,
                terminalsCount: action.count
            }

        case fromTerminalList.ENSURE_PAGE_PARAMS:
            return {
                ...state,
                pageIndex: action.params.pageIndex,
                pageSize: action.params.pageSize
            }

        case fromTerminalList.SEARCH_EXHIBITORS_SUCCESS:
        case fromTerminalList.INIT_FETCH_EXHIBITORS_SUCCESS:
            return {
                ...state,
                searchExhibitors: action.exhibitors
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getTerminals = (state: State) => state.terminals
export const getTerminalsCount = (state: State) => state.terminalsCount
export const getTerminalPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
export const getSearchExhibitors = (state: State) => state.searchExhibitors
