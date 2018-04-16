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
import { SystemInfo } from '@app/core/models/system-onoff.model'
import { SystemOnOffService } from '../../services/system-onoff.service'
import { of } from 'rxjs/observable/of'

interface SearchOptions {
    systemName?: string
    onlineTime?: string
    devDept?: string
}

@Component({
    selector: 'app-to-select-offline-system',
    templateUrl: './to-select-offline-system.component.html',
    providers: [DestroyService, SearchTableService]
})
export class ToSelectOffLineSystemComponent implements OnInit {
    selectableSystemInfoes$: Observable<SystemInfo[]>
    selectableSystemInfoesCount$: Observable<number>
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
        private systemOnOffService: SystemOnOffService,
        private searchTableService: SearchTableService<
            SearchOptions,
            SystemInfo
        >
    ) {
        this.searchTableService.setDataItemsHandler(params =>
            this.systemOnOffService.fetchSelectableSystemInfoes(params)
        )
        this.searchTableService.setDataItemsCountHandler(params =>
            this.systemOnOffService.fetchSelectableSystemInfoesCount(params)
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
            systemName: [null],
            onlineTime: [null],
            devDept: [null]
        })
    }

    private intDataSource() {
        this.selectableSystemInfoes$ = this.searchTableService.dataItems$
        this.selectableSystemInfoesCount$ = this.searchTableService.dataItemsCount$
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
                withLatestFrom(this.selectableSystemInfoes$),
                map(([_, resources]) => resources.filter(e => e.checked)),
                takeUntil(this.destroyService)
            )
            .subscribe(selectedItems => {
                if (selectedItems.length === 0) {
                    this.messageService.info(`还没有选择下线系统呢`)
                } else if (selectedItems.length === 1) {
                    this.subject.next(
                        R.pick(
                            [
                                'systemName',
                                'version',
                                'onlineTime',
                                'devDept',
                                'projectName',
                                'projectOwner',
                                'projectOwnerPhone',
                                'techOwner',
                                'techOwnerPhone'
                            ],
                            selectedItems[0]
                        )
                    )
                    this.subject.destroy('onOk')
                } else {
                    this.messageService.info(`只能选择一个下线系统`)
                }
            })
    }

    private convertFormValue(): SearchOptions {
        return R.filter(R.complement(R.isNil), {
            systemName: this.form.value.systemName,
            onlineTime: this.form.value.onlineTime,
            devDept: this.form.value.devDept
        })
    }
}
