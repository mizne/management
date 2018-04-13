import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input
} from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import * as R from 'ramda'

import { DestroyService } from '@core/services/destroy.service'
import { SearchTableService } from '@core/services/search-table.service'
import {
    withLatestFrom,
    takeUntil,
    tap,
    filter,
    map,
    catchError
} from 'rxjs/operators'
import {
    ResourceType,
    ResourceInfo
} from '@app/core/models/resource-info.model'
import { ResourceInfoService } from '@core/services/resource-info.service'
import { of } from 'rxjs/observable/of'

interface SearchOptions {
    type?: string
    name?: string
    version?: string
}

@Component({
    selector: 'app-to-add-apply-resource',
    templateUrl: './to-add-apply-resource.component.html',
    providers: [DestroyService, SearchTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToAddApplyResourceComponent implements OnInit {
    @Input() resourceTypes: ResourceType[]

    addableResources$: Observable<ResourceInfo[]>
    addableResourcesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex$: Observable<number>
    pageSize$: Observable<number>

    allChecked$: Observable<boolean>
    indeterminate$: Observable<boolean>

    ensureSaveSub: Subject<void> = new Subject<void>()
    form: FormGroup

    trackByFn = (index, item) => {
        return item.id
    }

    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService,
        private messageService: NzMessageService,
        private resourceInfoService: ResourceInfoService,
        private searchTableService: SearchTableService<
            SearchOptions,
            ResourceInfo
            >
    ) {
        this.searchTableService.setDataItemsHandler(params =>
            this.resourceInfoService.fetchResourceInfos(params)
        )
        this.searchTableService.setDataItemsCountHandler(params =>
            this.resourceInfoService.fetchResourceInfosCount(params)
        )
    }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    queryForm() {
        this.searchTableService.searchForm(this.convertFormValue())
    }

    resetForm() {
        this.form.reset()
    }

    pageIndexChange(index: number) {
        this.searchTableService.pageIndexChange(index)
    }

    pageSizeChange(size: number) {
        this.searchTableService.pageSizeChange(size)
    }

    checkAll(checked: boolean) {
        this.searchTableService.checkAll(checked)
    }

    refreshStatus(checked: boolean, id: string) {
        this.searchTableService.checkOne({
            id,
            checked
        })
    }

    toSave() {
        this.ensureSaveSub.next()
    }

    toCancel() {
        this.subject.destroy('onCancel')
    }

    private buildForm() {
        this.form = this.fb.group({
            type: [null],
            name: [null],
            version: [null]
        })
    }

    private intDataSource() {
        this.addableResources$ = this.searchTableService.dataItems$
        this.addableResourcesCount$ = this.searchTableService.dataItemsCount$
        this.loading$ = this.searchTableService.loading$
        this.pageIndex$ = this.searchTableService.pageIndex$
        this.pageSize$ = this.searchTableService.pageSize$
        this.allChecked$ = this.searchTableService.allChecked$
        this.indeterminate$ = this.searchTableService.indeterminate$
    }

    private initDispatcher() {
        this.searchTableService.initFetch()
    }

    private initSubscriber() {
        this.initEnsureAddResources()
    }

    private initEnsureAddResources() {
        this.ensureSaveSub
            .asObservable()
            .pipe(
                withLatestFrom(this.addableResources$),
                map(([_, resources]) => resources.filter(e => e.checked)),
                takeUntil(this.destroyService)
            )
            .subscribe(selectedResources => {
                if (selectedResources.length === 0) {
                    this.messageService.info(`还没有选择资源信息呢`)
                } else {
                    this.subject.next(selectedResources)
                    this.subject.destroy('onOk')
                }
            })
    }

    private convertFormValue(): SearchOptions {
        return R.filter(R.complement(R.isNil), {
            type: this.form.value.type,
            name: this.form.value.name,
            version: this.form.value.version
        })
    }
}
