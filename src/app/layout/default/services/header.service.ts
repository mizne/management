import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { VisitorInvitationStatus } from '@core/models/visitor-invitation.model'
import { ExhibitorInvitationStatus } from '@core/models/exhibitor-invitation.model'

@Injectable()
export class HeaderService {
    constructor() {}

    fetchApprovalsCount(): Observable<number> {
        return Observable.forkJoin(
            this.fetchVisitorApprovalsCount(),
            this.fetchExhibitorApprovalsCount()
        ).map(([count1, count2]) => count1 + count2)
    }

    fetchVisitorApprovalsCount(): Observable<number> {
        return Observable.of(11).delay(4e2)
    }

    fetchExhibitorApprovalsCount(): Observable<number> {
        return Observable.of(13).delay(4e2)
    }
}
