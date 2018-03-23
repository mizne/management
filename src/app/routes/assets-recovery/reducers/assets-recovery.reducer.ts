import * as fromResourceEntry from '../actions/assets-recovery.action'
import { AssetsRecovery } from '@core/models/assets-recovery.model'

export interface State {
    loading: boolean
    assetsRecoveries: AssetsRecovery[]
    accountsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    assetsRecoveries: [],
    accountsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromResourceEntry.Actions
): State {
    switch (action.type) {
        case fromResourceEntry.FETCH_ASSETS_RECOVERIES:
            return {
                ...state,
                loading: true
            }
        case fromResourceEntry.FETCH_ASSETS_RECOVERIES_SUCCESS:
            return {
                ...state,
                assetsRecoveries: action.assetsRecoveries,
                loading: false
            }
        case fromResourceEntry.FETCH_ASSETS_RECOVERIES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromResourceEntry.FETCH_ASSETS_RECOVERIES_COUNT_SUCCESS:
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
export const getAssetsRecoveries = (state: State) => state.assetsRecoveries
export const getAssetsRecoveriesCount = (state: State) => state.accountsCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
