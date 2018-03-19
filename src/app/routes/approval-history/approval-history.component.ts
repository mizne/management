import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getVisitorLoading,
    getVisitorApprovalItems,
    getVisitorApprovalItemsCount,
    getExhibitorLoading,
    getExhibitorApprovalItems,
    getExhibitorApprovalItemsCount
} from './reducers'
import { DestroyService } from '../../core/services/destroy.service'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'
import {
    FetchVisitorApprovalHistoryAction,
    FetchVisitorApprovalHistoryCountAction,
    EnsureVisitorPageParamsAction,
    SingleDeleteVisitorApprovalHistoryAction,
    BatchDeleteVisitorApprovalHistoryAction
} from './actions/visitor-approval-history.action'

import {
    FetchExhibitorApprovalHistoryAction,
    FetchExhibitorApprovalHistoryCountAction,
    EnsureExhibitorPageParamsAction,
    SingleDeleteExhibitorApprovalHistoryAction,
    BatchDeleteExhibitorApprovalHistoryAction
} from './actions/exhibitor-approval-history.action'
import { Subject } from 'rxjs/Subject'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-approval-history',
    templateUrl: './approval-history.component.html',
    styleUrls: ['./approval-history.component.less'],
    providers: [DestroyService]
})
export class ApprovalHistoryComponent implements OnInit {
    visitorApprovalItems$: Observable<VisitorInvitation[]>
    visitorApprovalItemsCount$: Observable<number>
    visitorLoading$: Observable<boolean>
    visitorPageIndex = 1
    visitorPageSize = 10

    visitorAllChecked = false
    visitorIndeterminate = false
    visitorRefreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    visitorCheckAllStatusSub: Subject<boolean> = new Subject<boolean>()

    visitorBatchDeleteSub: Subject<void> = new Subject<void>()
    visitorSingleDeleteSub: Subject<string> = new Subject<string>()

    exhibitorApprovalItems$: Observable<ExhibitorInvitation[]>
    exhibitorApprovalItemsCount$: Observable<number>
    exhibitorLoading$: Observable<boolean>
    exhibitorPageIndex = 1
    exhibitorPageSize = 10

    exhibitorAllChecked = false
    exhibitorIndeterminate = false
    exhibitorRefreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    exhibitorCheckAllStatusSub: Subject<boolean> = new Subject<boolean>()

    exhibitorBatchDeleteSub: Subject<void> = new Subject<void>()
    exhibitorSingleDelteSub: Subject<string> = new Subject<string>()

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

    refreshVisitorStatus(checked: boolean, id: string): void {
        this.visitorRefreshStatusSub.next({
            id,
            checked
        })
    }

    refreshExhibitorStatus(checked: boolean, id: string): void {
        this.exhibitorRefreshStatusSub.next({
            id,
            checked
        })
    }

    checkVisitorAll(checked: boolean) {
        this.visitorCheckAllStatusSub.next(checked)
    }

    checkExhibitorAll(checked: boolean) {
        this.exhibitorCheckAllStatusSub.next(checked)
    }

    fetchVisitorApprovalItems() {
        this.store.dispatch(
            new EnsureVisitorPageParamsAction({
                pageIndex: this.visitorPageIndex,
                pageSize: this.visitorPageSize
            })
        )
        this.store.dispatch(
            new FetchVisitorApprovalHistoryAction({
                pageIndex: this.visitorPageIndex,
                pageSize: this.visitorPageSize
            })
        )
    }

    fetchExhibitorApprovalItems() {
        this.store.dispatch(
            new EnsureExhibitorPageParamsAction({
                pageIndex: this.exhibitorPageIndex,
                pageSize: this.exhibitorPageSize
            })
        )
        this.store.dispatch(
            new FetchExhibitorApprovalHistoryAction({
                pageIndex: this.exhibitorPageIndex,
                pageSize: this.exhibitorPageSize
            })
        )
    }

    toBatchDeleteVisitor() {
        this.visitorBatchDeleteSub.next()
    }

    toBatchDeleteExhibitor() {
        this.exhibitorBatchDeleteSub.next()
    }

    toDeleteVisitor(id: string): void {
        this.visitorSingleDeleteSub.next(id)
    }

    toDeleteExhibitor(id: string): void {
        this.exhibitorSingleDelteSub.next(id)
    }

    private intDataSource(): void {
        this.visitorApprovalItems$ = this.store.select(getVisitorApprovalItems)
        this.visitorApprovalItemsCount$ = this.store.select(
            getVisitorApprovalItemsCount
        )
        this.visitorLoading$ = this.store.select(getVisitorLoading)

        this.exhibitorApprovalItems$ = this.store.select(
            getExhibitorApprovalItems
        )
        this.exhibitorApprovalItemsCount$ = this.store.select(
            getExhibitorApprovalItemsCount
        )
        this.exhibitorLoading$ = this.store.select(getExhibitorLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchVisitorApprovalHistoryAction())
        this.store.dispatch(new FetchVisitorApprovalHistoryCountAction())

        this.store.dispatch(new FetchExhibitorApprovalHistoryAction())
        this.store.dispatch(new FetchExhibitorApprovalHistoryCountAction())
    }

    private initSubscriber(): void {
        this.initVisitorCheckboxStatus()
        this.initBatchDeleteVisitor()
        this.initSingleDeleteVisitor()

        this.initExhibitorCheckboxStatus()
        this.initBatchDeleteExhibitor()
        this.initSingleDeleteExhibitor()
    }

    private initVisitorCheckboxStatus(): void {
        this.visitorCheckAllStatusSub
            .asObservable()
            .withLatestFrom(this.visitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, approvals]) => {
                approvals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.visitorAllChecked = checkAll
                this.visitorIndeterminate = false
            })

        this.visitorRefreshStatusSub
            .asObservable()
            .withLatestFrom(this.visitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, approvals]) => {
                approvals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = approvals.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = approvals.every(
                    value => value.disabled || !value.checked
                )
                this.visitorAllChecked = allChecked
                this.visitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initBatchDeleteVisitor() {
        this.visitorBatchDeleteSub
            .asObservable()
            .withLatestFrom(this.visitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择审批记录`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除审批记录',
                        content: `确认删除 ${
                            checkedTerminals.length
                        } 个审批记录么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteVisitorApprovalHistoryAction(
                                    checkedTerminals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initSingleDeleteVisitor() {
        this.visitorSingleDeleteSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.confirm({
                    title: '删除审批记录',
                    content: '确定删除这个审批记录?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeleteVisitorApprovalHistoryAction(id)
                        )
                    }
                })
            })
    }

    private initExhibitorCheckboxStatus(): void {
        this.exhibitorCheckAllStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, approvals]) => {
                approvals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.exhibitorAllChecked = checkAll
                this.exhibitorIndeterminate = false
            })

        this.exhibitorRefreshStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, approvals]) => {
                approvals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = approvals.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = approvals.every(
                    value => value.disabled || !value.checked
                )
                this.exhibitorAllChecked = allChecked
                this.exhibitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initBatchDeleteExhibitor() {
        this.exhibitorBatchDeleteSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovalItems$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择审批记录`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除审批记录',
                        content: `确认删除 ${
                            checkedTerminals.length
                        } 个审批记录么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteExhibitorApprovalHistoryAction(
                                    checkedTerminals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initSingleDeleteExhibitor() {
        this.exhibitorSingleDelteSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.confirm({
                    title: '删除审批记录',
                    content: '确定删除这个审批记录?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeleteExhibitorApprovalHistoryAction(id)
                        )
                    }
                })
            })
    }
}
