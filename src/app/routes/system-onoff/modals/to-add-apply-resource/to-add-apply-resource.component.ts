import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject, NzMessageService } from 'ng-zorro-antd'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'

import { DestroyService } from '@core/services/destroy.service'
import {
    ApplyResource,
    FetchAddableApplyResourceCountParams
} from '@core/models/resource-apply.model'
import { Store } from '@ngrx/store'
import {
    State,
    getAddableApplyResources,
    getAddableApplyResourcesCount,
    getFetchAddableApplyResourceLoading,
    getAddableApplyResourcesPageParams
} from '../../reducers'
import { getResourceTypes } from '@app/reducers'

import {
    FetchAddableApplyResourceAction,
    FetchAddableApplyResourceCountAction,
    EnsurePageParamsAction
} from '../../actions/to-add-apply-resource.action'
import { withLatestFrom, takeUntil, tap, filter, map } from 'rxjs/operators'
import { ResourceType } from '@app/core/models/resource-info.model'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-to-add-apply-resource',
    templateUrl: './to-add-apply-resource.component.html',
    providers: [DestroyService]
})
export class ToAddApplyResourceComponent implements OnInit {
    resourceTypes$: Observable<ResourceType[]>
    addableResources$: Observable<ApplyResource[]>
    addableResourcesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex = 1
    pageSize = 10

    allChecked = false
    indeterminate = false
    refreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllStatusSub: Subject<boolean> = new Subject<boolean>()

    pageChangeSub: Subject<void> = new Subject<void>()
    resetSub: Subject<void> = new Subject<void>()
    ensureSaveSub: Subject<void> = new Subject<void>()

    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private destroyService: DestroyService,
        private messageService: NzMessageService,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    queryForm() {
        this.resetSub.next()
    }

    resetForm() {
        this.form.reset()
    }

    pageChage() {
        this.pageChangeSub.next()
    }

    checkAll(checked: boolean) {
        this.checkAllStatusSub.next(checked)
    }

    refreshStatus(checked: boolean, id: string) {
        this.refreshStatusSub.next({
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
        this.addableResources$ = this.store.select(getAddableApplyResources)
        this.addableResourcesCount$ = this.store.select(
            getAddableApplyResourcesCount
        )
        this.loading$ = this.store.select(getFetchAddableApplyResourceLoading)
        this.resourceTypes$ = this.store.select(getResourceTypes)
    }

    private initDispatcher() {
        this.store.dispatch(new FetchAddableApplyResourceAction())
        this.store.dispatch(new FetchAddableApplyResourceCountAction())
    }

    private initSubscriber() {
        this.initCheckboxStatus()
        this.initResetAndPageChange()
        this.initEnsureAddResources()
    }

    private initCheckboxStatus() {
        this.checkAllStatusSub
            .asObservable()
            .pipe(
                withLatestFrom(this.addableResources$),
                takeUntil(this.destroyService)
            )
            .subscribe(([checkAll, invitations]) => {
                invitations.forEach(e => {
                    e.checked = checkAll
                })

                this.allChecked = checkAll
                this.indeterminate = false
            })

        this.refreshStatusSub
            .asObservable()
            .pipe(
                withLatestFrom(this.addableResources$),
                takeUntil(this.destroyService)
            )
            .subscribe(([{ id, checked }, terminals]) => {
                terminals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = terminals.every(value => value.checked)
                const allUnChecked = terminals.every(value => !value.checked)
                this.allChecked = allChecked
                this.indeterminate = !allChecked && !allUnChecked
            })
    }

    private initResetAndPageChange() {
        this.resetSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new FetchAddableApplyResourceCountAction({
                        ...this.convertFormValue()
                    })
                )
            })

        merge(
            this.pageChangeSub.asObservable(),
            this.resetSub.pipe(
                tap(() => {
                    this.pageIndex = 1
                    this.pageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getAddableApplyResourcesPageParams)
                ),
                filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.pageIndex &&
                        pageSize === this.pageSize
                )
            )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsurePageParamsAction({
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    })
                )
                this.store.dispatch(
                    new FetchAddableApplyResourceAction({
                        ...this.convertFormValue(),
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    })
                )
            })
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

    private convertFormValue(): FetchAddableApplyResourceCountParams {
        return {
            type: this.form.value.type,
            name: this.form.value.name,
            version: this.form.value.version
        }
    }
}
