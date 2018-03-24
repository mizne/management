import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { timer } from 'rxjs/observable/timer'
import { Store } from '@ngrx/store'
import { State, getRegisterLoading, getFetchCaptchaSuccess } from './reducers'
import { DestroyService } from '@core/services/destroy.service'
import {
    FetchCaptchaAction,
    UserRegisterAction
} from './actions/register.action'
import { skip, concatMap, startWith, take, map, concat } from 'rxjs/operators';

@Component({
    selector: 'passport-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less'],
    providers: [DestroyService]
})
export class UserRegisterComponent implements OnInit {
    form: FormGroup
    visible = false
    status = 'pool'
    progress = 0
    passwordProgressMap = {
        ok: 'success',
        pass: 'normal',
        pool: 'exception'
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private store: Store<State>,
        private destroyService: DestroyService
    ) { }

    static checkPassword(control: FormControl) {
        if (!control) return null
        const self: any = this
        self.visible = !!control.value
        if (control.value && control.value.length > 9) self.status = 'ok'
        else if (control.value && control.value.length > 5) self.status = 'pass'
        else self.status = 'pool'

        if (self.visible)
            self.progress =
                control.value.length * 10 > 100
                    ? 100
                    : control.value.length * 10
    }

    static passwordEquar(control: FormControl) {
        if (!control || !control.parent) return null
        if (control.value !== control.parent.get('password').value) {
            return { equar: true }
        }
        return null
    }

    // region: fields
    get mail() {
        return this.form.controls.mail
    }
    get password() {
        return this.form.controls.password
    }
    get confirm() {
        return this.form.controls.confirm
    }
    get mobile() {
        return this.form.controls.mobile
    }
    get captcha() {
        return this.form.controls.captcha
    }
    // endregion

    // region: get captcha
    loading$: Observable<boolean>
    captchaText$: Observable<string>
    disabledCaptcha$: Observable<boolean>

    ngOnInit() {
        this.buildForm()
        this.initDataSource()
    }

    getCaptcha() {
        if (this.mobile.invalid) {
            return this.msg.info('请检查手机号码是否正确！')
        }
        this.store.dispatch(new FetchCaptchaAction(this.mobile.value))
    }

    // endregion

    submit() {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty()
        }
        if (this.form.invalid) return

        this.store.dispatch(
            new UserRegisterAction({
                email: this.form.value.mail,
                password: this.form.value.password,
                phone: this.form.value.mobile
            })
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            mail: [null, [Validators.email]],
            password: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.checkPassword.bind(this)
                ]
            ],
            confirm: [
                null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    UserRegisterComponent.passwordEquar
                ]
            ],
            mobilePrefix: ['+86'],
            mobile: [
                null,
                [Validators.required, Validators.pattern(/^1\d{10}$/)]
            ],
            captcha: [null, [Validators.required]]
        })
    }

    private initDataSource() {
        const label = '获取验证码'
        const totalRestTime = 60
        this.loading$ = this.store.select(getRegisterLoading)
        this.captchaText$ = this.store
            .select(getFetchCaptchaSuccess)
            .pipe(
                skip(1),
                concatMap(isSuccess => {
                    return isSuccess
                        ? timer(0, 1e3)
                            .pipe(
                                take(totalRestTime),
                                map(e => `${totalRestTime - e} 秒`),
                                concat(of(label))
                            )
                        : of(label)
                }),
                startWith(label)
            )

        this.disabledCaptcha$ = this.captchaText$.pipe(map(e => e !== label))
    }
}
