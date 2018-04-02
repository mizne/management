import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import { map, startWith, scan, take } from 'rxjs/operators'
import * as randomFloat from 'random-float'
import * as moment from 'moment'
import { FormControl } from '@angular/forms'

const DataSet = require('@antv/data-set')
const scale = [
    {
        dataKey: '时间',
        min: 0,
        max: 1
    }
]

interface CPUAndMemoryUseInfo {
    时间: string
    CPU使用: number
    内存使用: number
}

@Component({
    selector: 'app-cpu-memory',
    templateUrl: './cpu-memory-timeline.component.html'
})
export class CPUAndMemoryTimelineComponent implements OnInit {
    durationCtrl: FormControl = new FormControl()
    durations = [
        {
            label: '实时',
            value: 'realtime'
        },
        {
            label: '15分钟',
            value: '15min'
        },
        {
            label: '30分钟',
            value: '30min'
        },
        {
            label: '1小时',
            value: '1h'
        },
        {
            label: '2小时',
            value: '2h'
        }
    ]

    forceFit = true
    height = 400
    data$: Observable<CPUAndMemoryUseInfo[]>
    scale = scale

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
                    .format('mm:ss'),
                CPU使用: this.randomNumber(),
                内存使用: this.randomNumber()
            })
        )
        this.data$ = timer(0, this._timeDuration).pipe(
            map(i => ({
                时间: moment().format('mm:ss'),
                CPU使用: this.randomNumber(),
                内存使用: this.randomNumber()
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
    }

    private randomNumber() {
        const float = randomFloat(0, 1)
        return Math.floor(float * 100) / 100
    }
}
