import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromRegister from './register.reducer'
import * as fromRoot from '../../../../reducers'

export interface RegisterState {
    register: fromRegister.State
}

export interface State extends fromRoot.State {
    fromRegister: RegisterState
}
export const reducers = {
    register: fromRegister.reducer
}

export const getRegisterModuleState = createFeatureSelector<RegisterState>(
    'fromRegister'
)

export const getLoginState = createSelector(
    getRegisterModuleState,
    (state: RegisterState) => state.register
)
export const getRegisterLoading = createSelector(
    getLoginState,
    fromRegister.getRegisterLoading
)
export const getCaptchaLoading = createSelector(
    getLoginState,
    fromRegister.getCaptchaLoading
)
export const getFetchCaptchaSuccess = createSelector(
    getLoginState,
    fromRegister.getFetchCaptchaSuccess
)
