import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

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
@Component({
    selector: 'app-to-edit-apply-resource',
    templateUrl: './to-edit-apply-resource.component.html',
    providers: [DestroyService]
})
export class ToEditApplyResourceComponent implements OnInit {
    form: FormGroup
    _resource: ApplyResource

    resourceTypes$: Observable<ResourceType[]>
    softwareTypes$: Observable<SoftwareType[]>
    softwareNames$: Observable<SoftwareName[]>
    softwareSpecs$: Observable<SoftwareSpec[]>
    useEnvironments$: Observable<UseEnvironment[]>
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService,
        private store: Store<State>
    ) {}

    @Input()
    set resource(v: ApplyResource) {
        this._resource = v
        if (this.form) {
            this.patchForm()
        }
    }
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
        this.initDataSource()
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                tempID: this._resource.tempID,
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
        if (this._resource) {
            this.patchForm()
        }
    }

    private patchForm() {
        this.form.patchValue(this._resource)
    }

    private initDataSource() {
        this.resourceTypes$ = this.store.select(getResourceTypes)
        this.softwareNames$ = this.store.select(getSoftwareNames)
        this.softwareTypes$ = this.store.select(getSoftwareTypes)
        this.softwareSpecs$ = this.store.select(getSoftwareSpecs)
        this.useEnvironments$ = this.store.select(getUseEnvironments)
    }
}
