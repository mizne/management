import { createFeatureSelector, createSelector } from '@ngrx/store'

import * as fromAssetsRecovery from './assets-recovery.reducer'
import * as fromRoot from '../../../reducers'

export interface AssetsRecoveryState {
    assetsRecoveryList: fromAssetsRecovery.State
}

export interface State extends fromRoot.State {
    fromAssetsRecovery: AssetsRecoveryState
}
export const reducers = {
    assetsRecoveryList: fromAssetsRecovery.reducer
}

export const getAssetsRecoveryModuleState = createFeatureSelector<
    AssetsRecoveryState
>('fromAssetsRecovery')

export const getAssetsRecoveryListState = createSelector(
    getAssetsRecoveryModuleState,
    (state: AssetsRecoveryState) => state.assetsRecoveryList
)
export const getLoading = createSelector(
    getAssetsRecoveryListState,
    fromAssetsRecovery.getLoading
)
export const getAssetsRecoveries = createSelector(
    getAssetsRecoveryListState,
    fromAssetsRecovery.getAssetsRecoveries
)
export const getAssetsRecoveriesCount = createSelector(
    getAssetsRecoveryListState,
    fromAssetsRecovery.getAssetsRecoveriesCount
)
export const getAssetsRecoveryPageParams = createSelector(
    getAssetsRecoveryListState,
    fromAssetsRecovery.getPageParams
)
