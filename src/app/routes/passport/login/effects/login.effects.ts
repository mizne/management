import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

import * as fromLogin from '../actions/login.action'
import { LoginService } from '../services/login.service'
import { TenantService } from '@core/services/tenant.service'

@Injectable()
export class LoginEffects {
    @Effect()
    login = this.actions$
        .ofType(fromLogin.USER_LOGIN)
        .map((action: fromLogin.UserLoginAction) => action.params)
        .switchMap(params => {
            return this.loginService
                .login(params)
                .map(result => new fromLogin.UserLoginSuccessAction(result))
                .catch(err =>
                    Observable.of(new fromLogin.UserLoginFailureAction())
                )
        })

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(fromLogin.USER_LOGIN_SUCCESS)
        .map((action: fromLogin.UserLoginSuccessAction) => action.info)
        .do(({ login, exhibition }) => {
            this.messageService.success(`${login.userName}， 会展人欢迎您！`)
            // 保存登录信息
            this.tenantService.loginSuccess({ login, exhibition })
        })

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$
        .ofType(fromLogin.USER_LOGIN_FAILURE)
        .do(() => {
            this.messageService.error('请检查用户名、密码是否匹配！')
        })

    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private messageService: NzMessageService,
        private router: Router,
        private tenantService: TenantService
    ) {}
}
