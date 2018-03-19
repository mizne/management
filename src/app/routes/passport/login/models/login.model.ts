import { Exhibition } from '@core/models/exhibition.model'

export class LoginParams {
    name: string
    password: string
}

export class LoginResult {
    tenantId: string
    userId: string
    userName: string
    tenantName: string
    token: string
    organizationId: string
    exhibitionId?: string

    static convertFromResp(resp: LoginResp): LoginResult {
        return {
            tenantId: resp.TenantId,
            userId: resp.UserId,
            userName: resp.UserName,
            tenantName: resp.OrganizationName,
            token: 'test Token',
            organizationId: resp.OrganizationRecordId
        }
    }
}

export interface LoginResp {
    TenantId: string
    UserId: string
    OrganizationName: string
    UserName: string
    OrganizationRecordId: string
}

export interface TenantInfo {
    login: LoginResult
    exhibition: Exhibition
}
