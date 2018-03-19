import * as fromVisitorDetail from '../actions/visitor-detail.action'
import { Visitor } from '@core/models/visitor.model'

export interface State {
    loading: boolean
    visitor: Visitor
}
const initialState: State = {
    loading: false,
    visitor: null
}

export function reducer(
    state: State = initialState,
    action: fromVisitorDetail.Actions
): State {
    switch (action.type) {
        case fromVisitorDetail.FETCH_VISITOR_DETAIL:
            return {
                ...state,
                loading: true
            }

        case fromVisitorDetail.FETCH_VISITOR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                visitor: action.visitor
            }
        case fromVisitorDetail.FETCH_VISITOR_DETAIL_FAILURE:
            return {
                ...state
            }

        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getVisitor = (state: State) => state.visitor
