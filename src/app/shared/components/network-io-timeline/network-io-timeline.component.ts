import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import { map, startWith, scan, take, switchMap, tap } from 'rxjs/operators'
import * as randomFloat from 'random-float'
import * as moment from 'moment'
import { FormControl } from '@angular/forms'
import { of } from 'rxjs/observable/of'

const DataSet = require('@antv/data-set')
const scale = [
    {
        dataKey: '时间',
        min: 0,
        max: 1,
        tickCount: 15,
        formatter: val => val
    }
]

interface NetWorkAndIOUseInfo {
    时间: string
    网络速率: number
    磁盘读写速率: number
}

enum DurationType {
    REAL_TIME = 'REAL_TIME',
    LATEST_15_MINS = 'LATEST_15_MINS',
    LATEST_30_MINS = 'LATEST_30_MINS',
    LATEST_1_HOUR = 'LATEST_1_HOUR',
    LATEST_2_HOURS = 'LATEST_2_HOURS'
}

@Component({
    selector: 'app-network-io',
    templateUrl: './network-io-timeline.component.html'
})
export class NetWorkAndIOTimelineComponent implements OnInit {
    durationCtrl: FormControl = new FormControl(DurationType.REAL_TIME)
    durations = [
        {
            label: '实时',
            value: DurationType.REAL_TIME
        },
        {
            label: '15分钟',
            value: DurationType.LATEST_15_MINS
        },
        {
            label: '30分钟',
            value: DurationType.LATEST_30_MINS
        },
        {
            label: '1小时',
            value: DurationType.LATEST_1_HOUR
        },
        {
            label: '2小时',
            value: DurationType.LATEST_2_HOURS
        }
    ]

    forceFit = true
    height = 400
    data$: Observable<NetWorkAndIOUseInfo[]>
    scale = [
        {
            dataKey: '时间',
            min: 0,
            max: 1,
            tickCount: 15,
            formatter: val => val
        },
        {
            dataKey: '使用率',
            min: 0,
            max: 1,
            formatter: val => `${(val * 100).toFixed(2)} %`
        }
    ]

    latestNetwork: number
    latestIO: number

    private _timeDurationCount = 31
    @Input()
    set count(v: number) {
        this._timeDurationCount = v
    }
    private _timeDuration = 5e3
    @Input()
    set duration(v: number) {
        this._timeDuration = v
    }

    constructor() {}

    ngOnInit() {
        this.initFakeDataSource()
    }

    initFakeDataSource() {
        this.data$ = this.durationCtrl.valueChanges.pipe(
            startWith(this.durationCtrl.value),
            tap(durationType => {
                if (durationType === DurationType.REAL_TIME) {
                    this.scale = [
                        {
                            dataKey: '时间',
                            min: 0,
                            max: 1,
                            tickCount: 15,
                            formatter: val => val
                        },
                        {
                            dataKey: '使用率',
                            min: 0,
                            max: 1,
                            formatter: val => `${(val * 100).toFixed(2)} %`
                        }
                    ]
                } else {
                    this.scale = [
                        {
                            dataKey: '时间',
                            min: 0,
                            max: 1,
                            tickCount: 15,
                            formatter: val =>
                                moment(val, 'HH:mm:ss').format('HH:mm')
                        },
                        {
                            dataKey: '使用率',
                            min: 0,
                            max: 1,
                            formatter: val => `${(val * 100).toFixed(2)} %`
                        }
                    ]
                }
            }),
            switchMap(durationType => {
                switch (durationType) {
                    case DurationType.LATEST_15_MINS:
                        return this.lastestMinutesDataSource(15)
                    case DurationType.LATEST_30_MINS:
                        return this.lastestMinutesDataSource(30)
                    case DurationType.LATEST_1_HOUR:
                        return this.lastestMinutesDataSource(1 * 60)
                    case DurationType.LATEST_2_HOURS:
                        return this.lastestMinutesDataSource(2 * 60)
                    default:
                        return this.fakeRealTimeDataSource()
                }
            })
        )
    }

    private fakeRealTimeDataSource(): Observable<any[]> {
        const sourceData = Array.from(
            { length: this._timeDurationCount },
            (_, i) => ({
                时间: moment()
                    .subtract(
                        (this._timeDurationCount - 1 - i) * this._timeDuration,
                        'ms'
                    )
                    .format('HH:mm:ss'),
                网络速率: this.fakeRealRandomNetwork(),
                磁盘读写速率: this.fakeRealRandomIO()
            })
        )
        return timer(this._timeDuration, this._timeDuration).pipe(
            map(i => ({
                时间: moment().format('HH:mm:ss'),
                网络速率: this.fakeRealRandomNetwork(),
                磁盘读写速率: this.fakeRealRandomIO()
            })),
            scan<NetWorkAndIOUseInfo>((accu, curr) => {
                const t = accu.slice(1).concat(curr)
                return t
            }, sourceData),
            startWith(sourceData),
            map(src => {
                const dv1 = new (DataSet as any).View().source(src)
                dv1.transform({
                    type: 'fold',
                    fields: ['网络速率', '磁盘读写速率'],
                    key: 'resourceType',
                    value: '使用率'
                })
                return dv1.rows
            })
        )
    }

    private lastestMinutesDataSource(minutes: number): Observable<any[]> {
        const counts = minutes * 2 + 1
        const sourceData = Array.from({ length: counts }, (_, i) => ({
            时间: moment()
                .subtract(
                    (counts - 1 - i) * (minutes / counts) * 60 * 1000,
                    'ms'
                )
                .format('HH:mm:ss'),
            网络速率: this.fakeRealRandomNetwork(),
            磁盘读写速率: this.fakeRealRandomIO()
        }))
        return of(sourceData).pipe(
            map(src => {
                const dv1 = new (DataSet as any).View().source(src)
                dv1.transform({
                    type: 'fold',
                    fields: ['网络速率', '磁盘读写速率'],
                    key: 'resourceType',
                    value: '使用率'
                })
                return dv1.rows
            })
        )
    }

    private fakeRealRandomNetwork(): number {
        if (!this.latestNetwork) {
            const float = randomFloat(0, 1)
            const limit = Math.floor(float * 10000) / 10000
            this.latestNetwork = limit
            return Number(limit.toFixed(4))
        }

        const newFloat = randomFloat(-0.2, 0.2)
        const newLimit =
            this.latestNetwork + Math.floor(newFloat * 10000) / 10000
        this.latestNetwork = Math.min(0.9, Math.max(newLimit, 0.1))
        return Number(this.latestNetwork.toFixed(4))
    }

    private fakeRealRandomIO(): number {
        if (!this.latestIO) {
            const float = randomFloat(0, 1)
            const limit = Math.floor(float * 10000) / 10000
            this.latestIO = limit
            return Number(limit.toFixed(4))
        }

        const newFloat = randomFloat(-0.2, 0.2)
        const newLimit = this.latestIO + Math.floor(newFloat * 10000) / 10000
        this.latestIO = Math.min(0.9, Math.max(newLimit, 0.1))
        return Number(this.latestIO.toFixed(4))
    }
}
