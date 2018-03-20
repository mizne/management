import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

import {
    ApplicationSoftwareAccount,
    SystemSoftwareAccount,
    MiddlewareSoftwareAccount
} from '@core/models/software-account.model'
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
    getFetchAddableApplyResourcesLoading,
    getAddableApplyResources,
    getFetchSavedAppliesLoading,
    getSavedApplies
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
import { FetchSavedAppliesAction } from './actions/saved-apply.action'

import { Subject } from 'rxjs/Subject'
import { DestroyService } from '@core/services/destroy.service'
import { ToCreateApplicationSoftwareAccountComponent } from './modals/to-create-application-software-account/to-create-application-software-account.component'
import { ToCreateSystemSoftwareAccountComponent } from './modals/to-create-system-software-account/to-create-system-software-account.component'
import { ToCreateMiddlewareSoftwareAccountComponent } from './modals/to-create-middleware-software-account/to-create-middleware-software-account.component'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ToEditApplicationSoftwareAccountComponent } from './modals/to-edit-application-software-account/to-edit-application-software-account.component'
import { ToEditSystemSoftwareAccountComponent } from './modals/to-edit-system-software-account/to-edit-system-software-account.component'
import { ToEditMiddlewareSoftwareAccountComponent } from './modals/to-edit-middleware-software-account/to-edit-middleware-software-account.component'
import { ToShowApplicationSoftwareAccountComponent } from './modals/to-show-application-software-account/to-show-application-software-account.component'
import { ToShowSystemSoftwareAccountComponent } from './modals/to-show-system-software-account/to-show-system-software-account.component'
import { ToShowMiddlewareSoftwareAccountComponent } from './modals/to-show-middleware-software-account/to-show-middleware-software-account.component'
import {
    ApplyInfo,
    Approver,
    ApplyResource,
    RequirementApply
} from '@core/models/resource-apply.model'

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

    tabs = [
        {
            name: 'Tab 1'
        },
        {
            name: 'Tab 2'
        }
    ]

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
        console.log(typeof tabIndex)
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
        this.tabs.push({
            name: 'New Tab'
        })
    }

    toEditSavedApply(apply: RequirementApply) {}

    toSubmitSavedApply(apply: RequirementApply) {}

    toDeleteSavedApply(apply: RequirementApply) {}

    closeTab(tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1)
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
    }

    private initFirstTabDataSource() {
        this.saveOrSubmitText$ = this.store.select(getSaveOrSubmitText)
        this.saveOrSubmitLoading$ = this.store.select(getSaveOrSubmitLoading)

        this.fetchApplyInfoLoading$ = this.store.select(
            getFetchApplyInfoLoading
        )
        this.applyInfo$ = this.store.select(getApplyInfo)

        this.addedApplyResources$ = this.store.select(getAddableApplyResources)

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

    private initDispatcher(): void {}

    private initSubscriber(): void {
        this.initFirstTabSubscriber()
        this.initSecondTabSubscriber()
    }

    private initFirstTabSubscriber() {
        this.initSwitchApplyType()
        this.initPatchApplyInfo()

        this.initSaveRequirementApply()
        this.initSubmitRequirementApply()
        this.initResetRequirementApply()

        this.initCreateApplyResource()
        this.initAddApplyResources()
    }

    private initSecondTabSubscriber() {
        this.initFetchSavedApplies()
    }

    private initSwitchApplyType() {
        this.type.valueChanges
            .takeUntil(this.destroyService)
            .filter(e => !!e)
            .subscribe(applyType => {
                this.store.dispatch(new FetchApplyInfoAction(applyType))
                this.store.dispatch(new FetchApproversAction(applyType))
            })
    }

    private initPatchApplyInfo() {
        this.store
            .select(getApplyInfo)
            .takeUntil(this.destroyService)
            .subscribe(applyInfo => {
                if (applyInfo) {
                    this.applyForm.patchValue(applyInfo)
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
        this.toCreateResourceSub.asObservable().subscribe(() => {
            console.log(`to create apply resource`)
        })
    }

    private initAddApplyResources() {
        this.toAddResourcesSub.asObservable().subscribe(() => {
            console.log(`to add apply resources`)
        })
    }

    private initFetchSavedApplies() {
        this.tabChangeSub
            .asObservable()
            .takeUntil(this.destroyService)
            .filter(tabIndex => tabIndex === 1)
            .subscribe(tabIndex => {
                this.store.dispatch(new FetchSavedAppliesAction())
            })
    }
}
