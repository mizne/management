import * as uuid from 'uuid'

export class AssetsRecovery {
    id: string
    resourceType: string
    computeResourceType: string

    resourceName: string
    version: string
    modelNumber: string
    count: string

    useEnvironment: string
    useState: string
    whoUse: string

    serverName: string
    serverPurpose: string
    workStatus: string
    managementIP: string
    operationSystem: string
    cpuCoreCount: string
    memorySize: string
    storageSize: string
    useStartTime: string
    useDuration: string
    remark: string

    static generateFakeDataItems({ pageIndex, pageSize }): AssetsRecovery[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            resourceType: `resourceType ${i + (pageIndex - 1) * pageSize}`,
            computeResourceType: `computeType ${i +
                (pageIndex - 1) * pageSize}`,
            resourceName: `resourceName ${i + (pageIndex - 1) * pageSize}`,
            version: `version ${i + (pageIndex - 1) * pageSize}`,
            modelNumber: `modelNumber ${i + (pageIndex - 1) * pageSize}`,
            count: `count ${i + (pageIndex - 1) * pageSize}`,
            useEnvironment: `useEnvironment ${i + (pageIndex - 1) * pageSize}`,
            useState: `useState ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            serverName: `serverName ${i + (pageIndex - 1) * pageSize}`,
            serverPurpose: `serverPurpose ${i + (pageIndex - 1) * pageSize}`,
            workStatus: `workStatus ${i + (pageIndex - 1) * pageSize}`,
            managementIP: `managementIP ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            cpuCoreCount: `cpuCoreCount ${i + (pageIndex - 1) * pageSize}`,
            memorySize: `memorySize ${i + (pageIndex - 1) * pageSize}`,
            storageSize: `storageSize ${i + (pageIndex - 1) * pageSize}`,
            useStartTime: `useStartTime ${i + (pageIndex - 1) * pageSize}`,
            useDuration: `useDuration ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static generateFakeData(): Partial<AssetsRecovery> {
        return {
            id: uuid.v4(),
            resourceType: `resourceType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            computeResourceType: `computeResourceType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            resourceName: `resourceName ${Math.random()
                .toString()
                .slice(0, 5)}`,

            version: `version ${Math.random()
                .toString()
                .slice(0, 5)}`,
            modelNumber: `modelNumber ${Math.random()
                .toString()
                .slice(0, 5)}`,
            count: `count ${Math.random()
                .toString()
                .slice(0, 5)}`,
            useEnvironment: `useEnvironment ${Math.random()
                .toString()
                .slice(0, 5)}`,
            useState: `useState ${Math.random()
                .toString()
                .slice(0, 5)}`,
            whoUse: `whoUse ${Math.random()
                .toString()
                .slice(0, 5)}`,
            serverName: `serverName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            serverPurpose: `serverPurpose ${Math.random()
                .toString()
                .slice(0, 5)}`,
            workStatus: `workStatus ${Math.random()
                .toString()
                .slice(0, 5)}`,
            managementIP: `managementIP ${Math.random()
                .toString()
                .slice(0, 5)}`,
            operationSystem: `operationSystem ${Math.random()
                .toString()
                .slice(0, 5)}`,
            cpuCoreCount: `cpuCoreCount ${Math.random()
                .toString()
                .slice(0, 5)}`,
            memorySize: `memorySize ${Math.random()
                .toString()
                .slice(0, 5)}`,
            storageSize: `storageSize ${Math.random()
                .toString()
                .slice(0, 5)}`,
            useStartTime: `useStartTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            useDuration: `useDuration ${Math.random()
                .toString()
                .slice(0, 5)}`,
            remark: `remark ${Math.random()
                .toString()
                .slice(0, 5)}`
        }
    }
}

export interface FetchAssetsRecoveriesCountParams {
    resourceType: string
    computeResourceType: string
}
