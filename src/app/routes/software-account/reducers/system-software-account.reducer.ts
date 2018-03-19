import * as fromSystemSoftwareAccount from '../actions/system-software-account.action'
import { SystemSoftwareAccount } from '@core/models/software-account.model'

export interface State {
    loading: boolean
    accounts: SystemSoftwareAccount[]
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
    action: fromSystemSoftwareAccount.Actions
): State {
    switch (action.type) {
        case fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS:
            return {
                ...state,
                loading: true
            }
        case fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.systemSoftwareAccounts,
                loading: false
            }
        case fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromSystemSoftwareAccount.FETCH_SYSTEM_SOFTWARE_ACCOUNTS_COUNT_SUCCESS:
            return {
                ...state,
                accountsCount: action.count
            }

        case fromSystemSoftwareAccount.ENSURE_PAGE_PARAMS:
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
