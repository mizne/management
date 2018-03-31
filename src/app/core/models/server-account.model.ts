import * as uuid from 'uuid'

export class PhysicalServerAccount {
    id: string
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

    disabled: boolean
    checked: boolean

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): PhysicalServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `physical name ${i + (pageIndex - 1) * pageSize}`,
            type: `physical type ${i + (pageIndex - 1) * pageSize}`,
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
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `physicalLocation ${i +
                (pageIndex - 1) * pageSize}`,
            checked: false,
            disabled: false
        }))
    }

    static generateFakeItem(): PhysicalServerAccount {
        return {
            id: uuid.v4(),
            name: `name `,
            type: `type `,
            purpose: `purpose `,
            workStatus: `workStatus `,
            clusterGroupOwner: `clusterGroupOwner`,
            managementIP: `managementIP `,
            operationSystem: `operationSystem`,
            brand: `brand `,
            modelNumber: `modelNumber `,
            cpuCost: `cpuCost `,
            memoryCost: `memoryCost `,
            storageCost: `storageCost `,
            whoUse: `whoUse `,
            startTimeUse: `startTimeUse `,
            durationUse: `durationUse `,
            physicalLocation: `physicalLocation`,
            checked: false,
            disabled: false
        }
    }
}

export class VirtualServerAccount {
    id: string
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
            name: `virtual name ${i + (pageIndex - 1) * pageSize}`,
            purpose: `virtual purpose ${i + (pageIndex - 1) * pageSize}`,
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
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `physicalLocation ${i +
                (pageIndex - 1) * pageSize}`
        }))
    }

    static generateFakeItem(): VirtualServerAccount {
        return {
            id: uuid.v4(),
            name: `name`,
            purpose: `purpose`,
            workStatus: `workStatus`,
            physicalHostOwner: `physicalHostOwner`,
            clusterGroupOwner: `clusterGroupOwner`,
            managementIP: `managementIP`,
            operationSystem: `operationSystem`,
            cpuCost: `cpuCost`,
            memoryCost: `memoryCost`,
            storageCost: `storageCost`,
            whoUse: `whoUse`,
            startTimeUse: `startTimeUse`,
            durationUse: `durationUse`,
            physicalLocation: `physicalLocation`
        }
    }
}

export class ClusterServerAccount {
    id: string
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
            name: `cluster name ${i + (pageIndex - 1) * pageSize}`,
            purpose: `cluster purpose ${i + (pageIndex - 1) * pageSize}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            memberServer: `memberServer ${i + (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static generateFakeItem(): ClusterServerAccount {
        return {
            id: uuid.v4(),
            name: `name ${Math.random()}`,
            purpose: `purpose ${Math.random()}`,
            workStatus: `workStatus ${Math.random()}`,
            memberServer: `memberServer ${Math.random()}`,
            managementIP: `managementIP ${Math.random()}`,
            whoUse: `whoUse ${Math.random()}`,
            startTimeUse: `startTimeUse ${Math.random()}`,
            durationUse: `durationUse ${Math.random()}`
        }
    }
}

export enum ServerAccountType {
    PHYSICAL = 'PHYSICAL',
    VIRTUAL = 'VIRTUAL',
    CLUSTER = 'CLUSTER'
}
