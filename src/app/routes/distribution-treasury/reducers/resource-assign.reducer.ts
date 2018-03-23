import * as fromResourceAssign from '../actions/resource-assign.action'
import { ResourceUseInfo } from '@core/models/distribution-treasury.model'

export interface State {
    loading: boolean
    resourceUseInfoes: ResourceUseInfo[]
    accountsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    resourceUseInfoes: [],
    accountsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromResourceAssign.Actions
): State {
    switch (action.type) {
        case fromResourceAssign.FETCH_RESOURCE_USE_INFOES:
            return {
                ...state,
                loading: true
            }
        case fromResourceAssign.FETCH_RESOURCE_USE_INFOES_SUCCESS:
            return {
                ...state,
                resourceUseInfoes: action.resourceUseInfoes,
                loading: false
            }
        case fromResourceAssign.FETCH_RESOURCE_USE_INFOES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromResourceAssign.FETCH_RESOURCE_USE_INFOES_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromResourceAssign.ENSURE_PAGE_PARAMS:
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
export const getResourceUseInfoes = (state: State) => state.resourceUseInfoes
export const getResourceUseInfoesCount = (state: State) => state.accountsCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
