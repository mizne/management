import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import * as moment from 'moment'
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
    getPhysicalServerAccountCount
} from './reducers'

import { fromServerTopology } from './actions'
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
    selector: 'app-server-topology',
    templateUrl: './server-topology.component.html',
    styleUrls: ['./server-topology.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerTopologyComponent implements OnInit {
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

        console.log(G2)
    }

    tabChange(tabIndex: number) {}

    private intDataSource(): void {}

    private initDispatcher(): void {}

    private initSubscriber(): void {}
}
