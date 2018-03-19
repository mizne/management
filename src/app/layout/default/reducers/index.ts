import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromHeader from '../reducers/header.reducer'
import * as fromRoot from '../../../reducers/index'

export interface LayoutState {
    header: fromHeader.State
}
export interface State extends fromRoot.State {
    fromLayout: LayoutState
}
export const reducers = {
    header: fromHeader.reducer
}

export const getLayoutModuleState = createFeatureSelector<LayoutState>(
    'fromLayout'
)

export const getHeaderState = createSelector(
    getLayoutModuleState,
    (state: LayoutState) => {
        return state.header
    }
)
export const getVisitorApprovalsCount = createSelector(
    getHeaderState,
    fromHeader.getVisitorApprovalsCount
)
export const getExhibitorApprovalsCount = createSelector(
    getHeaderState,
    fromHeader.getExhibitorApprovalsCount
)
