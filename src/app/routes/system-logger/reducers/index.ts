import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromSystemLoggerList from './system-logger-list.reducer'
import * as fromRoot from '../../../reducers'

export interface SystemLoggerState {
    systemLoggerList: fromSystemLoggerList.State
}

export interface State extends fromRoot.State {
    fromSystemLogger: SystemLoggerState
}
export const reducers = {
    systemLoggerList: fromSystemLoggerList.reducer
}

export const getSystemLoggerModuleState = createFeatureSelector<
    SystemLoggerState
>('fromSystemLogger')

export const getSystemLoggerListState = createSelector(
    getSystemLoggerModuleState,
    (state: SystemLoggerState) => state.systemLoggerList
)
export const getSystemLoggerListLoading = createSelector(
    getSystemLoggerListState,
    fromSystemLoggerList.getLoading
)
export const getSystemLoggers = createSelector(
    getSystemLoggerListState,
    fromSystemLoggerList.getLoggers
)
export const getSystemLoggersCount = createSelector(
    getSystemLoggerListState,
    fromSystemLoggerList.getLoggersCount
)
export const getSystemLoggerListPageParams = createSelector(
    getSystemLoggerListState,
    fromSystemLoggerList.getPageParams
)
