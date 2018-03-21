import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import { TabAction } from '@core/models/resource-apply.model'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import {
    State,
    getSaveOrSubmitLoading,
    getSaveOrSubmitText,
    getFetchApplyInfoLoading,
    getApplyInfo,
    getFetchApproversLoading,
    getApprovers,
    getAddedApplyResources,
    getAddableApplyResources,
    getFetchSavedAppliesLoading,
    getSavedApplies,
    getExtraTabs,
    getNeedManualSetTabIndex,
    getTabIndexToNeedManualSet
} from './reducers'
import {
    SwitchApplyTypeAction,
    AddApplyResourcesAction,
    CreateApplyResourceAction,
    EditTempApplyResourceAction,
    DeleteApplyResourceAction,
    SaveRequirementApplyAction,
    SubmitRequirementApplySuccessAction,
    ResetRequirementApplyAction,
    FetchApplyInfoAction,
    FetchApproversAction,
    SubmitRequirementApplyAction
} from './actions/requirement-apply.action'
import {
    FetchSavedAppliesAction,
    ToDetailSavedApplyAction,
    ToEditSavedApplyAction,
    SubmitSavedApplyAction,
    DeleteSavedApplyAction
} from './actions/saved-apply.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { ToCreateApplyResourceComponent } from './modals/to-create-apply-resource/to-create-apply-resource.component'
import { ToCreateSystemSoftwareAccountComponent } from './modals/to-create-system-software-account/to-create-system-software-account.component'
import { ToAddApplyResourceComponent } from './modals/to-add-apply-resource/to-add-apply-resource.component'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToEditApplyResourceComponent } from './modals/to-edit-apply-resource/to-edit-apply-resource.component'
import { ToEditSystemSoftwareAccountComponent } from './modals/to-edit-system-software-account/to-edit-system-software-account.component'
import { ToEditMiddlewareSoftwareAccountComponent } from './modals/to-edit-middleware-software-account/to-edit-middleware-software-account.component'
import { ToShowApplyResourceComponent } from './modals/to-show-apply-resource/to-show-apply-resource.component'
import { ToShowSystemSoftwareAccountComponent } from './modals/to-show-system-software-account/to-show-system-software-account.component'
import { ToShowMiddlewareSoftwareAccountComponent } from './modals/to-show-middleware-software-account/to-show-middleware-software-account.component'
import {
    ApplyInfo,
    Approver,
    ApplyResource,
    RequirementApply,
    TabOptions
} from '@core/models/resource-apply.model'
import {
    CloseExtraTabAction,
    ResetNeedManualSetTabIndexAction
} from './actions/extra-tabs.action'

