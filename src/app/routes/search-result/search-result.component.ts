import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getVisitors,
    getVisitorsCount,
    getVisitorResultLoading,
    getExhibitors,
    getExhibitorsCount,
    getExhibitorResultLoading
} from './reducers'
import {
    FetchVisitorsAction,
    FetchVisitorsCountAction
} from './actions/visitor-result.action'
import {
    FetchExhibitorsAction,
    FetchExhibitorsCountAction
} from './actions/exhibitor-result.action'
import { Visitor } from '@core/models/visitor.model'
import { Exhibitor } from '@core/models/exhibitor.model'

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {
    searchText: string
    visitors$: Observable<Visitor[]>
    visitorsCount$: Observable<number>
    visitorLoading$: Observable<boolean>
    visitorPageIndex = 1
    visitorPageSize = 10

    exhibitors$: Observable<Exhibitor[]>
    exhibitorsCount$: Observable<number>
    exhibitorLoading$: Observable<boolean>
    exhibitorPageIndex = 1
    exhibitorPageSize = 10
    constructor(private route: ActivatedRoute, private store: Store<State>) {}

    ngOnInit() {
        this.searchText = this.route.snapshot.params.searchText
        this.intDataSource()
        this.initDispatcher()
    }

    fetchVisitors() {
        this.store.dispatch(
            new FetchVisitorsAction({
                condition: {
                    Name: `/${this.searchText}/`
                },
                options: {
                    pageIndex: this.visitorPageIndex,
                    pageSize: this.visitorPageSize
                }
            })
        )
    }

    fetchExhibitors() {
        this.store.dispatch(
            new FetchExhibitorsAction({
                condition: {
                    CompanyName: `/${this.searchText}/`
                },
                options: {
                    pageIndex: this.exhibitorPageIndex,
                    pageSize: this.exhibitorPageSize
                }
            })
        )
    }

    private intDataSource(): void {
        this.visitors$ = this.store.select(getVisitors)
        this.visitorsCount$ = this.store.select(getVisitorsCount)
        this.visitorLoading$ = this.store.select(getVisitorResultLoading)

        this.exhibitors$ = this.store.select(getExhibitors)
        this.exhibitorsCount$ = this.store.select(getExhibitorsCount)
        this.exhibitorLoading$ = this.store.select(getExhibitorResultLoading)
    }

    private initDispatcher() {
        this.store.dispatch(
            new FetchVisitorsAction({
                condition: {
                    Name: `/${this.searchText}/`
                },
                options: {
                    pageIndex: 1,
                    pageSize: 10
                }
            })
        )
        this.store.dispatch(
            new FetchVisitorsCountAction({
                condition: {
                    Name: `/${this.searchText}/`
                }
            })
        )

        this.store.dispatch(
            new FetchExhibitorsAction({
                condition: {
                    CompanyName: `/${this.searchText}/`
                },
                options: {
                    pageIndex: 1,
                    pageSize: 10
                }
            })
        )
        this.store.dispatch(
            new FetchExhibitorsCountAction({
                condition: {
                    CompanyName: `/${this.searchText}/`
                }
            })
        )
    }
}
