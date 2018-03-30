import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { SystemSoftwareAccount } from '@core/models/software-account.model'

@Component({
    selector: 'app-to-edit-system-software-account',
    templateUrl: './to-edit-system-software-account.component.html',
    providers: [DestroyService]
})
export class ToEditSystemSoftwareAccountComponent implements OnInit {
    form: FormGroup
    _account: SystemSoftwareAccount
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input()
    set data(v: SystemSoftwareAccount) {
        this._account = v
        if (this.form) {
            this.patchForm()
        }
    }
    get name() {
        return this.form.controls.name
    }
    get type() {
        return this.form.controls.type
    }
    get version() {
        return this.form.controls.version
    }
    get whoUse() {
        return this.form.controls.whoUse
    }
    get startTimeUse() {
        return this.form.controls.startTimeUse
    }
    get yearsUse() {
        return this.form.controls.yearsUse
    }
    get license() {
        return this.form.controls.license
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
                type: this.type.value,
                version: this.version.value,
                whoUse: this.whoUse.value,
                startTimeUse: this.startTimeUse.value,
                yearsUse: this.yearsUse.value,
                license: this.license.value,
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
            type: [null, Validators.required],
            version: [null],
            whoUse: [null],
            startTimeUse: [null],
            yearsUse: [null],
            license: [null],
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
