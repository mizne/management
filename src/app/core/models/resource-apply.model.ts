import * as uuid from 'uuid'
import { PaginationParams } from './pagination.model'
import { FormGroup, FormControl } from '@angular/forms'

export class RequirementApply {
    id: string
    applyInfo: ApplyInfo
    resources: ApplyResource[]
    approvers: Approver[]
    createdAt: string

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): RequirementApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(
                Math.random() > 0.5 ? '个人申请' : '部门申请'
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
    applicantName: string
    applicantDept: string
    applicantPhone: string
    applyReason: string

    static generateFakeData(applyType: string): ApplyInfo {
        return {
            type: applyType,
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

    checked: boolean

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
                .slice(0, 5)}`,
            checked: false
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
                .slice(0, 5)}`,
            checked: false
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
    hiddenAddResourceBtn: boolean
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

    static convertFromApplyForEdit(apply: RequirementApply): TabOptions {
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
                hiddenAddResourceBtn: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.EDIT
        }
    }

    static convertFromApplyForDetail(apply: RequirementApply): TabOptions {
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
                hiddenAddResourceBtn: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources,
                ensureEditLoading: false,
                ensureEditText: ''
            },
            action: TabAction.DETAIL
        }
    }

    static generateApply(tab: TabOptions): RequirementApply {
        return {
            id: tab.data.id,
            applyInfo: tab.data.applyInfoForm.value,
            resources: tab.data.addedApplyResources,
            approvers: tab.data.approvers,
            createdAt: 'fake createdAt',
            checked: false,
            disabled: false
        }
    }
}

export const resourceTypes = [
    {
        label: '软件资源',
        value: '软件资源'
    },
    {
        label: '计算资源',
        value: '计算资源'
    },
    {
        label: '存储资源',
        value: '存储资源'
    },
    {
        label: '数据库资源',
        value: '数据库资源'
    },
    {
        label: 'IP地址资源',
        value: 'IP地址资源'
    },
    {
        label: '防火墙访问权限资源',
        value: '防火墙访问权限资源'
    }
]
