import * as fromMiddlewareSoftwareAccount from '../actions/middleware-software-account.action'
import { MiddlewareSoftwareAccount } from '@core/models/software-account.model'

export interface State {
    loading: boolean
    accounts: MiddlewareSoftwareAccount[]
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
    action: fromMiddlewareSoftwareAccount.Actions
): State {
    switch (action.type) {
        case fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS:
            return {
                ...state,
                loading: true
            }
        case fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.middlewareSoftwareAccounts,
                loading: false
            }
        case fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromMiddlewareSoftwareAccount.FETCH_MIDDLEWARE_SOFTWARE_ACCOUNTS_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromMiddlewareSoftwareAccount.ENSURE_PAGE_PARAMS:
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
