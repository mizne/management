import * as fromHeader from '../actions/header.action'

export interface State {
    visitorApprovalsCount: number
    exhibitorApprovalsCount: number
}
const initialState: State = {
    visitorApprovalsCount: 0,
    exhibitorApprovalsCount: 0
}

export function reducer(
    state: State = initialState,
    action: fromHeader.Actions
): State {
    switch (action.type) {
        case fromHeader.FETCH_VISITOR_APPROVALS_COUNT_SUCCESS:
            return {
                ...state,
                visitorApprovalsCount: action.count
            }
        case fromHeader.FETCH_EXHIBITOR_APPROVALS_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorApprovalsCount: action.count
            }
        default:
            return state
    }
}

export const getVisitorApprovalsCount = (state: State) => state.visitorApprovalsCount
export const getExhibitorApprovalsCount = (state: State) => state.exhibitorApprovalsCount
