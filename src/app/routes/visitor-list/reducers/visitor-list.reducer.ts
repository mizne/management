import * as fromVisitorList from '../actions/visitor-list.action'
import { Visitor } from '@core/models/visitor.model'

export interface State {
    loading: boolean
    visitors: Visitor[]
    visitorsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    visitors: [],
    visitorsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromVisitorList.Actions
): State {
    switch (action.type) {
        case fromVisitorList.FETCH_VISITORS:
            return {
                ...state,
                loading: true
            }
        case fromVisitorList.FETCH_VISITORS_SUCCESS:
            return {
                ...state,
                visitors: action.visitors,
                loading: false
            }
        case fromVisitorList.FETCH_VISITORS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromVisitorList.FETCH_VISITORS_COUNT_SUCCESS:
            return {
                ...state,
                visitorsCount: action.count
            }

        case fromVisitorList.ENSURE_PAGE_PARAMS:
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
export const getVisitors = (state: State) => state.visitors
export const getVisitorsCount = (state: State) => state.visitorsCount
export const getVisitorPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
