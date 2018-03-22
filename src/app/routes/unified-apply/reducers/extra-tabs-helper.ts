import { State } from './extra-tabs.reducer'
import {
    UnifiedApply,
    SubPackageApply,
    TabOptions,
    TabAction,
    ApplyInfo,
    Approver,
    ApplyResource,
    UnifiedTabData,
    SubPackageInfo,
    SubPackageTabData,
    MAX_TABS_COUNT
} from '@core/models/unified-apply.model'

export class ExtraTabsHelper {
    static generateForToEditUnified(
        oldState: State,
        apply: UnifiedApply
    ): State {
        const existTabIndex = oldState.tabs.findIndex(
            e =>
                e.action === TabAction.EDIT_UNIFIED_APPLY &&
                e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                ...oldState,
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex
            }
        }
        if (oldState.tabs.length >= MAX_TABS_COUNT) {
            return oldState
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForEditUnified(apply)
        )
        return {
            ...oldState,
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length - 1
        }
    }

    static generateForToDetailUnified(
        oldState: State,
        apply: UnifiedApply
    ): State {
        const existTabIndex = oldState.tabs.findIndex(
            e =>
                e.action === TabAction.DETAIL_UNIFIED_APPLY &&
                e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                ...oldState,
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex
            }
        }
        if (oldState.tabs.length >= MAX_TABS_COUNT) {
            return oldState
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForDetailUnified(apply)
        )
        return {
            ...oldState,
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length - 1
        }
    }

    static generateForToEditSubPackage(
        oldState: State,
        apply: SubPackageApply
    ): State {
        const existTabIndex = oldState.tabs.findIndex(
            e =>
                e.action === TabAction.EDIT_SUBPACKAGE_APPLY &&
                e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                ...oldState,
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex
            }
        }
        if (oldState.tabs.length >= MAX_TABS_COUNT) {
            return oldState
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForEditSubPackage(apply)
        )
        return {
            ...oldState,
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length - 1
        }
    }

    static generateForToDetailSubPackage(
        oldState: State,
        apply: SubPackageApply
    ): State {
        const existTabIndex = oldState.tabs.findIndex(
            e =>
                e.action === TabAction.DETAIL_SUBPACKAGE_APPLY &&
                e.data.id === apply.id
        )
        if (existTabIndex > -1) {
            return {
                ...oldState,
                tabs: oldState.tabs,
                needManualSetTabIndex: true,
                tabIndexNeedToManualSet: existTabIndex
            }
        }
        if (oldState.tabs.length >= MAX_TABS_COUNT) {
            return oldState
        }
        const newTabs = oldState.tabs.concat(
            TabOptions.convertFromApplyForDetailSubPackage(apply)
        )
        return {
            ...oldState,
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length - 1
        }
    }

    static generateForCloseTab(oldState: State, tabId: string): State {
        const tabIndex = oldState.tabs.findIndex(e => e.id === tabId)
        return {
            ...oldState,
            tabs: oldState.tabs.filter((_, i) => i !== tabIndex),
            needManualSetTabIndex: false,
            tabIndexNeedToManualSet: -1
        }
    }

    static generateForAddApplyResources(
        oldState: State,
        tabIndex: number,
        resources: ApplyResource[]
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            addedApplyResources: e.data.addedApplyResources.concat(
                                resources
                            )
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForCreateApplyResource(
        oldState: State,
        tabIndex: number,
        resource: ApplyResource
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            addedApplyResources: e.data.addedApplyResources.concat(
                                resource
                            )
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForEditTempApplyResource(
        oldState: State,
        tabIndex: number,
        resource: ApplyResource
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            addedApplyResources: e.data.addedApplyResources.map(
                                f => {
                                    if (f.tempID === resource.tempID) {
                                        return resource
                                    }
                                    return f
                                }
                            )
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForDeleteApplyResource(
        oldState: State,
        tabIndex: number,
        resourceIndex: number
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            addedApplyResources: e.data.addedApplyResources.filter(
                                (f, index) => index !== resourceIndex
                            )
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForCancelEdit(oldState: State, tabIndex: number): State {
        return {
            ...oldState,
            tabs: oldState.tabs.filter((_, i) => i !== tabIndex)
        }
    }

    static generateForEnsureEdit(oldState: State, tabIndex: number): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((tab, i) => {
                if (i === tabIndex) {
                    return {
                        ...tab,
                        data: {
                            ...tab.data,
                            ensureEditLoading: true,
                            ensureEditText: '正在保存编辑的需求信息'
                        }
                    }
                }
                return { ...tab }
            })
        }
    }

    static generateForEnsureEditSuccess(
        oldState: State,
        tabIndex: number
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.filter((_, i) => i !== tabIndex)
        }
    }

    static generateForEnsureEditFailure(
        oldState: State,
        tabIndex: number
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((tab, i) => {
                if (i === tabIndex) {
                    return {
                        ...tab,
                        data: {
                            ...tab.data,
                            ensureEditLoading: false,
                            ensureEditText: ''
                        }
                    }
                }
                return { ...tab }
            })
        }
    }
}
