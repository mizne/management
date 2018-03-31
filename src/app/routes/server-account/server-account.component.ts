import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount,
    ServerAccountType
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

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { TableService, HAS_MULTI_TYPE } from '@core/services/table.service'
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
    withLatestFrom,
    mapTo
} from 'rxjs/operators'

import { actionCreator } from './reducers/cluster-server-account.reducer'
import { actionCreator as physicalActionCreator } from './reducers/physical-server-account.reducer'
import { actionCreator as virtualActionCreator } from './reducers/virtual-server-account.reducer'

@Component({
    selector: 'app-server-account',
    templateUrl: './server-account.component.html',
    styleUrls: ['./server-account.component.less'],
    providers: [
        DestroyService,
        TableService,
        { provide: HAS_MULTI_TYPE, useValue: true }
    ],
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

    toSearchPhysicalSub: Subject<void> = new Subject<void>()
    searchPhysicalCtrl: FormControl = new FormControl()

    virtuals$: Observable<VirtualServerAccount[]>
    virtualsCount$: Observable<number>
    virtualLoading$: Observable<boolean>
    virtualPageIndex = 1
    virtualPageSize = 10
    virtualPageChangeSub: Subject<void> = new Subject<void>()
    toSearchVirtualSub: Subject<void> = new Subject<void>()
    searchVirtualCtrl: FormControl = new FormControl()

    clusters$: Observable<ClusterServerAccount[]>
    clustersCount$: Observable<number>
    clusterLoading$: Observable<boolean>
    clusterPageIndex = 1
    clusterPageSize = 10
    clusterPageChangeSub: Subject<void> = new Subject<void>()
    toSearchClusterSub: Subject<void> = new Subject<void>()
    searchClusterCtrl: FormControl = new FormControl()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private tableService: TableService
    ) { }

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) { }

    // Physical Server Tab
    toCreatePhysical() {
        this.tableService.preCreateItem({
            title: '新建物理服务器台帐',
            content: ToCreatePhysicalServerAccountComponent,
            type: ServerAccountType.PHYSICAL
        })
    }

    onSearchPhysical() {
        this.toSearchPhysicalSub.next()
    }

    fetchPhysicals() {
        this.physicalPageChangeSub.next()
    }

    toEditPhysical(account: PhysicalServerAccount) {
        this.tableService.preEditItem({
            title: '编辑物理服务器台帐',
            content: ToEditPhysicalServerAccountComponent,
            data: account,
            type: ServerAccountType.PHYSICAL
        })
    }

    toShowPhysical(account: PhysicalServerAccount) {
        this.tableService.preShowItem({
            title: '查看物理服务器台帐',
            content: ToShowPhysicalServerAccountComponent,
            data: account,
            type: ServerAccountType.PHYSICAL
        })
    }

    toDeletePhysical(id: string) {
        this.tableService.preSingleDeleteItem({
            title: '删除物理服务器台帐',
            content: '确定删除这个物理服务器台帐?',
            id,
            type: ServerAccountType.PHYSICAL
        })
    }

    // Virtual Server Tab
    toCreateVirtual() {
        this.tableService.preCreateItem({
            title: '新建虚拟服务器台帐',
            content: ToCreateVirtualServerAccountComponent,
            type: ServerAccountType.VIRTUAL
        })
    }

    onSearchVirtual() {
        this.toSearchVirtualSub.next()
    }

    fetchVirtuals() {
        this.virtualPageChangeSub.next()
    }

    toEditVirtual(account: VirtualServerAccount) {
        this.tableService.preEditItem({
            title: '编辑虚拟服务器台帐',
            content: ToEditVirtualServerAccountComponent,
            data: account,
            type: ServerAccountType.VIRTUAL
        })
    }

    toShowVirtual(account: VirtualServerAccount) {
        this.tableService.preShowItem({
            title: '查看虚拟服务器台帐',
            content: ToShowVirtualServerAccountComponent,
            data: account,
            type: ServerAccountType.VIRTUAL
        })
    }

    toDeleteVirtual(id: string) {
        this.tableService.preSingleDeleteItem({
            title: '删除虚拟服务器台帐',
            content: '确定删除这个虚拟服务器台帐?',
            id,
            type: ServerAccountType.VIRTUAL
        })
    }

    // Cluster Server Tab
    toCreateCluster() {
        this.tableService.preCreateItem({
            title: '新建集群服务器台帐',
            content: ToCreateClusterServerAccountComponent,
            type: ServerAccountType.CLUSTER
        })
    }

    onSearchCluster() {
        this.toSearchClusterSub.next()
    }

    fetchClusters() {
        this.clusterPageChangeSub.next()
    }

    toEditCluster(account: ClusterServerAccount) {
        this.tableService.preEditItem({
            title: '编辑集群服务器台帐',
            content: ToEditClusterServerAccountComponent,
            data: account,
            type: ServerAccountType.CLUSTER
        })
    }

    toShowCluster(account: ClusterServerAccount) {
        this.tableService.preShowItem({
            title: '查看集群服务器台帐',
            content: ToShowClusterServerAccountComponent,
            data: account,
            type: ServerAccountType.CLUSTER
        })
    }

    toDeleteCluster(id) {
        this.tableService.preSingleDeleteItem({
            title: '删除集群服务器台帐',
            content: '确定删除这个集群服务器台帐?',
            id,
            type: ServerAccountType.CLUSTER
        })
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
        this.store.dispatch(physicalActionCreator.createFetchItemsAction())
        this.store.dispatch(physicalActionCreator.createFetchItemsCountAction())

        this.store.dispatch(
            virtualActionCreator.createFetchItemsAction()
        )
        this.store.dispatch(
            virtualActionCreator.createFetchItemsCountAction()
        )

        this.store.dispatch(actionCreator.createFetchItemsAction())
        this.store.dispatch(actionCreator.createFetchItemsCountAction())
    }

    private initSubscriber(): void {
        this.initFirstTab()
        this.initSecondTab()
        this.initThirdTab()
    }

    private initFirstTab() {
        this.initCreatePhysical()
        this.initSearchPhysicalAndPageChange()
        this.initEditPhysical()
        this.initShowPhysical()
        this.initDeletePhysical()
    }

    private initSecondTab() {
        this.initCreateVirtual()
        this.initSearchVirtualAndPageChange()
        this.initEditVirtual()
        this.initShowVirtual()
        this.initDeleteVirtual()
    }

    private initThirdTab() {
        this.initCreateCluster()
        this.initSearchClusterAndPageChange()
        this.initEditCluster()
        this.initShowCluster()
        this.initDeleteCluster()
    }

    private initDeletePhysical() {
        this.tableService
            .toSingleDeleteItem(ServerAccountType.PHYSICAL)
            .subscribe(id => {
                console.log(`ensure delete physical id: ${id}`)
            })
    }

    private initDeleteVirtual() {
        this.tableService
            .toSingleDeleteItem(ServerAccountType.VIRTUAL)
            .subscribe(id => {
                console.log(`ensure delete virtual id: ${id}`)
            })
    }

    private initDeleteCluster() {
        this.tableService
            .toSingleDeleteItem(ServerAccountType.CLUSTER)
            .subscribe(id => {
                console.log(`ensure delete cluster id: ${id}`)
            })
    }

    private initCreatePhysical(): void {
        this.tableService
            .toCreateItem(ServerAccountType.PHYSICAL)
            .subscribe(account => {
                this.store.dispatch(
                    physicalActionCreator.createCreateItemAction(account)
                )
            })
    }

    private initCreateVirtual(): void {
        this.tableService
            .toCreateItem(ServerAccountType.VIRTUAL)
            .subscribe(account => {
                this.store.dispatch(
                    virtualActionCreator.createCreateItemAction(account)
                )
            })
    }

    private initCreateCluster(): void {
        this.tableService
            .toCreateItem(ServerAccountType.CLUSTER)
            .subscribe(account => {
                this.store.dispatch(
                    actionCreator.createCreateItemAction(account)
                )
            })
    }

    private initSearchPhysicalAndPageChange(): void {
        this.toSearchPhysicalSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    physicalActionCreator.createFetchItemsCountAction(this.searchPhysicalCtrl.value)
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
                    physicalActionCreator.createEnsurePageParamsAction({
                        pageIndex: this.physicalPageIndex,
                        pageSize: this.physicalPageSize
                    })
                )
                this.store.dispatch(
                    physicalActionCreator.createFetchItemsAction({
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
                    virtualActionCreator.createFetchItemsCountAction({
                        condition: {
                            searchText: this.searchVirtualCtrl.value
                        }
                    })
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
                    virtualActionCreator.createEnsurePageParamsAction({
                        pageIndex: this.virtualPageIndex,
                        pageSize: this.virtualPageSize
                    })
                )
                this.store.dispatch(
                    virtualActionCreator.createFetchItemsAction({
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
                    actionCreator.createFetchItemsCountAction(this.searchClusterCtrl.value)
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
                this.store.dispatch(actionCreator.createEnsurePageParamsAction({
                    pageIndex: this.clusterPageIndex,
                    pageSize: this.clusterPageSize
                }))

                this.store.dispatch(actionCreator.createFetchItemsAction({
                    condition: { searchText: this.searchClusterCtrl.value },
                    options: {
                        pageIndex: this.clusterPageIndex,
                        pageSize: this.clusterPageSize
                    }
                }))
            })
    }

    private initEditPhysical(): void {
        this.tableService
            .toEditItem(ServerAccountType.PHYSICAL)
            .subscribe(account => {
                console.log(`to edit physical server account, `, account)
                this.store.dispatch(
                    physicalActionCreator.createEditItemAction(account)
                )
            })
    }

    private initEditVirtual() {
        this.tableService
            .toEditItem(ServerAccountType.VIRTUAL)
            .subscribe(account => {
                console.log(`to edit virtual server account, `, account)
                this.store.dispatch(
                    virtualActionCreator.createEditItemAction(account)
                )
            })
    }

    private initEditCluster() {
        this.tableService
            .toEditItem(ServerAccountType.CLUSTER)
            .subscribe(account => {
                console.log(`to edit cluster server account, `, account)
                this.store.dispatch(actionCreator.createEditItemAction(account))
            })
    }

    private initShowPhysical() {
        this.tableService
            .toShowItem(ServerAccountType.PHYSICAL)
            .subscribe(() => { })
    }

    private initShowVirtual() {
        this.tableService
            .toShowItem(ServerAccountType.VIRTUAL)
            .subscribe(() => { })
    }

    private initShowCluster() {
        this.tableService
            .toShowItem(ServerAccountType.CLUSTER)
            .subscribe(() => { })
    }
}
