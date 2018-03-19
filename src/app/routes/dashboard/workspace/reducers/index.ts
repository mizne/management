import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromWorkspace from './workspace.reducer'
import * as fromRoot from '../../../../reducers'

export interface WorkspaceState {
    workspace: fromWorkspace.State
}

export interface State extends fromRoot.State {
    fromWorkspace: WorkspaceState
}
export const reducers = {
    workspace: fromWorkspace.reducer
}

export const getWorkspaceModuleState = createFeatureSelector<WorkspaceState>(
    'fromWorkspace'
)

export const getWorkspaceState = createSelector(
    getWorkspaceModuleState,
    (state: WorkspaceState) => state.workspace
)
export const getStaticticsLoading = createSelector(
    getWorkspaceState,
    fromWorkspace.getStaticticsLoading
)
export const getExhibitionStatistics = createSelector(
    getWorkspaceState,
    fromWorkspace.getExhibitionStatistics
)
export const getInvitationActivities = createSelector(
    getWorkspaceState,
    fromWorkspace.getInvitationActivities
)
export const getActivitiesLoading = createSelector(
    getWorkspaceState,
    fromWorkspace.getActivitiesLoading
)
