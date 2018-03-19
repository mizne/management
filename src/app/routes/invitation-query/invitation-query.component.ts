import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import {
    VisitorInvitation,
    FetchVisitorInvitationsParams,
    FetchVisitorInvitationsCountParams,
    VisitorInvitationStatuses
} from '@core/models/visitor-invitation.model'
import {
    ExhibitorInvitation,
    FetchExhibitorInvitationsParams,
    FetchExhibitorInvitationsCountParams,
    ExhibitorInvitationStatuses
} from '@core/models/exhibitor-invitation.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getVisitorLoading,
    getVisitorInvitations,
    getVisitorInvitationsCount,
    getVisitorInvitationsPageParams,
    getExhibitorLoading,
    getExhibitorInvitations,
    getExhibitorInvitationsCount,
    getExhibitorInvitationsPageParams
} from './reducers'
import { DestroyService } from '../../core/services/destroy.service'

import {
    FetchVisitorInvitationsAction,
    FetchVisitorInvitationsCountAction,
    EnsureVisitorPageParamsAction,
    SingleDeleteVisitorInvitationAction,
    BatchDeleteVisitorInvitationsAction,
    ResetFetchVisitorInvitationsAction,
    ResetFetchVisitorInvitationsCountAction
} from './actions/visitor-invitation.action'
import {
    FetchExhibitorInvitationsAction,
    FetchExhibitorInvitationsCountAction,
    EnsureExhibitorPageParamsAction,
    SingleDeleteExhibitorInvitationAction,
    BatchDeleteExhibitorInvitationsAction,
    ResetFetchExhibitorInvitationsAction,
    ResetFetchExhibitorInvitationsCountAction
} from './actions/exhibitor-invitation.action'
import { Subject } from 'rxjs/Subject'
import * as moment from 'moment'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-invitation-query',
    templateUrl: './invitation-query.component.html',
    styleUrls: ['./invitation-query.component.less'],
    providers: [DestroyService]
})
export class InvitationQueryComponent implements OnInit {
    visitorInvitations$: Observable<VisitorInvitation[]>
    visitorInvitationsCount$: Observable<number>
    visitorLoading$: Observable<boolean>
    visitorPageIndex = 1
    visitorPageSize = 10

    visitorAllChecked = false
    visitorIndeterminate = false
    refreshVisitorStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllVisitorStatusSub: Subject<boolean> = new Subject<boolean>()

    batchDeleteVisitorSub: Subject<void> = new Subject<void>()
    singleDelteVisitorSub: Subject<string> = new Subject<string>()
    visitorPageChangeSub: Subject<void> = new Subject<void>()
    visitorResetSub: Subject<void> = new Subject<void>()

    queryVisitorForm: FormGroup
    visitorStatuses = VisitorInvitationStatuses

    exhibitorInvitations$: Observable<ExhibitorInvitation[]>
    exhibitorInvitationsCount$: Observable<number>
    exhibitorLoading$: Observable<boolean>
    exhibitorPageIndex = 1
    exhibitorPageSize = 10

    exhibitorAllChecked = false
    exhibitorIndeterminate = false
    refreshExhibitorStatusSub: Subject<CheckRow> = new Subject<CheckRow>()
    checkAllExhibitorStatusSub: Subject<boolean> = new Subject<boolean>()

    batchDeleteExhibitorSub: Subject<void> = new Subject<void>()
    singleDelteExhibitorSub: Subject<string> = new Subject<string>()
    exhibitorPageChangeSub: Subject<void> = new Subject<void>()
    exhibitorResetSub: Subject<void> = new Subject<void>()

    queryExhibitorForm: FormGroup
    exhibitorStatuses = ExhibitorInvitationStatuses

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm()

        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    queryVisitorData() {
        this.visitorPageIndex = 1
        this.visitorPageSize = 10

        this.visitorResetSub.next()
    }

    queryExhibitorData() {
        this.exhibitorPageIndex = 1
        this.exhibitorPageSize = 10

        this.exhibitorResetSub.next()
    }

    resetVisitorData() {
        this.queryVisitorForm.reset()
    }

    resetExhibitorData() {
        this.queryExhibitorForm.reset()
    }

    refreshVisitorStatus(checked: boolean, id: string): void {
        this.refreshVisitorStatusSub.next({
            id,
            checked
        })
    }

    refreshExhibitorStatus(checked: boolean, id: string): void {
        this.refreshExhibitorStatusSub.next({
            id,
            checked
        })
    }

    checkAllVisitor(checked: boolean) {
        this.checkAllVisitorStatusSub.next(checked)
    }

