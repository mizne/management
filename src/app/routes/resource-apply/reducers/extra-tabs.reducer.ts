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
                    action.id,
                )
            }
        case fromExtraTabs.RESET_NEED_MANUAL_SET_TAB_INDEX:
            return {
                ...state,
                needManualSetTabIndex: false
            }

        default:
            return state
    }
}

export const getTabs = (state: State) => state.tabs
export const getNeedManualSetTabIndex = (state: State) => state.needManualSetTabIndex
export const getTabIndexToNeedManualSet = (state: State) => state.tabIndexNeedToManualSet
