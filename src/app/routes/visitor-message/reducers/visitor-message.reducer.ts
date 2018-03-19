import * as fromVisitorMessage from '../actions/visitor-message.action'
import { VisitorMessage } from '@core/models/message.model'
import { Visitor } from '@core/models/visitor.model'

export interface State {
    loading: boolean
    messages: VisitorMessage[]
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
    action: fromVisitorMessage.Actions
): State {
    switch (action.type) {
        case fromVisitorMessage.FETCH_VISITOR_MESSAGES:
            return {
                ...state,
                loading: true
            }
        case fromVisitorMessage.FETCH_VISITOR_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.visitorMessages,
                loading: false
            }
        case fromVisitorMessage.FETCH_VISITOR_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromVisitorMessage.FETCH_VISITOR_MESSAGES_COUNT_SUCCESS:
            return {
                ...state,
                messagesCount: action.count
            }

        case fromVisitorMessage.ENSURE_PAGE_PARAMS:
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
export const getMessagesCount = (state: State) => state.messagesCount
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
