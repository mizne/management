import * as uuid from 'uuid'
import * as moment from 'moment'

import { PaginationParams, defaultPaginationParams } from './pagination.model'

export class SystemLogger {
    id: string
    createdAt: Date
    event: string
    operationContent: string
    operator: string
    userName: string
    userRole: string
    static generateFakeDataItems({ pageIndex, pageSize }): SystemLogger[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            createdAt: moment()
                .add(i + (pageIndex - 1) * pageSize, 'd')
                .toDate(),
            event: `event ${i + (pageIndex - 1) * pageSize}`,
            operationContent: `operationContent ${i +
                (pageIndex - 1) * pageSize}`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`,
            userName: `userName ${i + (pageIndex - 1) * pageSize}`,
            userRole: `userRole ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}
