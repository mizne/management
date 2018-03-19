import * as fromLogin from '../actions/login.action'
import { LoginParams, LoginResult, TenantInfo } from '../models/login.model'

export interface State {
    loading: boolean
    tenantInfo: TenantInfo
}

const initialState: State = {
    loading: false,
    tenantInfo: null
}

export function reducer(
    state: State = initialState,
    action: fromLogin.Actions
): State {
    switch (action.type) {
        case fromLogin.USER_LOGIN:
            return {
                ...state,
                loading: true
            }
        case fromLogin.USER_LOGIN_SUCCESS:
            return {
                ...state,
                tenantInfo: action.info,
                loading: false
            }
        case fromLogin.USER_LOGIN_FAILURE:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getTenantInfo = (state: State) => state.tenantInfo
