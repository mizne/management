import * as fromExhibitorApprovalDetail from '../actions/exhibitor-approval-detail.action'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export interface State {
    loading: boolean
    approval: ExhibitorInvitation
}
const initialState: State = {
    loading: false,
    approval: null
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorApprovalDetail.Actions
): State {
    switch (action.type) {
        case fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL:
            return {
                ...state,
                loading: true
            }

        case fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                approval: action.exhibitorApproval
            }
        case fromExhibitorApprovalDetail.FETCH_EXHIBITOR_APPROVAL_DETAIL_FAILURE:
            return {
                ...state
            }

        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getApproval = (state: State) => state.approval
