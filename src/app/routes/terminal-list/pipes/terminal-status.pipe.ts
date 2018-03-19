import { Pipe, PipeTransform } from '@angular/core'

import { TerminalStatus } from '@core/models/terminal.model'

@Pipe({
    name: 'terminalStatus'
})
export class TerminalStatusPipe implements PipeTransform {
    transform(value: TerminalStatus): string {
        switch (value) {
            case TerminalStatus.UNBIND:
                return '未绑定'
            case TerminalStatus.BIND:
                return '已绑定'
            default:
                return '未知状态'
        }
    }
}
