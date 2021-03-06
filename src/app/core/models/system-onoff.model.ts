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

export class SystemOnOffApply {
    id: string
    applyInfo: ApplyInfo
    resources: ResourceInfo[]
    approvers: Approver[]
    createdAt: Date

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): SystemOnOffApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(
                Math.random() > 0.5 ? '上线' : '下线'
            ),
            resources: ResourceInfo.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: new Date(),
            disabled: false,
            checked: false
        }))
    }
}

export class SystemInfo {
    id?: string
    systemName: string
    version: string
    onlineTime: string
    devDept: string
    projectName: string
    projectOwner: string
    projectOwnerPhone: string
    techOwner: string
    techOwnerPhone: string

    checked?: boolean

    static generateFake(): SystemInfo[] {
        return Array.from({ length: 10 }, (_, i) => ({
            id: uuid.v4(),
            systemName: `systemName ${i}`,
            version: `version ${i}`,
            onlineTime: `onlineTime ${i}`,
            devDept: `devDept ${i}`,
            projectName: `projectName ${i}`,
            projectOwner: `projectOwner ${i}`,
            projectOwnerPhone: `projectOwnerPhone ${i}`,
            techOwner: `techOwner ${i}`,
            techOwnerPhone: `techOwnerPhone ${i}`,
            checked: false
        }))
    }
}

export class ApplyInfo extends SystemInfo {
    type: string
    listNumber: string
    applicantName: string
    applicantDept: string
    description: string
    remark: string

    static generateFakeData(applyType: string): ApplyInfo {
        return {
            type: applyType,
            listNumber: uuid.v4(),
            applicantName: `申请人`,
            applicantDept: `研发部`,
            systemName: `国电系统`,
            version: `1.7.${Math.random()
                .toString()
                .slice(0, 5)}`,
            onlineTime: `2018-4-18`,
            devDept: `研发部`,
            projectName: `国电项目`,
            projectOwner: `小李`,
            projectOwnerPhone: `485649879`,
            techOwner: `小王`,
            techOwnerPhone: `78974564`,
            description: `研发产品`,
            remark: `为研发项目做准备`
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
            department: `审批部门`,
            job: `管理员`
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
            createdAt: new Date(),
            disabled: false,
            checked: false
        }
    }
}
