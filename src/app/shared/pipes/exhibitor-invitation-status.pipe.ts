import { Pipe, PipeTransform } from '@angular/core'

import {
    ExhibitorInvitationStatus,
    ExhibitorInvitationStatuses
} from '@core/models/exhibitor-invitation.model'

@Pipe({
    name: 'exhibitorInvitationStatus'
})
export class ExhibitorInvitationsStatusPipe implements PipeTransform {
    transform(status: ExhibitorInvitationStatus, reason = ''): string {
        const dest = ExhibitorInvitationStatuses.find(e => e.status === status)
        return (
            (dest ? dest.label : '未知状态') + (reason ? `( ${reason} )` : '')
        )
    }
}
