import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { VisitorMessage } from '@core/models/message.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getLoading,
    getVisitorMessages,
    getVisitorMessagesCount
} from './reducers'
import { DestroyService } from '../../core/services/destroy.service'

import {
    FetchVisitorMessagesAction,
    FetchVisitorMessagesCountAction,
    EnsurePageParamsAction,
    SingleDeleteVisitorMessageAction,
    BatchDeleteVisitorMessagesAction,
    CreateVisitorMessageAction
} from './actions/visitor-message.action'
import { Subject } from 'rxjs/Subject'
import { ToCreateMessageComponent } from './modals/to-create-message/to-create-message.component'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-visitor-message',
    templateUrl: './visitor-message.component.html',
    styleUrls: ['./visitor-message.component.less'],
    providers: [DestroyService]
})
export class VisitorMessageComponent implements OnInit {
    visitorMessages$: Observable<VisitorMessage[]>
    visitorMessagesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex = 1
    pageSize = 10

    allChecked = false
    indeterminate = false
    refreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllStatusSub: Subject<boolean> = new Subject<boolean>()

    batchDeleteSub: Subject<void> = new Subject<void>()
    singleDelteSub: Subject<string> = new Subject<string>()
    toCreateSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService
    ) { }

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

    fetchVisitorMessages() {
        this.store.dispatch(
            new EnsurePageParamsAction({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
        )
        this.store.dispatch(
            new FetchVisitorMessagesAction({
                condition: {},
                options: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
                }
            })
        )
    }

    toCreate() {
        this.toCreateSub.next()
    }

    toBatchDelete() {
        this.batchDeleteSub.next()
    }

    toDelete(id: string): void {
        this.singleDelteSub.next(id)
    }

    private intDataSource(): void {
        this.visitorMessages$ = this.store.select(getVisitorMessages)
        this.visitorMessagesCount$ = this.store.select(getVisitorMessagesCount)
        this.loading$ = this.store.select(getLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchVisitorMessagesAction())
        this.store.dispatch(new FetchVisitorMessagesCountAction())
    }

    private initSubscriber(): void {
        this.initCheckboxStatus()
        this.initBatchDelete()
        this.initSingleDelete()
        this.initCreate()
    }

    private initCheckboxStatus(): void {
        this.checkAllStatusSub
            .asObservable()
            .withLatestFrom(this.visitorMessages$)
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
            .withLatestFrom(this.visitorMessages$)
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
            .withLatestFrom(this.visitorMessages$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择买家消息`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除买家消息',
                        content: `确认删除 ${
                            checkedTerminals.length
                            } 个买家消息么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteVisitorMessagesAction(
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
                    title: '删除买家消息',
                    content: '确定删除这个买家消息?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeleteVisitorMessageAction(id)
                        )
                    }
                })
            })
    }

    private initCreate() {
        this.toCreateSub
            .asObservable()
            .mergeMap(() => {
                return this.modalService.open({
                    title: '发送买家消息',
                    content: ToCreateMessageComponent,
                    footer: false
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(message => {
                this.store.dispatch(new CreateVisitorMessageAction(message))
            })
    }
}
