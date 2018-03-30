import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { VirtualServerAccount } from '@core/models/server-account.model'

@Component({
    selector: 'app-to-edit-virtual-server-account',
    templateUrl: './to-edit-virtual-server-account.component.html',
    providers: [DestroyService]
})
export class ToEditVirtualServerAccountComponent implements OnInit {
    form: FormGroup
    _account: VirtualServerAccount
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    @Input()
    set data(v: VirtualServerAccount) {
        this._account = v
        if (this.form) {
            this.patchForm()
        }
    }
    get name() {
        return this.form.controls.name
    }
    get purpose() {
        return this.form.controls.purpose
    }
    get workStatus() {
        return this.form.controls.workStatus
    }
    get physicalHostOwner() {
        return this.form.controls.physicalHostOwner
    }
    get clusterGroupOwner() {
        return this.form.controls.clusterGroupOwner
    }
    get managementIP() {
        return this.form.controls.managementIP
    }
    get operationSystem() {
        return this.form.controls.operationSystem
    }
    get cpuCost() {
        return this.form.controls.cpuCost
    }
    get memoryCost() {
        return this.form.controls.memoryCost
    }
    get storageCost() {
        return this.form.controls.storageCost
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
                physicalHostOwner: this.physicalHostOwner.value,
                clusterGroupOwner: this.clusterGroupOwner.value,
                managementIP: this.managementIP.value,
                operationSystem: this.operationSystem.value,
                cpuCost: this.cpuCost.value,
                memoryCost: this.memoryCost.value,
                storageCost: this.storageCost.value,
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
            physicalHostOwner: [null],
            clusterGroupOwner: [null],
            managementIP: [null],
            operationSystem: [null],
            cpuCost: [null],
            memoryCost: [null],
            storageCost: [null],
            whoUse: [null],
            startTimeUse: [null],
            durationUse: [null]
        })
        if (this._account) {
            this.patchForm()
        }
    }

    private patchForm() {
        this.form.patchValue(this._account)
    }
}
