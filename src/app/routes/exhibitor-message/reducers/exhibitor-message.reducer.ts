import * as fromExhibitorMessage from '../actions/exhibitor-message.action'
import { ExhibitorMessage } from '@core/models/message.model'
import { Exhibitor } from '@core/models/exhibitor.model'

export interface State {
    loading: boolean
    messages: ExhibitorMessage[]
    messagesCount: number
    pageIndex: number
    pageSize: number

    searchedExhibitors: Exhibitor[]
}

const initialState: State = {
    loading: false,
    messages: [],
    messagesCount: 0,
    pageIndex: 1,
    pageSize: 10,

    searchedExhibitors: []
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorMessage.Actions
): State {
    switch (action.type) {
        case fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES:
            return {
                ...state,
                loading: true
            }
        case fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.exhibitorMessages,
                loading: false
            }
        case fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromExhibitorMessage.FETCH_EXHIBITOR_MESSAGES_COUNT_SUCCESS:
            return {
                ...state,
                messagesCount: action.count,
                loading: false
            }

        case fromExhibitorMessage.ENSURE_PAGE_PARAMS:
            return {
                ...state,
                pageIndex: action.params.pageIndex,
                pageSize: action.params.pageSize
            }
        case fromExhibitorMessage.SEARCH_EXHIBITORS_SUCCESS:
        case fromExhibitorMessage.INIT_FETCH_EXHIBITORS_SUCCESS:
            return {
                ...state,
                searchedExhibitors: action.exhibitors
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
export const getSearchedExhibitors = (state: State) => state.searchedExhibitors
