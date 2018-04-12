import { Component, HostBinding, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { ThemesService, SettingsService, TitleService } from '@delon/theme'
import { filter } from 'rxjs/operators'

import { Store } from '@ngrx/store'
import { State } from './reducers'
import { FetchResourceTypesAction } from './actions/resource-type.action'
import { FetchSoftwareNamesAction } from './actions/software-name.action'
import { FetchSoftwareSpecsAction } from './actions/software-spec.action'
import { FetchSoftwareTypesAction } from './actions/software-type.action'
import { FetchUseEnvironmentsAction } from './actions/use-environment.action'

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    @HostBinding('class.layout-fixed')
    get isFixed() {
        return this.settings.layout.fixed
    }
    @HostBinding('class.layout-boxed')
    get isBoxed() {
        return this.settings.layout.boxed
    }
    @HostBinding('class.aside-collapsed')
    get isCollapsed() {
        return this.settings.layout.collapsed
    }

    constructor(
        private theme: ThemesService,
        private settings: SettingsService,
        private router: Router,
        private titleSrv: TitleService,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.initSubscriber()
        this.initDispatcher()
    }

    private initSubscriber() {
        this.initTitleSubscriber()
    }

    private initDispatcher() {
        this.store.dispatch(new FetchResourceTypesAction())
        this.store.dispatch(new FetchSoftwareNamesAction())
        this.store.dispatch(new FetchSoftwareSpecsAction())
        this.store.dispatch(new FetchSoftwareTypesAction())
        this.store.dispatch(new FetchUseEnvironmentsAction())
    }

    private initTitleSubscriber() {
        this.router.events
            .pipe(filter(evt => evt instanceof NavigationEnd))
            .subscribe(() => this.titleSrv.setTitle())
    }
}
