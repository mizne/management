import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'
import { VisitorInvitation, VisitorInvitationStatus } from '@core/models/visitor-invitation.model'
import { ExhibitorInvitation, ExhibitorInvitationStatus } from '@core/models/exhibitor-invitation.model'

import { VisitorInvitationService } from '@core/services/visitor-invitation.service'
import { ExhibitorInvitationService } from '@core/services/exhibitor-invitation.service'

@Injectable()
export class ApprovalHistoryService {
    constructor(
        private visitorInvitationService: VisitorInvitationService,
        private exhibitorInvitationService: ExhibitorInvitationService
    ) { }
    fetchVisitorApprovalHistory(
        params: PaginationParams
    ): Observable<VisitorInvitation[]> {
        const attachStateParams: FetchItemsParams = {
            condition: { State: { $nin: [VisitorInvitationStatus.UN_AUDIT] } },
            options: params
        }
        return this.visitorInvitationService.fetchVisitorInvitations(
            attachStateParams
        )
    }

    fetchVisitorApprovalHistoryCount(): Observable<number> {
        const params = {
            condition: { State: { $nin: [VisitorInvitationStatus.UN_AUDIT] } }
        }
        return this.visitorInvitationService.fetchVisitorInvitationsCount(
            params
        )
    }

    singleDeleteVisitorApprovalHistory(id: string): Observable<any> {
        return this.visitorInvitationService.singleDelete(id)
    }

    batchDeleteVisitorApprovalHistory(ids: string[]): Observable<any> {
        return this.visitorInvitationService.batchDelete(ids)
    }

    fetchExhibitorApprovalHistory(
        params: PaginationParams
    ): Observable<ExhibitorInvitation[]> {
        const attachStateParams: FetchItemsParams = {
            condition: { State: { $nin: [ExhibitorInvitationStatus.UN_AUDIT] } },
            options: params
        }
        return this.exhibitorInvitationService.fetchExhibitorInvitations(
            attachStateParams
        )
    }

    fetchExhibitorApprovalHistoryCount(): Observable<number> {
        const params = {
            condition: { State: { $nin: [ExhibitorInvitationStatus.UN_AUDIT] } }
        }
        return this.exhibitorInvitationService.fetchExhibitorInvitationsCount(
            params
        )
    }

    singleDeleteExhibitorApprovalHistory(id: string): Observable<any> {
        return this.exhibitorInvitationService.singleDelete(id)
    }

    batchDeleteExhibitorApprovalHistory(ids: string[]): Observable<any> {
        return this.exhibitorInvitationService.batchDelete(ids)
    }
}
