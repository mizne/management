import * as fromExhibitorResult from '../actions/exhibitor-result.action'
import { Exhibitor } from '@core/models/exhibitor.model'

export interface State {
    loading: boolean
    exhibitors: Exhibitor[]
    exhibitorsCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    loading: false,
    exhibitors: [],
    exhibitorsCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorResult.Actions
): State {
    switch (action.type) {
        case fromExhibitorResult.FETCH_EXHIBITORS:
            return {
                ...state,
                loading: true
            }
        case fromExhibitorResult.FETCH_EXHIBITORS_SUCCESS:
            return {
                ...state,
                exhibitors: action.exhibitors,
                loading: false
            }
        case fromExhibitorResult.FETCH_EXHIBITORS_FAILURE:
            return {
                ...state,
                loading: false
            }

        case fromExhibitorResult.FETCH_EXHIBITORS_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorsCount: action.count
            }

        case fromExhibitorResult.ENSURE_PAGE_PARAMS:
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
export const getExhibitors = (state: State) => state.exhibitors
export const getExhibitorsCount = (state: State) => state.exhibitorsCount
export const getExhibitorPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
