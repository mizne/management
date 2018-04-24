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
            resourceType: `编程类`,
            computeResourceType: `物理机`,

            resourceName: `名称 ${i + (pageIndex - 1) * pageSize + 1}`,
            version: `1.7.0_17-b0${i + (pageIndex - 1) * pageSize + 1}`,
            modelNumber: `modelNumber ${i + (pageIndex - 1) * pageSize}`,
            count: ` ${i + (pageIndex - 1) * pageSize + 1}`,

            useEnvironment: `Windows`,
            useState: `空闲`,
            whoUse: `使用对象 ${i + (pageIndex - 1) * pageSize + 1}`,

            serverName: `服务器 ${i + (pageIndex - 1) * pageSize}`,
            serverPurpose: `开发`,
            workStatus: `空闲`,
            managementIP: `127.0.0.1`,
            operationSystem: `Windows`,
            cpuCoreCount: `SPEC200${i + (pageIndex - 1) * pageSize}`,
            memorySize: `memorySize ${i + (pageIndex - 1) * pageSize}`,
            storageSize: `1TB`,
            useStartTime: `2018-4-18 14:20:52`,
            useDuration: `三个月`,
            remark: `可回收详情`
        }))
    }

    static generateFakeData(): AssetsRecovery {
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
    resourceType?: string
    computeResourceType?: string
}
