import { State } from './extra-tabs.reducer'
import {
    VersionReleaseApply,
    TabOptions,
    TabAction,
    ApplyInfo,
    Approver,
    ApplyResource,
    MAX_TABS_COUNT
} from '@core/models/version-release.model'

export class ExtraTabsHelper {
    static generateForToEdit(oldState: State, apply: VersionReleaseApply): State {
        const existTabIndex = oldState.tabs.findIndex(
            e => e.action === TabAction.EDIT && e.data.id === apply.id
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
            TabOptions.convertFromApplyForEdit(apply)
        )
        return {
            ...oldState,
            tabs: newTabs,
            needManualSetTabIndex: true,
            tabIndexNeedToManualSet: newTabs.length - 1
        }
    }

    static generateForToDetail(
        oldState: State,
        apply: VersionReleaseApply
    ): State {
        const existTabIndex = oldState.tabs.findIndex(
            e => e.action === TabAction.DETAIL && e.data.id === apply.id
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
            TabOptions.convertFromApplyForDetail(apply)
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

    static generateForFetchApplyInfo(oldState: State, tabIndex: number): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApplyInfoLoading: true
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForFetchApplyInfoSuccess(
        oldState: State,
        tabIndex: number,
        applyInfo: ApplyInfo
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    e.data.applyInfoForm.patchValue(applyInfo, {
                        emitEvent: false
                    })
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApplyInfoLoading: false
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForFetchApplyInfoFailure(
        oldState: State,
        tabIndex: number
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApplyInfoLoading: false
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForFetchApprovers(oldState: State, tabIndex: number): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApproversLoading: true
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForFetchApproversSuccess(
        oldState: State,
        tabIndex: number,
        approvers: Approver[]
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApproversLoading: false,
                            approvers
                        }
                    }
                }
                return { ...e }
            })
        }
    }

    static generateForFetchApproversFailure(
        oldState: State,
        tabIndex: number
    ): State {
        return {
            ...oldState,
            tabs: oldState.tabs.map((e, i) => {
                if (i === tabIndex) {
                    return {
                        ...e,
                        data: {
                            ...e.data,
                            fetchApproversLoading: false
                        }
                    }
                }
                return { ...e }
            })
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