@Component({
    selector: 'app-resource-apply',
    templateUrl: './resource-apply.component.html',
    styleUrls: ['./resource-apply.component.less'],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceApplyComponent implements OnInit {
    tabIndex = 0
    tabChangeSub: Subject<number> = new Subject<number>()

    // 第一个tab
    applyForm: FormGroup

    saveOrSubmitText$: Observable<string>
    saveOrSubmitLoading$: Observable<boolean>
    toSaveSub: Subject<RequirementApply> = new Subject<RequirementApply>()
    toSubmitSub: Subject<RequirementApply> = new Subject<RequirementApply>()
    toResetSub: Subject<RequirementApply> = new Subject<RequirementApply>()

    fetchApplyInfoLoading$: Observable<boolean>
    applyInfo$: Observable<ApplyInfo>

    addedApplyResources$: Observable<ApplyResource[]>
    toCreateResourceSub: Subject<void> = new Subject<void>()
    toAddResourcesSub: Subject<void> = new Subject<void>()
    toShowResourceSub: Subject<ApplyResource> = new Subject<ApplyResource>()
    toEditTempResourceSub: Subject<ApplyResource> = new Subject<ApplyResource>()
    toDeleteResourceSub: Subject<number> = new Subject<number>()

    fetchApproversLoading$: Observable<boolean>
    approvers$: Observable<Approver[]>

    // 第二个tab
    fetchSavedAppliesLoading$: Observable<boolean>
    savedApplies$: Observable<RequirementApply[]>
    toEditSavedApplySub: Subject<RequirementApply> = new Subject<
        RequirementApply
    >()
    toDetailSavedApplySub: Subject<RequirementApply> = new Subject<
        RequirementApply
    >()
    toSubmitSavedApplySub: Subject<RequirementApply> = new Subject<
        RequirementApply
    >()
    toDeleteSavedApplySub: Subject<RequirementApply> = new Subject<
        RequirementApply
    >()

    // 额外的tabs
    extraTabs$: Observable<TabOptions[]>
    toCloseExtraTabSub: Subject<string> = new Subject<string>()
    EDIT_EXTRA_TAB_ACTION = TabAction.EDIT
    DETAIL_EXTRA_TAB_ACTION = TabAction.DETAIL

    get type() {
        return this.applyForm.controls.type
    }
    get listNumber() {
        return this.applyForm.controls.listNumber
    }
    get applicantName() {
        return this.applyForm.controls.applicantName
    }
    get applicantDept() {
        return this.applyForm.controls.applicantDept
    }
    get applicantPhone() {
        return this.applyForm.controls.applicantPhone
    }
    get applyReason() {
        return this.applyForm.controls.applyReason
    }

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

    tabChange(tabIndex: number) {
        this.tabChangeSub.next(tabIndex)
    }

    toCreateResource() {
        this.toCreateResourceSub.next()
    }

    toAddResources() {
        this.toAddResourcesSub.next()
    }

    toShowResource(resource: ApplyResource) {
        this.toShowResourceSub.next(resource)
    }

    toEditTempResource(resource: ApplyResource) {
        this.toEditTempResourceSub.next(resource)
    }

    toDeleteResource(index: number) {
        this.toDeleteResourceSub.next(index)
    }

    toSave() {
        this.toSaveSub.next()
    }

    toSubmit() {
        this.toSubmitSub.next()
    }

    toCancel() {
        this.toResetSub.next()
    }

    toShowSavedApply(apply: RequirementApply) {
        this.toDetailSavedApplySub.next(apply)
    }

    toEditSavedApply(apply: RequirementApply) {
        this.toEditSavedApplySub.next(apply)
    }

    toSubmitSavedApply(apply: RequirementApply) {
        this.toSubmitSavedApplySub.next(apply)
    }

    toDeleteSavedApply(apply: RequirementApply) {
        this.toDeleteSavedApplySub.next(apply)
    }

    closeTab(id: string) {
        this.toCloseExtraTabSub.next(id)
    }

    private buildForm(): void {
        this.applyForm = this.fb.group({
            type: [null, Validators.required],
            listNumber: [null, Validators.required],
            applicantName: [null, Validators.required],
            applicantDept: [null, Validators.required],
            applicantPhone: [null, Validators.required],
            applyReason: [null]
        })
    }

    private intDataSource(): void {
        this.initFirstTabDataSource()
        this.initSecondTabDataSource()
        this.initExtraTabsDataSource()
    }

    private initFirstTabDataSource() {
        this.saveOrSubmitText$ = this.store.select(getSaveOrSubmitText)
        this.saveOrSubmitLoading$ = this.store.select(getSaveOrSubmitLoading)

        this.fetchApplyInfoLoading$ = this.store.select(
            getFetchApplyInfoLoading
        )
        this.applyInfo$ = this.store.select(getApplyInfo)

        this.addedApplyResources$ = this.store.select(getAddedApplyResources)

        this.fetchApproversLoading$ = this.store.select(
            getFetchApproversLoading
        )
        this.approvers$ = this.store.select(getApprovers)
    }

    private initSecondTabDataSource() {
        this.fetchSavedAppliesLoading$ = this.store.select(
            getFetchSavedAppliesLoading
        )
        this.savedApplies$ = this.store.select(getSavedApplies)
    }

    private initExtraTabsDataSource() {
        this.extraTabs$ = this.store.select(getExtraTabs)
    }

    private initDispatcher(): void {}

    private initSubscriber(): void {
        this.initFirstTabSubscriber()
        this.initSecondTabSubscriber()
        this.initExtraTabsSubscriber()
    }

    private initFirstTabSubscriber() {
        this.initSwitchApplyType()
        this.initPatchApplyInfo()

        this.initSaveRequirementApply()
        this.initSubmitRequirementApply()
        this.initResetRequirementApply()

        this.initCreateApplyResource()
        this.initAddApplyResources()
        this.initShowApplyResource()
        this.initEditTempApplyResource()
        this.initDeleteApplyResource()
    }

    private initSecondTabSubscriber() {
        this.initFetchSavedApplies()
        this.initToShowSavedApply()
        this.initToEditSavedApply()
        this.initToSubmitSavedApply()
        this.initToDeleteSavedApply()
    }

    private initExtraTabsSubscriber() {
        this.initCloseExtraTab()
        this.initNeedManualResetTabIndex()
    }

    private initSwitchApplyType() {
        this.type.valueChanges
            .takeUntil(this.destroyService)
            .filter(e => !!e)
            .subscribe(applyType => {
                this.store.dispatch(new SwitchApplyTypeAction(applyType))
            })
    }

    private initPatchApplyInfo() {
        this.store
            .select(getApplyInfo)
            .takeUntil(this.destroyService)
            .subscribe(applyInfo => {
                if (applyInfo) {
                    this.applyForm.patchValue(applyInfo, { emitEvent: false })
                } else {
                    this.applyForm.reset()
                }
            })
    }

    private initSaveRequirementApply() {
        this.toSaveSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(new SaveRequirementApplyAction())
            })
    }

    private initSubmitRequirementApply() {
        this.toSubmitSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(new SubmitRequirementApplyAction())
            })
    }

    private initResetRequirementApply() {
        this.toResetSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(() => {
                this.store.dispatch(new ResetRequirementApplyAction())
            })
    }

    private initCreateApplyResource() {
        this.toCreateResourceSub
            .asObservable()
            .mergeMap(() => {
                return this.modalService.open({
                    title: '新建资源信息',
                    content: ToCreateApplyResourceComponent,
                    footer: false,
                    width: 800
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(resource => {
                this.store.dispatch(new CreateApplyResourceAction(resource))
            })
    }

    private initAddApplyResources() {
        this.toAddResourcesSub
            .asObservable()
            .mergeMap(() => {
                return this.modalService.open({
                    title: '添加资源信息',
                    content: ToAddApplyResourceComponent,
                    footer: false,
                    width: 1000
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(resources => {
                this.store.dispatch(new AddApplyResourcesAction(resources))
            })
    }

    private initShowApplyResource() {
        this.toShowResourceSub
            .asObservable()
            .mergeMap(resource => {
                return this.modalService.open({
                    title: `${resource.id ? '添加' : '新增'}的资源信息`,
                    content: ToShowApplyResourceComponent,
                    footer: false,
                    width: 800,
                    componentParams: { resource }
                })
            })
            .takeUntil(this.destroyService)
            .subscribe(() => {})
    }

    private initEditTempApplyResource() {
        this.toEditTempResourceSub
            .asObservable()
            .mergeMap(resource => {
                return this.modalService.open({
                    title: '新增的资源信息',
                    content: ToEditApplyResourceComponent,
                    footer: false,
                    width: 1000,
                    componentParams: { resource }
                })
            })
            .filter(e => typeof e !== 'string')
            .takeUntil(this.destroyService)
            .subscribe(resource => {
                this.store.dispatch(new EditTempApplyResourceAction(resource))
            })
    }

    private initDeleteApplyResource() {
        this.toDeleteResourceSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(index => {
                this.modalService.confirm({
                    title: '删除资源信息',
                    content: '确定删除这个资源信息?',
                    onOk: () => {
                        this.store.dispatch(
                            new DeleteApplyResourceAction(index)
                        )
                    }
                })
            })
    }

    private initFetchSavedApplies() {
        this.tabChangeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .filter(tabIndex => tabIndex === 1)
            .first()
            .subscribe(tabIndex => {
                this.store.dispatch(new FetchSavedAppliesAction())
            })
    }

    private initToShowSavedApply() {
        this.toDetailSavedApplySub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(apply => {
                this.store.dispatch(new ToDetailSavedApplyAction(apply))
            })
    }

    private initToEditSavedApply() {
        this.toEditSavedApplySub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(apply => {
                this.store.dispatch(new ToEditSavedApplyAction(apply))
            })
    }

    private initToSubmitSavedApply() {
        this.toSubmitSavedApplySub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '提交申请',
                    content: '确定提交这个申请?',
                    onOk: () => {
                        this.store.dispatch(new SubmitSavedApplyAction(apply))
                    }
                })
            })
    }

    private initToDeleteSavedApply() {
        this.toDeleteSavedApplySub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(apply => {
                this.modalService.confirm({
                    title: '删除申请',
                    content: '确定删除这个申请?',
                    onOk: () => {
                        this.store.dispatch(new DeleteSavedApplyAction(apply))
                    }
                })
            })
    }

    private initCloseExtraTab() {
        this.toCloseExtraTabSub
            .asObservable()
            .takeUntil(this.destroyService)
            .subscribe(id => {
                this.store.dispatch(new CloseExtraTabAction(id))
            })
    }

    private initNeedManualResetTabIndex() {
        this.store
            .select(getNeedManualSetTabIndex)
            .filter(e => e)
            .withLatestFrom(this.store.select(getTabIndexToNeedManualSet))
            .takeUntil(this.destroyService)
            .subscribe(([_, tabIndex]) => {
                this.tabIndex = tabIndex
                this.store.dispatch(new ResetNeedManualSetTabIndexAction())
            })
    }
}
