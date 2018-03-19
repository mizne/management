import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { State, getVisitorApprovalDetail, getVisitorDetailLoading } from '../reducers'
import { FetchVisitorApprovalDetailAction } from '../actions/visitor-approval-detail.action'
import { VisitorInvitation } from '@core/models/visitor-invitation.model'

@Component({
    selector: 'app-visitor-approval-detail',
    templateUrl: './visitor-approval-detail.component.html',
    styles: []
})
export class VisitorApprovalDetailComponent implements OnInit {
    approvalDetail$: Observable<VisitorInvitation>
    loading$: Observable<boolean>
    constructor(private route: ActivatedRoute, private store: Store<State>) { }

    ngOnInit() {
        this.approvalDetail$ = this.store.select(getVisitorApprovalDetail)
        this.loading$ = this.store.select(getVisitorDetailLoading)

        this.store.dispatch(
            new FetchVisitorApprovalDetailAction(this.route.snapshot.params.id)
        )
    }
}
