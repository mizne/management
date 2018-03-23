export class ResourceInfo {
    id?: string
    resourceType: string

    assetsNumber: string
    assetsType: string

    softwareType: string
    softwareName: string
    softwareVersion: string

    entryCount: number
    countUnit: string
    entryTime: string
    entryLocation: string

    resourceUnitPrice: string
    operator: string
    remark: string

    static generateFakeDataItems({ pageIndex, pageSize }): ResourceInfo[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: `id ${i + (pageIndex - 1) * pageSize}`,
            resourceType: `resourceType ${i + (pageIndex - 1) * pageSize}`,
            assetsNumber: `assetsNumber ${i + (pageIndex - 1) * pageSize}`,
            assetsType: `assetsType ${i + (pageIndex - 1) * pageSize}`,
            softwareType: `softwareType ${i + (pageIndex - 1) * pageSize}`,
            softwareName: `softwareName ${i + (pageIndex - 1) * pageSize}`,
            softwareVersion: `softwareVersion ${i +
                (pageIndex - 1) * pageSize}`,
            entryCount: i + (pageIndex - 1) * pageSize,
            countUnit: `countUnit ${i + (pageIndex - 1) * pageSize}`,
            entryTime: `storageTime ${i + (pageIndex - 1) * pageSize}`,
            entryLocation: `storageLocation ${i + (pageIndex - 1) * pageSize}`,
            resourceUnitPrice: `resourceUnitPrice ${i +
                (pageIndex - 1) * pageSize}`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static generateFakeData(): ResourceInfo {
        return {
            id: `id ${Math.random()
                .toString()
                .slice(0, 5)}`,
            resourceType: `resourceType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            assetsNumber: `assetsNumber ${Math.random()
                .toString()
                .slice(0, 5)}`,
            assetsType: `assetsType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareType: `softwareType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareName: `softwareName ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareVersion: `softwareVersion ${Math.random()
                .toString()
                .slice(0, 5)}`,
            entryCount: 4,
            countUnit: `countUnit ${Math.random()
                .toString()
                .slice(0, 5)}`,
            entryTime: `storageTime ${Math.random()
                .toString()
                .slice(0, 5)}`,
            entryLocation: `storageLocation ${Math.random()
                .toString()
                .slice(0, 5)}`,
            resourceUnitPrice: `resourceUnitPrice ${Math.random()
                .toString()
                .slice(0, 5)}`,
            operator: `operator ${Math.random()
                .toString()
                .slice(0, 5)}`,
            remark: `remark ${Math.random()
                .toString()
                .slice(0, 5)}`
        }
    }
}

export interface FetchResourceInfoesCountParams {
    resourceType?: string
    softwareType?: string
    softwareName?: string
}

export class ResourceUseInfo {
    id?: string
    resource: ResourceInfo

    useState: string
    whoUse: string
    limitYearsUse: string

    useStartTime: string
    useCount: string
    countUnit: string
    operator: string

    static generateFakeDataItems({ pageIndex, pageSize }): ResourceUseInfo[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: `id ${i + (pageIndex - 1) * pageSize}`,
            resource: ResourceInfo.generateFakeData(),
            useState: `useState ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `whoUse ${i + (pageIndex - 1) * pageSize}`,
            limitYearsUse: `limitYearsUse ${i + (pageIndex - 1) * pageSize}`,
            useStartTime: `useStartTime ${i + (pageIndex - 1) * pageSize}`,
            useCount: `useCount ${i + (pageIndex - 1) * pageSize}`,
            countUnit: `countUnit ${i + (pageIndex - 1) * pageSize}`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}

export interface FetchResourceUseInfoesCountParams {
    resourceType?: string
    softwareType?: string
    softwareName?: string
}
