import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'
import { InvitationActivity } from '../models/workspace.model'
import { TenantService } from '@core/services/tenant.service'
import { ErrorLoggerService } from '@core/services/error-logger.service'

@Injectable()
export class WorkspaceService {
    constructor(
        private tenantService: TenantService,
        private errorLogger: ErrorLoggerService
    ) {}

    fetchActivities(): Observable<InvitationActivity[]> {
        return Observable.of([]).delay(4e2)
    }

    fetchStatistics(): Observable<any> {
        return Observable.of({
            id: `id`,
            name: `name`,
            startDate: `2018-03-11`,
            endDate: `2018-03-16`,
            address: `address`,
            exhibitorCount: 1,
            visitorCount: 2,
            terminalCount: 3,
            invitationCount: 4
        }).delay(4e2)
    }
}
