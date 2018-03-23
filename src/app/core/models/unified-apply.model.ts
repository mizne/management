import * as uuid from 'uuid'
import { PaginationParams } from './pagination.model'
import { FormGroup, FormControl } from '@angular/forms'

export class UnifiedApply {
    id?: string
    applyInfo: ApplyInfo
    resources: ApplyResource[]
    approvers: Approver[]
    createdAt?: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(): UnifiedApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(),
            resources: ApplyResource.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: `createAt ${i}`
        }))
    }
}

export class ApplyInfo {
    listNumber: string
    applicantName: string
    applicantDept: string
    applicantPhone: string
    applyReason: string

    static generateFakeData(): ApplyInfo {
        return {
            listNumber: uuid.v4(),
            applicantName: `fake applicantName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantDept: `fake applicantDept ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantPhone: `fake applicantPhone ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyReason: `fake applyReason ${Math.random()
                .toString()
                .slice(0, 5)}`
        }
    }
}

export class SubPackageApply {
    id?: string
    subPackageInfo: SubPackageInfo
    resources: ApplyResource[]
    createdAt?: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(): SubPackageApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            subPackageInfo: SubPackageInfo.generateFakeData(),
            resources: ApplyResource.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: `createAt ${i}`
        }))
    }
}

export class SubPackageInfo {
    subPackageNumber: string
    applicantName: string
    applicantDept: string
    applicantPhone: string
    applyReason: string
    static generateFakeData(): SubPackageInfo {
        return {
            subPackageNumber: uuid.v4(),
            applicantName: `fake applicantName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantDept: `fake applicantDept ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantPhone: `fake applicantPhone ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyReason: `fake applyReason ${Math.random()
                .toString()
                .slice(0, 5)}`
        }
    }
}

export class ApplyResource {
    id?: string
    tempID?: string
    type: string
    softwareType: string
    softwareName: string
    version: string
    name: string
    environment: string
    applyCount: string
    applyTime: string
    endTime: string
    remark: string

    checked?: boolean

    static generateFakeDataItems(): ApplyResource[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            type: `type ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareType: `softwareType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareName: `softwareName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            version: `version ${Math.random()
                .toString()
                .slice(0, 5)}`,
            name: `name ${Math.random()
                .toString()
                .slice(0, 5)}`,
            environment: `environment ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyCount: `applyCount ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyTime: `applyTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            endTime: `endTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            remark: `remark ${Math.random()
                .toString()
                .slice(0, 5)}`
        }))
    }

    static generateTempData(): ApplyResource {
        return {
            tempID: uuid.v4(),
            type: `type ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareType: `softwareType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareName: `softwareName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            version: `version ${Math.random()
                .toString()
                .slice(0, 5)}`,
            name: `name ${Math.random()
                .toString()
                .slice(0, 5)}`,
            environment: `environment ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyCount: `applyCount ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applyTime: `applyTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            endTime: `endTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            remark: `remark ${Math.random()
                .toString()
                .slice(0, 5)}`
        }
    }
}

export interface FetchAddableApplyResourceParams extends PaginationParams {
    type?: string
    name?: string
    version?: string
}
export const defaultFetchAddableApplyResourceParams: FetchAddableApplyResourceParams = {
    pageIndex: 1,
    pageSize: 10
}

export interface FetchAddableApplyResourceCountParams {
    type?: string
    name?: string
    version?: string
}
export const defaultFetchAddableApplyResourceCountParams: FetchAddableApplyResourceCountParams = {}

export class Approver {
    id?: string
    name: string
    jobNumber: string
    department: string
    job: string

    static generateFakeDataItems(): Approver[] {
        return Array.from({ length: 2 }, (_, i) => ({
            name: `name ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`,
            jobNumber: `jobNumber ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`,
            department: `department ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`,
            job: `job ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`
        }))
    }
}

export enum TabAction {
    EDIT_UNIFIED_APPLY = 'EDIT_UNIFIED_APPLY',
    DETAIL_UNIFIED_APPLY = 'DETAIL_UNIFIED_APPLY',
    EDIT_SUBPACKAGE_APPLY = 'EDIT_SUBPACKAGE_APPLY',
    DETAIL_SUBPACKAGE_APPLY = 'DETAIL_SUBPACKAGE_APPLY'
}

export interface UnifiedTabData {
    id: string
    fetchApplyInfoLoading: boolean
    applyInfoForm: FormGroup
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ApplyResource[]
    ensureEditLoading: boolean
    ensureEditText: string
}

