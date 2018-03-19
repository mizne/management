import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

import * as fromRegister from '../actions/register.action'
import { RegisterService } from '../services/register.service'

@Injectable()
export class RegisterEffects {
    @Effect()
    register$ = this.actions$
        .ofType(fromRegister.USER_REGISTER)
        .map((action: fromRegister.UserRegisterAction) => action.params)
        .switchMap(params => {
            return this.registerService
                .register(params)
                .map(() => new fromRegister.UserRegisterSuccessAction())
                .catch(err =>
                    Observable.of(new fromRegister.UserRegisterFailureAction())
                )
        })

    @Effect({ dispatch: false })
    registerSuccess$ = this.actions$
        .ofType(fromRegister.USER_REGISTER_SUCCESS)
        .do(() => {
            this.messageService.success('恭喜您，注册成功！')
            this.router.navigate(['/passport/register-result'])
        })

    @Effect({ dispatch: false })
    registerFailure$ = this.actions$
        .ofType(fromRegister.USER_REGISTER_FAILURE)
        .do(() => {
            this.messageService.error('啊哦，注册失败！')
        })

    @Effect()
    fetchCaptcha$ = this.actions$
        .ofType(fromRegister.FETCH_CAPTCHA)
        .map((action: fromRegister.FetchCaptchaAction) => action.phone)
        .switchMap(phone => {
            return this.registerService
                .fetchCaptcha(phone)
                .map(() => new fromRegister.FetchCaptchaSuccssAction())
                .catch(err =>
                    Observable.of(new fromRegister.FetchCaptchaFailureAction())
                )
        })

    @Effect({ dispatch: false })
    fetchCaptchaSuccess$ = this.actions$
        .ofType(fromRegister.FETCH_CAPTCHA_SUCCESS)
        .do(() => {
            this.messageService.success('验证码已发送，请注意查收！')
        })

    @Effect({ dispatch: false })
    fetchCaptchaFailure$ = this.actions$
        .ofType(fromRegister.FETCH_CAPTCHA_FAILURE)
        .do(() => {
            this.messageService.error('验证码发送失败，请重试！')
        })

    constructor(
        private actions$: Actions,
        private registerService: RegisterService,
        private messageService: NzMessageService,
        private router: Router
    ) {}
}
