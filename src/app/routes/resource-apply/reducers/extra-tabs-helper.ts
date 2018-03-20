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
                activeTabIndex: existTabIndex
            }
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForEdit(apply)
        )
        const activeTabIndex = newTabs.length - 1
        return {
            tabs: newTabs,
            activeTabIndex
        }
    }

    static generateFromDetail(oldState: State, apply: RequirementApply): State {
        const existTabIndex = oldState.tabs.findIndex(
            e => e.action === TabAction.DETAIL && e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                tabs: oldState.tabs,
                activeTabIndex: existTabIndex
            }
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForDetail(apply)
        )
        const activeTabIndex = newTabs.length - 1
        return {
            tabs: newTabs,
            activeTabIndex
        }
    }

    static generateFromCloseTab(
        oldState: State,
        tabId: string,
        prevActiveIndex: number
    ): State {
        const tabIndex = oldState.tabs.findIndex(e => e.id === tabId)
        // 当前激活的是前两个固定的tab之一
        if (prevActiveIndex < 0) {
            return {
                tabs: oldState.tabs.filter((_, i) => i !== tabIndex),
                activeTabIndex: -1
            }
        }

        // 当前激活的是待删除的
        if (prevActiveIndex === tabIndex) {
            const newTabs = oldState.tabs.filter((_, i) => i !== tabIndex)
            return {
                tabs: newTabs,
                activeTabIndex: newTabs.length === 0 ? -1 : tabIndex
            }
        }

        // 当前激活的 在待删除之前
        if (prevActiveIndex < tabIndex) {
            return {
                tabs: oldState.tabs.filter((_, i) => i !== tabIndex),
                activeTabIndex: prevActiveIndex
            }
        }

        // 当前激活的 在待删除之后
        if (prevActiveIndex > tabIndex) {
            return {
                tabs: oldState.tabs.filter((_, i) => i !== tabIndex),
                activeTabIndex: prevActiveIndex - 1
            }
        }
    }
}
