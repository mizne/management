import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    SystemLogger,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount,
    SoftwareAccountType
} from '@core/models/software-account.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
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
    getMiddlewareSoftwareAccountCount,
    getApplicationSoftwareAccountsPageParams,
    getSystemSoftwareAccountsPageParams,
    getMiddlewareSoftwareAccountsPageParams
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
import {
    ToCreateApplicationSoftwareAccountComponent,
    ToCreateSystemSoftwareAccountComponent,
    ToCreateMiddlewareSoftwareAccountComponent,
    ToEditApplicationSoftwareAccountComponent,
    ToEditSystemSoftwareAccountComponent,
    ToEditMiddlewareSoftwareAccountComponent,
    ToShowApplicationSoftwareAccountComponent,
    ToShowSystemSoftwareAccountComponent,
    ToShowMiddlewareSoftwareAccountComponent
} from './modals'
import {
    mergeMap,
    takeUntil,
    filter,
    tap,
    withLatestFrom
} from 'rxjs/operators'
import { TableService } from '@core/services/table.service'

@Component({
    selector: 'app-software-account',
    templateUrl: './software-account.component.html',
    styleUrls: ['./software-account.component.less'],
    providers: [TableService, DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareAccountComponent implements OnInit {
    tabIndex = 0

    applications$: Observable<SystemLogger[]>
    applicationsCount$: Observable<number>
    applicationLoading$: Observable<boolean>
    applicationPageIndex = 1
    applicationPageSize = 10
    applicationPageChangeSub: Subject<void> = new Subject<void>()
    searchApplicationCtrl: FormControl = new FormControl()
    toSearchApplicationSub: Subject<void> = new Subject<void>()

    systems$: Observable<SystemSoftwareAccount[]>
    systemsCount$: Observable<number>
    systemLoading$: Observable<boolean>
    systemPageIndex = 1
    systemPageSize = 10
    systemPageChangeSub: Subject<void> = new Subject<void>()

    searchSystemCtrl: FormControl = new FormControl()
    toSearchSystemSub: Subject<void> = new Subject<void>()

    middlewares$: Observable<MiddlewareSoftwareAccount[]>
    middlewaresCount$: Observable<number>
    middlewareLoading$: Observable<boolean>
    middlewarePageIndex = 1
    middlewarePageSize = 10
    middlewarePageChangeSub: Subject<void> = new Subject<void>()

    searchMiddlewareCtrl: FormControl = new FormControl()
    toSearchMiddlewareSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private tableService: TableService
    ) {}

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {}

    // Application Software Tab
    toCreateApplication() {
        this.tableService.preCreateItem({
            title: '新建应用软件台帐',
            content: ToCreateApplicationSoftwareAccountComponent,
            type: SoftwareAccountType.APPLICATION
        })
    }

    onSearchApplication() {
        this.toSearchApplicationSub.next()
    }

    fetchApplications() {
        this.applicationPageChangeSub.next()
    }

    toEditApplication(account: SystemLogger) {
        this.tableService.preEditItem({
            title: '编辑应用软件台帐',
            content: ToEditApplicationSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.APPLICATION
        })
    }

    toShowApplication(account: SystemLogger) {
        this.tableService.preShowItem({
            title: '查看应用软件台帐',
            content: ToShowApplicationSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.APPLICATION
        })
    }

    toDeleteApplication(id: string) {
        this.tableService.preSingleDeleteItem({
            title: '删除应用软件台帐',
            content: '确定删除这个应用软件台帐?',
            id,
            type: SoftwareAccountType.APPLICATION
        })
    }

    // System Software Tab
    toCreateSystem() {
        this.tableService.preCreateItem({
            title: '新建系统软件台帐',
            content: ToCreateSystemSoftwareAccountComponent,
            type: SoftwareAccountType.SYSTEM
        })
    }

    onSearchSystem() {
        this.toSearchSystemSub.next()
    }

    fetchSystems() {
        this.systemPageChangeSub.next()
    }

    toEditSystem(account: SystemSoftwareAccount) {
        this.tableService.preEditItem({
            title: '编辑系统软件台帐',
            content: ToEditSystemSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.SYSTEM
        })
    }

    toShowSystem(account: SystemSoftwareAccount) {
        this.tableService.preShowItem({
            title: '查看系统软件台帐',
            content: ToShowSystemSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.SYSTEM
        })
    }

    toDeleteSystem(id: string) {
        this.tableService.preSingleDeleteItem({
            title: '删除系统软件台帐',
            content: '确定删除这个系统软件台帐?',
            id,
            type: SoftwareAccountType.SYSTEM
        })
    }

    // Middleware Software Tab
    toCreateMiddleware() {
        this.tableService.preCreateItem({
            title: '新建中间件台帐',
            content: ToCreateMiddlewareSoftwareAccountComponent,
            type: SoftwareAccountType.MIDDLEWARE
        })
    }

    onSearchMiddleware() {
        this.toSearchMiddlewareSub.next()
    }

    fetchMiddlewares() {
        this.middlewarePageChangeSub.next()
    }

    toEditMiddleware(account: MiddlewareSoftwareAccount) {
        this.tableService.preEditItem({
            title: '编辑中间件台帐',
            content: ToEditMiddlewareSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.MIDDLEWARE
        })
    }

    toShowMiddleware(account: MiddlewareSoftwareAccount) {
        this.tableService.preShowItem({
            title: '查看中间台帐',
            content: ToShowMiddlewareSoftwareAccountComponent,
            data: account,
            type: SoftwareAccountType.MIDDLEWARE
        })
    }

    toDeleteMiddleware(id: string) {
        this.tableService.preSingleDeleteItem({
            title: '删除中间件软件台帐',
            content: '确定删除这个中间件软件台帐?',
            id,
            type: SoftwareAccountType.MIDDLEWARE
        })
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
        this.initFirstTab()
        this.initSecondTab()
        this.initThirdTab()
    }

    private initFirstTab() {
        this.initCreateApplication()
        this.initSearchApplicationAndPageChange()
        this.initEditApplication()
        this.initShowApplication()
        this.initDeleteApplication()
    }

    private initSecondTab() {
        this.initCreateSystem()
        this.initSearchSystemAndPageChange()
        this.initEditSystem()
        this.initShowSystem()
        this.initDeleteSystem()
    }

    private initThirdTab() {
        this.initCreateMiddleware()
        this.initSearchMiddlewareAndPageChange()
        this.initEditMiddleware()
        this.initShowMiddleware()
        this.initDeleteMiddleware()
    }

    private initDeleteApplication() {
        this.tableService
            .toSingleDeleteItem(SoftwareAccountType.APPLICATION)
            .subscribe(id => {
                console.log(`delete application software account id: ${id}`)
            })
    }

    private initDeleteSystem() {
        this.tableService
            .toSingleDeleteItem(SoftwareAccountType.SYSTEM)
            .subscribe(id => {
                console.log(`delete system software account id: ${id}`)
            })
    }

    private initDeleteMiddleware() {
        this.tableService
            .toSingleDeleteItem(SoftwareAccountType.MIDDLEWARE)
            .subscribe(id => {
                console.log(`delete middleware software account id: ${id}`)
            })
    }

    private initCreateApplication(): void {
        this.tableService
            .toCreateItem(SoftwareAccountType.APPLICATION)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initCreateSystem(): void {
        this.tableService
            .toCreateItem(SoftwareAccountType.SYSTEM)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateSystemSoftwareAccountAction(account)
                )
            })
    }

    private initCreateMiddleware(): void {
        this.tableService
            .toCreateItem(SoftwareAccountType.MIDDLEWARE)
            .subscribe(account => {
                this.store.dispatch(
                    new CreateMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initSearchApplicationAndPageChange(): void {
        this.toSearchApplicationSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new FetchApplicationSoftwareAccountsCountAction(
                        this.searchApplicationCtrl.value
                    )
                )
            })

        merge(
            this.applicationPageChangeSub.asObservable(),
            this.toSearchApplicationSub.pipe(
                tap(() => {
                    this.applicationPageIndex = 1
                    this.applicationPageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getApplicationSoftwareAccountsPageParams)
                ),
                filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.applicationPageIndex &&
                        pageSize === this.applicationPageSize
                )
            )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureApplicationPageParamsAction({
                        pageIndex: this.applicationPageIndex,
                        pageSize: this.applicationPageSize
                    })
                )
                this.store.dispatch(
                    new FetchApplicationSoftwareAccountsAction({
                        condition: {
                            searchText: this.searchApplicationCtrl.value
                        },
                        options: {
                            pageIndex: this.applicationPageIndex,
                            pageSize: this.applicationPageSize
                        }
                    })
                )
            })
    }

    private initSearchSystemAndPageChange(): void {
        this.toSearchSystemSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                console.log(
                    `to search system software accounts; search text: ${
                        this.searchSystemCtrl.value
                    };`
                )
                this.store.dispatch(
                    new FetchSystemSoftwareAccountsCountAction(
                        this.searchSystemCtrl.value
                    )
                )
            })

        merge(
            this.systemPageChangeSub.asObservable(),
            this.toSearchSystemSub.pipe(
                tap(() => {
                    this.systemPageIndex = 1
                    this.systemPageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getSystemSoftwareAccountsPageParams)
                ),
                filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.systemPageIndex &&
                        pageSize === this.systemPageSize
                )
            )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureSystemPageParamsAction({
                        pageIndex: this.systemPageIndex,
                        pageSize: this.systemPageSize
                    })
                )
                this.store.dispatch(
                    new FetchSystemSoftwareAccountsAction({
                        condition: { searchText: this.searchSystemCtrl.value },
                        options: {
                            pageIndex: this.systemPageIndex,
                            pageSize: this.systemPageSize
                        }
                    })
                )
            })
    }

    private initSearchMiddlewareAndPageChange(): void {
        this.toSearchMiddlewareSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                console.log(
                    `to search middleware software accounts; search text: ${
                        this.searchMiddlewareCtrl.value
                    };`
                )
                this.store.dispatch(
                    new FetchMiddlewareSoftwareAccountsCountAction(
                        this.searchMiddlewareCtrl.value
                    )
                )
            })

        merge(
            this.middlewarePageChangeSub.asObservable(),
            this.toSearchMiddlewareSub.pipe(
                tap(() => {
                    this.middlewarePageIndex = 1
                    this.middlewarePageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getMiddlewareSoftwareAccountsPageParams)
                ),
                filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.middlewarePageIndex &&
                        pageSize === this.middlewarePageSize
                )
            )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureMiddlewarePageParamsAction({
                        pageIndex: this.middlewarePageIndex,
                        pageSize: this.middlewarePageSize
                    })
                )
                this.store.dispatch(
                    new FetchMiddlewareSoftwareAccountsAction({
                        condition: {
                            searchText: this.searchMiddlewareCtrl.value
                        },
                        options: {
                            pageIndex: this.middlewarePageIndex,
                            pageSize: this.middlewarePageSize
                        }
                    })
                )
            })
    }

    private initEditApplication(): void {
        this.tableService
            .toEditItem(SoftwareAccountType.APPLICATION)
            .subscribe(account => {
                this.store.dispatch(
                    new EditApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initEditSystem() {
        this.tableService
            .toEditItem(SoftwareAccountType.SYSTEM)
            .subscribe(account => {
                this.store.dispatch(
                    new EditSystemSoftwareAccountAction(account)
                )
            })
    }

    private initEditMiddleware() {
        this.tableService
            .toEditItem(SoftwareAccountType.MIDDLEWARE)
            .subscribe(account => {
                this.store.dispatch(
                    new EditMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initShowApplication() {
        this.tableService
            .toShowItem(SoftwareAccountType.APPLICATION)
            .subscribe(() => {})
    }

    private initShowSystem() {
        this.tableService
            .toShowItem(SoftwareAccountType.SYSTEM)
            .subscribe(() => {})
    }

    private initShowMiddleware() {
        this.tableService
            .toShowItem(SoftwareAccountType.MIDDLEWARE)
            .subscribe(() => {})
    }
}
