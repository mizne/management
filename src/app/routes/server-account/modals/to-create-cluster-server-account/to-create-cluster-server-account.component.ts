import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-create-cluster-server-account',
    templateUrl: './to-create-cluster-server-account.component.html',
    providers: [DestroyService]
})
export class ToCreateClusterServerAccountComponent implements OnInit {
    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    get name() {
        return this.form.controls.name
    }
    get purpose() {
        return this.form.controls.purpose
    }
    get workStatus() {
        return this.form.controls.workStatus
    }
    get memberServer() {
        return this.form.controls.memberServer
    }
    get managementIP() {
        return this.form.controls.managementIP
    }
    get whoUse() {
        return this.form.controls.whoUse
    }
    get startTimeUse() {
        return this.form.controls.startTimeUse
    }
    get durationUse() {
        return this.form.controls.durationUse
    }

    ngOnInit() {
        this.buildForm()
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                name: this.name.value,
                purpose: this.purpose.value,
                workStatus: this.workStatus.value,
                memberServer: this.memberServer.value,
                managementIP: this.managementIP.value,
                whoUse: this.whoUse.value,
                startTimeUse: this.startTimeUse.value,
                durationUse: this.durationUse.value
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
            purpose: [null],
            workStatus: [null],
            memberServer: [null],
            managementIP: [null],
            whoUse: [null],
            startTimeUse: [null],
            durationUse: [null]
        })
    }
}
