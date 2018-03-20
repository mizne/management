import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'exhibitionDesc'
})
export class ExhibitionDescPipe implements PipeTransform {
    transform(value: any): string {
        if (value) {
            return `${value.startDate}~${value.endDate.slice(5)} ${
                value.address
            }`
        }
        return ''
    }
}
