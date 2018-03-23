import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-create-resource-info',
    templateUrl: './to-create-resource-info.component.html',
    providers: [DestroyService]
})
export class ToCreateResourceInfoComponent implements OnInit {
    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    get resourceType() {
        return this.form.controls.resourceType
    }
    get assetsNumber() {
        return this.form.controls.assetsNumber
    }
    get assetsType() {
        return this.form.controls.assetsType
    }
    get softwareType() {
        return this.form.controls.softwareType
    }
    get softwareName() {
        return this.form.controls.softwareName
    }
    get softwareVersion() {
        return this.form.controls.softwareVersion
    }
    get entryCount() {
        return this.form.controls.entryCount
    }
    get countUnit() {
        return this.form.controls.countUnit
    }
    get entryTime() {
        return this.form.controls.entryTime
    }

    get entryLocation() {
        return this.form.controls.entryLocation
    }
    get resourceUnitPrice() {
        return this.form.controls.resourceUnitPrice
    }
    get operator() {
        return this.form.controls.operator
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
                resourceType: this.resourceType.value,
                assetsNumber: this.assetsNumber.value,
                assetsType: this.assetsType.value,
                softwareType: this.softwareType.value,
                softwareName: this.softwareName.value,
                softwareVersion: this.softwareVersion.value,
                entryCount: this.entryCount.value,
                countUnit: this.countUnit.value,
                entryTime: this.entryTime.value,
                entryLocation: this.entryLocation.value,
                resourceUnitPrice: this.resourceUnitPrice.value,
                operator: this.operator.value,
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
            resourceType: [null, Validators.required],
            assetsNumber: [null],
            assetsType: [null],
            softwareType: [null],
            softwareName: [null],
            softwareVersion: [null],
            entryCount: [null],
            countUnit: [null],
            entryTime: [null],
            entryLocation: [null],
            resourceUnitPrice: [null],
            operator: [null],
            remark: [null]
        })
    }
}
