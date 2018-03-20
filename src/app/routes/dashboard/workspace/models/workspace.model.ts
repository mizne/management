export class InvitationActivity {
    id?: string
    time: string
    content: string

    static convertFromVisitorInvitation(invitation: any): InvitationActivity {
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

    static convertFromExhibitorInvitation(invitation: any): InvitationActivity {
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
