import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import * as uuid from 'uuid'

import { DestroyService } from '@core/services/destroy.service'
import { ApplyResource } from '@core/models/resource-apply.model'

@Component({
    selector: 'app-to-create-apply-resource',
    templateUrl: './to-create-apply-resource.component.html',
    providers: [DestroyService]
})
export class ToCreateApplyResourceComponent implements OnInit {
    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService
    ) {}

    get type() {
        return this.form.controls.type
    }
    get softwareType() {
        return this.form.controls.softwareType
    }
    get softwareName() {
        return this.form.controls.softwareName
    }
    get version() {
        return this.form.controls.version
    }

    get environment() {
        return this.form.controls.environment
    }
    get applyCount() {
        return this.form.controls.applyCount
    }
    get applyTime() {
        return this.form.controls.applyTime
    }
    get endTime() {
        return this.form.controls.endTime
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
                tempID: uuid.v4(),
                type: this.type.value,
                softwareType: this.softwareType.value,
                softwareName: this.softwareName.value,
                version: this.version.value,
                environment: this.environment.value,
                applyCount: this.applyCount.value,
                applyTime: this.applyTime.value,
                endTime: this.endTime.value,
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
            type: [null, Validators.required],
            softwareType: [null, Validators.required],
            softwareName: [null],
            version: [null],
            environment: [null],
            applyCount: [null],
            applyTime: [null],
            endTime: [null],
            remark: [null]
        })

        this.form.patchValue(ApplyResource.generateTempData())
    }
}
