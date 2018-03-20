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
            applyInfo: ApplyInfo.generateFakeData(),
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

    static generateFakeData(): ApplyInfo {
        return {
            listNumber: `fake listNumber`,
            applicantName: `fake applicantName`,
            applicantDept: `fake applicantDept`,
            applicantPhone: `fake applicantPhone`,
            applyReason: `fake applyReason`
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
            name: `name ${i}`,
            jobNumber: `jobNumber ${i}`,
            department: `department ${i}`,
            job: `job ${i}`
        }))
    }
}
