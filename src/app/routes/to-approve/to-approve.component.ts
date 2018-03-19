import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService, NzModalSubject } from 'ng-zorro-antd'
import { Router, ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import {
    State,
    getVisitorApprovals,
    getVisitorApprovalsCount,
    getVisitorLoading,
    getExhibitorApprovals,
    getExhibitorApprovalsCount,
    getExhibitorLoading
} from './reducers'
import { FetchVisitorApprovalsCountAction, FetchExhibitorApprovalsCountAction } from '../../layout/default/actions/header.action'
import {
    FetchVisitorApprovalsAction,
    EnsureRejectVisitorApprovalAction,
    EnsureAgreeVisitorApprovalAction,
    EnsureBatchAgreeVisitorApprovalAction,
    EnsureBatchRejectVisitorApprovalAction,
    EnsureAllAgreeVisitorApprovalAction,
    EnsureAllRejectVisitorApprovalAction,
    EnsureVisitorPageParamsAction
} from './actions/to-approve-visitor.action'
import {
    FetchExhibitorApprovalsAction,
    EnsureRejectExhibitorApprovalAction,
    EnsureAgreeExhibitorApprovalAction,
    EnsureBatchAgreeExhibitorApprovalAction,
    EnsureBatchRejectExhibitorApprovalAction,
    EnsureAllAgreeExhibitorApprovalAction,
    EnsureAllRejectExhibitorApprovalAction,
    EnsureExhibitorPageParamsAction
} from './actions/to-approve-exhibitor.action'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'
import { DestroyService } from '@core/services/destroy.service'

export interface CheckRow {
    id: string
    checked: boolean
}

export interface RejectOptions {
    id: string
    title: any
    content: any
    footer: any
}

export interface BatchRejectOptions {
    title: any
    content: any
    footer: any
}

export type AllRejectOptions = BatchRejectOptions

@Component({
    selector: 'app-to-approve',
    templateUrl: './to-approve.component.html',
    styleUrls: ['./to-approve.component.less'],
    providers: [DestroyService]
})
export class ToApproveComponent implements OnInit {
    visitorApprovals$: Observable<VisitorInvitation[]>
    visitorApprovalsCount$: Observable<number>
    visitorLoading$: Observable<boolean>
    visitorPageIndex = 1
    visitorPageSize = 10

    visitorAllChecked = false
    visitorIndeterminate = false
    visitorRefreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    visitorCheckAllStatusSub: Subject<boolean> = new Subject<boolean>()

    visitorBatchAgreeSub: Subject<void> = new Subject<void>()
    visitorBatchRejectSub: Subject<BatchRejectOptions> = new Subject<
        BatchRejectOptions
        >()
    visitorSingleAgreeSub: Subject<string> = new Subject<string>()
    visitorSingleRejectSub: Subject<RejectOptions> = new Subject<
        RejectOptions
        >()
    visitorAllAgreeSub: Subject<void> = new Subject<void>()
    visitorAllRejectSub: Subject<AllRejectOptions> = new Subject<
        AllRejectOptions
        >()

    exhibitorApprovals$: Observable<ExhibitorInvitation[]>
    exhibitorApprovalsCount$: Observable<number>
    exhibitorLoading$: Observable<boolean>
    exhibitorPageIndex = 1
    exhibitorPageSize = 10

    exhibitorAllChecked = false
    exhibitorIndeterminate = false
    exhibitorRefreshStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    exhibitorCheckAllStatusSub: Subject<boolean> = new Subject<boolean>()

    exhibitorBatchAgreeSub: Subject<void> = new Subject<void>()
    exhibitorBatchRejectSub: Subject<BatchRejectOptions> = new Subject<
        BatchRejectOptions
        >()
    exhibitorSingleAgreeSub: Subject<string> = new Subject<string>()
    exhibitorSingleRejectSub: Subject<RejectOptions> = new Subject<
        RejectOptions
        >()
    exhibitorAllAgreeSub: Subject<void> = new Subject<void>()
    exhibitorAllRejectSub: Subject<AllRejectOptions> = new Subject<
        AllRejectOptions
        >()

    currentModal: NzModalSubject
    rejectReason = ''
    invitationType = ''

    constructor(
        private store: Store<State>,
        private modalService: NzModalService,
        private messageService: NzMessageService,
        private destroyService: DestroyService
    ) { }

    ngOnInit() {
        this.initDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    toAgreeVisitorInvitation(id) {
        this.visitorSingleAgreeSub.next(id)
    }

    toRejectVisitorInvitation(id, title, content, footer) {
        this.visitorSingleRejectSub.next({ id, title, content, footer })
    }

    toBatchAgreeVisitor() {
        this.visitorBatchAgreeSub.next()
    }

    toBatchRejectVisitor(title, content, footer) {
        this.visitorBatchRejectSub.next({ title, content, footer })
    }

    toAgreeAllVisitor() {
        this.visitorAllAgreeSub.next()
    }

    toRejectAllVisitor(title, content, footer) {
        this.visitorAllRejectSub.next({ title, content, footer })
    }

    checkAllVisitor(checked: boolean) {
        this.visitorCheckAllStatusSub.next(checked)
    }

    refreshVisitorStatus(checked: boolean, id: string) {
        this.visitorRefreshStatusSub.next({
            id,
            checked
        })
    }

    toAgreeExhibitorInvitation(id) {
        this.exhibitorSingleAgreeSub.next(id)
    }

    toRejectExhibitorInvitation(id, title, content, footer) {
        this.exhibitorSingleRejectSub.next({ id, title, content, footer })
    }

    toBatchAgreeExhibitor() {
        this.exhibitorBatchAgreeSub.next()
    }

    toBatchRejectExhibitor(title, content, footer) {
        this.exhibitorBatchRejectSub.next({ title, content, footer })
    }

    toAgreeAllExhibitor() {
        this.exhibitorAllAgreeSub.next()
    }

    toRejectAllExhibitor(title, content, footer) {
        this.exhibitorAllRejectSub.next({ title, content, footer })
    }

    fetchVisitorApprovals() {
        this.store.dispatch(
            new EnsureVisitorPageParamsAction({
                pageIndex: this.visitorPageIndex,
                pageSize: this.visitorPageSize
            })
        )
        this.store.dispatch(
            new FetchVisitorApprovalsAction({
                pageIndex: this.visitorPageIndex,
                pageSize: this.visitorPageSize
            })
        )
    }

    fetchExhibitorApprovals() {
        this.store.dispatch(
            new EnsureExhibitorPageParamsAction({
                pageIndex: this.exhibitorPageIndex,
                pageSize: this.exhibitorPageSize
            })
        )
        this.store.dispatch(
            new FetchExhibitorApprovalsAction({
                pageIndex: this.exhibitorPageIndex,
                pageSize: this.exhibitorPageSize
            })
        )
    }

    checkAllExhibitor(checked: boolean) {
        this.exhibitorCheckAllStatusSub.next(checked)
    }

    refreshExhibitorStatus(checked: boolean, id: string) {
        this.exhibitorRefreshStatusSub.next({
            id,
            checked
        })
    }

    cancelReject(ev) {
        this.currentModal.destroy('onCancel')
        this.currentModal = null
    }

    ensureReject(ev) {
        this.currentModal.destroy('onOk')
        this.currentModal = null
    }

    private initSubscriber() {
        this.initVisitorTable()
        this.initExhibitorTable()
    }

    private initVisitorTable() {
        this.initVisitorTableCheckbox()
        this.initVisitorAgree()
        this.initVisitorReject()
        this.initVisitorBatchAgree()
        this.initVisitorBatchReject()
        this.initVisitorAllAgree()
        this.initVisitorAllReject()
    }

    private initExhibitorTable() {
        this.initExhibitorTableCheckbox()
        this.initExhibitorAgree()
        this.initExhibitorReject()
        this.initExhibitorBatchAgree()
        this.initExhibitorBatchReject()
        this.initExhibitorAllAgree()
        this.initExhibitorAllReject()
    }

    private initVisitorTableCheckbox() {
        this.visitorCheckAllStatusSub
            .asObservable()
            .withLatestFrom(this.visitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, visitorApprovals]) => {
                visitorApprovals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.visitorAllChecked = checkAll
                this.visitorIndeterminate = false
            })

        this.visitorRefreshStatusSub
            .asObservable()
            .withLatestFrom(this.visitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, visitorApprovals]) => {
                visitorApprovals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = visitorApprovals.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = visitorApprovals.every(
                    value => value.disabled || !value.checked
                )
                this.visitorAllChecked = allChecked
                this.visitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initVisitorAgree() {
        this.visitorSingleAgreeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.open({
                    title: '同意买家约请',
                    content: '确定同意该约请吗?',
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAgreeVisitorApprovalAction(id)
                        )
                    }
                })
            })
    }

    private initVisitorReject() {
        this.visitorSingleRejectSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(({ id, title, content, footer }) => {
                this.invitationType = '买家'
                this.currentModal = this.modalService.open({
                    title,
                    content,
                    footer,
                    maskClosable: false,
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureRejectVisitorApprovalAction({
                                id,
                                reason: this.rejectReason
                            })
                        )
                        this.rejectReason = ''
                    },
                    onCancel: () => {
                        this.rejectReason = ''
                    }
                })
            })
    }

    private initVisitorBatchAgree() {
        this.visitorBatchAgreeSub
            .asObservable()
            .withLatestFrom(this.visitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([_, approvals]) => {
                const checkedApprovals = approvals.filter(e => e.checked)
                if (checkedApprovals.length === 0) {
                    this.messageService.info(`还没有选择约请记录`)
                } else {
                    this.modalService.open({
                        title: '批量同意买家约请',
                        content: '确定批量同意该约请吗?',
                        onOk: () => {
                            this.store.dispatch(
                                new EnsureBatchAgreeVisitorApprovalAction(
                                    checkedApprovals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initVisitorBatchReject() {
        this.visitorBatchRejectSub
            .asObservable()
            .withLatestFrom(this.visitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([{ title, content, footer }, approvals]) => {
                const checkedApprovals = approvals.filter(e => e.checked)
                if (checkedApprovals.length === 0) {
                    this.messageService.info(`还没有选择约请记录`)
                } else {
                    this.invitationType = '买家'
                    this.currentModal = this.modalService.open({
                        title,
                        content,
                        footer,
                        maskClosable: false,
                        onOk: () => {
                            this.store.dispatch(
                                new EnsureBatchRejectVisitorApprovalAction({
                                    ids: checkedApprovals.map(e => e.id),
                                    reason: this.rejectReason
                                })
                            )
                            this.rejectReason = ''
                        },
                        onCancel: () => {
                            this.rejectReason = ''
                        }
                    })
                }
            })
    }

    private initVisitorAllAgree() {
        this.visitorAllAgreeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.modalService.open({
                    title: '全部同意买家约请',
                    content: '确定全部同意该约请吗?',
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAllAgreeVisitorApprovalAction()
                        )
                    }
                })
            })
    }

    private initVisitorAllReject() {
        this.visitorAllRejectSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(({ title, content, footer }) => {
                this.invitationType = '买家'
                this.currentModal = this.modalService.open({
                    title,
                    content,
                    footer,
                    maskClosable: false,
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAllRejectVisitorApprovalAction({
                                reason: this.rejectReason
                            })
                        )
                        this.rejectReason = ''
                    },
                    onCancel: () => {
                        this.rejectReason = ''
                    }
                })
            })
    }

    private initExhibitorTableCheckbox() {
        this.exhibitorCheckAllStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, exhibitorApprovals]) => {
                exhibitorApprovals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.exhibitorAllChecked = checkAll
                this.exhibitorIndeterminate = false
            })

        this.exhibitorRefreshStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, exhibitorApprovals]) => {
                exhibitorApprovals.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = exhibitorApprovals.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = exhibitorApprovals.every(
                    value => value.disabled || !value.checked
                )
                this.exhibitorAllChecked = allChecked
                this.exhibitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initExhibitorAgree() {
        this.exhibitorSingleAgreeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.open({
                    title: '同意展商约请',
                    content: '确定同意该约请吗?',
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAgreeExhibitorApprovalAction(id)
                        )
                    },
                    onCancel: () => { }
                })
            })
    }

    private initExhibitorReject() {
        this.exhibitorSingleRejectSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(({ id, title, content, footer }) => {
                this.invitationType = '展商'
                this.currentModal = this.modalService.open({
                    title,
                    content,
                    footer,
                    maskClosable: false,
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureRejectExhibitorApprovalAction({
                                id,
                                reason: this.rejectReason
                            })
                        )

                        this.rejectReason = ''
                    },
                    onCancel: () => { }
                })
            })
    }

    private initExhibitorBatchAgree() {
        this.exhibitorBatchAgreeSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([_, approvals]) => {
                const checkedApprovals = approvals.filter(e => e.checked)
                if (checkedApprovals.length === 0) {
                    this.messageService.info(`还没有选择约请记录`)
                } else {
                    this.modalService.open({
                        title: '批量同意展商约请',
                        content: '确定批量同意展商约请吗?',
                        onOk: () => {
                            this.store.dispatch(
                                new EnsureBatchAgreeExhibitorApprovalAction(
                                    checkedApprovals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initExhibitorBatchReject() {
        this.exhibitorBatchRejectSub
            .asObservable()
            .withLatestFrom(this.exhibitorApprovals$)
            .takeUntil(this.destroyService)
            .subscribe(([{ title, content, footer }, approvals]) => {
                const checkedApprovals = approvals.filter(e => e.checked)
                if (checkedApprovals.length === 0) {
                    this.messageService.info(`还没有选择约请记录`)
                } else {
                    this.invitationType = '展商'
                    this.currentModal = this.modalService.open({
                        title,
                        content,
                        footer,
                        maskClosable: false,
                        onOk: () => {
                            this.store.dispatch(
                                new EnsureBatchRejectExhibitorApprovalAction({
                                    ids: checkedApprovals.map(e => e.id),
                                    reason: this.rejectReason
                                })
                            )
                            this.rejectReason = ''
                        },
                        onCancel: () => {
                            this.rejectReason = ''
                        }
                    })
                }
            })
    }

    private initExhibitorAllAgree() {
        this.exhibitorAllAgreeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.modalService.open({
                    title: '同意全部展商约请',
                    content: '确定同意全部展商约请吗?',
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAllAgreeExhibitorApprovalAction()
                        )
                    }
                })
            })
    }

    private initExhibitorAllReject() {
        this.exhibitorAllRejectSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(({ title, content, footer }) => {
                this.invitationType = '展商'
                this.currentModal = this.modalService.open({
                    title,
                    content,
                    footer,
                    maskClosable: false,
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureAllRejectExhibitorApprovalAction({
                                reason: this.rejectReason
                            })
                        )
                        this.rejectReason = ''
                    },
                    onCancel: () => {
                        this.rejectReason = ''
                    }
                })
            })
    }

    private initDataSource() {
        this.initVisitorApprovalTable()
        this.initExhibitorApprovalTable()
    }

    private initVisitorApprovalTable() {
        this.visitorApprovals$ = this.store.select(getVisitorApprovals)
        this.visitorApprovalsCount$ = this.store.select(
            getVisitorApprovalsCount
        )
        this.visitorLoading$ = this.store.select(getVisitorLoading)
    }

    private initExhibitorApprovalTable() {
        this.exhibitorApprovals$ = this.store.select(getExhibitorApprovals)
        this.exhibitorApprovalsCount$ = this.store.select(
            getExhibitorApprovalsCount
        )
        this.exhibitorLoading$ = this.store.select(getExhibitorLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchVisitorApprovalsAction())
        this.store.dispatch(new FetchExhibitorApprovalsAction())

        this.store.dispatch(new FetchVisitorApprovalsCountAction())
        this.store.dispatch(new FetchExhibitorApprovalsCountAction())
    }
}
