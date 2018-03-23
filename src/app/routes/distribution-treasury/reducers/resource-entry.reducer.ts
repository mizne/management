import * as fromResourceEntry from '../actions/resource-entry.action'
import { ResourceInfo } from '@core/models/distribution-treasury.model'

export interface State {
    loading: boolean
    resourceInfoes: ResourceInfo[]
    accountsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    resourceInfoes: [],
    accountsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromResourceEntry.Actions
): State {
    switch (action.type) {
        case fromResourceEntry.FETCH_RESOURCE_INFOES:
            return {
                ...state,
                loading: true
            }
        case fromResourceEntry.FETCH_RESOURCE_INFOES_SUCCESS:
            return {
                ...state,
                resourceInfoes: action.resourceInfoes,
                loading: false
            }
        case fromResourceEntry.FETCH_RESOURCE_INFOES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromResourceEntry.FETCH_RESOURCE_INFOES_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromResourceEntry.ENSURE_PAGE_PARAMS:
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
export const getResourceInfoes = (state: State) => state.resourceInfoes
export const getResourceInfoesCount = (state: State) => state.accountsCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
