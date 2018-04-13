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
    onlineTime: string
    releaseVersion: string
    versionCompatibility: string
    hardwareChange: string
    upgradeMode: string
    expectedReleaseTime: string
    versionUpdateDesc: string

    remark: string

    static generateFakeData(): ApplyInfo {
        return {
            listNumber: uuid.v4(),
            applicantName: `fake applicantName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantDept: `fake applicantDept ${Math.random()
                .toString()
                .slice(0, 5)}`,
            applicantTime: `fake applicantTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            projectName: `fake projectName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            onlineVersion: `fake onlineVersion ${Math.random()
                .toString()
                .slice(0, 5)}`,
            onlineTime: `fake onlineTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            releaseVersion: `fake releaseVersion ${Math.random()
                .toString()
                .slice(0, 5)}`,
            versionCompatibility: `fake versionCompatibility ${Math.random()
                .toString()
                .slice(0, 5)}`,
            hardwareChange: `fake hardwareChange ${Math.random()
                .toString()
                .slice(0, 5)}`,
            upgradeMode: `fake upgradeMode ${Math.random()
                .toString()
                .slice(0, 5)}`,
            expectedReleaseTime: `fake expectedReleaseTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            versionUpdateDesc: `fake versionUpdateDesc ${Math.random()
                .toString()
                .slice(0, 5)}`,
            remark: `fake remark ${Math.random()
                .toString()
                .slice(0, 5)}`
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
            // name: uuid.v4(),
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
                    versionCompatibility: new FormControl(
                        apply.applyInfo.versionCompatibility
                    ),
                    hardwareChange: new FormControl(
                        apply.applyInfo.hardwareChange
                    ),
                    upgradeMode: new FormControl(apply.applyInfo.upgradeMode),
                    expectedReleaseTime: new FormControl(
                        apply.applyInfo.expectedReleaseTime
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
            // name: uuid.v4(),
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
                    versionCompatibility: new FormControl(
                        apply.applyInfo.versionCompatibility
                    ),
                    hardwareChange: new FormControl(
                        apply.applyInfo.hardwareChange
                    ),
                    upgradeMode: new FormControl(apply.applyInfo.upgradeMode),
                    expectedReleaseTime: new FormControl(
                        apply.applyInfo.expectedReleaseTime
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
