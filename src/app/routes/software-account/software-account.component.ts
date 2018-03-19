import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    ApplicationSoftwareAccount,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount
} from '@core/models/software-account.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getApplicationLoading,
    getApplicationSoftwareAccounts,
    getApplicationSoftwareAccountCount,
    getSystemLoading,
    getSystemSoftwareAccounts,
    getSystemSoftwareAccountCount,
    getMiddlewareLoading,
    getMiddlewareSoftwareAccounts,
    getMiddlewareSoftwareAccountCount
} from './reducers'
import {
    FetchApplicationSoftwareAccountsAction,
    FetchApplicationSoftwareAccountsCountAction,
    EnsurePageParamsAction as EnsureApplicationPageParamsAction,
    CreateApplicationSoftwareAccountAction,
    EditApplicationSoftwareAccountAction
} from './actions/application-software-account.action'
import {
    FetchSystemSoftwareAccountsAction,
    FetchSystemSoftwareAccountsCountAction,
    EnsurePageParamsAction as EnsureSystemPageParamsAction,
    CreateSystemSoftwareAccountAction,
    EditSystemSoftwareAccountAction
} from './actions/system-software-account.action'
import {
    FetchMiddlewareSoftwareAccountsAction,
    FetchMiddlewareSoftwareAccountsCountAction,
    EnsurePageParamsAction as EnsureMiddlewarePageParamsAction,
    CreateMiddlewareSoftwareAccountAction,
    EditMiddlewareSoftwareAccountAction
} from './actions/middleware-software-account.action'
import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { ToCreateApplicationSoftwareAccountComponent } from './modals/to-create-application-software-account/to-create-application-software-account.component'
import { ToCreateSystemSoftwareAccountComponent } from './modals/to-create-system-software-account/to-create-system-software-account.component'
import { ToCreateMiddlewareSoftwareAccountComponent } from './modals/to-create-middleware-software-account/to-create-middleware-software-account.component'
import { FormControl } from '@angular/forms'
import { ToEditApplicationSoftwareAccountComponent } from './modals/to-edit-application-software-account/to-edit-application-software-account.component'
import { ToEditSystemSoftwareAccountComponent } from './modals/to-edit-system-software-account/to-edit-system-software-account.component'
import { ToEditMiddlewareSoftwareAccountComponent } from './modals/to-edit-middleware-software-account/to-edit-middleware-software-account.component'
import { ToShowApplicationSoftwareAccountComponent } from './modals/to-show-application-software-account/to-show-application-software-account.component'
import { ToShowSystemSoftwareAccountComponent } from './modals/to-show-system-software-account/to-show-system-software-account.component'
import { ToShowMiddlewareSoftwareAccountComponent } from './modals/to-show-middleware-software-account/to-show-middleware-software-account.component'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-software-account',
    templateUrl: './software-account.component.html',
    styleUrls: ['./software-account.component.less'],
    providers: [DestroyService]
})
export class SoftwareAccountComponent implements OnInit {
    tabIndex = 0
    toCreateSub: Subject<void> = new Subject<void>()
    toSearchSub: Subject<string> = new Subject<string>()

    applications$: Observable<ApplicationSoftwareAccount[]>
    applicationsCount$: Observable<number>
    applicationLoading$: Observable<boolean>
    applicationPageIndex = 1
    applicationPageSize = 10
    toEditApplicationSub: Subject<ApplicationSoftwareAccount> = new Subject<
        ApplicationSoftwareAccount
    >()
    toShowApplicationSub: Subject<ApplicationSoftwareAccount> = new Subject<
        ApplicationSoftwareAccount
    >()

    systems$: Observable<SystemSoftwareAccount[]>
    systemsCount$: Observable<number>
    systemLoading$: Observable<boolean>
    systemPageIndex = 1
    systemPageSize = 10
    toEditSystemSub: Subject<SystemSoftwareAccount> = new Subject<
        SystemSoftwareAccount
    >()
    toShowSystemSub: Subject<SystemSoftwareAccount> = new Subject<
        SystemSoftwareAccount
    >()

