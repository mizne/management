import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    VisitorInvitation,
    FetchVisitorInvitationsParams,
    FetchVisitorInvitationsCountParams
} from '@core/models/visitor-invitation.model'
import { VisitorInvitationService } from '@core/services/visitor-invitation.service'

import {
    ExhibitorInvitation,
    FetchExhibitorInvitationsParams,
    FetchExhibitorInvitationsCountParams
} from '@core/models/exhibitor-invitation.model'
import { ExhibitorInvitationService } from '@core/services/exhibitor-invitation.service'

@Injectable()
export class InvitationQueryService {
    constructor(
        private visitorInvitationService: VisitorInvitationService,
        private exhibitorInvitationService: ExhibitorInvitationService
    ) {}
    fetchVisitorInvitations(
        params: FetchVisitorInvitationsParams
    ): Observable<VisitorInvitation[]> {
        return this.visitorInvitationService.fetchVisitorInvitations(
            VisitorInvitation.convertFetchItemsParams(params)
        )
    }

    fetchVisitorInvitationsCount(
        params: FetchVisitorInvitationsCountParams
    ): Observable<number> {
        return this.visitorInvitationService.fetchVisitorInvitationsCount(
            VisitorInvitation.convertFetchItemsCountParams(params)
        )
    }

    singleDeleteVisitor(id: string): Observable<any> {
        return this.visitorInvitationService.singleDelete(id)
    }

    batchDeleteVisitor(ids: string[]): Observable<any> {
        return this.visitorInvitationService.batchDelete(ids)
    }

    fetchExhibitorInvitations(
        params: FetchExhibitorInvitationsParams
    ): Observable<ExhibitorInvitation[]> {
        return this.exhibitorInvitationService.fetchExhibitorInvitations(
            ExhibitorInvitation.convertFetchItemsParams(params)
        )
    }

    fetchExhibitorInvitationsCount(
        params: FetchExhibitorInvitationsCountParams
    ): Observable<number> {
        return this.exhibitorInvitationService.fetchExhibitorInvitationsCount(
            ExhibitorInvitation.convertFetchItemsCountParams(params)
        )
    }

    singleDeleteExhibitor(id: string): Observable<any> {
        return this.exhibitorInvitationService.singleDelete(id)
    }

    batchDeleteExhibitor(ids: string[]): Observable<any> {
        return this.exhibitorInvitationService.batchDelete(ids)
    }
}
