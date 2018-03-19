import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Terminal } from '@core/models/terminal.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State, getLoading, getTerminals, getTerminalsCount } from './reducers'
import { DestroyService } from '../../core/services/destroy.service'
import { ToCreateTerminalComponent } from './modals/to-create-terminal/to-create-terminal.component'

import {
    FetchTerminalsAction,
    FetchTerminalsCountAction,
    EnsurePageParamsAction,
    SingleDeleteTerminalAction,
    BatchDeleteTerminalsAction,
    AssignTerminalAction,
    CreateTerminalAction
} from './actions/terminal-list.action'
import { Subject } from 'rxjs/Subject'
import { ToAssignTerminalComponent } from './modals/to-assign-terminal/to-assign-terminal.component'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-terminal-list',
    templateUrl: './terminal-list.component.html',
    styleUrls: ['./terminal-list.component.less'],
    providers: [DestroyService]
})
export class TerminalListComponent implements OnInit {
    terminals$: Observable<Terminal[]>
    terminalsCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex = 1
    pageSize = 10

    allChecked = false
    indeterminate = false
    refreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllStatusSub: Subject<boolean> = new Subject<boolean>()

    batchDeleteSub: Subject<void> = new Subject<void>()
    singleDelteSub: Subject<string> = new Subject<string>()
    assignSub: Subject<string> = new Subject<string>()
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

    fetchTerminals() {
        this.store.dispatch(
            new EnsurePageParamsAction({
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            })
        )
        this.store.dispatch(
            new FetchTerminalsAction({
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

    toAssign(id: string): void {
        this.assignSub.next(id)
    }

    toDelete(id: string): void {
        this.singleDelteSub.next(id)
    }

    private intDataSource(): void {
        this.terminals$ = this.store.select(getTerminals)
        this.terminalsCount$ = this.store.select(getTerminalsCount)
        this.loading$ = this.store.select(getLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchTerminalsAction())
        this.store.dispatch(new FetchTerminalsCountAction())
    }

    private initSubscriber(): void {
        this.initCheckboxStatus()
        this.initBatchDelete()
        this.initSingleDelete()
        this.initAssign()
        this.initCreate()
    }

    private initCheckboxStatus(): void {
        this.checkAllStatusSub
            .asObservable()
            .withLatestFrom(this.terminals$)
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
            .withLatestFrom(this.terminals$)
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
            .withLatestFrom(this.terminals$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择终端`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除终端',
                        content: `确认删除 ${
                            checkedTerminals.length
                            } 个终端么?`,
                        showConfirmLoading: false,
                        onCancel: () => {
                            this.messageService.info(`取消批量删除终端`)
                        },
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteTerminalsAction(
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
                    title: '删除终端',
                    content: '确定删除这个终端?',
                    onCancel: () => {
                        this.messageService.info(`取消删除终端`)
                    },
                    onOk: () => {
                        this.store.dispatch(new SingleDeleteTerminalAction(id))
                    }
                })
            })
    }

    private initAssign() {
        this.assignSub
            .asObservable()
            .mergeMap(id => {
                return this.modalService.open({
                    title: '分配终端',
                    content: ToAssignTerminalComponent,
                    footer: false,
                    componentParams: {
                        id
                    }
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(params => {
                this.store.dispatch(
                    new AssignTerminalAction({
                        id: params.id,
                        exhibitorId: params.exhibitorID
                    })
                )
            })
    }

    private initCreate() {
        this.toCreateSub
            .asObservable()
            .mergeMap(() => {
                return this.modalService.open({
                    title: '新增终端',
                    content: ToCreateTerminalComponent,
                    footer: false
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(terminal => {
                this.store.dispatch(new CreateTerminalAction(terminal))
            })
    }
}