    checkAllExhibitor(checked: boolean) {
        this.checkAllExhibitorStatusSub.next(checked)
    }

    fetchVisitorInvitations() {
        this.visitorPageChangeSub.next()
    }

    fetchExhibitorInvitations() {
        this.exhibitorPageChangeSub.next()
    }

    toBatchDeleteVisitor() {
        this.batchDeleteVisitorSub.next()
    }

    toBatchDeleteExhibitor() {
        this.batchDeleteExhibitorSub.next()
    }

    toDeleteVisitor(id: string): void {
        this.singleDelteVisitorSub.next(id)
    }
    toDeleteExhibitor(id: string): void {
        this.singleDelteExhibitorSub.next(id)
    }

    private intDataSource(): void {
        this.visitorInvitations$ = this.store.select(getVisitorInvitations)
        this.visitorInvitationsCount$ = this.store.select(
            getVisitorInvitationsCount
        )
        this.visitorLoading$ = this.store.select(getVisitorLoading)

        this.exhibitorInvitations$ = this.store.select(getExhibitorInvitations)
        this.exhibitorInvitationsCount$ = this.store.select(
            getExhibitorInvitationsCount
        )
        this.exhibitorLoading$ = this.store.select(getExhibitorLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchVisitorInvitationsAction())
        this.store.dispatch(new FetchVisitorInvitationsCountAction())

        this.store.dispatch(new FetchExhibitorInvitationsAction())
        this.store.dispatch(new FetchExhibitorInvitationsCountAction())
    }

    private initSubscriber(): void {
        this.initVisitorCheckboxStatus()
        this.initBatchDeleteVisitor()
        this.initSingleDeleteVisitor()
        this.initVisitorResetAndPageChange()

        this.initExhibitorCheckboxStatus()
        this.initBatchDeleteExhibitor()
        this.initSingleDeleteExhibitor()
        this.initExhibitorResetAndPageChange()
    }

