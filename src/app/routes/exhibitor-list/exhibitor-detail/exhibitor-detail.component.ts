import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'
import { State, getExhibitorDetail, getExhibitorDetailLoading } from '../reducers'
import { FetchExhibitorDetailAction } from '../actions/exhibitor-detail.action'
import { Exhibitor } from '@core/models/exhibitor.model'

@Component({
    selector: 'app-exhibitor-detail',
    templateUrl: './exhibitor-detail.component.html'
})
export class ExhibitorDetailComponent implements OnInit {
    exhibitorDetail$: Observable<Exhibitor>
    loading$: Observable<boolean>
    webSite: any[]
    constructor(private route: ActivatedRoute, private store: Store<State>) { }

    ngOnInit() {
        this.initDataSource()
        this.initDispatcher()

        this.generateFakeData()
    }

    private initDataSource() {
        this.exhibitorDetail$ = this.store.select(getExhibitorDetail)
        this.loading$ = this.store.select(getExhibitorDetailLoading)
    }

    private initDispatcher() {
        this.store.dispatch(
            new FetchExhibitorDetailAction(this.route.snapshot.params.id)
        )
    }

    private generateFakeData() {
        const visitData = []
        const beginDay = new Date().getTime()

        const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
        for (let i = 0; i < fakeY.length; i += 1) {
            visitData.push({
                x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
                    'YYYY-MM-DD'
                ),
                y: fakeY[i]
            })
        }

        this.webSite = visitData.slice(0, 10)
    }
}
