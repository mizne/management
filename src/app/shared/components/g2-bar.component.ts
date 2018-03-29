import { Component, OnInit } from '@angular/core'

const data = [
    { ip: '192.168.1.1', 进程数: 38 },
    { ip: '1192.168.1.2', 进程数: 52 },
    { ip: '192.168.1.3', 进程数: 61 },
    { ip: '192.168.1.4', 进程数: 145 },
    { ip: '192.168.1.5', 进程数: 48 },
    { ip: '192.168.1.6', 进程数: 38 },
    { ip: '192.168.1.7', 进程数: 38 },
    { ip: '192.168.1.8', 进程数: 38 },
    { ip: '192.168.1.9', 进程数: 98 },
    { ip: '192.168.1.10', 进程数: 78 }
]

const scale = [
    {
        dataKey: '进程数',
        tickInterval: 20
    }
]

@Component({
    selector: 'app-bar',
    template: `
    <div>
      <v-chart [forceFit]="forceFit" [height]="height" [data]="data" [scale]="scale">
        <v-tooltip></v-tooltip>
        <v-axis></v-axis>
        <v-bar position="ip*进程数"></v-bar>
      </v-chart>
    </div>
    `
})
export class G2BarComponent implements OnInit {
    forceFit = true
    height = 400
    data = data
    scale = scale
    constructor() {}

    ngOnInit() {}
}
