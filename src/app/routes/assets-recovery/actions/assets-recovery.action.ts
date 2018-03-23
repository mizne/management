import { Action } from '@ngrx/store'

import {
    AssetsRecovery,
    FetchAssetsRecoveriesCountParams
} from '@core/models/assets-recovery.model'
import {
    PaginationParams,
    FetchItemsParams,
    defaultFetchItemsParams
} from '@core/models/pagination.model'

export const FETCH_ASSETS_RECOVERIES =
    '[Assets Recovery] Fetch Assets Recoveries'
export const FETCH_ASSETS_RECOVERIES_SUCCESS =
    '[Assets Recovery] Fetch Assets Recoveries Success'
export const FETCH_ASSETS_RECOVERIES_FAILURE =
    '[Assets Recovery] Fetch Assets Recoveries Failure'

export const FETCH_ASSETS_RECOVERIES_COUNT =
    '[Assets Recovery] Fetch Assets Recoveries Count'
export const FETCH_ASSETS_RECOVERIES_COUNT_SUCCESS =
    '[Assets Recovery] Fetch Assets Recoveries Count Success'
export const FETCH_ASSETS_RECOVERIES_COUNT_FAILURE =
    '[Assets Recovery] Fetch Assets Recoveries Count Failure'

export const ENSURE_RECOVERY = '[Assets Recovery] Ensure Recovery'
export const ENSURE_RECOVERY_SUCCESS =
    '[Assets Recovery] Ensure Recovery Success'
export const ENSURE_RECOVERY_FAILURE =
    '[Assets Recovery] Ensure Recovery Failure'

export const ENSURE_PAGE_PARAMS = '[Assets Recovery] Ensure Page Params'

export class FetchAssetsRecoveriesAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES
    constructor(public payload: FetchItemsParams = defaultFetchItemsParams) {}
}
export class FetchAssetsRecoveriesSuccessAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES_SUCCESS
    constructor(public assetsRecoveries: AssetsRecovery[]) {}
}
export class FetchAssetsRecoveriesFailureAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES_FAILURE
}

export class FetchAssetsRecoveriesCountAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES_COUNT
    constructor(public params: FetchAssetsRecoveriesCountParams = {}) {}
}
export class FetchAssetsRecoveriesCountSuccessAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES_COUNT_SUCCESS
    constructor(public count: number) {}
}
export class FetchAssetsRecoveriesCountFailureAction implements Action {
    readonly type = FETCH_ASSETS_RECOVERIES_COUNT_FAILURE
}

export class EnsureRecoveryAction implements Action {
    readonly type = ENSURE_RECOVERY
    constructor(public assetsRecovery: AssetsRecovery) {}
}
export class EnsureRecoverySuccessAction implements Action {
    readonly type = ENSURE_RECOVERY_SUCCESS
}
export class EnsureRecoveryFailureAction implements Action {
    readonly type = ENSURE_RECOVERY_FAILURE
}

export class EnsurePageParamsAction implements Action {
    readonly type = ENSURE_PAGE_PARAMS
    constructor(public params: PaginationParams) {}
}

export type Actions =
    | FetchAssetsRecoveriesAction
    | FetchAssetsRecoveriesSuccessAction
    | FetchAssetsRecoveriesFailureAction
    | FetchAssetsRecoveriesCountAction
    | FetchAssetsRecoveriesCountSuccessAction
    | FetchAssetsRecoveriesCountFailureAction
    | EnsureRecoveryAction
    | EnsureRecoverySuccessAction
    | EnsureRecoveryFailureAction
    | EnsurePageParamsAction
