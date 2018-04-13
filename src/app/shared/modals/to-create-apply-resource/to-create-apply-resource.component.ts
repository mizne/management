import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import * as uuid from 'uuid'

import { DestroyService } from '@core/services/destroy.service'
import { ApplyResource } from '@core/models/resource-apply.model'

import {
    ResourceType,
    SoftwareName,
    SoftwareSpec,
    SoftwareType,
    UseEnvironment
} from '@core/models/resource-info.model'
import { Store } from '@ngrx/store'
import {
    State,
    getResourceTypes,
    getSoftwareNames,
    getSoftwareSpecs,
    getSoftwareTypes,
    getUseEnvironments
} from '@app/reducers'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { takeUntil } from 'rxjs/operators'

@Component({
    selector: 'app-to-create-apply-resource',
    templateUrl: './to-create-apply-resource.component.html',
    providers: [DestroyService]
})
export class ToCreateApplyResourceComponent implements OnInit {
    form: FormGroup

    @Input()
    set applyResourceForSelect(v: any) {
        this.resourceTypes = v.resourceTypes
        this.softwareTypes = v.softwareTypes
        this.softwareNames = v.softwareNames
        this.softwareSpecs = v.softwareSpecs
        this.useEnvironments = v.useEnvironments

        if (this.form) {
            this.patchForm()
        }
    }

    resourceTypes: ResourceType[]
    softwareTypes: SoftwareType[]
    softwareNames: SoftwareName[]
    softwareSpecs: SoftwareSpec[]
    useEnvironments: UseEnvironment[]
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService,
        private store: Store<State>
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
            applyCount: [1],
            applyTime: [new Date()],
            endTime: [new Date()],
            remark: [null]
        })

        if (this.resourceTypes) {
            this.patchForm()
        }
    }

    private patchForm(): void {
        this.form.patchValue({
            type: this.getLabel(this.resourceTypes),
            softwareType: this.getLabel(this.softwareTypes),
            softwareName: this.getLabel(this.softwareNames),
            version: this.getLabel(this.softwareSpecs),
            environment: this.getLabel(this.useEnvironments)
        })
    }

    private getLabel(arr: any[]): string | null {
        if (arr.length > 0) {
            return arr[0].label
        }
        return null
    }
}
