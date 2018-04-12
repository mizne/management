import * as fromApp from './app.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
    app: fromApp.State
}

export const reducers = {
    app: fromApp.reduder
}

export const getAppState = createFeatureSelector<fromApp.State>('app')
export const getResourceTypes = createSelector(
    getAppState,
    fromApp.getResourceTypes
)
export const getSoftwareNames = createSelector(
    getAppState,
    fromApp.getSoftwareNames
)
export const getSoftwareTypes = createSelector(
    getAppState,
    fromApp.getSoftwareTypes
)
export const getSoftwareSpecs = createSelector(
    getAppState,
    fromApp.getSoftwareSpecs
)
export const getUseEnvironments = createSelector(
    getAppState,
    fromApp.getUseEnvironments
)
