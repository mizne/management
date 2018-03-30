import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { SystemLogger } from '@core/models/system-logger.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getSystemLoggerListLoading,
    getSystemLoggers,
    getSystemLoggersCount,
    getSystemLoggerListPageParams
} from './reducers'
import { fromSystemLoggerList } from './actions'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { ToShowSystemLoggerComponent } from './modals'
import {
    mergeMap,
    takeUntil,
    filter,
    tap,
    withLatestFrom
} from 'rxjs/operators'

@Component({
    selector: 'app-system-logger',
    templateUrl: './system-logger.component.html',
    styleUrls: ['./system-logger.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemLoggerComponent implements OnInit {
    tabIndex = 0

    systemLoggers$: Observable<SystemLogger[]>
    systemLoggersCount$: Observable<number>
    systemLoggerLoading$: Observable<boolean>
    systemLoggerPageIndex = 1
    systemLoggerPageSize = 10
    systemLoggerPageChangeSub: Subject<void> = new Subject<void>()
    toShowSystemLoggerSub: Subject<SystemLogger> = new Subject<SystemLogger>()
    searchSystemLoggerCtrl: FormControl = new FormControl()
    toSearchSystemLoggerSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService
    ) {}

    ngOnInit() {
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {}

    // System Logger Tab
    onSearchSystemLogger() {
        this.toSearchSystemLoggerSub.next()
    }

    fetchSystemLoggers() {
        this.systemLoggerPageChangeSub.next()
    }

    toShowSystemLogger(logger: SystemLogger) {
        this.toShowSystemLoggerSub.next(logger)
    }

    private intDataSource(): void {
        this.systemLoggers$ = this.store.select(getSystemLoggers)
        this.systemLoggersCount$ = this.store.select(getSystemLoggersCount)
        this.systemLoggerLoading$ = this.store.select(
            getSystemLoggerListLoading
        )
    }

    private initDispatcher(): void {
        this.store.dispatch(new fromSystemLoggerList.FetchSystemLoggersAction())
        this.store.dispatch(
            new fromSystemLoggerList.FetchSystemLoggersCountAction()
        )
    }

    private initSubscriber(): void {
        this.initSearchSystemLoggerAndPageChange()

        this.initShowSystemLogger()
    }

    private initSearchSystemLoggerAndPageChange(): void {
        this.toSearchSystemLoggerSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromSystemLoggerList.FetchSystemLoggersCountAction(
                        this.searchSystemLoggerCtrl.value
                    )
                )
            })

        merge(
            this.systemLoggerPageChangeSub.asObservable(),
            this.toSearchSystemLoggerSub.pipe(
                tap(() => {
                    this.systemLoggerPageIndex = 1
                    this.systemLoggerPageSize = 10
                }),
                withLatestFrom(
                    this.store.select(getSystemLoggerListPageParams)
                ),
                filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.systemLoggerPageIndex &&
                        pageSize === this.systemLoggerPageSize
                )
            )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new fromSystemLoggerList.EnsurePageParamsAction({
                        pageIndex: this.systemLoggerPageIndex,
                        pageSize: this.systemLoggerPageSize
                    })
                )
                this.store.dispatch(
                    new fromSystemLoggerList.FetchSystemLoggersAction({
                        condition: {
                            searchText: this.searchSystemLoggerCtrl.value
                        },
                        options: {
                            pageIndex: this.systemLoggerPageIndex,
                            pageSize: this.systemLoggerPageSize
                        }
                    })
                )
            })
    }

    private initShowSystemLogger() {
        this.toShowSystemLoggerSub
            .asObservable()
            .pipe(
                mergeMap(logger => {
                    return this.modalService.open({
                        title: '查看系统日志',
                        content: ToShowSystemLoggerComponent,
                        footer: false,
                        width: 800,
                        componentParams: { logger }
                    })
                }),
                takeUntil(this.destroyService)
            )
            .subscribe(account => {})
    }
}
