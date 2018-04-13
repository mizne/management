import * as fromExtraTabs from '../actions/extra-tabs.action'
import * as fromSavedApply from '../actions/saved-apply.action'
import {
    ApplyInfo,
    Approver,
    VersionReleaseApply,
    TabOptions,
    TabAction
} from '@core/models/version-release.model'
import { ExtraTabsHelper } from './extra-tabs-helper'

export interface State {
    tabs: TabOptions[]
    needManualSetTabIndex: boolean
    tabIndexNeedToManualSet: number
}

const initialState: State = {
    tabs: [],
    needManualSetTabIndex: false,
    tabIndexNeedToManualSet: -1
}

type Actions = fromSavedApply.Actions | fromExtraTabs.Actions

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case fromSavedApply.TO_EDIT_SAVED_APPLY:
            return ExtraTabsHelper.generateForToEdit(state, action.apply)

        case fromSavedApply.TO_DETAIL_SAVED_APPLY:
            return ExtraTabsHelper.generateForToDetail(state, action.apply)

        case fromExtraTabs.CLOSE_EXTRA_TAB:
            return ExtraTabsHelper.generateForCloseTab(state, action.id)

        case fromExtraTabs.RESET_NEED_MANUAL_SET_TAB_INDEX:
            return {
                ...state,
                needManualSetTabIndex: false
            }
        case fromExtraTabs.FETCH_APPLY_INFO:
            return ExtraTabsHelper.generateForFetchApplyInfo(
                state,
                action.payload.tabIndex
            )

        case fromExtraTabs.FETCH_APPLY_INFO_SUCCESS:
            return ExtraTabsHelper.generateForFetchApplyInfoSuccess(
                state,
                action.payload.tabIndex,
                action.payload.applyInfo
            )
        case fromExtraTabs.FETCH_APPLY_INFO_FAILURE:
            return ExtraTabsHelper.generateForFetchApplyInfoFailure(
                state,
                action.tabIndex
            )
        case fromExtraTabs.FETCH_APPROVERS:
            return ExtraTabsHelper.generateForFetchApprovers(
                state,
                action.payload.tabIndex
            )
        case fromExtraTabs.FETCH_APPROVERS_SUCCESS:
            return ExtraTabsHelper.generateForFetchApproversSuccess(
                state,
                action.payload.tabIndex,
                action.payload.approvers
            )
        case fromExtraTabs.FETCH_APPROVERS_FAILURE:
            return ExtraTabsHelper.generateForFetchApproversFailure(
                state,
                action.tabIndex
            )

        case fromExtraTabs.ADD_APPLY_RESOURCES:
            return ExtraTabsHelper.generateForAddApplyResources(
                state,
                action.payload.tabIndex,
                action.payload.applyResources
            )
        case fromExtraTabs.CREATE_APPLY_RESOURCE:
            return ExtraTabsHelper.generateForCreateApplyResource(
                state,
                action.payload.tabIndex,
                action.payload.applyResource
            )
        case fromExtraTabs.EDIT_TEMP_APPLY_RESOURCE:
            return ExtraTabsHelper.generateForEditTempApplyResource(
                state,
                action.payload.tabIndex,
                action.payload.resource
            )

        case fromExtraTabs.DELETE_APPLY_RESOURCE:
            return ExtraTabsHelper.generateForDeleteApplyResource(
                state,
                action.payload.tabIndex,
                action.payload.resourceIndex
            )
        case fromExtraTabs.CANCEL_EDIT_VERSION_RELEASE_APPLY:
            return ExtraTabsHelper.generateForCancelEdit(state, action.tabIndex)
        case fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY:
            return ExtraTabsHelper.generateForEnsureEdit(state, action.tabIndex)
        case fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY_SUCCESS:
            return ExtraTabsHelper.generateForEnsureEditSuccess(
                state,
                action.tabIndex
            )
        case fromExtraTabs.ENSURE_EDIT_VERSION_RELEASE_APPLY_FAILURE:
            return ExtraTabsHelper.generateForEnsureEditFailure(
                state,
                action.tabIndex
            )
        default:
            return state
    }
}

export const getTabs = (state: State) => state.tabs
export const getNeedManualSetTabIndex = (state: State) =>
    state.needManualSetTabIndex
export const getTabIndexToNeedManualSet = (state: State) =>
    state.tabIndexNeedToManualSet
