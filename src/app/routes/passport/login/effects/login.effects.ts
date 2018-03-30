import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

import * as fromLogin from '../actions/login.action'
import { LoginService } from '../services/login.service'
import { TenantService } from '@core/services/tenant.service'
import { map, switchMap, catchError, tap } from 'rxjs/operators'

@Injectable()
export class LoginEffects {
    @Effect()
    login = this.actions$
        .ofType(fromLogin.USER_LOGIN)
        .pipe(
            map((action: fromLogin.UserLoginAction) => action.params),
            switchMap(params => this.loginService.login(params)),
            map(result => new fromLogin.UserLoginSuccessAction(result)),
            catchError(err => of(new fromLogin.UserLoginFailureAction()))
        )

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.ofType(fromLogin.USER_LOGIN_SUCCESS).pipe(
        map((action: fromLogin.UserLoginSuccessAction) => action.info),
        tap(({ login, exhibition }) => {
            this.messageService.success(`${login.userName}， 欢迎您！`)
            // 保存登录信息
            this.tenantService.loginSuccess({ login, exhibition })
        })
    )

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$.ofType(fromLogin.USER_LOGIN_FAILURE).pipe(
        tap(() => {
            this.messageService.error('请检查用户名、密码是否匹配！')
        })
    )

    constructor(
        private actions$: Actions,
        private loginService: LoginService,
        private messageService: NzMessageService,
        private router: Router,
        private tenantService: TenantService
    ) {}
}
