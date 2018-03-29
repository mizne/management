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
    getPhysicalServerAccountCount,
} from './reducers'

import {
    fromServerTopology,
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
    selector: 'app-server-topology',
    templateUrl: './server-topology.component.html',
    styleUrls: ['./server-topology.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerTopologyComponent implements OnInit {
    tabIndex = 0

    webSite = [
        { x: '2018-03-20', y: 11 },
        { x: '2018-03-21', y: 21 },
        { x: '2018-03-22', y: 31 },
        { x: '2018-03-23', y: 41 },
        { x: '2018-03-24', y: 51 }
    ]

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

    tabChange(tabIndex: number) {
        // 由于第一次切换tab时 被激活tab不渲染G2图表 故手动触发resize事件来渲染图表
        window.dispatchEvent(new Event('resize'))
    }

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
