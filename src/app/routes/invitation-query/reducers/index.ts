import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVisitorInvitation from './visitor-invitation.reducer'
import * as fromExhibitorInvitation from './exhibitor-invitation.reducer'
import * as fromRoot from '../../../reducers'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export interface InvitationQueryState {
    visitorInvitation: fromVisitorInvitation.State
    exhibitorInvitation: fromExhibitorInvitation.State
}

export interface State extends fromRoot.State {
    fromInvitationQuery: InvitationQueryState
}
export const reducers = {
    visitorInvitation: fromVisitorInvitation.reducer,
    exhibitorInvitation: fromExhibitorInvitation.reducer
}

export const getInvitationQueryModuleState = createFeatureSelector<
    InvitationQueryState
>('fromInvitationQuery')

export const getVisitorInvitationState = createSelector(
    getInvitationQueryModuleState,
    (state: InvitationQueryState) => state.visitorInvitation
)
export const getVisitorLoading = createSelector(
    getVisitorInvitationState,
    fromVisitorInvitation.getVisitorLoading
)
export const getVisitorInvitations = createSelector(
    getVisitorInvitationState,
    fromVisitorInvitation.getVisitorInvitations
)
export const getVisitorInvitationsCount = createSelector(
    getVisitorInvitationState,
    fromVisitorInvitation.getVisitorInvitationsCount
)
export const getVisitorInvitationsPageParams = createSelector(
    getVisitorInvitationState,
    fromVisitorInvitation.getVisitorInvitationsPageParams
)

export const getExhibitorInvitationState = createSelector(
    getInvitationQueryModuleState,
    (state: InvitationQueryState) => state.exhibitorInvitation
)
export const getExhibitorLoading = createSelector(
    getExhibitorInvitationState,
    fromExhibitorInvitation.getExhibitorLoading
)
export const getExhibitorInvitations = createSelector(
    getExhibitorInvitationState,
    fromExhibitorInvitation.getExhibitorInvitations
)
export const getExhibitorInvitationsCount = createSelector(
    getExhibitorInvitationState,
    fromExhibitorInvitation.getExhibitorInvitationsCount
)
export const getExhibitorInvitationsPageParams = createSelector(
    getExhibitorInvitationState,
    fromExhibitorInvitation.getExhibitorInvitationsPageParams
)
