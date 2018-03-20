import { Injectable } from '@angular/core'
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router'

import { TenantService } from 'app/core/services/tenant.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tenantService: TenantService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.tenantService.getToken()) {
        //     return true
        // }

        // console.warn('no token store in client!')
        // this.tenantService.toLogin(state.url)
        // return false
        return true
    }
}
