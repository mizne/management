import { State } from './extra-tabs.reducer'
import {
    RequirementApply,
    TabOptions,
    TabAction
} from '@core/models/resource-apply.model'

export class ExtraTabsHelper {
    static generateFromEdit(oldState: State, apply: RequirementApply): State {
        const existTabIndex = oldState.tabs.findIndex(
            e => e.action === TabAction.EDIT && e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex + 2
            }
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForEdit(apply)
        )
        return {
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length + 1
        }
    }

    static generateFromDetail(oldState: State, apply: RequirementApply): State {
        const existTabIndex = oldState.tabs.findIndex(
            e => e.action === TabAction.DETAIL && e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex + 2
            }
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForDetail(apply)
        )
        return {
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length + 1
        }
    }

    static generateFromCloseTab(
        oldState: State,
        tabId: string,
    ): State {
        const tabIndex = oldState.tabs.findIndex(e => e.id === tabId)
        return {
            tabs: oldState.tabs.filter((_, i) => i !== tabIndex),
            needManualSetTabIndex: false,
            tabIndexNeedToManualSet: -1
        }
    }
}
