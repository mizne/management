import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    ApplicationSoftwareAccount,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount
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
import { mergeMap, takeUntil, filter, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-software-account',
    templateUrl: './software-account.component.html',
    styleUrls: ['./software-account.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoftwareAccountComponent implements OnInit {
    tabIndex = 0
    buttonText = '新建应用软件台账'
    searchText = '搜索应用软件名称、类型'
    toCreateSub: Subject<void> = new Subject<void>()
    toSearchSub: Subject<void> = new Subject<void>()
    searchCtrl: FormControl = new FormControl()

    applications$: Observable<ApplicationSoftwareAccount[]>
    applicationsCount$: Observable<number>
    applicationLoading$: Observable<boolean>
    applicationPageIndex = 1
    applicationPageSize = 10
    applicationPageChangeSub: Subject<void> = new Subject<void>()
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
    systemPageChangeSub: Subject<void> = new Subject<void>()
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
    middlewarePageChangeSub: Subject<void> = new Subject<void>()
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
    ) { }

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {
        if (tabIndex === 0) {
            this.buttonText = '新建应用软件台账'
            this.searchText = '搜索应用软件名称、类型'
        } else if (tabIndex === 1) {
            this.buttonText = '新建系统软件台账'
            this.searchText = '搜索系统软件名称、类型'
        } else if (tabIndex === 2) {
            this.buttonText = '新建中间件台账'
            this.searchText = '搜索中间件名称、类型'
        }
    }

    toCreate() {
        this.toCreateSub.next()
    }

    onSearch() {
        this.toSearchSub.next()
    }

    fetchApplications() {
        this.applicationPageChangeSub.next()
    }

    toEditApplication(account: ApplicationSoftwareAccount) {
        this.toEditApplicationSub.next(account)
    }

    toShowApplication(account: ApplicationSoftwareAccount) {
        this.toShowApplicationSub.next(account)
    }

    fetchSystems() {
        this.systemPageChangeSub.next()
    }

    toEditSystem(account: SystemSoftwareAccount) {
        this.toEditSystemSub.next(account)
    }

    toShowSystem(account: SystemSoftwareAccount) {
        this.toShowSystemSub.next(account)
    }

    fetchMiddlewares() {
        this.middlewarePageChangeSub.next()
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

        this.initSearchApplicationAndPageChange()
        this.initSearchSystemAndPageChange()
        this.initSearchMiddlewareAndPageChange()

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
            .pipe(
                filter(() => this.isApplicationTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建应用软件台帐',
                        content: ToCreateApplicationSoftwareAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService))
            .subscribe(account => {
                this.store.dispatch(
                    new CreateApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initCreateSystem(): void {
        this.toCreateSub
            .asObservable()
            .pipe(
                filter(() => this.isSystemTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建系统软件台帐',
                        content: ToCreateSystemSoftwareAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new CreateSystemSoftwareAccountAction(account)
                )
            })
    }

    private initCreateMiddleware(): void {
        this.toCreateSub
            .asObservable()
            .pipe(
                filter(() => this.isMiddlewareTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建中间件台帐',
                        content: ToCreateMiddlewareSoftwareAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new CreateMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initSearchApplicationAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isApplicationTab()),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                this.store.dispatch(
                    new FetchApplicationSoftwareAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.applicationPageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isApplicationTab()),
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
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.applicationPageIndex,
                            pageSize: this.applicationPageSize
                        }
                    })
                )
            })
    }

    private initSearchSystemAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isSystemTab()),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                console.log(
                    `to search system software accounts; search text: ${
                    this.searchCtrl.value
                    };`
                )
                this.store.dispatch(
                    new FetchSystemSoftwareAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.systemPageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isSystemTab()),
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
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.systemPageIndex,
                            pageSize: this.systemPageSize
                        }
                    })
                )
            })
    }

    private initSearchMiddlewareAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isMiddlewareTab()),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                console.log(
                    `to search middleware software accounts; search text: ${
                    this.searchCtrl.value
                    };`
                )
                this.store.dispatch(
                    new FetchMiddlewareSoftwareAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.middlewarePageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isMiddlewareTab()),
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
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.middlewarePageIndex,
                            pageSize: this.middlewarePageSize
                        }
                    })
                )
            })
    }

    private initEditApplication(): void {
        this.toEditApplicationSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑应用软件台帐',
                        content: ToEditApplicationSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new EditApplicationSoftwareAccountAction(account)
                )
            })
    }

    private initEditSystem() {
        this.toEditSystemSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑系统软件台帐',
                        content: ToEditSystemSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new EditSystemSoftwareAccountAction(account)
                )
            })
    }

    private initEditMiddleware() {
        this.toEditMiddlewareSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑中间件台帐',
                        content: ToEditMiddlewareSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new EditMiddlewareSoftwareAccountAction(account)
                )
            })
    }

    private initShowApplication() {
        this.toShowApplicationSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '查看应用软件台帐',
                        content: ToShowApplicationSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
            })
    }

    private initShowSystem() {
        this.toShowSystemSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '查看系统软件台帐',
                        content: ToShowSystemSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
            })
    }

    private initShowMiddleware() {
        this.toShowMiddlewareSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '查看中间台帐',
                        content: ToShowMiddlewareSoftwareAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
            })
    }

    private isApplicationTab(): boolean {
        return this.tabIndex === 0
    }

    private isSystemTab(): boolean {
        return this.tabIndex === 1
    }

    private isMiddlewareTab(): boolean {
        return this.tabIndex === 2
    }
}
