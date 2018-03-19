import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Exhibitor } from '@core/models/exhibitor.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getExhibitorListLoading,
    getExhibitors,
    getExhibitorsCount
} from './reducers'
import { DestroyService } from '../../core/services/destroy.service'

import {
    FetchExhibitorsAction,
    FetchExhibitorsCountAction,
    EnsurePageParamsAction,
    SingleDeleteExhibitorAction,
    BatchDeleteExhibitorsAction
} from './actions/exhibitor-list.action'
import { Subject } from 'rxjs/Subject'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-exhibitor-list',
    templateUrl: './exhibitor-list.component.html',
    styleUrls: ['./exhibitor-list.component.less'],
    providers: [DestroyService]
})
export class ExhibitorListComponent implements OnInit {
    exhibitors$: Observable<Exhibitor[]>
    exhibitorsCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex = 1
    pageSize = 10

    allChecked = false
    indeterminate = false
    refreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllStatusSub: Subject<boolean> = new Subject<boolean>()

    batchDeleteSub: Subject<void> = new Subject<void>()
    singleDelteSub: Subject<string> = new Subject<string>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService
    ) {}

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    refreshStatus(checked: boolean, id: string): void {
        this.refreshStatusSub.next({
            id,
            checked
        })
    }

    checkAll(checked: boolean) {
        this.checkAllStatusSub.next(checked)
    }

    fetchTerminals() {
        this.store.dispatch(
            new EnsurePageParamsAction({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
        )
        this.store.dispatch(
            new FetchExhibitorsAction({
                condition: {},
                options: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
            })
        )
    }

    toBatchDelete() {
        this.batchDeleteSub.next()
    }

    toDelete(id: string): void {
        this.singleDelteSub.next(id)
    }

    private intDataSource(): void {
        this.exhibitors$ = this.store.select(getExhibitors)
        this.exhibitorsCount$ = this.store.select(getExhibitorsCount)
        this.loading$ = this.store.select(getExhibitorListLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchExhibitorsAction())
        this.store.dispatch(new FetchExhibitorsCountAction())
    }

    private initSubscriber(): void {
        this.initCheckboxStatus()
        this.initBatchDelete()
        this.initSingleDelete()
    }

    private initCheckboxStatus(): void {
        this.checkAllStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitors$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, terminals]) => {
                terminals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.allChecked = checkAll
                this.indeterminate = false
            })

        this.refreshStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitors$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, terminals]) => {
                terminals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = terminals.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = terminals.every(
                    value => value.disabled || !value.checked
                )
                this.allChecked = allChecked
                this.indeterminate = !allChecked && !allUnChecked
            })
    }

    private initBatchDelete() {
        this.batchDeleteSub
            .asObservable()
            .withLatestFrom(this.exhibitors$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择展商`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除展商',
                        content: `删除展商会将其相关的业务数据也删除，确认删除 ${
                            checkedTerminals.length
                        } 个展商么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteExhibitorsAction(
                                    checkedTerminals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initSingleDelete() {
        this.singleDelteSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.confirm({
                    title: '删除展商',
                    content:
                        '删除展商会将其相关的业务数据也删除，确定删除这个展商?',
                    onOk: () => {
                        this.store.dispatch(new SingleDeleteExhibitorAction(id))
                    }
                })
            })
    }
}
