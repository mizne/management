import * as uuid from 'uuid'
import * as moment from 'moment'
import { PaginationParams } from './pagination.model'
import { ResourceInfo } from './resource-info.model'
import { FormGroup, FormControl } from '@angular/forms'
import {
    ResourceType,
    SoftwareType,
    SoftwareName,
    SoftwareSpec,
    UseEnvironment
} from '@app/core/models/resource-info.model'

export class VersionReleaseApply {
    id: string
    applyInfo: ApplyInfo
    resources: ResourceInfo[]
    approvers: Approver[]
    createdAt: string

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): VersionReleaseApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(),
            resources: ResourceInfo.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: `createAt ${i}`,
            checked: false,
            disabled: false
        }))
    }
}

export class ApplyInfo {
    listNumber: string
    applicantName: string
    applicantDept: string
    applicantTime: string
    projectName: string
    onlineVersion: string
    onlineTime: Date
    releaseVersion: string
    upgradeMode: string
    expectedStartTime: Date
    expectedEndTime: Date
    versionUpdateDesc: string

    remark: string

    static generateFakeData(): ApplyInfo {
        return {
            listNumber: uuid.v4(),
            applicantName: `小明`,
            applicantDept: `研发部`,
            applicantTime: `2018-4-18`,
            projectName: `国电项目 `,
            onlineVersion: `b${Math.random()
                .toString()
                .slice(0, 5)}`,
            onlineTime: new Date(),
            releaseVersion: `1.7.0.${Math.random()
                .toString()
                .slice(0, 5)}`,
            upgradeMode: `自动升级`,
            expectedStartTime: new Date(),
            expectedEndTime: new Date(),
            versionUpdateDesc: `对产品的功能进行了改善和升级`,
            remark: `2018-4-18 14:43:29申请`
        }
    }
}

export interface FetchAddableApplyResourceParams extends PaginationParams {
    type: string
    name: string
    version: string
}
export const defaultFetchAddableApplyResourceParams: Partial<
    FetchAddableApplyResourceParams
> = {
    pageIndex: 1,
    pageSize: 10
}

export interface FetchAddableApplyResourceCountParams {
    type: string
    name: string
    version: string
}
export const defaultFetchAddableApplyResourceCountParams: Partial<
    FetchAddableApplyResourceCountParams
> = {}

export class Approver {
    id: string
    name: string
    jobNumber: string
    department: string
    job: string

    static generateFakeDataItems(): Approver[] {
        return Array.from({ length: 2 }, (_, i) => ({
            id: uuid.v4(),
            name: `小刚`,
            jobNumber: `jobNumber ${i} ${Math.random()
                .toString()
                .slice(0, 5)}`,
            department: `审批部`,
            job: `员工`
        }))
    }
}

export enum TabAction {
    EDIT = 'EDIT',
    DETAIL = 'DETAIL'
}

export interface TabData {
    id: string
    fetchApplyInfoLoading: boolean
    applyInfoForm: FormGroup
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ResourceInfo[]
    ensureEditLoading: boolean
    ensureEditText: string
}

export const MAX_TABS_COUNT = 5

export class TabOptions {
    id: string
    name: string
    data: TabData
    action: TabAction

    static convertFromApplyForEdit(apply: VersionReleaseApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `编辑 ${apply.applyInfo.listNumber}`,
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    applicantName: new FormControl(
                        apply.applyInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.applyInfo.applicantDept
                    ),
                    applicantTime: new FormControl(
                        apply.applyInfo.applicantTime
                    ),
                    projectName: new FormControl(apply.applyInfo.projectName),
                    onlineVersion: new FormControl(
                        apply.applyInfo.onlineVersion
                    ),
                    releaseVersion: new FormControl(
                        apply.applyInfo.releaseVersion
                    ),
                    upgradeMode: new FormControl(apply.applyInfo.upgradeMode),
                    expectedStartTime: new FormControl(
                        apply.applyInfo.expectedStartTime
                    ),
                    expectedEndTime: new FormControl(
                        apply.applyInfo.expectedEndTime
                    ),
                    versionUpdateDesc: new FormControl(
                        apply.applyInfo.versionUpdateDesc
                    ),
                    remark: new FormControl(apply.applyInfo.remark)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.EDIT
        }
    }

    static convertFromApplyForDetail(apply: VersionReleaseApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `查看 ${apply.applyInfo.listNumber}`,
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    applicantName: new FormControl(
                        apply.applyInfo.applicantName
                    ),
                    applicantDept: new FormControl(
                        apply.applyInfo.applicantDept
                    ),
                    applicantTime: new FormControl(
                        apply.applyInfo.applicantTime
                    ),
                    projectName: new FormControl(apply.applyInfo.projectName),
                    onlineVersion: new FormControl(
                        apply.applyInfo.onlineVersion
                    ),
                    releaseVersion: new FormControl(
                        apply.applyInfo.releaseVersion
                    ),
                    upgradeMode: new FormControl(apply.applyInfo.upgradeMode),
                    expectedStartTime: new FormControl(
                        apply.applyInfo.expectedStartTime
                    ),
                    expectedEndTime: new FormControl(
                        apply.applyInfo.expectedEndTime
                    ),
                    versionUpdateDesc: new FormControl(
                        apply.applyInfo.versionUpdateDesc
                    ),
                    remark: new FormControl(apply.applyInfo.remark)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.DETAIL
        }
    }

    static generateApply(tab: TabOptions): VersionReleaseApply {
        return {
            id: tab.data.id,
            applyInfo: tab.data.applyInfoForm.value,
            resources: tab.data.addedApplyResources,
            approvers: tab.data.approvers,
            createdAt: 'fake createdAt',
            disabled: false,
            checked: false
        }
    }
}
