import { Component, OnInit } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount
} from '@core/models/server-account.model'
import { Observable } from 'rxjs/Observable'
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
    getClusterServerAccountCount
} from './reducers'
import {
    FetchPhysicalServerAccountsAction,
    FetchPhysicalServerAccountsCountAction,
    EnsurePageParamsAction as EnsurePhysicalServerPageParamsAction
} from './actions/physical-server-account.action'
import {
    FetchVirtualServerAccountsAction,
    FetchVirtualServerAccountsCountAction,
    EnsurePageParamsAction as EnsureVirtualServerPageParamsAction
} from './actions/virtual-server-account.action'
import {
    FetchClusterServerAccountsAction,
    FetchClusterServerAccountsCountAction,
    EnsurePageParamsAction as EnsureClusterServerPageParamsAction
} from './actions/cluster-server-account.action'
import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'

interface CheckRow {
    id: string
    checked: boolean
}

@Component({
    selector: 'app-server-account',
    templateUrl: './server-account.component.html',
    styleUrls: ['./server-account.component.less'],
    providers: [DestroyService]
})
export class ServerAccountComponent implements OnInit {
    physicals$: Observable<PhysicalServerAccount[]>
    physicalsCount$: Observable<number>
    physicalLoading$: Observable<boolean>
    physicalPageIndex = 1
    physicalPageSize = 10

    virtuals$: Observable<VirtualServerAccount[]>
    virtualsCount$: Observable<number>
    virtualLoading$: Observable<boolean>
    virtualPageIndex = 1
    virtualPageSize = 10

    clusters$: Observable<ClusterServerAccount[]>
    clustersCount$: Observable<number>
    clusterLoading$: Observable<boolean>
    clusterPageIndex = 1
    clusterPageSize = 10

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

    fetchPhysicals() {
        this.store.dispatch(
            new EnsurePhysicalServerPageParamsAction({
                pageIndex: this.physicalPageIndex,
                pageSize: this.physicalPageSize
            })
        )
        this.store.dispatch(
            new FetchPhysicalServerAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.physicalPageIndex,
                    pageSize: this.physicalPageSize
                }
            })
        )
    }

    fetchVirtuals() {
        this.store.dispatch(
            new EnsureVirtualServerPageParamsAction({
                pageIndex: this.virtualPageIndex,
                pageSize: this.virtualPageSize
            })
        )
        this.store.dispatch(
            new FetchVirtualServerAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.virtualPageIndex,
                    pageSize: this.virtualPageSize
                }
            })
        )
    }

    fetchClusters() {
        this.store.dispatch(
            new EnsureClusterServerPageParamsAction({
                pageIndex: this.clusterPageIndex,
                pageSize: this.clusterPageSize
            })
        )
        this.store.dispatch(
            new FetchClusterServerAccountsAction({
                condition: {},
                options: {
                    pageIndex: this.clusterPageIndex,
                    pageSize: this.clusterPageSize
                }
            })
        )
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

    private initSubscriber(): void {}
}
