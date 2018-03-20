import { Component, OnInit, OnDestroy } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getExhibitionStatistics,
    getInvitationActivities,
    getActivitiesLoading
} from './reducers'
import {
    FetchExhibitionStatisticsAction,
    FetchInvitationActivitiesAction
} from './actions/workspace.action'
import { InvitationActivity } from './models/workspace.model'

// {
//     "text": "短信设置",
//     "link": "/system-settings/sms-settings",
//     "translate": "sms-settings"
// }

@Component({
    selector: 'app-dashboard-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.less']
})
export class DashboardWorkspaceComponent implements OnInit, OnDestroy {
    radarData: any[] = [
        {
            name: '展商',
            label: '引用',
            value: 0
        },
        {
            name: '展商',
            label: '口碑',
            value: 0
        },
        {
            name: '展商',
            label: '产量',
            value: 0
        },
        {
            name: '展商',
            label: '贡献',
            value: 0
        },
        {
            name: '展商',
            label: '热度',
            value: 0
        },
        {
            name: '买家',
            label: '引用',
            value: 0
        },
        {
            name: '买家',
            label: '口碑',
            value: 0
        },
        {
            name: '买家',
            label: '产量',
            value: 0
        },
        {
            name: '买家',
            label: '贡献',
            value: 0
        },
        {
            name: '买家',
            label: '热度',
            value: 0
        },
        {
            name: '约请',
            label: '引用',
            value: 0
        },
        {
            name: '约请',
            label: '口碑',
            value: 0
        },
        {
            name: '约请',
            label: '产量',
            value: 0
        },
        {
            name: '约请',
            label: '贡献',
            value: 0
        },
        {
            name: '约请',
            label: '热度',
            value: 0
        }
    ]

    links = [
        {
            title: '平台消息',
            url: '/message-management/platform-message',
            icon: 'anticon-bell'
        },
        {
            title: '展商消息',
            url: '/message-management/exhibitor-message',
            icon: 'anticon-message'
        },
        {
            title: '买家消息',
            url: '/message-management/visitor-message',
            icon: 'anticon-user'
        },
        {
            title: '待我审核',
            url: '/approval-management/to-approve',
            icon: 'anticon-file'
        },
        {
            title: '审批历史',
            url: '/approval-management/approval-history',
            icon: 'anticon-file-text'
        },
        {
            title: '约请查询',
            url: '/invitation-management/invitation-query',
            icon: 'anticon-search'
        },

        {
            title: '展商列表',
            url: '/exhibitor-management',
            icon: 'anticon-shop'
        },
        {
            title: '买家列表',
            url: '/visitor-management',
            icon: 'anticon-shopping-cart'
        },
        {
            title: '终端列表',
            url: '/terminal-management',
            icon: 'anticon-tablet'
        },
        {
            title: '约请设置',
            url: '/system-settings/invitation-settings',
            icon: 'anticon-setting'
        }
        // {
        //     title: '短信设置',
        //     url: '/system-settings/sms-settings',
        //     icon: 'anticon-sound'
        // }
    ]

    activities$: Observable<InvitationActivity[]>
    statistics$: Observable<any>

    activitiesLoading$: Observable<boolean>

    constructor(
        public msg: NzMessageService,
        private router: Router,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.initDataSource()
        this.initDispatcher()

        this.initFakeChartData()
    }

    viewDetail(url: string) {
        this.router.navigate([url])
    }

    toShortcut(url: string) {
        this.router.navigate([url])
    }

    refreshInvitations() {
        this.store.dispatch(new FetchInvitationActivitiesAction())
    }

    ngOnDestroy(): void {}

    private initDataSource() {
        this.activities$ = this.store.select(getInvitationActivities)
        this.statistics$ = this.store
            .select(getExhibitionStatistics)
            .filter(e => !!e)

        this.activitiesLoading$ = this.store.select(getActivitiesLoading)
    }

    private initDispatcher() {
        this.store.dispatch(new FetchExhibitionStatisticsAction())
        this.store.dispatch(new FetchInvitationActivitiesAction())
    }

    private initFakeChartData() {
        this.statistics$.subscribe(statistics => {
            this.radarData = [
                {
                    name: '展商',
                    label: '引用',
                    value: 0
                },
                {
                    name: '展商',
                    label: '口碑',
                    value: 0
                },
                {
                    name: '展商',
                    label: '产量',
                    value: 0
                },
                {
                    name: '展商',
                    label: '贡献',
                    value: 0
                },
                {
                    name: '展商',
                    label: '热度',
                    value: statistics.exhibitorCount
                },
                {
                    name: '买家',
                    label: '引用',
                    value: 0
                },
                {
                    name: '买家',
                    label: '口碑',
                    value: 0
                },
                {
                    name: '买家',
                    label: '产量',
                    value: statistics.visitorCount
                },
                {
                    name: '买家',
                    label: '贡献',
                    value: 0
                },
                {
                    name: '买家',
                    label: '热度',
                    value: 0
                },
                {
                    name: '约请',
                    label: '引用',
                    value: 0
                },
                {
                    name: '约请',
                    label: '口碑',
                    value: 0
                },
                {
                    name: '约请',
                    label: '产量',
                    value: 0
                },
                {
                    name: '约请',
                    label: '贡献',
                    value: statistics.invitationCount
                },
                {
                    name: '约请',
                    label: '热度',
                    value: 0
                }
            ]
        })
    }
}
