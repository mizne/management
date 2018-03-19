import * as fromApproveExhibitor from '../actions/to-approve-exhibitor.action'
import * as fromHeader from '../../../layout/default/actions/header.action'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export interface State {
    exhibitorLoading: boolean
    exhibitorApprovals: ExhibitorInvitation[]
    exhibitorApprovalsCount: number
    exhibitorPageIndex: number
    exhibitorPageSize: number
}
const initialState: State = {
    exhibitorLoading: false,
    exhibitorApprovals: [],
    exhibitorApprovalsCount: 0,
    exhibitorPageIndex: 1,
    exhibitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromApproveExhibitor.Actions | fromHeader.Actions
): State {
    switch (action.type) {
        case fromApproveExhibitor.FETCH_EXHIBITOR_APPROVALS:
            return {
                ...state,
                exhibitorLoading: true
            }

        case fromApproveExhibitor.FETCH_EXHIBITOR_APPROVALS_SUCCESS:
            return {
                ...state,
                exhibitorLoading: false,
                exhibitorApprovals: action.exhibitorApprovals
            }
        case fromHeader.FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorApprovalsCount: action.count
            }
        case fromApproveExhibitor.ENSURE_EXHIBITOR_PAGE_PARAMS:
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
export const getExhibitorApprovals = (state: State) => state.exhibitorApprovals

export const getExhibitorApprovalsCount = (state: State) =>
    state.exhibitorApprovalsCount
export const getExhibitorPageParams = (state: State) => ({
    pageIndex: state.exhibitorPageIndex,
    pageSize: state.exhibitorPageSize
})
