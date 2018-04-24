import * as uuid from 'uuid'

import { PaginationParams, defaultPaginationParams } from './pagination.model'

export class SoftwareAccount {
    id: string
    name: string
    type: string
    version: string
    whoUse: string
    yearsUse: string
    startTimeUse: string
    license: string
    remark: string

    disabled?: boolean
    checked?: boolean
}

export class ApplicationSoftwareAccount extends SoftwareAccount {
    static generateFakeDataItems({ pageIndex, pageSize }): ApplicationSoftwareAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `软件 ${i + (pageIndex - 1) * pageSize + 1}`,
            type: `软件类型 ${i + (pageIndex - 1) * pageSize + 1}`,
            version: `软件版本 ${i + (pageIndex - 1) * pageSize + 1}`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize + 1}`,
            yearsUse: String(i + (pageIndex - 1) * pageSize),
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            license: `license ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static convertFromResp(resp: ApplicationSoftwareAccountResp): ApplicationSoftwareAccount {
        return {
            id: resp.uniqueid,
            name: resp.softwareName,
            type: resp.softwareType,
            version: resp.softwareVersion,
            whoUse: resp.use,
            yearsUse: resp.usetime,
            startTimeUse: resp.startTimeUse,
            license: resp.license,
            remark: resp.remarks
        }
    }
}

export interface ApplicationSoftwareAccountResp {
    uniqueid: string,
    softwareName: string,
    softwareType: string,
    softwareVersion: string,
    use: string,
    usetime: string,
    startTimeUse: string,
    license: string,
    remarks: string
}

export class SystemSoftwareAccount extends SoftwareAccount {
    static generateFakeDataItems({
        pageIndex,
        pageSize
    }): SystemSoftwareAccount[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            name: `软件 ${i + (pageIndex - 1) * pageSize + 1}`,
            type: `软件类型 ${i + (pageIndex - 1) * pageSize + 1}`,
            version: `软件版本 ${i + (pageIndex - 1) * pageSize + 1}`,
            whoUse: `员工 ${i + (pageIndex - 1) * pageSize + 1}`,
            yearsUse: String(i + (pageIndex - 1) * pageSize),
            startTimeUse: `startTimeUse ${i + (pageIndex - 1) * pageSize}`,
            license: `license ${i + (pageIndex - 1) * pageSize}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }

    static convertFromResp(resp: SystemSoftwareAccountResp): SystemSoftwareAccount {
        return {
            id: resp.uniqueid,
            name: resp.name,
            type: resp.type,
            version: resp.version,
            whoUse: resp.use,
            yearsUse: resp.usetime,
            startTimeUse: resp.startTimeUse,
            license: resp.license,
            remark: resp.remarks
        }
    }
}

export interface SystemSoftwareAccountResp {
    uniqueid: string,
    name: string,
    type: string,
    version: string,
    use: string,
    usetime: string,
    startTimeUse: string,
    license: string,
    remarks: string
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
            name: `软件 ${i + (pageIndex - 1) * pageSize + 1}`,
            version: `中间件版本 ${i + (pageIndex - 1) * pageSize + 1}`,
            alias: `alias ${i + (pageIndex - 1) * pageSize + 1}`,
            operationSystem: `操作系统 ${i +
                (pageIndex - 1) * pageSize + 1}`,
            middlewareVersion: `中间件版本 ${i +
                (pageIndex - 1) * pageSize + 1}`,
            remark: `remark ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}

export enum SoftwareAccountType {
    APPLICATION = 'APPLICATION',
    SYSTEM = 'SYSTEM',
    MIDDLEWARE = 'MIDDLEWARE'
}
