import * as uuid from 'uuid'
import { PaginationParams } from './pagination.model'
import { FormGroup, FormControl } from '@angular/forms'

export class VersionReleaseApply {
    id?: string
    applyInfo: ApplyInfo
    resources: ApplyResource[]
    approvers: Approver[]
    createdAt?: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(): VersionReleaseApply[] {
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
    listNumber?: string
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
    EDIT = 'EDIT',
    DETAIL = 'DETAIL'
}

export interface TabData {
    id: string
    fetchApplyInfoLoading: boolean
    applyInfoForm: FormGroup
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ApplyResource[]
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
            approvers: tab.data.approvers
        }
    }
}
