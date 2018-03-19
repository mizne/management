import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { State, getVisitorDetail, getVisitorDetailLoading } from '../reducers'
import { FetchVisitorDetailAction } from '../actions/visitor-detail.action'
import { Visitor } from '@core/models/visitor.model'

@Component({
    selector: 'app-visitor-detail',
    templateUrl: './visitor-detail.component.html'
})
export class VisitorDetailComponent implements OnInit {
    visitorDetail$: Observable<Visitor>
    loading$: Observable<boolean>
    constructor(private route: ActivatedRoute, private store: Store<State>) {}

    ngOnInit() {
        this.visitorDetail$ = this.store.select(getVisitorDetail)
        this.loading$ = this.store.select(getVisitorDetailLoading)
        this.store.dispatch(
            new FetchVisitorDetailAction(this.route.snapshot.params.id)
        )
    }
}
