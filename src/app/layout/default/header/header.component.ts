import { Component, OnInit } from '@angular/core'
import { SettingsService } from '@delon/theme'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { combineLatest } from 'rxjs/observable/combineLatest'
import {
    State,
    getVisitorApprovalsCount,
    getExhibitorApprovalsCount
} from '../reducers'
import {
    FetchVisitorApprovalsCountAction,
    FetchExhibitorApprovalsCountAction
} from '../actions/header.action'
import { map } from 'rxjs/operators'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    searchToggleStatus: boolean
    approvalsCount$: Observable<number>

    constructor(
        public settings: SettingsService,
        private router: Router,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.initDataSource()
        this.initDispatcher()
    }

    toggleCollapsedSideabar() {
        this.settings.setLayout('collapsed', !this.settings.layout.collapsed)
    }

    searchToggleChange() {
        this.searchToggleStatus = !this.searchToggleStatus
    }

    ensureSearch(searchText: string) {
        if (searchText) {
            this.router.navigate([`/search-result/${searchText}`])
        }
    }

    toApprove() {
        // this.router.navigate(['/approval-management/to-approve'])
    }

    private initDataSource() {
        this.approvalsCount$ = combineLatest(
            this.store.select(getVisitorApprovalsCount),
            this.store.select(getExhibitorApprovalsCount)
        ).pipe(map(([count1, count2]) => count1 + count2))
    }

    private initDispatcher() {
        this.store.dispatch(new FetchVisitorApprovalsCountAction())
        this.store.dispatch(new FetchExhibitorApprovalsCountAction())
    }
}
