import { Pipe, PipeTransform } from '@angular/core'
import { TargetVisitor } from '@core/models/message.model'

@Pipe({
    name: 'visitorReceiver'
})
export class VisitorReceiverPipe implements PipeTransform {
    transform(value: string | TargetVisitor): string {
        switch (value) {
            case TargetVisitor.ALL:
                return '全部买家'
            default:
                return value
        }
    }
}
