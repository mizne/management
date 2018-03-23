import * as fromToAddApplyResource from '../actions/to-add-apply-resource.action'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
} from '@core/models/version-release.model'

export interface State {
    fetchAddableApplyResourcesLoading: boolean
    addableApplyResources: ApplyResource[]
    addableApplyResourcesCount: number
    pageIndex: number
    pageSize: number
}

const initialState: State = {
    fetchAddableApplyResourcesLoading: false,
    addableApplyResources: [],
    addableApplyResourcesCount: 0,
    pageIndex: 1,
    pageSize: 10
}

export function reducer(
    state: State = initialState,
    action: fromToAddApplyResource.Actions
): State {
    switch (action.type) {
        case fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: true
            }
        case fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE_SUCCESS:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: false,
                addableApplyResources: action.resources
            }
        case fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE_FAILURE:
            return {
                ...state,
                fetchAddableApplyResourcesLoading: false
            }
        case fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE_COUNT_SUCCESS:
            return {
                ...state,
                addableApplyResourcesCount: action.count
            }

        case fromToAddApplyResource.ENSURE_PAGE_PARAMS:
            return {
                ...state,
                pageIndex: action.params.pageIndex,
                pageSize: action.params.pageSize
            }
        default:
            return state
    }
}

export const getFetchAddableApplyResourcesLoading = (state: State) =>
    state.fetchAddableApplyResourcesLoading
export const getAddableApplyResources = (state: State) =>
    state.addableApplyResources
export const getAddableApplyResourcesCount = (state: State) =>
    state.addableApplyResourcesCount
export const getAddableApplyResourcesPageParams = (state: State) => ({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize
})
