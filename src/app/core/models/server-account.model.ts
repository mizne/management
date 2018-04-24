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
    dataSource: string

    disabled: boolean
    checked: boolean

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): PhysicalServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `物理服务器 ${i + (pageIndex - 1) * pageSize + 1}`,
            type: `类型 ${i + (pageIndex - 1) * pageSize + 1}`,
            purpose: `用途 ${i + (pageIndex - 1) * pageSize + 1}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            clusterGroupOwner: `集群 ${i + (pageIndex - 1) * pageSize + 1}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            brand: `品牌 ${i + (pageIndex - 1) * pageSize + 1}`,
            modelNumber: `型号 ${i + (pageIndex - 1) * pageSize + 1}`,
            cpuCost: `cpuCost ${i + (pageIndex - 1) * pageSize}`,
            memoryCost: `memoryCost ${i + (pageIndex - 1) * pageSize}`,
            storageCost: `storageCost ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize}+1`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `物理位置 ${i +
                (pageIndex - 1) * pageSize + 1}`,
            dataSource: `dataSource ${i + (pageIndex - 1) * pageSize}`,
            checked: false,
            disabled: false
        }))
    }

    static convertFromResp(resp: PhysicalServerAccountResp): PhysicalServerAccount {
        return {
            id: resp.uniqueid,
            name: resp.name,
            type: resp.type,
            purpose: resp.purpose,
            workStatus: resp.state,
            clusterGroupOwner: resp.serverGroup,
            managementIP: resp.ip,
            operationSystem: resp.operatingSystem,
            brand: resp.serverModel,
            modelNumber: resp.modelNumber,
            cpuCost: resp.cpu,
            memoryCost: resp.memory,
            storageCost: resp.disk,
            whoUse: resp.person,
            startTimeUse: resp.startTime,
            durationUse: resp.duration,
            physicalLocation: resp.belongFrame,
            dataSource: resp.dataSource,
            checked: false,
            disabled: false
        }
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
            dataSource: 'dataSource',
            checked: false,
            disabled: false
        }
    }
}

export interface PhysicalServerAccountResp {
    name: string,
    belongFrame: string,
    ip: string,
    serverGroup: string,
    state: string,
    type: string,
    batch: string,
    purpose: string,
    uniqueid: string,
    modelNumber: string,
    serverModel: string,
    cpu: string,
    memory: string,
    disk: string,
    person: string,
    startTime: string,
    duration: string,
    operatingSystem: string,
    dataSource: string

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
    dataSource: string

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): VirtualServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `名称 ${i + (pageIndex - 1) * pageSize + 1}`,
            purpose: `用途 ${i + (pageIndex - 1) * pageSize + 1}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            physicalHostOwner: `所属主机 ${i + (pageIndex - 1) * pageSize + 1}`,
            clusterGroupOwner: `集群 ${i + (pageIndex - 1) * pageSize + 1}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            cpuCost: `cpuCost ${i + (pageIndex - 1) * pageSize}`,
            memoryCost: `memoryCost ${i + (pageIndex - 1) * pageSize}`,
            storageCost: `storageCost ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize + 1}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `durationUse ${i + (pageIndex - 1) * pageSize}`,
            dataSource: `dataSource ${i + (pageIndex - 1) * pageSize}`,
            physicalLocation: `物理位置 ${i +
                (pageIndex - 1) * pageSize + 1}`
        }))
    }

    static convertFromResp(resp: VirtualServerAccountResp): VirtualServerAccount {
        return {
            id: resp.vid,
            name: resp.name,
            purpose: resp.purpose,
            workStatus: resp.state,
            physicalHostOwner: resp.physicalHost,
            clusterGroupOwner: resp.serverGroup,
            managementIP: null,
            operationSystem: null,
            cpuCost: resp.cpu,
            memoryCost: resp.memory,
            storageCost: resp.disk,
            whoUse: resp.person,
            startTimeUse: resp.starTime,
            durationUse: null,
            physicalLocation: null,
            dataSource: resp.dataSource
        }
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
            physicalLocation: `physicalLocation`,
            dataSource: 'dataSource'
        }
    }
}

export interface VirtualServerAccountResp {
    id: number,
    name: string,
    host: string,
    virtualization: string,
    state: string,
    ip: string,
    serverGroup: string,
    purpose: string,
    vid: string,
    cpu: string,
    memory: string,
    disk: string,
    person: string,
    starTime: string,
    duration: string,
    physicalHost: string,
    dataSource: string
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
    dataSource: string

    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): ClusterServerAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `集群 ${i + (pageIndex - 1) * pageSize + 1}`,
            purpose: `用途 ${i + (pageIndex - 1) * pageSize + 1}`,
            workStatus: `状态 ${i + (pageIndex - 1) * pageSize + 1}`,
            memberServer: `memberServer ${i + (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize + 1}`,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            durationUse: `期限 ${i + (pageIndex - 1) * pageSize + 1}`,
            dataSource: `dataSource ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static convertFromResp(resp: ClusterServerAccountResp): ClusterServerAccount {
        return {
            id: null,
            name: resp.name,
            purpose: resp.purpose,
            workStatus: resp.state,
            memberServer: null,
            managementIP: resp.ip,
            whoUse: resp.person,
            startTimeUse: resp.starTime,
            durationUse: resp.duration,
            dataSource: resp.dataSource
        }
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
            durationUse: `durationUse ${Math.random()}`,
            dataSource: 'dataSource'
        }
    }
}

export interface ClusterServerAccountResp {
    id: number,
    name: string,
    host: string,
    virtualization: string,
    state: string,
    ip: string,
    serverGroup: string,
    purpose: string,
    vid: string,
    cpu: string,
    memory: string,
    disk: string,
    person: string,
    starTime: string,
    duration: string,
    physicalHost: string,
    dataSource: string
}

export enum ServerAccountType {
    PHYSICAL = 'PHYSICAL',
    VIRTUAL = 'VIRTUAL',
    CLUSTER = 'CLUSTER'
}
