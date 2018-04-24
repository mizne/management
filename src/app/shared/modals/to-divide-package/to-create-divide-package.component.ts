import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { DestroyService } from '@core/services/destroy.service'
import { DividePackageInfo } from '@core/models/dividepackage-info.model'

import {
    ResourceType,
    SoftwareName,
    SoftwareSpec,
    SoftwareType
    // UseEnvironment
} from '@core/models/resource-info.model'

import { SearchTableService } from '@core/services/search-table.service'
import { ResourceInfoService } from '@core/services/resource-info.service'
import { takeUntil } from 'rxjs/operators';
import { DividePackageInfoService } from '@app/core/services/dividepackage-info.service';

interface SearchOptions {

}

@Component({
    selector: 'app-to-create-divide-package',
    templateUrl: './to-create-divide-package.component.html',
    providers: [DestroyService, SearchTableService, DividePackageInfoService]
})

export class ToCreateDividePakageComponent implements OnInit {
    form: FormGroup
    _resource: DividePackageInfo

    @Input()
    set applyResourceForSelect(v: any) {
        this.resourceTypes = v.resourceTypes
        this.softwareTypes = v.softwareTypes
        this.softwareNames = v.softwareNames
        // this.softwareSpecs = v.softwareSpecs
        // this.useEnvironments = v.useEnvironments
    }

    resourceTypes: ResourceType[]
    softwareTypes: SoftwareType[]
    softwareNames: SoftwareName[]
    // softwareSpecs: SoftwareSpec[]
    // useEnvironments: UseEnvironment[]

    addableResources$: Observable<DividePackageInfo[]>
    addableResourcesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex$: Observable<number>
    pageSize$: Observable<number>
    selectResourceUseInfoSub: Subject<DividePackageInfo> = new Subject<
        DividePackageInfo
        >()

    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService,
        private resourceInfoService: ResourceInfoService,
        private dividePackageInfoService: DividePackageInfoService,
        private searchTableService: SearchTableService<
            SearchOptions,
            DividePackageInfo
            >
    ) {
        this.searchTableService.setDataItemsHandler(params =>
            this.dividePackageInfoService.fetchResourceInfos(params)
        )
        this.searchTableService.setDataItemsCountHandler(params =>
            this.resourceInfoService.fetchResourceInfosCount(params)
        )
    }

    @Input()
    set resource(v: DividePackageInfo) {
        this._resource = v
        if (this.form) {
            this.patchForm()
        }
    }

    get packageId() {
        return this.form.controls.packageId
    }
    get packageName() {
        return this.form.controls.packageName
    }
    // get version() {
    //     return this.form.controls.version
    // }

    // get environment() {
    //     return this.form.controls.environment
    // }
    // get applyCount() {
    //     return this.form.controls.applyCount
    // }
    // get applyTime() {
    //     return this.form.controls.applyTime
    // }
    // get endTime() {
    //     return this.form.controls.endTime
    // }
    // get remark() {
    //     return this.form.controls.remark
    // }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initPatchResourceUseInfoToEdit()
    }

    private initDispatcher() {
        this.searchTableService.initFetch()
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                packageId: this.packageId.value,
                packageName: this.packageName.value
                // version: this.version.value,
                // environment: this.environment.value,
                // applyCount: this.applyCount.value,
                // applyTime: this.applyTime.value,
                // endTime: this.endTime.value,
                // remark: this.remark.value
            })
            this.subject.destroy('onOk')
        }
    }

    toCancel() {
        this.subject.destroy('onCancel')
    }

    private buildForm() {
        this.form = this.fb.group({
            packageId: [null, Validators.required],
            packageName: [null]
            // version: [null],
            // environment: [null],
            // applyCount: [null],
            // applyTime: [null],
            // endTime: [null],
            // remark: [null]
        })


        if (this._resource) {
            this.patchForm()
        }
    }

    selectdResourceUseInfo(dividePackageInfo: DividePackageInfo) {
        console.log('select data success !!!')
        this.form.patchValue({
            packageId: dividePackageInfo.packageId,
            packageName: dividePackageInfo.packageName
        })
    }

    private intDataSource() {
        this.addableResources$ = this.searchTableService.dataItems$
        this.addableResourcesCount$ = this.searchTableService.dataItemsCount$
        this.loading$ = this.searchTableService.loading$
        this.pageIndex$ = this.searchTableService.pageIndex$
        this.pageSize$ = this.searchTableService.pageSize$
    }

    private patchForm() {
        this.form.patchValue(this._resource)
    }

    private initPatchResourceUseInfoToEdit() {
        this.selectResourceUseInfoSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(dividePackageInfo => {
                this.form.patchValue({
                    packageId: dividePackageInfo.packageId,
                    packageName: dividePackageInfo.packageName
                })
            })
    }
}
