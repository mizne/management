import * as fromApp from './app.action'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
    app: fromApp.State
}

export const reducers = {
    app: fromApp.reduder
}

export const getAppState = createFeatureSelector<fromApp.State>('app')
export const getCount = createSelector(getAppState, fromApp.getCount)
