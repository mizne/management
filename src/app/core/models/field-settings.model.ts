import * as uuid from 'uuid'

import { PaginationParams, defaultPaginationParams } from './pagination.model'

export class FieldSettings {
    id: string
    createdAt: string
    event: string
    operationContent: string
    operator: string
    userName: string
    userRole: string
    static generateFakeDataItems({ pageIndex, pageSize }): FieldSettings[] {
        return Array.from({ length: pageSize }, (_, i) => ({
            id: uuid.v4(),
            createdAt: `createdAt ${i + (pageIndex - 1) * pageSize}`,
            event: `event ${i + (pageIndex - 1) * pageSize}`,
            operationContent: `operationContent ${i +
                (pageIndex - 1) * pageSize}`,
            operator: `operator ${i + (pageIndex - 1) * pageSize}`,
            userName: `userName ${i + (pageIndex - 1) * pageSize}`,
            userRole: `userRole ${i + (pageIndex - 1) * pageSize}`
        }))
    }
}
