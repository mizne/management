import * as fromToCreateMessage from '../actions/to-create-message.action'
import { VisitorMessage } from '@core/models/message.model'
import { Visitor } from '@core/models/visitor.model'

export interface State {
    visitors: Visitor[]
    loading: boolean
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    visitors: [],
    loading: false,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromToCreateMessage.Actions
): State {
    switch (action.type) {
        case fromToCreateMessage.SEARCH_VISITORS_SUCCESS:
        case fromToCreateMessage.INIT_FETCH_VISITORS_SUCCESS:
            return {
                ...state,
                visitors: action.visitors,
                pageIndex: 1,
                pageSize: 10
            }

        case fromToCreateMessage.SEARCH_MORE_VISITORS:
            return {
                ...state,
                loading: true
            }
        case fromToCreateMessage.SEARCH_MORE_VISITORS_SUCCESS:
            return {
                ...state,
                pageIndex: state.pageIndex + 1,
                loading: false,
                visitors: state.visitors.concat(action.visitors)
            }
        case fromToCreateMessage.SEARCH_MORE_VISITORS_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getVisitors = (state: State) => state.visitors
export const getPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
