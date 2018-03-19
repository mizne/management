import { Pipe, PipeTransform } from '@angular/core'
import { TargetExhibitor } from '@core/models/message.model'

@Pipe({
    name: 'exhibitorReceiver'
})
export class ExhibitorReceiverPipe implements PipeTransform {
    transform(value: string | TargetExhibitor): string {
        switch (value) {
            case TargetExhibitor.ALL:
                return '全部展商'
            default:
                return value
        }
    }
}
