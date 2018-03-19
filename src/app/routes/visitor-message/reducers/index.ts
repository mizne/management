import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVisitorMessage from './visitor-message.reducer'
import * as fromToCreateMessage from './to-create-message.reducer'
import * as fromRoot from '../../../reducers'

export interface VisitorMessageState {
    visitorMessage: fromVisitorMessage.State
    toCreateMessage: fromToCreateMessage.State
}

export interface State extends fromRoot.State {
    fromVisitorMessage: VisitorMessageState
}
export const reducers = {
    visitorMessage: fromVisitorMessage.reducer,
    toCreateMessage: fromToCreateMessage.reducer
}

export const getVisitorMessageModuleState = createFeatureSelector<
    VisitorMessageState
>('fromVisitorMessage')

export const getVisitorMessageState = createSelector(
    getVisitorMessageModuleState,
    (state: VisitorMessageState) => state.visitorMessage
)
export const getLoading = createSelector(
    getVisitorMessageState,
    fromVisitorMessage.getLoading
)
export const getVisitorMessages = createSelector(
    getVisitorMessageState,
    fromVisitorMessage.getMessages
)
export const getVisitorMessagesCount = createSelector(
    getVisitorMessageState,
    fromVisitorMessage.getMessagesCount
)
export const getVisitorMessagesPageParams = createSelector(
    getVisitorMessageState,
    fromVisitorMessage.getPageParams
)

export const getToCreateMessageState = createSelector(
    getVisitorMessageModuleState,
    (state: VisitorMessageState) => state.toCreateMessage
)
export const getSearchVisitors = createSelector(
    getToCreateMessageState,
    fromToCreateMessage.getVisitors
)
export const getSearchMoreLoading = createSelector(
    getToCreateMessageState,
    fromToCreateMessage.getLoading
)
export const getSearchPageParams = createSelector(
    getToCreateMessageState,
    fromToCreateMessage.getPageParams
)