export interface SubPackageTabData {
    id: string
    fetchSubPackageInfoLoading: boolean
    subPackageInfoForm: FormGroup
    addedApplyResources: ApplyResource[]
    ensureEditLoading: boolean
    ensureEditText: string
}

export const MAX_TABS_COUNT = 5

export class TabOptions {
    id: string
    name: string
    data: UnifiedTabData | SubPackageTabData
    action: TabAction

    static convertFromApplyForEditUnified(apply: UnifiedApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `编辑 ${apply.applyInfo.listNumber}`,
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    listNumber: new FormControl(apply.applyInfo.listNumber),
                    applicantName: new FormControl(
                        apply.applyInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.applyInfo.applicantDept
                    ),
                    applicantPhone: new FormControl(
                        apply.applyInfo.applicantPhone
                    ),
                    applyReason: new FormControl(apply.applyInfo.applyReason)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.EDIT_UNIFIED_APPLY
        }
    }

    static convertFromApplyForDetailUnified(apply: UnifiedApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `查看 ${apply.applyInfo.listNumber}`,
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    listNumber: new FormControl(apply.applyInfo.listNumber),
                    applicantName: new FormControl(
                        apply.applyInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.applyInfo.applicantDept
                    ),
                    applicantPhone: new FormControl(
                        apply.applyInfo.applicantPhone
                    ),
                    applyReason: new FormControl(apply.applyInfo.applyReason)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.DETAIL_UNIFIED_APPLY
        }
    }

    static convertFromApplyForEditSubPackage(
        apply: SubPackageApply
    ): TabOptions {
        return {
            id: uuid.v4(),
            name: `编辑 ${apply.subPackageInfo.subPackageNumber}`,
            data: {
                id: apply.id,
                fetchSubPackageInfoLoading: false,
                subPackageInfoForm: new FormGroup({
                    subPackageNumber: new FormControl(
                        apply.subPackageInfo.subPackageNumber
                    ),
                    applicantName: new FormControl(
                        apply.subPackageInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.subPackageInfo.applicantDept
                    ),
                    applicantPhone: new FormControl(
                        apply.subPackageInfo.applicantPhone
                    ),
                    applyReason: new FormControl(
                        apply.subPackageInfo.applyReason
                    )
                }),
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.EDIT_SUBPACKAGE_APPLY
        }
    }

    static convertFromApplyForDetailSubPackage(
        apply: SubPackageApply
    ): TabOptions {
        return {
            id: uuid.v4(),
            name: `查看 ${apply.subPackageInfo.subPackageNumber}`,
            data: {
                id: apply.id,
                fetchSubPackageInfoLoading: false,
                subPackageInfoForm: new FormGroup({
                    subPackageNumber: new FormControl(
                        apply.subPackageInfo.subPackageNumber
                    ),
                    applicantName: new FormControl(
                        apply.subPackageInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.subPackageInfo.applicantDept
                    ),
                    applicantPhone: new FormControl(
                        apply.subPackageInfo.applicantPhone
                    ),
                    applyReason: new FormControl(
                        apply.subPackageInfo.applyReason
                    )
                }),
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.DETAIL_SUBPACKAGE_APPLY
        }
    }

    static generateUnifiedApply(tab: TabOptions): UnifiedApply {
        return {
            id: tab.data.id,
            applyInfo: (tab.data as UnifiedTabData).applyInfoForm.value,
            resources: tab.data.addedApplyResources,
            approvers: (tab.data as UnifiedTabData).approvers
        }
    }

    static generateSubPackageApply(tab: TabOptions): SubPackageApply {
        return {
            id: tab.data.id,
            subPackageInfo: (tab.data as SubPackageTabData).subPackageInfoForm
                .value,
            resources: tab.data.addedApplyResources
        }
    }

    static isUnifiedApply(tabs: TabOptions[], tabIndex: number): boolean {
        const tab = tabs[tabIndex]
        switch (tab.action) {
            case TabAction.EDIT_SUBPACKAGE_APPLY:
            case TabAction.DETAIL_SUBPACKAGE_APPLY:
                return false
            case TabAction.EDIT_UNIFIED_APPLY:
            case TabAction.DETAIL_UNIFIED_APPLY:
                return true
        }
    }

    static isSubPackageApply(tabs: TabOptions[], tabIndex: number): boolean {
        return !TabOptions.isUnifiedApply(tabs, tabIndex)
    }
}
