import * as fromApproveVisitor from '../actions/to-approve-visitor.action'
import * as fromHeader from '../../../layout/default/actions/header.action'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'

export interface State {
    visitorLoading: boolean
    visitorApprovals: VisitorInvitation[]
    visitorApprovalsCount: number
    visitorPageIndex: number
    visitorPageSize: number
}
const initialState: State = {
    visitorLoading: false,
    visitorApprovals: [],
    visitorApprovalsCount: 0,
    visitorPageIndex: 1,
    visitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromApproveVisitor.Actions | fromHeader.Actions
): State {
    switch (action.type) {
        case fromApproveVisitor.FETCH_VISITOR_APPROVALS:
            return {
                ...state,
                visitorLoading: true
            }

        case fromApproveVisitor.FETCH_VISITOR_APPROVALS_SUCCESS:
            return {
                ...state,
                visitorLoading: false,
                visitorApprovals: action.visitorApprovals
            }
        case fromHeader.FETCH_VISITOR_APPROVALS_COUNT_SUCCESS:
            return {
                ...state,
                visitorApprovalsCount: action.count
            }
        case fromApproveVisitor.ENSURE_VISITOR_PAGE_PARAMS:
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
export const getVisitorsApprovals = (state: State) => state.visitorApprovals
export const getVisitorApprovalsCount = (state: State) =>
    state.visitorApprovalsCount
export const getVisitorPageParams = (state: State) => ({
    pageIndex: state.visitorPageIndex,
    pageSize: state.visitorPageSize
})
