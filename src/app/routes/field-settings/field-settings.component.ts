import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { FormControl } from '@angular/forms'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { SystemLogger } from '@core/models/system-logger.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getResourceFieldSettingsLoading,
    getResourceFieldSettings,
    getResourceFieldSettingsCount
} from './reducers'
import { fromResourceFieldSettings } from './actions'

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
    selector: 'app-field-settings',
    templateUrl: './field-settings.component.html',
    styleUrls: ['./field-settings.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldSettingsComponent implements OnInit {
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
        this.systemLoggers$ = this.store.select(getResourceFieldSettings)
        this.systemLoggersCount$ = this.store.select(
            getResourceFieldSettingsCount
        )
        this.systemLoggerLoading$ = this.store.select(
            getResourceFieldSettingsLoading
        )
    }

    private initDispatcher(): void {
        this.store.dispatch(
            new fromResourceFieldSettings.FetchResourceFieldSettingsAction()
        )
        this.store.dispatch(
            new fromResourceFieldSettings.FetchResourceFieldSettingsCountAction()
        )
    }

    private initSubscriber(): void {}
}
