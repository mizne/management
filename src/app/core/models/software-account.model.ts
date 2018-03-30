import * as uuid from 'uuid'

import { PaginationParams, defaultPaginationParams } from './pagination.model'

export class SoftwareAccount {
    id: string
    name: string
    type: string
    version: string
    whoUse: string
    yearsUse: number
    startTimeUse: string
    license: string
    remark: string

    disabled?: boolean
    checked?: boolean
}

export class SystemLogger extends SoftwareAccount {
    static generateFakeDataItems({ pageIndex, pageSize }): SystemLogger[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `app softwareName ${i + (pageIndex - 1) * pageSize}`,
            type: `app softwareType ${i + (pageIndex - 1) * pageSize}`,
            version: `app softwareVersion ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `who use ${i + (pageIndex - 1) * pageSize}`,
            yearsUse: i + (pageIndex - 1) * pageSize,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            license: `license ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}

export class SystemSoftwareAccount extends SoftwareAccount {
    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): SystemSoftwareAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `system softwareName ${i + (pageIndex - 1) * pageSize}`,
            type: `system softwareType ${i + (pageIndex - 1) * pageSize}`,
            version: `system softwareVersion ${i + (pageIndex - 1) * pageSize}`,
            whoUse: `who use ${i + (pageIndex - 1) * pageSize}`,
            yearsUse: i + (pageIndex - 1) * pageSize,
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            license: `license ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}

export class MiddlewareSoftwareAccount {
    id: string
    name: string
    version: string
    alias: string
    operationSystem: string
    middlewareVersion: string
    remark: string
    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): MiddlewareSoftwareAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `middleware softwareName ${i + (pageIndex - 1) * pageSize}`,
            version: `middleware softwareVersion ${i +
                (pageIndex - 1) * pageSize}`,
            alias: `alias ${i + (pageIndex - 1) * pageSize}`,
            operationSystem: `operationSystem ${i +
                (pageIndex - 1) * pageSize}`,
            middlewareVersion: `middlewareVersion ${i +
                (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}
