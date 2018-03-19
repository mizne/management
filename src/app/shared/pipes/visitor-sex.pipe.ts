import { Pipe, PipeTransform } from '@angular/core'
import { VisitorSex } from '@core/models/visitor.model'

@Pipe({
    name: 'visitorSex'
})
export class VisitorSexPipe implements PipeTransform {
    transform(value: VisitorSex): string {
        switch (value) {
            case VisitorSex.FEMALE:
                return '女'
            case VisitorSex.MALE:
                return '男'
            default:
                return '未知性别'
        }
    }
}
