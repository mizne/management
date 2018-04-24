import * as uuid from 'uuid'
import * as moment from 'moment'

export class ResourceInfo {
    id: string
    resourceType: string

    assetsNumber: string
    assetsType: string

    softwareType: string
    softwareName: string
    softwareVersion: string

    entryCount: number
    countUnit: string
    entryTime: Date
    entryLocation: string

    resourceUnitPrice: string
    operator: string
    remark: string

    static generateFakeDataItems({ pageIndex, pageSize }): ResourceInfo[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            resourceType: `编程类`,
            assetsNumber: `123654${i + (pageIndex - 1) * pageSize + 1}`,
            assetsType: `研发类`,
            softwareType: `开发类`,
            softwareName: `名称 ${i + (pageIndex - 1) * pageSize + 1}`,
            softwareVersion: `1.7.6.4`,
            entryCount: i + (pageIndex - 1) * pageSize,
            countUnit: `套`,
            entryTime: moment()
                .add(i + (pageIndex - 1) * pageSize, 'd')
                .toDate(),
            entryLocation: `100`,
            resourceUnitPrice: `150`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`,
            remark: `转为开发准备`
        }))
    }

    static generateFakeData(): ResourceInfo {
        return {
            id: uuid.v4(),
            resourceType: `resourceType ${Math.random()
                .toString()
                .slice(0, 5)}`,
            assetsNumber: `56945${Math.random()
                .toString()
                .slice(0, 5)}`,
            assetsType: `类型 ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareType: `类型 ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareName: `名称 ${Math.random()
                .toString()
                .slice(0, 5)}`,
            softwareVersion: `1.7.3.63${Math.random()
                .toString()
                .slice(0, 5)}`,
            entryCount: 4,
            countUnit: `countUnit ${Math.random()
                .toString()
                .slice(0, 5)}`,
            entryTime: new Date(),
            entryLocation: `storageLocation ${Math.random()
                .toString()
                .slice(0, 5)}`,
            resourceUnitPrice: `150`,
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
    resourceType: string
    softwareType: string
    softwareName: string
}

export class ResourceUseInfo {
    id: string
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
            id: uuid.v4(),
            resource: ResourceInfo.generateFakeData(),
            useState: `空闲`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize + 1}`,
            limitYearsUse: `一年 `,
            useStartTime: `useStartTime ${i + (pageIndex - 1) * pageSize}`,
            useCount: `1`,
            countUnit: `套`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}

export interface FetchResourceUseInfoesCountParams {
    resourceType: string
    softwareType: string
    softwareName: string
}
