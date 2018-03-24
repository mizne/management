import { Component, OnInit } from '@angular/core'
import {
    Router,
    NavigationEnd,
    RouteConfigLoadStart,
    NavigationError
} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { ScrollService } from '@delon/theme'
import { DestroyService } from '@core/services/destroy.service'
import { mapTo, filter, delay, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'layout-default',
    templateUrl: './default.component.html',
    providers: [DestroyService]
})
export class LayoutDefaultComponent implements OnInit {
    fetching$: Observable<boolean>

    constructor(
        private router: Router,
        private scroll: ScrollService,
        private messageService: NzMessageService,
        private destroyService: DestroyService
    ) { }

    ngOnInit() {
        this.initFetching()
        this.initSubscriber()
    }

    private initFetching() {
        const routeStart$ = this.router.events
            .pipe(
                filter(ev => ev instanceof RouteConfigLoadStart),
                mapTo(true),
        )

        const routeError$ = this.router.events
            .pipe(
                filter(ev => ev instanceof NavigationError),
                mapTo(false)
            )

        const routeEnd$ = this.router.events
            .pipe(
                filter(ev => ev instanceof NavigationEnd),
                delay(1e2),
                mapTo(false)
            )

        this.fetching$ = merge(routeStart$, routeError$, routeEnd$)
    }

    private initSubscriber() {
        this.router.events
            .pipe(
                filter(ev => ev instanceof NavigationError),
                takeUntil(this.destroyService)
            )
            .subscribe((evt: NavigationError) => {
                this.messageService.error(`无法加载${evt.url}路由`, {
                    nzDuration: 1000 * 3
                })
            })

        this.router.events
            .pipe(
                filter(ev => ev instanceof NavigationEnd),
                takeUntil(this.destroyService)
            )
            .subscribe(() => {
                this.scroll.scrollToTop()
            })
    }
}
