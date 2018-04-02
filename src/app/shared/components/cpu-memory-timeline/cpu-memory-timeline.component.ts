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

interface CPUAndMemoryUseInfo {
    时间: string
    CPU使用: number
    内存使用: number
}

enum DurationType {
    REAL_TIME = 'REAL_TIME',
    LATEST_15_MINS = 'LATEST_15_MINS',
    LATEST_30_MINS = 'LATEST_30_MINS',
    LATEST_1_HOUR = 'LATEST_1_HOUR',
    LATEST_2_HOURS = 'LATEST_2_HOURS'
}

@Component({
    selector: 'app-cpu-memory',
    templateUrl: './cpu-memory-timeline.component.html'
})
export class CPUAndMemoryTimelineComponent implements OnInit {
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
    data$: Observable<CPUAndMemoryUseInfo[]>
    scale = scale

    latestCPU: number
    latestMemory: number

    private _timeDurationCount = 30
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
        const sourceData = Array.from(
            { length: this._timeDurationCount },
            (_, i) => ({
                时间: moment()
                    .subtract(
                        (this._timeDurationCount - 1 - i) * this._timeDuration,
                        'ms'
                    )
                    .format('HH:mm:ss'),
                CPU使用: this.fakeRealRandomCPU(),
                内存使用: this.fakeRealRandomMemory()
            })
        )
        const realtime$ = timer(0, this._timeDuration).pipe(
            map(i => ({
                时间: moment().format('HH:mm:ss'),
                CPU使用: this.fakeRealRandomCPU(),
                内存使用: this.fakeRealRandomMemory()
            })),
            scan<CPUAndMemoryUseInfo>((accu, curr) => {
                const t = accu.slice(1).concat(curr)
                return t
            }, sourceData),
            map(src => {
                const dv1 = new (DataSet as any).View().source(src)
                dv1.transform({
                    type: 'fold',
                    fields: ['CPU使用', '内存使用'],
                    key: 'resourctType',
                    value: '使用率'
                })
                return dv1.rows
            })
        )

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
                        }
                    ]
                } else {
                    this.scale = [
                        {
                            dataKey: '时间',
                            min: 0,
                            max: 1,
                            tickCount: 15,
                            formatter: val => {
                                return moment(val, 'HH:mm:ss').format('HH:mm')
                            }
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
                        return realtime$
                }
            })
        )
    }

    private lastestMinutesDataSource(minutes: number): Observable<any[]> {
        const counts = minutes * 2
        const sourceData = Array.from({ length: counts }, (_, i) => ({
            时间: moment()
                .subtract(
                    (counts - 1 - i) * (minutes / counts) * 60 * 1000,
                    'ms'
                )
                .format('HH:mm:ss'),
            CPU使用: this.fakeRealRandomCPU(),
            内存使用: this.fakeRealRandomMemory()
        }))
        return of(sourceData).pipe(
            map(src => {
                const dv1 = new (DataSet as any).View().source(src)
                dv1.transform({
                    type: 'fold',
                    fields: ['CPU使用', '内存使用'],
                    key: 'resourctType',
                    value: '使用率'
                })
                return dv1.rows
            })
        )
    }

    private fakeRealRandomCPU(): number {
        if (!this.latestCPU) {
            const float = randomFloat(0, 1)
            const limit = Math.floor(float * 100) / 100
            this.latestCPU = limit
            return Number(limit.toFixed(2))
        }

        const newFloat = randomFloat(-0.2, 0.2)
        const newLimit = this.latestCPU + Math.floor(newFloat * 100) / 100
        this.latestCPU = Math.min(0.9, Math.max(newLimit, 0.1))
        return Number(this.latestCPU.toFixed(2))
    }

    private fakeRealRandomMemory(): number {
        if (!this.latestMemory) {
            const float = randomFloat(0, 1)
            const limit = Math.floor(float * 100) / 100
            this.latestMemory = limit
            return Number(limit.toFixed(2))
        }

        const newFloat = randomFloat(-0.2, 0.2)
        const newLimit = this.latestMemory + Math.floor(newFloat * 100) / 100
        this.latestMemory = Math.min(0.9, Math.max(newLimit, 0.1))
        return Number(this.latestMemory.toFixed(2))
    }
}
