import * as uuid from 'uuid'

export class RequirementApply {
    id?: string
    applyInfo: ApplyInfo
    resources: ApplyResource[]
    approvers: Approver[]
    createdAt?: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(): RequirementApply[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: uuid.v4(),
            applyInfo: ApplyInfo.generateFakeData(
                Math.random() > 0.5 ? '个人申请' : '部门申请'
            ),
            resources: ApplyResource.generateFakeDataItems(),
            approvers: Approver.generateFakeDataItems(),
            createdAt: `createAt ${i}`
        }))
    }
}

export class ApplyInfo {
    type?: string
    listNumber: string
    applicantName: string
    applicantDept: string
    applicantPhone: string
    applyReason: string

    static generateFakeData(applyType: string): ApplyInfo {
        return {
            type: applyType,
            listNumber: `fake listNumber ${Math.random()
                .toString()
                .slice(0, 5)}`,
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
    name: string
    environment: string
    applyCount: string
    applyTime: string
    endTime: string

    static generateFakeDataItems(): ApplyResource[] {
        return Array.from({ length: 3 }, (_, i) => ({
            id: `id ${i}`,
            type: `type ${i}`,
            name: `name ${i}`,
            environment: `environment ${i}`,
            applyCount: `applyCount ${i}`,
            applyTime: `applyTime ${i}`,
            endTime: `endTime ${i}`
        }))
    }

    static generateTempData(): ApplyResource {
        return {
            tempID: `tempID ${Math.random()
                .toString()
                .slice(0, 5)}`,
            type: `type`,
            name: `name`,
            environment: `environment`,
            applyCount: `applyCount`,
            applyTime: `applyTime`,
            endTime: `endTime`
        }
    }
}

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
    applyInfo: ApplyInfo
    fetchApproversLoading: boolean
    approvers: Approver[]
    addedApplyResources: ApplyResource[]
}

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
                applyInfo: apply.applyInfo,
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources
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
                applyInfo: apply.applyInfo,
                fetchApproversLoading: false,
                approvers: apply.approvers,
                addedApplyResources: apply.resources
            },
            action: TabAction.DETAIL
        }
    }
}
