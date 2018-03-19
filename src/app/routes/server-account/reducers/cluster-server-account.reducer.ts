import * as fromClusterServerAccount from '../actions/cluster-server-account.action'
import { ClusterServerAccount } from '@core/models/server-account.model'

export interface State {
    loading: boolean
    accounts: ClusterServerAccount[]
    accountsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    accounts: [],
    accountsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromClusterServerAccount.Actions
): State {
    switch (action.type) {
        case fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS:
            return {
                ...state,
                loading: true
            }
        case fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.clusterServerAccounts,
                loading: false
            }
        case fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromClusterServerAccount.FETCH_CLUSTER_SERVER_ACCOUNTS_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromClusterServerAccount.ENSURE_PAGE_PARAMS:
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
export const getAccounts = (state: State) => state.accounts
export const getAccountsCount = (state: State) => state.accountsCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
