import * as fromExhibitorApprovalHistory from '../actions/exhibitor-approval-history.action'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export interface State {
    exhibitorLoading: boolean
    exhibitorApprovalItems: ExhibitorInvitation[]
    exhibitorApprovalItemsCount: number
    exhibitorPageIndex: number
    exhibitorPageSize: number
}

const initialState: State = {
    exhibitorLoading: false,
    exhibitorApprovalItems: [],
    exhibitorApprovalItemsCount: 0,
    exhibitorPageIndex: 1,
    exhibitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorApprovalHistory.Actions
): State {
    switch (action.type) {
        case fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY:
            return {
                ...state,
                exhibitorLoading: true
            }
        case fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY_SUCCESS:
            return {
                ...state,
                exhibitorApprovalItems: action.exhibitorInvitations,
                exhibitorLoading: false
            }
        case fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY_FAILURE:
            return {
                ...state,
                exhibitorLoading: false
            }

        case fromExhibitorApprovalHistory.FETCH_EXHIBITOR_APPROVAL_HISTORY_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorApprovalItemsCount: action.count
            }

        case fromExhibitorApprovalHistory.ENSURE_EXHIBITOR_PAGE_PARAMS:
            return {
                ...state,
                exhibitorPageIndex: action.params.pageIndex,
                exhibitorPageSize: action.params.pageSize
            }
        default:
            return state
    }
}

export const getExhibitorLoading = (state: State) => state.exhibitorLoading
export const getExhibitorApprovalItems = (state: State) =>
    state.exhibitorApprovalItems
export const getExhibitorApprovalItemsCount = (state: State) =>
    state.exhibitorApprovalItemsCount
export const getExhibitorPageParams = (state: State) => ({
    pageIndex: state.exhibitorPageIndex,
    pageSize: state.exhibitorPageSize
})
