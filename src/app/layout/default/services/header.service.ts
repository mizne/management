import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { VisitorInvitationService } from '@core/services/visitor-invitation.service'
import { ExhibitorInvitationService } from '@core/services/exhibitor-invitation.service'
import { VisitorInvitationStatus } from '@core/models/visitor-invitation.model';
import { ExhibitorInvitationStatus } from '@core/models/exhibitor-invitation.model';

@Injectable()
export class HeaderService {
    constructor(
        private visitorInvitationService: VisitorInvitationService,
        private exhibitorInvitationService: ExhibitorInvitationService
    ) { }

    fetchApprovalsCount(): Observable<number> {
        return Observable.forkJoin(
            this.fetchVisitorApprovalsCount(),
            this.fetchExhibitorApprovalsCount()
        ).map(([count1, count2]) => count1 + count2)
    }

    fetchVisitorApprovalsCount(): Observable<number> {
        const params = {
            condition: { State: { $in: [VisitorInvitationStatus.UN_AUDIT] } }
        }
        return this.visitorInvitationService.fetchVisitorInvitationsCount(
            params
        )
    }

    fetchExhibitorApprovalsCount(): Observable<number> {
        const params = {
            condition: { State: { $in: [ExhibitorInvitationStatus.UN_AUDIT] } }
        }
        return this.exhibitorInvitationService.fetchExhibitorInvitationsCount(
            params
        )
    }
}
