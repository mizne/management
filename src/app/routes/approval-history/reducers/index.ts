import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromVisitorApprovalHistory from './visitor-approval-history.reducer'
import * as fromExhibitorApprovalHistory from './exhibitor-approval-history.reducer'
import * as fromRoot from '../../../reducers'

export interface ApprovalHistoryState {
    visitorHistory: fromVisitorApprovalHistory.State
    exhibitorHistory: fromExhibitorApprovalHistory.State
}

export interface State extends fromRoot.State {
    fromApprovalHistory: ApprovalHistoryState
}
export const reducers = {
    visitorHistory: fromVisitorApprovalHistory.reducer,
    exhibitorHistory: fromExhibitorApprovalHistory.reducer
}

export const getApprovalHistoryModuleState = createFeatureSelector<
    ApprovalHistoryState
>('fromApprovalHistory')

export const getApprovalHistoryState = createSelector(
    getApprovalHistoryModuleState,
    (state: ApprovalHistoryState) => state.visitorHistory
)
export const getVisitorLoading = createSelector(
    getApprovalHistoryState,
    fromVisitorApprovalHistory.getVisitorLoading
)
export const getVisitorApprovalItems = createSelector(
    getApprovalHistoryState,
    fromVisitorApprovalHistory.getVisitorApprovalItems
)
export const getVisitorApprovalItemsCount = createSelector(
    getApprovalHistoryState,
    fromVisitorApprovalHistory.getVisitorApprovalItemsCount
)
export const getVisitorPageParams = createSelector(
    getApprovalHistoryState,
    fromVisitorApprovalHistory.getVisitorPageParams
)

export const getExhibitorApprovalHistoryState = createSelector(
    getApprovalHistoryModuleState,
    (state: ApprovalHistoryState) => state.exhibitorHistory
)
export const getExhibitorLoading = createSelector(
    getExhibitorApprovalHistoryState,
    fromExhibitorApprovalHistory.getExhibitorLoading
)
export const getExhibitorApprovalItems = createSelector(
    getExhibitorApprovalHistoryState,
    fromExhibitorApprovalHistory.getExhibitorApprovalItems
)
export const getExhibitorApprovalItemsCount = createSelector(
    getExhibitorApprovalHistoryState,
    fromExhibitorApprovalHistory.getExhibitorApprovalItemsCount
)
export const getExhibitorPageParams = createSelector(
    getExhibitorApprovalHistoryState,
    fromExhibitorApprovalHistory.getExhibitorPageParams
)
