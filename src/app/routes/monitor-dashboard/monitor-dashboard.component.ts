import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    PhysicalServerAccount,
    VirtualServerAccount,
    ClusterServerAccount
} from '@core/models/server-account.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { timer } from 'rxjs/observable/timer'
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
    filter,
    mergeMap,
    takeUntil,
    tap,
    withLatestFrom,
    map
} from 'rxjs/operators'

@Component({
    selector: 'app-monitor-dashboard',
    templateUrl: './monitor-dashboard.component.html',
    styleUrls: ['./monitor-dashboard.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorDashboardComponent implements OnInit {
    tabIndex = 0
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

    couponFormat(val: any) {
        switch (parseInt(val, 10)) {
            case 20:
                return '低'
            case 40:
                return '中'
            case 60:
                return '高'
            case 80:
                return '极高'
            default:
                return ''
        }
    }

    private intDataSource(): void {}

    private initDispatcher(): void {}

    private initSubscriber(): void {}
}