    middlewares$: Observable<MiddlewareSoftwareAccount[]>
    middlewaresCount$: Observable<number>
    middlewareLoading$: Observable<boolean>
    middlewarePageIndex = 1
    middlewarePageSize = 10
    toEditMiddlewareSub: Subject<MiddlewareSoftwareAccount> = new Subject<
        MiddlewareSoftwareAccount
    >()
    toShowMiddlewareSub: Subject<MiddlewareSoftwareAccount> = new Subject<
        MiddlewareSoftwareAccount
    >()

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

    toCreate() {
        this.toCreateSub.next()
    }

    onSearch(searchText: string) {
        this.toSearchSub.next(searchText)
    }

    fetchApplications() {
        this.store.dispatch(
            new EnsureApplicationPageParamsAction({
                pageIndex: this.applicationPageIndex,
                pageSize: this.applicationPageSize
            })
        )
        this.store.dispatch(
            new FetchApplicationSoftwareAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.applicationPageIndex,
                    pageSize: this.applicationPageSize
                }
            })
        )
    }

    toEditApplication(account: ApplicationSoftwareAccount) {
        this.toEditApplicationSub.next(account)
    }

    toShowApplication(account: ApplicationSoftwareAccount) {
        this.toShowApplicationSub.next(account)
    }

    fetchSystems() {
        this.store.dispatch(
            new EnsureSystemPageParamsAction({
                pageIndex: this.systemPageIndex,
                pageSize: this.systemPageSize
            })
        )
        this.store.dispatch(
            new FetchSystemSoftwareAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.systemPageIndex,
                    pageSize: this.systemPageSize
                }
            })
        )
    }

    toEditSystem(account: SystemSoftwareAccount) {
        this.toEditSystemSub.next(account)
    }

    toShowSystem(account: SystemSoftwareAccount) {
        this.toShowSystemSub.next(account)
    }

    fetchMiddlewares() {
        this.store.dispatch(
            new EnsureMiddlewarePageParamsAction({
                pageIndex: this.middlewarePageIndex,
                pageSize: this.middlewarePageSize
            })
        )
        this.store.dispatch(
            new FetchMiddlewareSoftwareAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.middlewarePageIndex,
                    pageSize: this.middlewarePageSize
                }
            })
        )
    }

    toEditMiddleware(account: MiddlewareSoftwareAccount) {
        this.toEditMiddlewareSub.next(account)
    }

    toShowMiddleware(account: MiddlewareSoftwareAccount) {
        this.toShowMiddlewareSub.next(account)
    }

    private intDataSource(): void {
        this.applications$ = this.store.select(getApplicationSoftwareAccounts)
        this.applicationsCount$ = this.store.select(
            getApplicationSoftwareAccountCount
        )
        this.applicationLoading$ = this.store.select(getApplicationLoading)

        this.systems$ = this.store.select(getSystemSoftwareAccounts)
        this.systemsCount$ = this.store.select(getSystemSoftwareAccountCount)
        this.systemLoading$ = this.store.select(getSystemLoading)

        this.middlewares$ = this.store.select(getMiddlewareSoftwareAccounts)
        this.middlewaresCount$ = this.store.select(
            getMiddlewareSoftwareAccountCount
        )
        this.middlewareLoading$ = this.store.select(getMiddlewareLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchApplicationSoftwareAccountsAction())
        this.store.dispatch(new FetchApplicationSoftwareAccountsCountAction())

        this.store.dispatch(new FetchSystemSoftwareAccountsAction())
        this.store.dispatch(new FetchSystemSoftwareAccountsCountAction())

        this.store.dispatch(new FetchMiddlewareSoftwareAccountsAction())
        this.store.dispatch(new FetchMiddlewareSoftwareAccountsCountAction())
    }

    private initSubscriber(): void {
        this.initCreateApplication()
        this.initCreateSystem()
        this.initCreateMiddleware()

        this.initSearchApplication()
        this.initSearchSystem()
        this.initSearchMiddleware()

        this.initEditApplication()
        this.initEditSystem()
        this.initEditMiddleware()

        this.initShowApplication()
        this.initShowSystem()
        this.initShowMiddleware()
    }

    private initCreateApplication(): void {
        this.toCreateSub
            .asObservable()
            .filter(() => this.tabIndex === 0)
            .mergeMap(() => {
                return this.modalService.open({
                    title: '新建应用软件台帐',
                    content: ToCreateApplicationSoftwareAccountComponent,
                    footer: false,
                    width: 800
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initCreateSystem(): void {
        this.toCreateSub
            .asObservable()
            .filter(() => this.tabIndex === 1)
            .mergeMap(() => {
                return this.modalService.open({
                    title: '新建系统软件台帐',
                    content: ToCreateSystemSoftwareAccountComponent,
                    footer: false,
                    width: 800
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateSystemSoftwareAccountAction(account)
                )
            })
    }

    private initCreateMiddleware(): void {
        this.toCreateSub
            .asObservable()
            .filter(() => this.tabIndex === 2)
            .mergeMap(() => {
                return this.modalService.open({
                    title: '新建中间件台帐',
                    content: ToCreateMiddlewareSoftwareAccountComponent,
                    footer: false,
                    width: 800
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initSearchApplication(): void {
        this.toSearchSub
            .asObservable()
            .filter(e => !!e)
            .filter(() => this.tabIndex === 0)
            .takeUntil(this.destroyService)
            .subscribe(searchText => {
                console.log(
                    `to search application software accounts; search text: ${searchText};`
                )
            })
    }

    private initSearchSystem(): void {
        this.toSearchSub
            .asObservable()
            .filter(e => !!e)
            .filter(() => this.tabIndex === 1)
            .takeUntil(this.destroyService)
            .subscribe(searchText => {
                console.log(
                    `to search system software accounts; search text: ${searchText};`
                )
            })
    }

    private initSearchMiddleware(): void {
        this.toSearchSub
            .asObservable()
            .filter(e => !!e)
            .filter(() => this.tabIndex === 2)
            .takeUntil(this.destroyService)
            .subscribe(searchText => {
                console.log(
                    `to search middleware software accounts; search text: ${searchText};`
                )
            })
    }

    private initEditApplication(): void {
        this.toEditApplicationSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '编辑应用软件台帐',
                    content: ToEditApplicationSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new EditApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initEditSystem() {
        this.toEditSystemSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '编辑系统软件台帐',
                    content: ToEditSystemSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new EditSystemSoftwareAccountAction(account)
                )
            })
    }

    private initEditMiddleware() {
        this.toEditMiddlewareSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '编辑中间件台帐',
                    content: ToEditMiddlewareSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(account => {
                this.store.dispatch(
                    new EditMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initShowApplication() {
        this.toShowApplicationSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '查看应用软件台帐',
                    content: ToShowApplicationSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .takeUntil(this.destroyService)
            .subscribe(account => {
                console.log(`to show application software account success`)
            })
    }

    private initShowSystem() {
        this.toShowSystemSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '查看系统软件台帐',
                    content: ToShowSystemSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .takeUntil(this.destroyService)
            .subscribe(account => {
                console.log(`to show system software account success`)
            })
    }

    private initShowMiddleware() {
        this.toShowMiddlewareSub
            .asObservable()
            .mergeMap(account => {
                return this.modalService.open({
                    title: '查看中间台帐',
                    content: ToShowMiddlewareSoftwareAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            })
            .takeUntil(this.destroyService)
            .subscribe(account => {
                console.log(`to show middleware software account success`)
            })
    }
}
