import * as fromSavedApply from '../actions/saved-apply.action'
import { UnifiedApply, SubPackageApply } from '@core/models/unified-apply.model'

export interface State {
    fetchUnifiedLoading: boolean
    savedUnifiedApplies: UnifiedApply[]
    fetchSubPackageLoading: boolean
    savedSubPackageApplies: SubPackageApply[]
}

const initialState: State = {
    fetchUnifiedLoading: false,
    savedUnifiedApplies: [],
    fetchSubPackageLoading: false,
    savedSubPackageApplies: []
}

export function reducer(
    state: State = initialState,
    action: fromSavedApply.Actions
): State {
    switch (action.type) {
        case fromSavedApply.FETCH_UNIFIED_APPLIES:
            return {
                ...state,
                fetchUnifiedLoading: true
            }
        case fromSavedApply.FETCH_UNIFIED_APPLIES_SUCCESS:
            return {
                ...state,
                savedUnifiedApplies: action.unifiedApplies,
                fetchUnifiedLoading: false
            }
        case fromSavedApply.FETCH_UNIFIED_APPLIES_FAILURE:
            return {
                ...state,
                fetchUnifiedLoading: false
            }

        case fromSavedApply.FETCH_SUBPACKAGE_APPLIES:
            return {
                ...state,
                fetchSubPackageLoading: true
            }
        case fromSavedApply.FETCH_SUBPACKAGE_APPLIES_SUCCESS:
            return {
                ...state,
                savedSubPackageApplies: action.subPackageApplies,
                fetchSubPackageLoading: false
            }
        case fromSavedApply.FETCH_SUBPACKAGE_APPLIES_FAILURE:
            return {
                ...state,
                fetchSubPackageLoading: false
            }
        default:
            return state
    }
}

export const getFetchUnifiedLoading = (state: State) =>
    state.fetchUnifiedLoading
export const getSavedUnifiedApplies = (state: State) =>
    state.savedUnifiedApplies

export const getFetchSubPackageLoading = (state: State) =>
    state.fetchSubPackageLoading
export const getSavedSubPackageApplies = (state: State) =>
    state.savedSubPackageApplies
