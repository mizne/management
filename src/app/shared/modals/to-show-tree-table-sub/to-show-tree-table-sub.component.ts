import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    AfterViewInit
} from '@angular/core'
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

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { FormControl } from '@angular/forms'
import {
    filter,
    mergeMap,
    takeUntil,
    tap,
    withLatestFrom,
    map,
    share
} from 'rxjs/operators'

const data = {
    source: {
        nodes: [
            // {
            //     shape: 'clusterNode',
            //     x: 790 * window.innerWidth / 1858,
            //     y: 210 * window.innerHeight / 989,
            //     id: 'group3',
            //     label: '集群2'
            // },
            {
                shape: 'serverNode',
                x: 760 * window.innerWidth / 1858,
                y: 160 * window.innerHeight / 989,
                id: 'server6',
                label: '服务器6',
                color: '#a5d69c'
            },
            {
                shape: 'serverNode',
                x: 820 * window.innerWidth / 1858,
                y: 220 * window.innerHeight / 989,
                id: 'server5',
                label: '服务器5',
                color: '#a5d69c'
            },
            // {
            //     shape: 'clusterNode',
            //     x: 1180 * window.innerWidth / 1858,
            //     y: 500 * window.innerHeight / 989,
            //     id: 'group1',
            //     label: '集群1'
            // },
            // {
            //     shape: 'clusterNode',
            //     x: 430 * window.innerWidth / 1858,
            //     y: 470 * window.innerHeight / 989,
            //     id: 'group2',
            //     label: '集群2'
            // },
            // {
            //     shape: 'clusterNode',
            //     x: 430 * window.innerWidth / 1858,
            //     y: 210 * window.innerHeight / 989,
            //     id: 'group2',
            //     label: '集群1'
            // },
            // {
            //     shape: 'clusterNode',
            //     x: 1180 * window.innerWidth / 1858,
            //     y: 210 * window.innerHeight / 989,
            //     id: 'group1',
            //     label: '集群3'
            // },
            {
                shape: 'serverNode',
                x: 480 * window.innerWidth / 1858,
                y: 260 * window.innerHeight / 989,
                id: 'server2',
                label: '服务器2',
                color: '#daabab'
            },
            {
                shape: 'serverNode',
                x: 400 * window.innerWidth / 1858,
                y: 170 * window.innerHeight / 989,
                id: 'server1',
                label: '服务器1',
                color: '#a5d69c'
            },
            {
                shape: 'serverNode',
                x: 1150 * window.innerWidth / 1858,
                y: 180 * window.innerHeight / 989,
                id: 'server3',
                label: '服务器3',
                color: '#a5d69c'

            },
            {
                shape: 'serverNode',
                x: 1230 * window.innerWidth / 1858,
                y: 250 * window.innerHeight / 989,
                id: 'server4',
                label: '服务器4',
                color: '#daabab'
            }
            // {
            //     shape: 'serverNode',
            //      x: 0,
            //      y: 0,
            //     id: 'server7'
            //     // label: '服务器7',
            //     // color: '#a5d69c'
            // }
        ],
        edges: [
            // {
            //     source: 'group1',
            //     id: 'edge1',
            //     target: 'group2',
            //     shape: 'arrow'
            // },
            // {
            //     source: 'group3',
            //     id: 'edge2',
            //     target: 'group2'
            // },
            // {
            //     source: 'group1',
            //     id: 'edge3',
            //     target: 'group3'
            // },
            // {
            //     source: 'group1',
            //     id: 'edge4',
            //     target: 'server7'
            // }
        ]
    },
    guides: []
}

// G6.registerNode('clusterNode', {
//     draw(cfg, group) {
//         group.addShape('text', {
//             attrs: {
//                 x: cfg.x - 20,
//                 y: cfg.y - 110,
//                 fill: '#333',
//                 text: cfg.label
//             }
//         })
//         return group.addShape('rect', {
//             attrs: {
//                 x: cfg.x - 100,
//                 y: cfg.y - 100,
//                 width: 200,
//                 height: 200,
//                 fill: '#fff',
//                 stroke: 'red'
//             }
//         })
//     },
//     getAnchorPoints() {
//         return [
//             [0, 0.25],
//             [0, 0.5],
//             [0, 0.75],
//             [1, 0.25],
//             [1, 0.5],
//             [1, 0.75],
//             [0.25, 0],
//             [0.5, 0],
//             [0.75, 0],
//             [0.25, 1],
//             [0.5, 1],
//             [0.75, 1]
//         ]
//     }
// })
// function a() {
//     alert('aaaaa')
// }
G6.registerNode('serverNode', {
    draw(cfg, group) {
        // group.addShape('text', {
        //   attrs: {
        //     x: cfg.x - 20,
        //     y: cfg.y,
        //     fill: '#333',
        //     text: cfg.label
        //   }
        // });
        return group.addShape('rect', {
            attrs: {
                x: cfg.x - 25,
                y: cfg.y - 35,
                width: 50,
                height: 70,
                fill: cfg.color,
                stroke: '#f00'
            }
        })
    },

    afterDraw(cfg, group) {
        group.addShape('text', {
            attrs: {
                x: cfg.x - 20,
                y: cfg.y,
                fill: '#333',
                text: cfg.label
            }
        })
    },
    // getAnchorPoints() {
    //     return [
    //         [0, 0.25],
    //         [0, 0.5],
    //         [0, 0.75],
    //         [1, 0.25],
    //         [1, 0.5],
    //         [1, 0.75],
    //         [0.25, 0],
    //         [0.5, 0],
    //         [0.75, 0],
    //         [0.25, 1],
    //         [0.5, 1],
    //         [0.75, 1]
    //     ]
    // }
})

@Component({
    selector: 'app-to-show-tree-table-sub',
    templateUrl: './to-show-tree-table-sub.component.html',
    styleUrls: ['./to-show-tree-table-sub.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToShowTreeTableSubComponent implements OnInit, AfterViewInit {
    tabIndex = 0
    data = data
    net: any

    toShowTreeTableSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private destroyService: DestroyService
    ) { }

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) { }

    ngAfterViewInit() {
        this.net = new G6.Net({
            id: 'c1', // 容器ID
            mode: 'edit',
            width: window.innerWidth, // 画布宽
            height: window.innerHeight // 画布高
        })
        // 第五步：载入数据
        this.net.source(this.data.source.nodes, this.data.source.edges)
        // 第六步：渲染关系图
        this.net.render()

        // this.net.on('itemclick', ev => {
        //     // alert('击中' + ev.item.get('model').id + '!');
        //     this.modalService.open({
        //         title: ev.item.get('model').label,
        //         content: ToShowTreeTableSubComponent,
        //         footer: false,
        //         width: 800,
        //         // componentParams: { resource }
        //     })
        // });
    }

    save() {
        console.log(this.net.save())
    }

    private intDataSource(): void { }

    private initDispatcher(): void { }

    private initSubscriber(): void { }
}
