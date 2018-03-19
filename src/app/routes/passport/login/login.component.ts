import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd'
import { Observable } from 'rxjs/Observable'

import { Store } from '@ngrx/store'
import { State, getLoading } from './reducers'
import { UserLoginAction } from './actions/login.action'

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class UserLoginComponent implements OnInit {
    form: FormGroup
    loading$: Observable<boolean>
    constructor(
        fb: FormBuilder,
        private router: Router,
        public msg: NzMessageService,
        private store: Store<State>
    ) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(5)]],
            password: [null, Validators.required],
            remember: [true]
        })
    }

    // region: fields
    get userName() {
        return this.form.controls.userName
    }
    get password() {
        return this.form.controls.password
    }
    get mobile() {
        return this.form.controls.mobile
    }
    get captcha() {
        return this.form.controls.captcha
    }

    ngOnInit() {
        this.initDataSource()
    }

    submit() {
        this.userName.markAsDirty()
        this.password.markAsDirty()
        if (this.userName.invalid || this.password.invalid) return

        this.store.dispatch(
            new UserLoginAction({
                name: this.userName.value,
                password: this.password.value
            })
        )
    }

    private initDataSource() {
        this.loading$ = this.store.select(getLoading)
    }
}
