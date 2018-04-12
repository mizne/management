import * as uuid from 'uuid'
import * as moment from 'moment'
import { PaginationParams } from './pagination.model'
import { FormGroup, FormControl } from '@angular/forms'
import {
    ResourceType,
    SoftwareType,
    SoftwareName,
    SoftwareSpec,
    UseEnvironment
} from '@app/core/models/resource-info.model'

export class SystemOnOffApply {
    id: string
    applyInfo: ApplyInfo
    resources: ApplyResource[]
    approvers: Approver[]
    createdAt: string

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): SystemOnOffApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(
                Math.random() > 0.5 ? '上线' : '下线'
            ),
            resources: ApplyResource.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: `createAt ${i}`,
            disabled: false,
            checked: false
        }))
    }
}

export class ApplyInfo {
    type: string
    listNumber: string
    systemName: string
    version: string
    onlineTime: string
    devDept: string
    projectName: string
    projectOwner: string
    projectOwnerPhone: string
    techOwner: string
    techOwnerPhone: string
    description: string
    remark: string

    static generateFakeData(applyType: string): ApplyInfo {
        return {
            type: applyType,
            listNumber: uuid.v4(),
            systemName: `fake systemName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            version: `fake version ${Math.random()
                .toString()
                .slice(0, 5)}`,
            onlineTime: `fake onlineTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            devDept: `fake devDept ${Math.random()
                .toString()
                .slice(0, 5)}`,
            projectName: `fake projectName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            projectOwner: `fake projectOwner ${Math.random()
                .toString()
                .slice(0, 5)}`,
            projectOwnerPhone: `fake projectOwnerPhone ${Math.random()
                .toString()
                .slice(0, 5)}`,
            techOwner: `fake techOwner ${Math.random()
                .toString()
                .slice(0, 5)}`,
            techOwnerPhone: `fake techOwnerPhone ${Math.random()
                .toString()
                .slice(0, 5)}`,
            description: `fake description ${Math.random()
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
    applyCount: number
    applyTime: Date
    endTime: Date
    remark: string

    checked: boolean

    static generateFakeDataItems(): ApplyResource[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            type: ResourceType.generateFakeDataItems()[0].label,
            softwareType: SoftwareType.generateFakeDataItems()[0].label,
            softwareName: SoftwareName.generateFakeDataItems()[0].label,
            version: SoftwareSpec.generateFakeDataItems()[0].label,
            name: `name ${Math.random()
                .toString()
                .slice(0, 5)}`,
            environment: UseEnvironment.generateFakeDataItems()[0].label,
            applyCount: 2,
            applyTime: new Date(),
            endTime: moment()
                .add(3, 'd')
                .toDate(),
            remark: `remark ${Math.random()
                .toString()
                .slice(0, 5)}`,
            checked: false
        }))
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
    addedApplyResources: ApplyResource[]
    showCreateApplyResourceBtn: boolean
    ensureEditLoading: boolean
    ensureEditText: string
}

export const MAX_TABS_COUNT = 5

export class TabOptions {
    id: string
    name: string
    data: TabData
    action: TabAction

    static convertFromApplyForEdit(apply: SystemOnOffApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `编辑 ${apply.applyInfo.listNumber}`,
            // name: uuid.v4(),
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    type: new FormControl(apply.applyInfo.type),
                    listNumber: new FormControl(apply.applyInfo.listNumber),
                    systemName: new FormControl(apply.applyInfo.systemName),
                    version: new FormControl(apply.applyInfo.version),
                    onlineTime: new FormControl(apply.applyInfo.onlineTime),
                    devDept: new FormControl(apply.applyInfo.devDept),
                    projectName: new FormControl(apply.applyInfo.projectName),
                    projectOwner: new FormControl(apply.applyInfo.projectOwner),
                    projectOwnerPhone: new FormControl(
                        apply.applyInfo.projectOwnerPhone
                    ),
                    techOwner: new FormControl(apply.applyInfo.techOwner),
                    techOwnerPhone: new FormControl(
                        apply.applyInfo.techOwnerPhone
                    ),
                    description: new FormControl(apply.applyInfo.description),
                    remark: new FormControl(apply.applyInfo.remark)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                showCreateApplyResourceBtn: apply.applyInfo.type === '上线',
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.EDIT
        }
    }

    static convertFromApplyForDetail(apply: SystemOnOffApply): TabOptions {
        return {
            id: uuid.v4(),
            name: `查看 ${apply.applyInfo.listNumber}`,
            // name: uuid.v4(),
            data: {
                id: apply.id,
                fetchApplyInfoLoading: false,
                applyInfoForm: new FormGroup({
                    type: new FormControl(apply.applyInfo.type),
                    listNumber: new FormControl(apply.applyInfo.listNumber),
                    systemName: new FormControl(apply.applyInfo.systemName),
                    version: new FormControl(apply.applyInfo.version),
                    onlineTime: new FormControl(apply.applyInfo.onlineTime),
                    devDept: new FormControl(apply.applyInfo.devDept),
                    projectName: new FormControl(apply.applyInfo.projectName),
                    projectOwner: new FormControl(apply.applyInfo.projectOwner),
                    projectOwnerPhone: new FormControl(
                        apply.applyInfo.projectOwnerPhone
                    ),
                    techOwner: new FormControl(apply.applyInfo.techOwner),
                    techOwnerPhone: new FormControl(
                        apply.applyInfo.techOwnerPhone
                    ),
                    description: new FormControl(apply.applyInfo.description),
                    remark: new FormControl(apply.applyInfo.remark)
                }),
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                showCreateApplyResourceBtn: false,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.DETAIL
        }
    }

    static generateApply(tab: TabOptions): SystemOnOffApply {
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
