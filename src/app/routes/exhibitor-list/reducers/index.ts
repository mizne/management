import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromExhibitorList from './exhibitor-list.reducer'
import * as fromExhibitorDetail from './exhibitor-detail.reducer'
import * as fromRoot from '../../../reducers'

export interface ExhibitorListState {
    exhibitorList: fromExhibitorList.State
    exhibitorDetail: fromExhibitorDetail.State
}

export interface State extends fromRoot.State {
    fromExhibitorList: ExhibitorListState
}
export const reducers = {
    exhibitorList: fromExhibitorList.reducer,
    exhibitorDetail: fromExhibitorDetail.reducer
}

export const getExhibitorListModuleState = createFeatureSelector<
    ExhibitorListState
>('fromExhibitorList')

export const getExhibitorListState = createSelector(
    getExhibitorListModuleState,
    (state: ExhibitorListState) => state.exhibitorList
)
export const getExhibitorListLoading = createSelector(
    getExhibitorListState,
    fromExhibitorList.getLoading
)
export const getExhibitors = createSelector(
    getExhibitorListState,
    fromExhibitorList.getExhibitors
)
export const getExhibitorsCount = createSelector(
    getExhibitorListState,
    fromExhibitorList.getExhibitorsCount
)
export const getExhibitorPageParams = createSelector(
    getExhibitorListState,
    fromExhibitorList.getExhibitorPageParams
)

export const getExhibitorDetailState = createSelector(
    getExhibitorListModuleState,
    (state: ExhibitorListState) => state.exhibitorDetail
)
export const getExhibitorDetailLoading = createSelector(
    getExhibitorDetailState,
    fromExhibitorDetail.getLoading
)
export const getExhibitorDetail = createSelector(
    getExhibitorDetailState,
    fromExhibitorDetail.getExhibitor
)
