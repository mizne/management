import * as fromExhibitorDetail from '../actions/exhibitor-detail.action'
import { Exhibitor } from '@core/models/exhibitor.model'

export interface State {
    loading: boolean
    exhibitor: Exhibitor
}
const initialState: State = {
    loading: false,
    exhibitor: Exhibitor.EMPTY
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorDetail.Actions
): State {
    switch (action.type) {
        case fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL:
            return {
                ...state,
                loading: true
            }

        case fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                exhibitor: action.exhibitor
            }
        case fromExhibitorDetail.FETCH_EXHIBITOR_DETAIL_FAILURE:
            return {
                ...state
            }

        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getExhibitor = (state: State) => state.exhibitor
