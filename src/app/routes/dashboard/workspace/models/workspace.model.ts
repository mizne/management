import { VisitorInvitation } from '@core/models/visitor-invitation.model'
import { ExhibitorInvitation } from '@core/models/exhibitor-invitation.model'

export class InvitationActivity {
    id?: string
    time: string
    content: string

    static convertFromVisitorInvitation(
        invitation: VisitorInvitation
    ): InvitationActivity {
        return {
            id: invitation.id,
            time: invitation.createdAt,
            content: `${invitation.initiator}(${invitation.initiatorCompany} ${
                invitation.initiatorJob
            }) 向 ${invitation.receiver}(${invitation.receiverCompany} ${
                invitation.receiverJob
            }) 发出邀请`
        }
    }

    static convertFromExhibitorInvitation(
        invitation: ExhibitorInvitation
    ): InvitationActivity {
        return {
            id: invitation.id,
            time: invitation.createdAt,
            content: `${invitation.initiator}(${invitation.initiatorCompany} ${
                invitation.initiatorJob
            }) 向 ${invitation.receiver}(${invitation.receiverCompany} ${
                invitation.receiverJob
            }) 发出邀请`
        }
    }
}
