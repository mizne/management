import * as fromRegister from '../actions/register.action'

export interface State {
    registerLoading: boolean
    captchaLoading: boolean
    fetchCaptchaSuccess: boolean
}

const initialState: State = {
    registerLoading: false,
    captchaLoading: false,
    fetchCaptchaSuccess: false
}

export function reducer(
    state: State = initialState,
    action: fromRegister.Actions
): State {
    switch (action.type) {
        case fromRegister.USER_REGISTER:
            return {
                ...state,
                registerLoading: true
            }
        case fromRegister.USER_REGISTER_SUCCESS:
        case fromRegister.USER_REGISTER_FAILURE:
            return {
                ...state,
                registerLoading: false
            }

        case fromRegister.FETCH_CAPTCHA:
            return {
                ...state,
                captchaLoading: true,
                fetchCaptchaSuccess: false
            }
        case fromRegister.FETCH_CAPTCHA_SUCCESS:
            return {
                ...state,
                captchaLoading: false,
                fetchCaptchaSuccess: true
            }
        case fromRegister.FETCH_CAPTCHA_FAILURE:
            return {
                ...state,
                captchaLoading: false,
                fetchCaptchaSuccess: false
            }
        default:
            return state
    }
}

export const getRegisterLoading = (state: State) => state.registerLoading
export const getCaptchaLoading = (state: State) => state.captchaLoading
export const getFetchCaptchaSuccess = (state: State) =>
    state.fetchCaptchaSuccess
