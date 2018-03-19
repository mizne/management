import * as fromVisitorInvitation from '../actions/visitor-invitation.action'

import { VisitorInvitation } from '@core/models/visitor-invitation.model'

export interface State {
    visitorLoading: boolean
    visitorInvitations: VisitorInvitation[]
    visitorInvitationsCount: number
    visitorPageIndex: number
    visitorPageSize: number
}

const initialState: State = {
    visitorLoading: false,
    visitorInvitations: [],
    visitorInvitationsCount: 0,
    visitorPageIndex: 1,
    visitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromVisitorInvitation.Actions
): State {
    switch (action.type) {
        case fromVisitorInvitation.FETCH_VISITOR_INVITATIONS:
            return {
                ...state,
                visitorLoading: true
            }
        case fromVisitorInvitation.FETCH_VISITOR_INVITATIONS_SUCCESS:
            return {
                ...state,
                visitorInvitations: action.invitations,
                visitorLoading: false
            }
        case fromVisitorInvitation.FETCH_VISITOR_INVITATIONS_FAILURE:
            return {
                ...state,
                visitorLoading: false
            }

        case fromVisitorInvitation.FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS:
            return {
                ...state,
                visitorInvitationsCount: action.count
            }

        case fromVisitorInvitation.ENSURE_VISITOR_PAGE_PARAMS:
            return {
                ...state,
                visitorPageIndex: action.params.pageIndex,
                visitorPageSize: action.params.pageSize
            }

        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS:
        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_COUNT:
            return {
                ...state,
                visitorLoading: true
            }
        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_SUCCESS:
            return {
                ...state,
                visitorLoading: false,
                visitorInvitations: action.invitations
            }
        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_COUNT_SUCCESS:
            return {
                ...state,
                visitorLoading: false,
                visitorInvitationsCount: action.count
            }
        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_FAILURE:
        case fromVisitorInvitation.RESET_FETCH_VISITOR_INVITATIONS_COUNT_FAILURE:
            return {
                ...state,
                visitorLoading: false
            }
        default:
            return state
    }
}

export const getVisitorLoading = (state: State) => state.visitorLoading
export const getVisitorInvitations = (state: State) => state.visitorInvitations
export const getVisitorInvitationsCount = (state: State) =>
    state.visitorInvitationsCount
export const getVisitorInvitationsPageParams = (state: State) => ({
    pageIndex: state.visitorPageIndex,
    pageSize: state.visitorPageSize
})
