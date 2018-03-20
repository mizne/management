import * as fromExtraTabs from '../actions/extra-tabs.action'
import * as fromSavedApply from '../actions/saved-apply.action'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    RequirementApply,
    TabOptions,
    TabAction
} from '@core/models/resource-apply.model'
import { ExtraTabsHelper } from './extra-tabs-helper'

export interface State {
    activeTabIndex: number
    tabs: TabOptions[]
}

const initialState: State = {
    activeTabIndex: -1,
    tabs: []
}

type Actions = fromSavedApply.Actions | fromExtraTabs.Actions

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case fromSavedApply.TO_EDIT_SAVED_APPLY:
            return {
                ...state,
                ...ExtraTabsHelper.generateFromEdit(state, action.apply)
            }
        case fromSavedApply.TO_DETAIL_SAVED_APPLY:
            return {
                ...state,
                ...ExtraTabsHelper.generateFromDetail(state, action.apply)
            }

        case fromExtraTabs.CLOSE_EXTRA_TAB:
            return {
                ...state,
                ...ExtraTabsHelper.generateFromCloseTab(
                    state,
                    action.payload.tabId,
                    action.payload.activeTabIndex
                )
            }

        default:
            return state
    }
}

export const getTabs = (state: State) => state.tabs
export const getActiveTabIndex = (state: State) => state.activeTabIndex
