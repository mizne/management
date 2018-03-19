import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'

@Pipe({
    name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: string): string {
        const now = moment().valueOf()
        const d = moment(value, 'YYYY-MM-DD HH:mm:ss').valueOf()
        const diff = now - d
        if (diff < 0) {
            throw new Error(
                `time ago pipe need date must before now; date: ${value}`
            )
        }
        const oneSecond = 1 * 1000
        const oneMinute = 60 * oneSecond
        const oneHour = 60 * oneMinute
        const oneDay = 24 * oneHour

        if (diff < oneMinute) {
            return `${Math.floor(diff / oneSecond)}秒前`
        }

        if (diff < oneHour) {
            return `${Math.floor(diff / oneMinute)}分钟前`
        }

        if (diff < oneDay) {
            const hours = Math.floor(diff / oneHour)
            const minutes = Math.floor((diff % oneHour) / oneMinute)
            return `${hours}小时${minutes}分钟前`
        }

        return value
    }
}
