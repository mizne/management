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
    endTimeUse: string
    durationUse: string
    physicalLocation: string

    disabled?: boolean
    checked?: boolean

    static generateFakeDataItems(count = 5): PhysicalServerAccount[] {
        return Array.from({ length: count }, (_, i) => ({
            id: `id ${i}`,
            name: `name ${i}`,
            type: `type ${i}`,
            purpose: `purpose ${i}`,
            workStatus: `workStatus ${i}`,
            clusterGroupOwner: `clusterGroupOwner ${i}`,
            managementIP: `managementIP ${i}`,
            operationSystem: `operationSystem ${i}`,
            brand: `brand ${i}`,
            modelNumber: `modelNumber ${i}`,
            cpuCost: `cpuCost ${i}`,
            memoryCost: `memoryCost ${i}`,
            storageCost: `storageCost ${i}`,
            whoUse: `whoUse ${i}`,
            startTimeUse: `startTimeUse ${i}`,
            endTimeUse: `endTimeUse ${i}`,
            durationUse: `durationUse ${i}`,
            physicalLocation: `physicalLocation ${i}`
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
    endTimeUse: string
    durationUse: string
    brand: string
    modelNumber: string
    physicalLocation: string

    static generateFakeDataItems(count = 5): VirtualServerAccount[] {
        return Array.from({ length: count }, (_, i) => ({
            id: `id ${i}`,
            name: `name ${i}`,
            purpose: `purpose ${i}`,
            workStatus: `workStatus ${i}`,
            physicalHostOwner: `physicalHostOwner ${i}`,
            clusterGroupOwner: `clusterGroupOwner ${i}`,
            managementIP: `managementIP ${i}`,
            operationSystem: `operationSystem ${i}`,
            cpuCost: `cpuCost ${i}`,
            memoryCost: `memoryCost ${i}`,
            storageCost: `storageCost ${i}`,
            whoUse: `whoUse ${i}`,
            startTimeUse: `startTimeUse ${i}`,
            endTimeUse: `endTimeUse ${i}`,
            durationUse: `durationUse ${i}`,
            brand: `brand ${i}`,
            modelNumber: `modelNumber ${i}`,
            physicalLocation: `physicalLocation ${i}`
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
    endTimeUse: string
    durationUse: string

    static generateFakeDataItems(count = 5): ClusterServerAccount[] {
        return Array.from({ length: count }, (_, i) => ({
            id: `id ${i}`,
            name: `name ${i}`,
            purpose: `purpose ${i}`,
            workStatus: `workStatus ${i}`,
            memberServer: `memberServer ${i}`,
            managementIP: `managementIP ${i}`,
            whoUse: `whoUse ${i}`,
            startTimeUse: `startTimeUse ${i}`,
            endTimeUse: `endTimeUse ${i}`,
            durationUse: `durationUse ${i}`
        }))
    }
}
