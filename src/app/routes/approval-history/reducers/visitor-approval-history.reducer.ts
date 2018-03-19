import * as fromVisitorApprovalHistory from '../actions/visitor-approval-history.action'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'

export interface State {
    visitorLoading: boolean
    visitorApprovalItems: VisitorInvitation[]
    visitorApprovalItemsCount: number
    visitorPageIndex: number
    visitorPageSize: number
}

const initialState: State = {
    visitorLoading: false,
    visitorApprovalItems: [],
    visitorApprovalItemsCount: 0,
    visitorPageIndex: 1,
    visitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromVisitorApprovalHistory.Actions
): State {
    switch (action.type) {
        case fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY:
            return {
                ...state,
                visitorLoading: true
            }
        case fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY_SUCCESS:
            return {
                ...state,
                visitorApprovalItems: action.visitorInvitations,
                visitorLoading: false
            }
        case fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY_FAILURE:
            return {
                ...state,
                visitorLoading: false
            }

        case fromVisitorApprovalHistory.FETCH_VISITOR_APPROVAL_HISTORY_COUNT_SUCCESS:
            return {
                ...state,
                visitorApprovalItemsCount: action.count
            }

        case fromVisitorApprovalHistory.ENSURE_VISITOR_PAGE_PARAMS:
            return {
                ...state,
                visitorPageIndex: action.params.pageIndex,
                visitorPageSize: action.params.pageSize
            }

        default:
            return state
    }
}

export const getVisitorLoading = (state: State) => state.visitorLoading
export const getVisitorApprovalItems = (state: State) =>
    state.visitorApprovalItems
export const getVisitorApprovalItemsCount = (state: State) =>
    state.visitorApprovalItemsCount
export const getVisitorPageParams = (state: State) => ({
    pageIndex: state.visitorPageIndex,
    pageSize: state.visitorPageSize
})
