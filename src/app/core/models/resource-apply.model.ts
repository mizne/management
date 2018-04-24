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

export class RequirementApply {
    id: string
    applyInfo: ApplyInfo
    resources: ResourceInfo[]
    approvers: Approver[]
    createdAt: Date

    disabled: boolean
    checked: boolean

    static generateFakeDataItems(): RequirementApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(
                Math.random() > 0.5 ? '个人申请' : '部门申请'
            ),
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
            applicantName: `小明`,
            applicantDept: `研发部`,
            applicantPhone: `123456789`,
            applyReason: `开发项目需要`
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
    hiddenAddResourceBtn: boolean
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
            createdAt: new Date(),
            checked: false,
            disabled: false
        }
    }
}
