import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-create-physical-server-account',
    templateUrl: './to-create-physical-server-account.component.html',
    providers: [DestroyService]
})
export class ToCreatePhysicalServerAccountComponent implements OnInit {
    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    get name() {
        return this.form.controls.name
    }
    get type() {
        return this.form.controls.type
    }
    get purpose() {
        return this.form.controls.purpose
    }
    get workStatus() {
        return this.form.controls.workStatus
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
    get brand() {
        return this.form.controls.brand
    }
    get modelNumber() {
        return this.form.controls.modelNumber
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
    get physicalLocation() {
        return this.form.controls.physicalLocation
    }

    ngOnInit() {
        this.buildForm()
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                name: this.name.value,
                type: this.type.value,
                purpose: this.purpose.value,
                workStatus: this.workStatus.value,
                clusterGroupOwner: this.clusterGroupOwner.value,
                managementIP: this.managementIP.value,
                operationSystem: this.operationSystem.value,
                brand: this.brand.value,
                modelNumber: this.modelNumber.value,
                cpuCost: this.cpuCost.value,
                memoryCost: this.memoryCost.value,
                storageCost: this.storageCost.value,
                whoUse: this.whoUse.value,
                startTimeUse: this.startTimeUse.value,
                durationUse: this.durationUse.value,
                physicalLocation: this.physicalLocation.value
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
            purpose: [null],
            workStatus: [null],
            clusterGroupOwner: [null],
            managementIP: [null],
            operationSystem: [null],
            brand: [null],
            modelNumber: [null],
            cpuCost: [null],
            memoryCost: [null],
            storageCost: [null],
            whoUse: [null],
            startTimeUse: [null],
            durationUse: [null],
            physicalLocation: [null]
        })
    }
}
