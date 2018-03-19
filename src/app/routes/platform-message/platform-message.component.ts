import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { PlatformMessage } from '@core/models/message.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getLoading,
    getPlatformMessages,
    getPlatformMessagesCount
} from './reducers'
import { DestroyService } from '../../core/services/destroy.service'

import {
    FetchPlatformMessagesAction,
    FetchPlatformMessagesCountAction,
    EnsurePageParamsAction,
    SingleDeletePlatformMessageAction,
    BatchDeletePlatformMessagesAction
} from './actions/platform-message.action'
import { Subject } from 'rxjs/Subject'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-platform-message',
    templateUrl: './platform-message.component.html',
    styleUrls: ['./platform-message.component.less'],
    providers: [DestroyService]
})
export class PlatformMessageComponent implements OnInit {
    platformMessages$: Observable<PlatformMessage[]>
    platformMessagesCount$: Observable<number>
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

    fetchPlatformMessages() {
        this.store.dispatch(
            new EnsurePageParamsAction({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
        )
        this.store.dispatch(
            new FetchPlatformMessagesAction({
                condition: {},
                options: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
            })
        )
    }

    toCreate() {}

    toBatchDelete() {
        this.batchDeleteSub.next()
    }

    toDelete(id: string): void {
        this.singleDelteSub.next(id)
    }

    private intDataSource(): void {
        this.platformMessages$ = this.store.select(getPlatformMessages)
        this.platformMessagesCount$ = this.store.select(
            getPlatformMessagesCount
        )
        this.loading$ = this.store.select(getLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchPlatformMessagesAction())
        this.store.dispatch(new FetchPlatformMessagesCountAction())
    }

    private initSubscriber(): void {
        this.initCheckboxStatus()
        this.initBatchDelete()
        this.initSingleDelete()
    }

    private initCheckboxStatus(): void {
        this.checkAllStatusSub
            .asObservable()
            .withLatestFrom(this.platformMessages$)
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
            .withLatestFrom(this.platformMessages$)
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
            .withLatestFrom(this.platformMessages$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择平台消息`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除平台消息',
                        content: `确认删除 ${
                            checkedTerminals.length
                        } 个平台消息么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeletePlatformMessagesAction(
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
                    title: '删除平台消息',
                    content: '确定删除这个平台消息?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeletePlatformMessageAction(id)
                        )
                    }
                })
            })
    }
}
