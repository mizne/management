import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Exhibitor } from '@core/models/exhibitor.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-create-middleware-software-account',
    templateUrl: './to-create-middleware-software-account.component.html',
    providers: [DestroyService]
})
export class ToCreateMiddlewareSoftwareAccountComponent implements OnInit {
    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

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
    }
}
