import { Pipe, PipeTransform } from '@angular/core'

import { Exhibition } from '@core/models/exhibition.model'

@Pipe({
    name: 'exhibitionDesc'
})
export class ExhibitionDescPipe implements PipeTransform {
    transform(value: Exhibition): string {
        if (value) {
            return `${value.startDate}~${value.endDate.slice(5)} ${
                value.address
            }`
        }
        return ''
    }
}
