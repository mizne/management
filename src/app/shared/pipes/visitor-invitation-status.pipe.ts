import { Pipe, PipeTransform } from '@angular/core'

import {
    VisitorInvitationStatus,
    VisitorInvitationStatuses
} from '@core/models/visitor-invitation.model'

@Pipe({
    name: 'visitorInvitationStatus'
})
export class VisitorInvitationsStatusPipe implements PipeTransform {
    transform(status: VisitorInvitationStatus, reason = ''): string {
        const dest = VisitorInvitationStatuses.find(e => e.status === status)
        return (
            (dest ? dest.label : '未知状态') + (reason ? `( ${reason} )` : '')
        )
    }
}
