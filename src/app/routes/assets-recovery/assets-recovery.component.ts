import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import {
    FetchAssetsRecoveriesCountParams,
    AssetsRecovery
} from '@core/models/assets-recovery.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getAssetsRecoveries,
    getAssetsRecoveriesCount,
    getLoading,
    getAssetsRecoveryPageParams
} from './reducers'
import {
    FetchAssetsRecoveriesAction,
    FetchAssetsRecoveriesCountAction,
    EnsureRecoveryAction,
    EnsurePageParamsAction
} from './actions/assets-recovery.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'

import { ToShowResourceInfoComponent } from './modals/to-show-resource-info/to-show-resource-info.component'

@Component({
    selector: 'app-assets-recovery',
    templateUrl: './assets-recovery.component.html',
    styleUrls: ['./assets-recovery.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsRecoveryComponent implements OnInit {
    tabIndex = 0

    searchForm: FormGroup
    assetsRecoveries$: Observable<AssetsRecovery[]>
    assetsRecoveriesCount$: Observable<number>
    loading$: Observable<boolean>
    pageIndex = 1
    pageSize = 10
    pageChangeSub: Subject<void> = new Subject<void>()
    toRecoverySub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()
    toShowSub: Subject<AssetsRecovery> = new Subject<AssetsRecovery>()
    resetSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) {}

    queryForm() {
        this.resetSub.next()
    }

    resetForm() {
        this.searchForm.reset()
    }

    pageChage() {
        this.pageChangeSub.next()
    }

    toRecovery(resourceInfo: AssetsRecovery) {
        this.toRecoverySub.next(resourceInfo)
    }

    toShow(resourceInfo: AssetsRecovery) {
        this.toShowSub.next(resourceInfo)
    }

    private buildForm() {
        this.searchForm = this.fb.group({
            resourceType: [null],
            computeResourceType: [null]
        })
    }

    private intDataSource(): void {
        this.assetsRecoveries$ = this.store.select(getAssetsRecoveries)
        this.assetsRecoveriesCount$ = this.store.select(
            getAssetsRecoveriesCount
        )
        this.loading$ = this.store.select(getLoading)
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchAssetsRecoveriesAction())
        this.store.dispatch(new FetchAssetsRecoveriesCountAction())
    }

    private initSubscriber(): void {
        this.initEnsureRecovery()
        this.initShowAssetsRecovery()
        this.initSearchResourceInfoAndPageChange()
    }

    private initEnsureRecovery() {
        this.toRecoverySub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(assetsRecovery => {
                this.modalService.confirm({
                    title: '回收资产信息',
                    content: '确定回收这个资产信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new EnsureRecoveryAction(assetsRecovery)
                        )
                        console.log('ensure recovery, ', assetsRecovery)
                    }
                })
            })
    }

    private initShowAssetsRecovery() {
        this.toShowSub
            .asObservable()
            .mergeMap(assetsRecovery => {
                return this.modalService.open({
                    title: '可回收资源详情',
                    content: ToShowResourceInfoComponent,
                    footer: false,
                    componentParams: { assetsRecovery },
                    width: 800
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(resourceInfo => {
                console.log(`show asset recovery detail success`)
            })
    }

    private initSearchResourceInfoAndPageChange(): void {
        this.resetSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(
                    new FetchAssetsRecoveriesCountAction(this.searchForm.value)
                )
            })

        Observable.merge(
            this.pageChangeSub.asObservable(),
            this.resetSub
                .do(() => {
                    this.pageIndex = 1
                    this.pageSize = 10
                })
                .withLatestFrom(this.store.select(getAssetsRecoveryPageParams))
                .filter(
                    ([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.pageIndex &&
                        pageSize === this.pageSize
                )
        )
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(
                    new EnsurePageParamsAction({
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    })
                )
                this.store.dispatch(
                    new FetchAssetsRecoveriesAction({
                        condition: this.searchForm.value,
                        options: {
                            pageIndex: this.pageIndex,
                            pageSize: this.pageSize
                        }
                    })
                )
            })
    }
}
