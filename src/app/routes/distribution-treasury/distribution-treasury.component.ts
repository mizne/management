import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { FormControl, FormGroup, FormBuilder } from '@angular/forms'
import {
    ResourceInfo,
    ResourceUseInfo
} from '@core/models/distribution-treasury.model'
import { Observable } from 'rxjs/Observable'
import { merge } from 'rxjs/observable/merge'
import { Store } from '@ngrx/store'
import {
    State,
    getResourceInfoes,
    getResourceInfoesCount,
    getResourceInfoLoading,
    getResourceUseInfoes,
    getResourceUseInfoesCount,
    getResourceUseInfoLoading,
    getResourceInfoPageParams,
    getResourceUseInfoPageParams
} from './reducers'
import {
    FetchResourceInfoesAction,
    FetchResourceInfoesCountAction,
    CreateResourceInfoAction,
    EditResourceInfoAction,
    EnsurePageParamsAction as EnsureResourceInfoPageParamsAction
} from './actions/resource-entry.action'
import {
    FetchResourceUseInfoesAction,
    FetchResourceUseInfoesCountAction,
    EditResourceUseInfoAction,
    EnsurePageParamsAction as EnsureResourceUseInfoPageParamsAction
} from './actions/resource-assign.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'

import { ToCreateResourceInfoComponent } from './modals/to-create-resource-info/to-create-resource-info.component'
import { ToEditResourceInfoComponent } from './modals/to-edit-resource-info/to-edit-resource-info.component'
import { ToShowResourceInfoComponent } from './modals/to-show-resource-info/to-show-resource-info.component'
import { mergeMap, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-distribution-treasury',
    templateUrl: './distribution-treasury.component.html',
    styleUrls: ['./distribution-treasury.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionTreasuryComponent implements OnInit {
    tabIndex = 0

    resourceInfoSearchForm: FormGroup
    resourceInfoes$: Observable<ResourceInfo[]>
    resourceInfoesCount$: Observable<number>
    resourceInfoesLoading$: Observable<boolean>
    resourceInfoPageIndex = 1
    resourceInfoPageSize = 10
    resourceEntryPageChangeSub: Subject<void> = new Subject<void>()
    toCreateResourceInfoSub: Subject<void> = new Subject<void>()
    toEditResourceInfoSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    toShowResourceInfoSub: Subject<ResourceInfo> = new Subject<ResourceInfo>()
    resourceInfoPageChangeSub: Subject<void> = new Subject<void>()
    resourceInfoResetSub: Subject<void> = new Subject<void>()

    resourceUseInfoSearchForm: FormGroup
    resourceUseInfoEditForm: FormGroup
    resourceUseInfoes$: Observable<ResourceUseInfo[]>
    resourceUseInfoesCount$: Observable<number>
    resourceUseInfoesLoading$: Observable<boolean>
    resourceUseInfoPageIndex = 1
    resourceUseInfoPageSize = 10
    resourceAssignPageChangeSub: Subject<void> = new Subject<void>()
    selectResourceUseInfoSub: Subject<ResourceUseInfo> = new Subject<
        ResourceUseInfo
        >()
    toEditResourceUseInfoSub: Subject<void> = new Subject<void>()
    resourceUseInfoPageChangeSub: Subject<void> = new Subject<void>()
    resourceUseInfoResetSub: Subject<void> = new Subject<void>()

    constructor(
        private messageService: NzMessageService,
        private modalService: NzModalService,
        private store: Store<State>,
        private destroyService: DestroyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm()
        this.intDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    tabChange(tabIndex: number) { }

    toCreateResourceInfo() {
        this.toCreateResourceInfoSub.next()
    }

    queryResourceInfoForm() {
        this.resourceInfoResetSub.next()
    }

    resetResourceInfoForm() {
        this.resourceInfoSearchForm.reset()
    }

    resourceInfoPageChage() {
        this.resourceEntryPageChangeSub.next()
    }

    toEditResourceInfo(resourceInfo: ResourceInfo) {
        this.toEditResourceInfoSub.next(resourceInfo)
    }

    toShowResourceInfo(resourceInfo: ResourceInfo) {
        this.toShowResourceInfoSub.next(resourceInfo)
    }

    queryResourceUseInfoForm() {
        this.resourceUseInfoResetSub.next()
    }

    resetResourceUseInfoForm() {
        this.resourceUseInfoSearchForm.reset()
    }

    resourceUseInfoPageChage() {
        this.resourceAssignPageChangeSub.next()
    }

    toEditResourceUseInfo() {
        this.toEditResourceUseInfoSub.next()
    }

    selectdResourceUseInfo(resourceUseInfo: ResourceUseInfo) {
        this.selectResourceUseInfoSub.next(resourceUseInfo)
    }

    private buildForm() {
        this.resourceInfoSearchForm = this.fb.group({
            resourceType: [null],
            softwareType: [null],
            softwareName: [null]
        })

        this.resourceUseInfoSearchForm = this.fb.group({
            resourceType: [null],
            softwareType: [null],
            softwareName: [null]
        })

        this.resourceUseInfoEditForm = this.fb.group({
            softwareType: [null],
            softwareName: [null],
            softwareVersion: [null],
            whoUse: [null],
            useCount: [null],
            countUnit: [null],
            useStartTime: [null],
            operator: [null]
        })
    }

    private intDataSource(): void {
        this.resourceInfoes$ = this.store.select(getResourceInfoes)
        this.resourceInfoesCount$ = this.store.select(getResourceInfoesCount)
        this.resourceInfoesLoading$ = this.store.select(getResourceInfoLoading)

        this.resourceUseInfoes$ = this.store.select(getResourceUseInfoes)
        this.resourceUseInfoesCount$ = this.store.select(
            getResourceUseInfoesCount
        )
        this.resourceUseInfoesLoading$ = this.store.select(
            getResourceUseInfoLoading
        )
    }

    private initDispatcher(): void {
        this.store.dispatch(new FetchResourceInfoesAction())
        this.store.dispatch(new FetchResourceInfoesCountAction())

        this.store.dispatch(new FetchResourceUseInfoesAction())
        this.store.dispatch(new FetchResourceUseInfoesCountAction())
    }

    private initSubscriber(): void {
        this.initFirstTabSubscriber()
        this.initSecondTabSubscriber()
    }

    private initFirstTabSubscriber() {
        this.initCreateResourceInfo()
        this.initEditResourceInfo()
        this.initShowResourceInfo()

        this.initSearchResourceInfoAndPageChange()
    }

    private initSecondTabSubscriber() {
        this.initPatchResourceUseInfoToEdit()
        this.initEditResourceUseInfo()
        this.initSearchResourceUseInfoAndPageChange()
    }

    private initCreateResourceInfo() {
        this.toCreateResourceInfoSub
            .asObservable()
            .pipe(
                mergeMap(() => {
                    return this.modalService.open({
                        title: '新增资源信息',
                        content: ToCreateResourceInfoComponent,
                        footer: false,
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resourceInfo => {
                this.store.dispatch(new CreateResourceInfoAction(resourceInfo))
            })
    }

    private initEditResourceInfo() {
        this.toEditResourceInfoSub
            .asObservable()
            .pipe(
                mergeMap(resourceInfo => {
                    return this.modalService.open({
                        title: '编辑资源信息',
                        content: ToEditResourceInfoComponent,
                        footer: false,
                        componentParams: { resourceInfo },
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resourceInfo => {
                this.store.dispatch(new EditResourceInfoAction(resourceInfo))
            })
    }

    private initShowResourceInfo() {
        this.toShowResourceInfoSub
            .asObservable()
            .pipe(
                mergeMap(resourceInfo => {
                    return this.modalService.open({
                        title: '查看资源信息',
                        content: ToShowResourceInfoComponent,
                        footer: false,
                        componentParams: { resourceInfo },
                        width: 800
                    })
                }),
                filter(e => typeof e !== 'string'),
                takeUntil(this.destroyService)
            )
            .subscribe(resourceInfo => {
                console.log(`show resource info success`)
            })
    }

    private initSearchResourceInfoAndPageChange(): void {
        this.resourceInfoResetSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new FetchResourceInfoesCountAction(
                        this.resourceInfoSearchForm.value
                    )
                )
            })

        merge(
            this.resourceEntryPageChangeSub.asObservable(),
            this.resourceInfoResetSub
                .asObservable()
                .pipe(
                    tap(() => {
                        this.resourceUseInfoPageIndex = 1
                        this.resourceInfoPageSize = 10
                    }),
                    withLatestFrom(this.store.select(getResourceInfoPageParams)),
                    filter(([_, { pageIndex, pageSize }]) =>
                        pageIndex === this.resourceUseInfoPageIndex &&
                        pageSize === this.resourceInfoPageSize)
                )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureResourceInfoPageParamsAction({
                        pageIndex: this.resourceUseInfoPageIndex,
                        pageSize: this.resourceInfoPageSize
                    })
                )
                this.store.dispatch(
                    new FetchResourceInfoesAction({
                        condition: this.resourceInfoSearchForm.value,
                        options: {
                            pageIndex: this.resourceUseInfoPageIndex,
                            pageSize: this.resourceInfoPageSize
                        }
                    })
                )
            })
    }

    private initPatchResourceUseInfoToEdit() {
        this.selectResourceUseInfoSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(resourceUseInfo => {
                this.resourceUseInfoEditForm.patchValue({
                    softwareType: resourceUseInfo.resource.softwareType,
                    softwareName: resourceUseInfo.resource.softwareName,
                    softwareVersion: resourceUseInfo.resource.softwareVersion,
                    whoUse: resourceUseInfo.whoUse,
                    useCount: resourceUseInfo.useCount,
                    countUnit: resourceUseInfo.countUnit,
                    useStartTime: resourceUseInfo.useStartTime,
                    operator: resourceUseInfo.operator
                })
            })
    }

    private initEditResourceUseInfo() {
        this.toEditResourceUseInfoSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                console.log(
                    `to edit resource use info: `,
                    this.resourceUseInfoSearchForm.value
                )
                this.store.dispatch(
                    new EditResourceUseInfoAction(
                        this.resourceUseInfoSearchForm.value
                    )
                )
            })
    }

    private initSearchResourceUseInfoAndPageChange(): void {
        this.resourceUseInfoResetSub
            .asObservable()
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new FetchResourceUseInfoesCountAction(
                        this.resourceUseInfoSearchForm.value
                    )
                )
            })

        merge(
            this.resourceAssignPageChangeSub.asObservable(),
            this.resourceUseInfoResetSub
                .pipe(
                    tap(() => {
                        this.resourceUseInfoPageIndex = 1
                        this.resourceUseInfoPageSize = 10
                    }),
                    withLatestFrom(this.store.select(getResourceUseInfoPageParams)),
                    filter(
                        ([_, { pageIndex, pageSize }]) =>
                            pageIndex === this.resourceUseInfoPageIndex &&
                            pageSize === this.resourceUseInfoPageSize
                    )
                )
        )
            .pipe(takeUntil(this.destroyService))
            .subscribe(() => {
                this.store.dispatch(
                    new EnsureResourceUseInfoPageParamsAction({
                        pageIndex: this.resourceUseInfoPageIndex,
                        pageSize: this.resourceUseInfoPageSize
                    })
                )
                this.store.dispatch(
                    new FetchResourceUseInfoesAction({
                        condition: this.resourceUseInfoSearchForm.value,
                        options: {
                            pageIndex: this.resourceUseInfoPageIndex,
                            pageSize: this.resourceUseInfoPageSize
                        }
                    })
                )
            })
    }
}
