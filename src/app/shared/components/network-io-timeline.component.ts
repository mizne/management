import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { timer } from 'rxjs/observable/timer'
import { map, startWith, scan, take } from 'rxjs/operators'
import * as randomFloat from 'random-float'
import * as moment from 'moment'

const DataSet = require('@antv/data-set')
const scale = [
    {
        dataKey: '时间',
        min: 0,
        max: 1
    }
]

interface NetWorkAndIOUseInfo {
    时间: string
    网络速率: number
    磁盘读写速率: number
}

@Component({
    selector: 'app-network-io',
    template: `
    <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data$ | async" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-axis></v-axis>
      <v-legend></v-legend>
      <v-smooth-line [position]="['时间', '使用率']" color="city" shape="smooth"></v-smooth-line>
      <v-point [position]="['时间', '使用率']" color="city" shape="circle"></v-point>
    </v-chart>
  </div>`
})
export class NetWorkAndIOTimelineComponent implements OnInit {
    forceFit = true
    height = 400
    data$: Observable<NetWorkAndIOUseInfo[]>
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
                网络速率: this.randomNumber(),
                磁盘读写速率: this.randomNumber()
            })
        )
        this.data$ = timer(0, this._timeDuration).pipe(
            map(i => ({
                时间: moment().format('mm:ss'),
                网络速率: this.randomNumber(),
                磁盘读写速率: this.randomNumber()
            })),
            scan<NetWorkAndIOUseInfo>((accu, curr) => {
                const t = accu.slice(1).concat(curr)
                return t
            }, sourceData),
            map(src => {
                const dv1 = new DataSet.View().source(src)
                dv1.transform({
                    type: 'fold',
                    fields: ['网络速率', '磁盘读写速率'],
                    key: 'city',
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
