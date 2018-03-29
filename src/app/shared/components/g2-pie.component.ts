import { Component, OnInit } from '@angular/core'

const DataSet = require('@antv/data-set')

const sourceData = [
    { item: '利用率', count: 80 },
    { item: '未利用', count: 19 }
]

const scale = [
    {
        dataKey: 'percent',
        min: 0,
        formatter: '.0%'
    }
]

const dv = new (DataSet as any).View().source(sourceData)
dv.transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
})
const data = dv.rows

@Component({
    selector: 'app-pie',
    template: `
    <div>
    <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
      <v-tooltip></v-tooltip>
      <v-axis></v-axis>
      <v-pie position="percent" color="item" [style]="pieStyle" [label]="labelConfig"></v-pie>
      <v-coord type="theta" [radius]="0.75" [innerRadius]="0.6"></v-coord>
    </v-chart>
  </div>
    `
})
export class G2PieComponent implements OnInit {
    forceFit = true
    height = 300
    data = data
    scale = scale
    pieStyle = {
        stroke: '#fff',
        lineWidth: 1
    }
    labelConfig = [
        'percent',
        {
            formatter: (val, item) => {
                return item.point.item + ': ' + val
            }
        }
    ]
    guideHtml = '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>'
    guidePosition = ['50%', '50%']
    constructor() {}

    ngOnInit() {}
}
