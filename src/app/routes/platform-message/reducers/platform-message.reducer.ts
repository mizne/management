import * as fromPlatformMessage from '../actions/platform-message.action'
import { PlatformMessage } from '@core/models/message.model'

export interface State {
    loading: boolean
    messages: PlatformMessage[]
    messagesCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    messages: [],
    messagesCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromPlatformMessage.Actions
): State {
    switch (action.type) {
        case fromPlatformMessage.FETCH_PLATFORM_MESSAGES:
            return {
                ...state,
                loading: true
            }
        case fromPlatformMessage.FETCH_PLATFORM_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.platformMessages,
                loading: false
            }
        case fromPlatformMessage.FETCH_PLATFORM_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromPlatformMessage.FETCH_PLATFORM_MESSAGES_COUNT_SUCCESS:
            return {
                ...state,
                messagesCount: action.count
            }

        case fromPlatformMessage.ENSURE_PAGE_PARAMS:
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
export const getMessages = (state: State) => state.messages
export const getMssagesCount = (state: State) => state.messagesCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
