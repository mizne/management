import * as fromVisitorApprovalDetail from '../actions/visitor-approval-detail.action'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'

export interface State {
    loading: boolean
    approval: VisitorInvitation
}
const initialState: State = {
    loading: false,
    approval: null
}

export function reducer(
    state: State = initialState,
    action: fromVisitorApprovalDetail.Actions
): State {
    switch (action.type) {
        case fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL:
            return {
                ...state,
                loading: true
            }

        case fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                approval: action.visitorApproval
            }
        case fromVisitorApprovalDetail.FETCH_VISITOR_APPROVAL_DETAIL_FAILURE:
            return {
                ...state
            }

        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getApproval = (state: State) => state.approval
