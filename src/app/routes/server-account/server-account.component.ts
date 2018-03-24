import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount
} from '@core/models/server-account.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getPhysicalLoading,
    getPhysicalServerAccounts,
    getPhysicalServerAccountCount,
    getVirtualLoading,
    getVirtualServerAccounts,
    getVirtualServerAccountCount,
    getClusterLoading,
    getClusterServerAccounts,
    getClusterServerAccountCount,
    getPhysicalServerAccountsPageParams,
    getVirtualServerAccountsPageParams,
    getClusterServerAccountsPageParams
} from './reducers'
import {
    FetchPhysicalServerAccountsAction,
    FetchPhysicalServerAccountsCountAction,
    EnsurePageParamsAction as EnsurePhysicalServerPageParamsAction,
    CreatePhysicalServerAccountAction,
    EditPhysicalServerAccountAction
} from './actions/physical-server-account.action'
import {
    FetchVirtualServerAccountsAction,
    FetchVirtualServerAccountsCountAction,
    EnsurePageParamsAction as EnsureVirtualServerPageParamsAction,
    CreateVirtualServerAccountAction,
    EditVirtualServerAccountAction
} from './actions/virtual-server-account.action'
import {
    FetchClusterServerAccountsAction,
    FetchClusterServerAccountsCountAction,
    EnsurePageParamsAction as EnsureClusterServerPageParamsAction,
    CreateClusterServerAccountAction,
    EditClusterServerAccountAction
} from './actions/cluster-server-account.action'
import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { FormControl } from '@angular/forms'
import { ToCreatePhysicalServerAccountComponent } from './modals/to-create-physical-server-account/to-create-physical-server-account.component'
import { ToCreateVirtualServerAccountComponent } from './modals/to-create-virtual-server-account/to-create-virtual-server-account.component'
import { ToCreateClusterServerAccountComponent } from './modals/to-create-cluster-server-account/to-create-cluster-server-account.component'
import { ToEditPhysicalServerAccountComponent } from './modals/to-edit-physical-server-account/to-edit-physical-server-account.component'
import { ToEditVirtualServerAccountComponent } from './modals/to-edit-virtual-server-account/to-edit-virtual-server-account.component'
import { ToEditClusterServerAccountComponent } from './modals/to-edit-cluster-server-account/to-edit-cluster-server-account.component'
import { ToShowPhysicalServerAccountComponent } from './modals/to-show-physical-server-account/to-show-physical-server-account.component'
import { ToShowVirtualServerAccountComponent } from './modals/to-show-virtual-server-account/to-show-virtual-server-account.component'
import { ToShowClusterServerAccountComponent } from './modals/to-show-cluster-server-account/to-show-cluster-server-account.component'
import { filter, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-server-account',
    templateUrl: './server-account.component.html',
    styleUrls: ['./server-account.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerAccountComponent implements OnInit {
    tabIndex = 0
    buttonText = '新建物理服务器台账'
    searchText = '搜索物理服务器名称、类型'
    toCreateSub: Subject<void> = new Subject<void>()
    toSearchSub: Subject<void> = new Subject<void>()
    searchCtrl: FormControl = new FormControl()

    physicals$: Observable<PhysicalServerAccount[]>
    physicalsCount$: Observable<number>
    physicalLoading$: Observable<boolean>
    physicalPageIndex = 1
    physicalPageSize = 10
    physicalPageChangeSub: Subject<void> = new Subject<void>()
    toEditPhysicalSub: Subject<PhysicalServerAccount> = new Subject<
        PhysicalServerAccount
        >()
    toShowPhysicalSub: Subject<PhysicalServerAccount> = new Subject<
        PhysicalServerAccount
        >()

    virtuals$: Observable<VirtualServerAccount[]>
    virtualsCount$: Observable<number>
    virtualLoading$: Observable<boolean>
    virtualPageIndex = 1
    virtualPageSize = 10
    virtualPageChangeSub: Subject<void> = new Subject<void>()
    toEditVirtualSub: Subject<VirtualServerAccount> = new Subject<
        VirtualServerAccount
        >()
    toShowVirtualSub: Subject<VirtualServerAccount> = new Subject<
        VirtualServerAccount
        >()

    clusters$: Observable<ClusterServerAccount[]>
    clustersCount$: Observable<number>
    clusterLoading$: Observable<boolean>
    clusterPageIndex = 1
    clusterPageSize = 10
    clusterPageChangeSub: Subject<void> = new Subject<void>()
    toEditClusterSub: Subject<ClusterServerAccount> = new Subject<
        ClusterServerAccount
        >()
    toShowClusterSub: Subject<ClusterServerAccount> = new Subject<
        ClusterServerAccount
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
            this.buttonText = '新建物理服务器台账'
            this.searchText = '搜索物理服务器名称、类型'
        } else if (tabIndex === 1) {
            this.buttonText = '新建虚拟服务器台账'
            this.searchText = '搜索虚拟服务器名称、类型'
        } else if (tabIndex === 2) {
            this.buttonText = '新建集群服务器台账'
            this.searchText = '搜索集群服务器名称、类型'
        }
    }

    toCreate() {
        this.toCreateSub.next()
    }

    onSearch() {
        this.toSearchSub.next()
    }

    fetchPhysicals() {
        this.physicalPageChangeSub.next()
    }

    toEditPhysical(account: PhysicalServerAccount) {
        this.toEditPhysicalSub.next(account)
    }

    toShowPhysical(account: PhysicalServerAccount) {
        this.toShowPhysicalSub.next(account)
    }

    fetchVirtuals() {
        this.virtualPageChangeSub.next()
    }

    toEditVirtual(account: VirtualServerAccount) {
        this.toEditVirtualSub.next(account)
    }

    toShowVirtual(account: VirtualServerAccount) {
        this.toShowVirtualSub.next(account)
    }

    fetchClusters() {
        this.clusterPageChangeSub.next()
    }

    toEditCluster(account: ClusterServerAccount) {
        this.toEditClusterSub.next(account)
    }

    toShowCluster(account: ClusterServerAccount) {
        this.toShowClusterSub.next(account)
    }

    private intDataSource(): void {
        this.physicals$ = this.store.select(getPhysicalServerAccounts)
        this.physicalsCount$ = this.store.select(getPhysicalServerAccountCount)
        this.physicalLoading$ = this.store.select(getPhysicalLoading)

        this.virtuals$ = this.store.select(getVirtualServerAccounts)
        this.virtualsCount$ = this.store.select(getVirtualServerAccountCount)
        this.virtualLoading$ = this.store.select(getVirtualLoading)

        this.clusters$ = this.store.select(getClusterServerAccounts)
        this.clustersCount$ = this.store.select(getClusterServerAccountCount)
        this.clusterLoading$ = this.store.select(getClusterLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchPhysicalServerAccountsAction())
        this.store.dispatch(new FetchPhysicalServerAccountsCountAction())

        this.store.dispatch(new FetchVirtualServerAccountsAction())
        this.store.dispatch(new FetchVirtualServerAccountsCountAction())

        this.store.dispatch(new FetchClusterServerAccountsAction())
        this.store.dispatch(new FetchClusterServerAccountsCountAction())
    }

    private initSubscriber(): void {
        this.initCreatePhysical()
        this.initCreateVirtual()
        this.initCreateCluster()

        this.initSearchPhysicalAndPageChange()
        this.initSearchVirtualAndPageChange()
        this.initSearchClusterAndPageChange()

        this.initEditPhysical()
        this.initEditVirtual()
        this.initEditCluster()

        this.initShowPhysical()
        this.initShowVirtual()
        this.initShowCluster()
    }

    private initCreatePhysical(): void {
        this.toCreateSub
            .asObservable()
            .pipe(
                filter(() => this.isPhysicalTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建物理服务器台帐',
                        content: ToCreatePhysicalServerAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new CreatePhysicalServerAccountAction(account)
                )
            })
    }

    private initCreateVirtual(): void {
        this.toCreateSub
            .asObservable()
            .pipe(
                filter(() => this.isVirtualTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建虚拟服务器台帐',
                        content: ToCreateVirtualServerAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new CreateVirtualServerAccountAction(account)
                )
            })
    }

    private initCreateCluster(): void {
        this.toCreateSub
            .asObservable()
            .pipe(
                filter(() => this.isClusterTab()),
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新建集群服务器台帐',
                        content: ToCreateClusterServerAccountComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new CreateClusterServerAccountAction(account)
                )
            })
    }

    private initSearchPhysicalAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isPhysicalTab()),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                this.store.dispatch(
                    new FetchPhysicalServerAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.physicalPageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isPhysicalTab()),
                    tap(() => {
                        this.physicalPageIndex = 1
                        this.physicalPageSize = 10
                    }),
                    withLatestFrom(this.store.select(getPhysicalServerAccountsPageParams)),
                    filter(
                        ([_, { pageIndex, pageSize }]) =>
                            pageIndex === this.physicalPageIndex &&
                            pageSize === this.physicalPageSize
                    )
                )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsurePhysicalServerPageParamsAction({
                        pageIndex: this.physicalPageIndex,
                        pageSize: this.physicalPageSize
                    })
                )
                this.store.dispatch(
                    new FetchPhysicalServerAccountsAction({
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.physicalPageIndex,
                            pageSize: this.physicalPageSize
                        }
                    })
                )
            })
    }

    private initSearchVirtualAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isVirtualTab()),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                this.store.dispatch(
                    new FetchVirtualServerAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.virtualPageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isVirtualTab()),
                    tap(() => {
                        this.virtualPageIndex = 1
                        this.virtualPageSize = 10
                    }),
                    withLatestFrom(
                        this.store.select(getVirtualServerAccountsPageParams)
                    ),
                    filter(
                        ([_, { pageIndex, pageSize }]) =>
                            pageIndex === this.virtualPageIndex &&
                            pageSize === this.virtualPageSize
                    )
                )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureVirtualServerPageParamsAction({
                        pageIndex: this.virtualPageIndex,
                        pageSize: this.virtualPageSize
                    })
                )
                this.store.dispatch(
                    new FetchVirtualServerAccountsAction({
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.virtualPageIndex,
                            pageSize: this.virtualPageSize
                        }
                    })
                )
            })
    }

    private initSearchClusterAndPageChange(): void {
        this.toSearchSub
            .asObservable()
            .pipe(
                filter(() => this.isClusterTab()),
                takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new FetchClusterServerAccountsCountAction(
                        this.searchCtrl.value
                    )
                )
            })

        merge(
            this.clusterPageChangeSub.asObservable(),
            this.toSearchSub
                .pipe(
                    filter(() => this.isClusterTab()),
                    tap(() => {
                        this.clusterPageIndex = 1
                        this.clusterPageSize = 10
                    }),
                    withLatestFrom(
                        this.store.select(getClusterServerAccountsPageParams)
                    ),
                    filter(
                        ([_, { pageIndex, pageSize }]) =>
                            pageIndex === this.clusterPageIndex &&
                            pageSize === this.clusterPageSize
                    )
                )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureClusterServerPageParamsAction({
                        pageIndex: this.clusterPageIndex,
                        pageSize: this.clusterPageSize
                    })
                )
                this.store.dispatch(
                    new FetchClusterServerAccountsAction({
                        condition: { searchText: this.searchCtrl.value },
                        options: {
                            pageIndex: this.clusterPageIndex,
                            pageSize: this.clusterPageSize
                        }
                    })
                )
            })
    }

    private initEditPhysical(): void {
        this.toEditPhysicalSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑物理服务器台帐',
                        content: ToEditPhysicalServerAccountComponent,
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
                    new EditPhysicalServerAccountAction(account)
                )
            })
    }

    private initEditVirtual() {
        this.toEditVirtualSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑虚拟服务器台帐',
                        content: ToEditVirtualServerAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService))
            .subscribe(account => {
                this.store.dispatch(new EditVirtualServerAccountAction(account))
            })
    }

    private initEditCluster() {
        this.toEditClusterSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '编辑集群服务器台帐',
                        content: ToEditClusterServerAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(new EditClusterServerAccountAction(account))
            })
    }

    private initShowPhysical() {
        this.toShowPhysicalSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '查看物理服务器台帐',
                        content: ToShowPhysicalServerAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => { })
    }

    private initShowVirtual() {
        this.toShowVirtualSub
            .asObservable()
            .pipe(
                mergeMap(account => {
                    return this.modalService.open({
                        title: '查看虚拟服务器台帐',
                        content: ToShowVirtualServerAccountComponent,
                        footer: false,
                        width: 800,
                        componentParams: { account }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => { })
    }

    private initShowCluster() {
        this.toShowClusterSub
            .asObservable()
            .pipe(mergeMap(account => {
                return this.modalService.open({
                    title: '查看集群服务器台帐',
                    content: ToShowClusterServerAccountComponent,
                    footer: false,
                    width: 800,
                    componentParams: { account }
                })
            }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => { })
    }

    private isPhysicalTab(): boolean {
        return this.tabIndex === 0
    }

    private isVirtualTab(): boolean {
        return this.tabIndex === 1
    }

    private isClusterTab(): boolean {
        return this.tabIndex === 2
    }
}
