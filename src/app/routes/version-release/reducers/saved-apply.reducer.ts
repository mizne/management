import * as fromSavedApply from '../actions/saved-apply.action'
import { VersionReleaseApply } from '@core/models/version-release.model'

export interface State {
    loading: boolean
    savedApplies: VersionReleaseApply[]
}

const initialState: State = {
    loading: false,
    savedApplies: []
}

export function reducer(
    state: State = initialState,
    action: fromSavedApply.Actions
): State {
    switch (action.type) {
        case fromSavedApply.FETCH_SAVED_APPLIES:
            return {
                ...state,
                loading: true
            }
        case fromSavedApply.FETCH_SAVED_APPLIES_SUCCESS:
            return {
                ...state,
                savedApplies: action.requirementApplies,
                loading: false
            }
        case fromSavedApply.FETCH_SAVED_APPLIES_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export const getLoading = (state: State) => state.loading
export const getSavedApplies = (state: State) => state.savedApplies