    private initVisitorCheckboxStatus(): void {
        this.checkAllVisitorStatusSub
            .asObservable()
            .withLatestFrom(this.visitorInvitations$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, invitations]) => {
                invitations.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.visitorAllChecked = checkAll
                this.visitorIndeterminate = false
            })

        this.refreshVisitorStatusSub
            .asObservable()
            .withLatestFrom(this.visitorInvitations$)
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
                this.visitorAllChecked = allChecked
                this.visitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initBatchDeleteVisitor() {
        this.batchDeleteVisitorSub
            .asObservable()
            .withLatestFrom(this.visitorInvitations$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择买家约请记录`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除买家约请记录',
                        content: `确认删除 ${
                            checkedTerminals.length
                            } 个买家约请记录么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteVisitorInvitationsAction(
                                    checkedTerminals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initSingleDeleteVisitor() {
        this.singleDelteVisitorSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.confirm({
                    title: '删除买家约请记录',
                    content: '确定删除这个买家约请记录?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeleteVisitorInvitationAction(id)
                        )
                    }
                })
            })
    }

    private initVisitorResetAndPageChange() {
        this.visitorResetSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(
                    new ResetFetchVisitorInvitationsCountAction({
                        ...this.convertVisitorFormValue()
                    })
                )
            })

        const samePageParamsWithLast$ = this.store
            .select(getVisitorInvitationsPageParams)
            .map(
            ({ pageIndex, pageSize }) =>
                pageIndex === this.visitorPageIndex &&
                pageSize === this.visitorPageSize
            )
        Observable.merge(
            this.visitorPageChangeSub.asObservable(),
            this.visitorResetSub
                .withLatestFrom(
                samePageParamsWithLast$,
                (_, samePageParams) => samePageParams
                )
                .filter(e => e)
        ).subscribe(() => {
            this.store.dispatch(
                new EnsureVisitorPageParamsAction({
                    pageIndex: this.visitorPageIndex,
                    pageSize: this.visitorPageSize
                })
            )
            this.store.dispatch(
                new FetchVisitorInvitationsAction({
                    ...this.convertVisitorFormValue(),
                    pageIndex: this.visitorPageIndex,
                    pageSize: this.visitorPageSize
                })
            )
        })
    }

    private initExhibitorCheckboxStatus(): void {
        this.checkAllExhibitorStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorInvitations$)
            .takeUntil(this.destroyService)
            .subscribe(([checkAll, terminals]) => {
                terminals.forEach(e => {
                    if (!e.disabled) {
                        e.checked = checkAll
                    }
                })

                this.exhibitorAllChecked = checkAll
                this.exhibitorIndeterminate = false
            })

        this.refreshExhibitorStatusSub
            .asObservable()
            .withLatestFrom(this.exhibitorInvitations$)
            .takeUntil(this.destroyService)
            .subscribe(([{ id, checked }, invitations]) => {
                invitations.forEach(e => {
                    if (e.id === id) {
                        e.checked = checked
                    }
                })

                const allChecked = invitations.every(
                    value => value.disabled || value.checked
                )
                const allUnChecked = invitations.every(
                    value => value.disabled || !value.checked
                )
                this.exhibitorAllChecked = allChecked
                this.exhibitorIndeterminate = !allChecked && !allUnChecked
            })
    }

    private initBatchDeleteExhibitor() {
        this.batchDeleteExhibitorSub
            .asObservable()
            .withLatestFrom(this.exhibitorInvitations$)
            .takeUntil(this.destroyService)
            .subscribe(([_, terminals]) => {
                const checkedTerminals = terminals.filter(e => e.checked)
                if (checkedTerminals.length === 0) {
                    this.messageService.info(`还没有选择展商约请记录`)
                } else {
                    this.modalService.confirm({
                        title: '批量删除展商约请记录',
                        content: `确认删除 ${
                            checkedTerminals.length
                            } 个展商约请记录么?`,
                        showConfirmLoading: false,
                        onOk: () => {
                            this.store.dispatch(
                                new BatchDeleteExhibitorInvitationsAction(
                                    checkedTerminals.map(e => e.id)
                                )
                            )
                        }
                    })
                }
            })
    }

    private initSingleDeleteExhibitor() {
        this.singleDelteExhibitorSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.modalService.confirm({
                    title: '删除展商约请记录',
                    content: '确定删除这个展商约请记录?',
                    onOk: () => {
                        this.store.dispatch(
                            new SingleDeleteExhibitorInvitationAction(id)
                        )
                    }
                })
            })
    }

    private initExhibitorResetAndPageChange() {
        this.exhibitorResetSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(
                    new ResetFetchExhibitorInvitationsCountAction({
                        ...this.convertExhibitorFormValue()
                    })
                )
            })

        const samePageParamsWithLast$ = this.store
            .select(getExhibitorInvitationsPageParams)
            .map(
            ({ pageIndex, pageSize }) =>
                pageIndex === this.exhibitorPageIndex &&
                pageSize === this.exhibitorPageSize
            )
        Observable.merge(
            this.exhibitorPageChangeSub.asObservable(),
            this.exhibitorResetSub
                .withLatestFrom(
                samePageParamsWithLast$,
                (_, samePageParams) => samePageParams
                )
                .filter(e => e)
        ).subscribe(() => {
            this.store.dispatch(
                new EnsureExhibitorPageParamsAction({
                    pageIndex: this.exhibitorPageIndex,
                    pageSize: this.exhibitorPageSize
                })
            )
            this.store.dispatch(
                new FetchExhibitorInvitationsAction({
                    ...this.convertExhibitorFormValue(),
                    pageIndex: this.exhibitorPageIndex,
                    pageSize: this.exhibitorPageSize
                })
            )
        })
    }

    private buildForm() {
        this.buildVisitorForm()
        this.buildExhibitorForm()
    }

    private buildVisitorForm() {
        this.queryVisitorForm = this.fb.group({
            approveAt: [null],
            status: [null]
        })
    }

    private buildExhibitorForm() {
        this.queryExhibitorForm = this.fb.group({
            approveAt: [null],
            status: [null]
        })
    }

    private convertVisitorFormValue(): FetchVisitorInvitationsCountParams {
        const r: FetchVisitorInvitationsCountParams = {}
        if (this.queryVisitorForm.value.approveAt) {
            r.approveAt = moment(this.queryVisitorForm.value.approveAt).format(
                'YYYY-MM-DD'
            )
        }
        if (
            this.visitorStatuses.find(
                e => e.status === this.queryVisitorForm.value.status
            )
        ) {
            r.status = this.queryVisitorForm.value.status
        }
        return r
    }

    private convertExhibitorFormValue(): FetchExhibitorInvitationsCountParams {
        const r: FetchExhibitorInvitationsCountParams = {}
        if (this.queryExhibitorForm.value.approveAt) {
            r.approveAt = moment(
                this.queryExhibitorForm.value.approveAt
            ).format('YYYY-MM-DD')
        }
        if (
            this.exhibitorStatuses.find(
                e => e.status === this.queryExhibitorForm.value.status
            )
        ) {
            r.status = this.queryExhibitorForm.value.status
        }
        return r
    }
}
