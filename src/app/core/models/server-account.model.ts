import * as uuid from 'uuid'

export class PhysicalServerAccount {
    id?: string
    name: string
    type: string
    purpose: string
    workStatus: string
    clusterGroupOwner: string
    managementIP: string
    operationSystem: string
    brand: string
    modelNumber: string
    cpuCost: string
    memoryCost: string
    storageCost: string
    whoUse: string
    startTimeUse: string
    durationUse: string
    physicalLocation: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): PhysicalServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `name ${i + (pageIndex - 1) * pageSize}`,
            type: `type ${i + (pageIndex - 1) * pageSize}`,
            purpose: `purpose ${i + (pageIndex - 1) * pageSize}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            clusterGroupOwner: `clusterGroupOwner ${i +
                (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            brand: `brand ${i + (pageIndex - 1) * pageSize}`,
            modelNumber: `modelNumber ${i + (pageIndex - 1) * pageSize}`,
            cpuCost: `cpuCost ${i + (pageIndex - 1) * pageSize}`,
            memoryCost: `memoryCost ${i + (pageIndex - 1) * pageSize}`,
            storageCost: `storageCost ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            endTimeUse: `endTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `physicalLocation ${i +
                (pageIndex - 1) * pageSize}`
        }))
    }
}

export class VirtualServerAccount {
    id?: string
    name: string
    purpose: string
    workStatus: string
    physicalHostOwner: string
    clusterGroupOwner: string
    managementIP: string
    operationSystem: string
    cpuCost: string
    memoryCost: string
    storageCost: string
    whoUse: string
    startTimeUse: string
    durationUse: string
    physicalLocation: string

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): VirtualServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `name ${i + (pageIndex - 1) * pageSize}`,
            purpose: `purpose ${i + (pageIndex - 1) * pageSize}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            physicalHostOwner: `physicalHostOwner ${i +
                (pageIndex - 1) * pageSize}`,
            clusterGroupOwner: `clusterGroupOwner ${i +
                (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            cpuCost: `cpuCost ${i + (pageIndex - 1) * pageSize}`,
            memoryCost: `memoryCost ${i + (pageIndex - 1) * pageSize}`,
            storageCost: `storageCost ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            endTimeUse: `endTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            brand: `brand ${i + (pageIndex - 1) * pageSize}`,
            modelNumber: `modelNumber ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `physicalLocation ${i +
                (pageIndex - 1) * pageSize}`
        }))
    }
}

export class ClusterServerAccount {
    id?: string
    name: string
    purpose: string
    workStatus: string
    memberServer: string
    managementIP: string
    whoUse: string
    startTimeUse: string
    durationUse: string

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): ClusterServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `name ${i + (pageIndex - 1) * pageSize}`,
            purpose: `purpose ${i + (pageIndex - 1) * pageSize}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            memberServer: `memberServer ${i + (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            endTimeUse: `endTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}
