import { Injectable } from '@angular/core'
import { LocalStorageService } from 'angular-web-store'
import {
    LoginResult,
    TenantInfo
} from '../../routes/passport/login/models/login.model'
import { Router } from '@angular/router'

@Injectable()
export class TenantService {
    private static TOKEN = 'Token'
    private static LOGIN_RESULT = 'LoginResult'
    private static EXHIBITION = 'Exhibition'
    private static REDIRECT_URL = 'RedirectUrl'
    private static DEFAULT_EXPIRED = '12h'

    constructor(private local: LocalStorageService, private router: Router) {}

    toLogin(redirectUrl = '/'): void {
        this.setRedirectUrl(redirectUrl)
        this.router.navigate(['/passport/login'])
    }

    loginSuccess(tenantInfo: TenantInfo) {
        this.local.set(
            TenantService.TOKEN,
            tenantInfo.login.token,
            TenantService.DEFAULT_EXPIRED
        )
        this.local.set(TenantService.LOGIN_RESULT, {
            tenantId: tenantInfo.login.tenantId,
            userId: tenantInfo.login.userId,
            tenantName: tenantInfo.login.tenantName,
            userName: tenantInfo.login.userName,
            organizationId: tenantInfo.login.organizationId
        })
        this.local.set(TenantService.EXHIBITION, tenantInfo.exhibition)
        const redirectUrl = this.getRedirectUrl()
        if (redirectUrl) {
            this.router.navigate([redirectUrl])
            this.removeRedirectUrl()
        } else {
            this.router.navigate(['/'])
        }
    }

    logout(): void {
        this.router.navigate(['/passport/login'])
        this.clear()
    }

    getAvatarUrl(): string {
        return 'https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png'
    }

    setRedirectUrl(url: string): void {
        this.local.set(TenantService.REDIRECT_URL, url)
    }

    getRedirectUrl(): string {
        return this.local.get(TenantService.REDIRECT_URL)
    }

    removeRedirectUrl(): void {
        this.local.remove(TenantService.REDIRECT_URL)
    }

    getUserName(): string {
        const loginResult = this.getLoginResult()
        return loginResult ? loginResult.userName : ''
    }

    getTenantName(): string {
        const loginResult = this.getLoginResult()
        return loginResult ? loginResult.tenantName : ''
    }

    getToken(): string {
        return this.local.get(TenantService.TOKEN)
    }

    getTenantID(): string {
        const loginResult = this.getLoginResult()
        return loginResult ? loginResult.tenantId : ''
    }

    getUserID(): string {
        const loginResult = this.getLoginResult()
        return loginResult ? loginResult.userId : ''
    }

    getOrganizationID(): string {
        const loginResult = this.getLoginResult()
        return loginResult ? loginResult.organizationId : ''
    }

    getExhibitionID(): string {
        const exhibition = this.getExhibition()
        return exhibition ? exhibition.id : ''
    }

    getExhibitionStartDate(): string {
        const exhibition = this.getExhibition()
        return exhibition ? exhibition.startDate : ''
    }

    getExhibitionEndDate(): string {
        const exhibition = this.getExhibition()
        return exhibition ? exhibition.endDate : ''
    }

    private getLoginResult(): LoginResult | null {
        return this.local.get(TenantService.LOGIN_RESULT)
    }

    private getExhibition() {
        return this.local.get(TenantService.EXHIBITION)
    }

    clear() {
        this.local.clear()
    }
}
