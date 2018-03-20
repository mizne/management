import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { MiddlewareSoftwareAccount } from '@core/models/software-account.model'

@Component({
    selector: 'app-to-edit-middleware-software-account',
    templateUrl: './to-edit-middleware-software-account.component.html',
    providers: [DestroyService]
})
export class ToEditMiddlewareSoftwareAccountComponent implements OnInit {
    form: FormGroup
    _account: MiddlewareSoftwareAccount
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input()
    set account(v: MiddlewareSoftwareAccount) {
        this._account = v
        if (this.form) {
            this.patchForm()
        }
    }
    get name() {
        return this.form.controls.name
    }
    get version() {
        return this.form.controls.version
    }
    get alias() {
        return this.form.controls.alias
    }
    get operationSystem() {
        return this.form.controls.operationSystem
    }
    get middlewareVersion() {
        return this.form.controls.middlewareVersion
    }
    get remark() {
        return this.form.controls.remark
    }

    ngOnInit() {
        this.buildForm()
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                name: this.name.value,
                version: this.version.value,
                alias: this.alias.value,
                operationSystem: this.operationSystem.value,
                middlewareVersion: this.middlewareVersion.value,
                remark: this.remark.value
            })
            this.subject.destroy('onOk')
        }
    }

    toCancel() {
        this.subject.destroy('onCancel')
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            version: [null],
            alias: [null],
            operationSystem: [null],
            middlewareVersion: [null],
            remark: [null]
        })
        if (this._account) {
            this.patchForm()
        }
    }

    private patchForm() {
        this.form.patchValue(this._account)
    }
}
