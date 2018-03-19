import * as fromExhibitorInvitation from '../actions/exhibitor-invitation.action'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export interface State {
    exhibitorLoading: boolean
    exhibitorInvitations: ExhibitorInvitation[]
    exhibitorInvitationsCount: number
    exhibitorPageIndex: number
    exhibitorPageSize: number
}

const initialState: State = {
    exhibitorLoading: false,
    exhibitorInvitations: [],
    exhibitorInvitationsCount: 0,
    exhibitorPageIndex: 1,
    exhibitorPageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromExhibitorInvitation.Actions
): State {
    switch (action.type) {
        case fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS:
            return {
                ...state,
                exhibitorLoading: true
            }
        case fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS_SUCCESS:
            return {
                ...state,
                exhibitorInvitations: action.invitations,
                exhibitorLoading: false
            }
        case fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS_FAILURE:
            return {
                ...state,
                exhibitorLoading: false
            }

        case fromExhibitorInvitation.FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorInvitationsCount: action.count
            }

        case fromExhibitorInvitation.ENSURE_EXHIBITOR_PAGE_PARAMS:
            return {
                ...state,
                exhibitorPageIndex: action.params.pageIndex,
                exhibitorPageSize: action.params.pageSize
            }

        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS:
        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT:
            return {
                ...state,
                exhibitorLoading: true
            }
        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_SUCCESS:
            return {
                ...state,
                exhibitorLoading: false,
                exhibitorInvitations: action.invitations
            }
        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_SUCCESS:
            return {
                ...state,
                exhibitorLoading: false,
                exhibitorInvitationsCount: action.count
            }
        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_FAILURE:
        case fromExhibitorInvitation.RESET_FETCH_EXHIBITOR_INVITATIONS_COUNT_FAILURE:
            return {
                ...state,
                exhibitorLoading: false
            }
        default:
            return state
    }
}

export const getExhibitorLoading = (state: State) => state.exhibitorLoading
export const getExhibitorInvitations = (state: State) =>
    state.exhibitorInvitations
export const getExhibitorInvitationsCount = (state: State) =>
    state.exhibitorInvitationsCount
export const getExhibitorInvitationsPageParams = (state: State) => ({
    pageIndex: state.exhibitorPageIndex,
    pageSize: state.exhibitorPageSize
})
