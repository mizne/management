import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromExhibitorMessage from './exhibitor-message.reducer'
import * as fromRoot from '../../../reducers'

export interface ExhibitorMessageState {
    exhibitorMessage: fromExhibitorMessage.State
}

export interface State extends fromRoot.State {
    fromExhibitorMessage: ExhibitorMessageState
}
export const reducers = {
    exhibitorMessage: fromExhibitorMessage.reducer
}

export const getExhibitorMessageModuleState = createFeatureSelector<
    ExhibitorMessageState
>('fromExhibitorMessage')

export const getExhibitorMessageState = createSelector(
    getExhibitorMessageModuleState,
    (state: ExhibitorMessageState) => state.exhibitorMessage
)
export const getLoading = createSelector(
    getExhibitorMessageState,
    fromExhibitorMessage.getLoading
)
export const getExhibitorMessages = createSelector(
    getExhibitorMessageState,
    fromExhibitorMessage.getMessages
)
export const getExhibitorMessagesCount = createSelector(
    getExhibitorMessageState,
    fromExhibitorMessage.getMessagesCount
)
export const getExhibitorMessagesPageParams = createSelector(
    getExhibitorMessageState,
    fromExhibitorMessage.getPageParams
)
export const getSearchExhibitors = createSelector(
    getExhibitorMessageState,
    fromExhibitorMessage.getSearchedExhibitors
)
