import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromTerminalList from './terminal-list.reducer'
import * as fromRoot from '../../../reducers'

export interface TerminalListState {
    terminalList: fromTerminalList.State
}

export interface State extends fromRoot.State {
    fromTerminalList: TerminalListState
}
export const reducers = {
    terminalList: fromTerminalList.reducer
}

export const getTerminalListModuleState = createFeatureSelector<
    TerminalListState
>('fromTerminalList')

export const getTerminalListState = createSelector(
    getTerminalListModuleState,
    (state: TerminalListState) => state.terminalList
)
export const getLoading = createSelector(
    getTerminalListState,
    fromTerminalList.getLoading
)
export const getTerminals = createSelector(
    getTerminalListState,
    fromTerminalList.getTerminals
)
export const getTerminalsCount = createSelector(
    getTerminalListState,
    fromTerminalList.getTerminalsCount
)
export const getTerminalPageParams = createSelector(
    getTerminalListState,
    fromTerminalList.getTerminalPageParams
)
export const getSearchExhibitors = createSelector(
    getTerminalListState,
    fromTerminalList.getSearchExhibitors
)
