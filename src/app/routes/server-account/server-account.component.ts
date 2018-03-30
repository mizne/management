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
    fromClusterServer,
    fromPhysicalServer,
    fromVirtualServer
} from './actions'
import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { FormControl } from '@angular/forms'
import {
    ToCreatePhysicalServerAccountComponent,
    ToCreateVirtualServerAccountComponent,
    ToCreateClusterServerAccountComponent,
    ToEditPhysicalServerAccountComponent,
    ToEditVirtualServerAccountComponent,
    ToEditClusterServerAccountComponent,
    ToShowPhysicalServerAccountComponent,
    ToShowVirtualServerAccountComponent,
    ToShowClusterServerAccountComponent
} from './modals'
import {
    filter,
    mergeMap,
    takeUntil,
    tap,
    withLatestFrom
} from 'rxjs/operators'

@Component({
    selector: 'app-server-account',
    templateUrl: './server-account.component.html',
    styleUrls: ['./server-account.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerAccountComponent implements OnInit {
    tabIndex = 0

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
    toCreatePhysicalSub: Subject<void> = new Subject<void>()
    toSearchPhysicalSub: Subject<void> = new Subject<void>()
    searchPhysicalCtrl: FormControl = new FormControl()

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
    toCreateVirtualSub: Subject<void> = new Subject<void>()
    toSearchVirtualSub: Subject<void> = new Subject<void>()
    searchVirtualCtrl: FormControl = new FormControl()

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
    toCreateClusterSub: Subject<void> = new Subject<void>()
    toSearchClusterSub: Subject<void> = new Subject<void>()
    searchClusterCtrl: FormControl = new FormControl()

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

    tabChange(tabIndex: number) {}

    // Physical Server Tab
    toCreatePhysical() {
        this.toCreatePhysicalSub.next()
    }

    onSearchPhysical() {
        this.toSearchPhysicalSub.next()
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

    // Virtual Server Tab
    toCreateVirtual() {
        this.toCreateVirtualSub.next()
    }

    onSearchVirtual() {
        this.toSearchVirtualSub.next()
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

    // Cluster Server Tab
    toCreateCluster() {
        this.toCreateClusterSub.next()
    }

    onSearchCluster() {
        this.toSearchClusterSub.next()
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
        this.store.dispatch(
            new fromPhysicalServer.FetchPhysicalServerAccountsAction()
        )
        this.store.dispatch(
            new fromPhysicalServer.FetchPhysicalServerAccountsCountAction()
        )

        this.store.dispatch(
            new fromVirtualServer.FetchVirtualServerAccountsAction()
        )
        this.store.dispatch(
            new fromVirtualServer.FetchVirtualServerAccountsCountAction()
        )

        this.store.dispatch(
            new fromClusterServer.FetchClusterServerAccountsAction()
        )
        this.store.dispatch(
            new fromClusterServer.FetchClusterServerAccountsCountAction()
        )
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
        this.toCreatePhysicalSub
            .asObservable()
            .pipe(
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
                    new fromPhysicalServer.CreatePhysicalServerAccountAction(
                        account
                    )
                )
            })
    }

    private initCreateVirtual(): void {
        this.toCreateVirtualSub
            .asObservable()
            .pipe(
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
                    new fromVirtualServer.CreateVirtualServerAccountAction(
                        account
                    )
                )
            })
    }

    private initCreateCluster(): void {
        this.toCreateClusterSub
            .asObservable()
            .pipe(
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
                    new fromClusterServer.CreateClusterServerAccountAction(
                        account
                    )
                )
            })
    }

    private initSearchPhysicalAndPageChange(): void {
        this.toSearchPhysicalSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromPhysicalServer.FetchPhysicalServerAccountsCountAction(
                        this.searchPhysicalCtrl.value
                    )
                )
            })

        merge(
            this.physicalPageChangeSub.asObservable(),
            this.toSearchPhysicalSub.pipe(
                tap(() => {
                    this.physicalPageIndex = 1
                    this.physicalPageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getPhysicalServerAccountsPageParams)
                ),
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
                    new fromPhysicalServer.EnsurePageParamsAction({
                        pageIndex: this.physicalPageIndex,
                        pageSize: this.physicalPageSize
                    })
                )
                this.store.dispatch(
                    new fromPhysicalServer.FetchPhysicalServerAccountsAction({
                        condition: {
                            searchText: this.searchPhysicalCtrl.value
                        },
                        options: {
                            pageIndex: this.physicalPageIndex,
                            pageSize: this.physicalPageSize
                        }
                    })
                )
            })
    }

    private initSearchVirtualAndPageChange(): void {
        this.toSearchVirtualSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromVirtualServer.FetchVirtualServerAccountsCountAction(
                        this.searchVirtualCtrl.value
                    )
                )
            })

        merge(
            this.virtualPageChangeSub.asObservable(),
            this.toSearchVirtualSub.pipe(
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
                    new fromVirtualServer.EnsurePageParamsAction({
                        pageIndex: this.virtualPageIndex,
                        pageSize: this.virtualPageSize
                    })
                )
                this.store.dispatch(
                    new fromVirtualServer.FetchVirtualServerAccountsAction({
                        condition: { searchText: this.searchVirtualCtrl.value },
                        options: {
                            pageIndex: this.virtualPageIndex,
                            pageSize: this.virtualPageSize
                        }
                    })
                )
            })
    }

    private initSearchClusterAndPageChange(): void {
        this.toSearchClusterSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromClusterServer.FetchClusterServerAccountsCountAction(
                        this.searchClusterCtrl.value
                    )
                )
            })

        merge(
            this.clusterPageChangeSub.asObservable(),
            this.toSearchClusterSub.pipe(
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
                    new fromClusterServer.EnsurePageParamsAction({
                        pageIndex: this.clusterPageIndex,
                        pageSize: this.clusterPageSize
                    })
                )
                this.store.dispatch(
                    new fromClusterServer.FetchClusterServerAccountsAction({
                        condition: { searchText: this.searchClusterCtrl.value },
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
                    new fromPhysicalServer.EditPhysicalServerAccountAction(
                        account
                    )
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
                takeUntil(this.destroyService)
            )
            .subscribe(account => {
                this.store.dispatch(
                    new fromVirtualServer.EditVirtualServerAccountAction(
                        account
                    )
                )
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
                this.store.dispatch(
                    new fromClusterServer.EditClusterServerAccountAction(
                        account
                    )
                )
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
            .subscribe(account => {})
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
            .subscribe(account => {})
    }

    private initShowCluster() {
        this.toShowClusterSub
            .asObservable()
            .pipe(
                mergeMap(account => {
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
            .subscribe(account => {})
    }
}
