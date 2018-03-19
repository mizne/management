import * as fromVirtualServerAccount from '../actions/virtual-server-account.action'
import { VirtualServerAccount } from '@core/models/server-account.model'

export interface State {
    loading: boolean
    accounts: VirtualServerAccount[]
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
    action: fromVirtualServerAccount.Actions
): State {
    switch (action.type) {
        case fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS:
            return {
                ...state,
                loading: true
            }
        case fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.virtualServerAccounts,
                loading: false
            }
        case fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromVirtualServerAccount.FETCH_VIRTUAL_SERVER_ACCOUNTS_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromVirtualServerAccount.ENSURE_PAGE_PARAMS:
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
