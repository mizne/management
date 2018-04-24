import * as uuid from 'uuid'
import * as moment from 'moment'
import { PaginationParams } from './pagination.model'
import { ResourceInfo } from './resource-info.model'
import { FormGroup, FormControl } from '@angular/forms'
import {
    ResourceType,
    SoftwareName,
    SoftwareSpec,
    SoftwareType,
    UseEnvironment
} from '@core/models/resource-info.model'

export class UnifiedApply {
    id: string
    applyInfo: ApplyInfo
    resources: ResourceInfo[]
    approvers: Approver[]
    createdAt: Date

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): UnifiedApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(),
            resources: ResourceInfo.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: moment()
                .add(i, 'd')
                .toDate(),
            disabled: false,
            checked: false
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
            listNumber: `236541${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantName: `小明`,
            applicantDept: `研发部`,
            applicantPhone: `12345678`,
            applyReason: `研发需要`
        }
    }
}

export class SubPackageApply {
    id?: string
    subPackageInfo: SubPackageInfo
    resources: ResourceInfo[]
    createdAt?: Date

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(): SubPackageApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            subPackageInfo: SubPackageInfo.generateFakeData(),
            resources: ResourceInfo.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: moment()
                .add(i, 'd')
                .toDate()
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
            subPackageNumber: `12136${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantName: `小明`,
            applicantDept: `研发部`,
            applicantPhone: `123456789`,
            applyReason: `开发需求`
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
            name: `小刚`,
            jobNumber: `jobNumber ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`,
            department: `审批部`,
            job: `管理员`
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
    addedApplyResources: ResourceInfo[]
    ensureEditLoading: boolean
    ensureEditText: string
}

export interface SubPackageTabData {
    id: string
    fetchSubPackageInfoLoading: boolean
    subPackageInfoForm: FormGroup
    addedApplyResources: ResourceInfo[]
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
            approvers: (tab.data as UnifiedTabData).approvers,
            createdAt: new Date(),
            checked: false,
            disabled: false
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
