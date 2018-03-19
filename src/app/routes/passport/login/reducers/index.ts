import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromLogin from './login.reducer'
import * as fromRoot from '../../../../reducers'

export interface LoginState {
    login: fromLogin.State
}

export interface State extends fromRoot.State {
    fromLogin: LoginState
}
export const reducers = {
    login: fromLogin.reducer
}

export const getLoginModuleState = createFeatureSelector<LoginState>(
    'fromLogin'
)

export const getLoginState = createSelector(
    getLoginModuleState,
    (state: LoginState) => state.login
)
export const getLoading = createSelector(getLoginState, fromLogin.getLoading)
export const getTenantInfo = createSelector(
    getLoginState,
    fromLogin.getTenantInfo
)
