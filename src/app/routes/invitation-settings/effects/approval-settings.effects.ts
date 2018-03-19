import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromApprovalSettings from '../actions/approval-settings.action'
import { ApprovalSettingsService } from '../services/approval-settings.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State, getApprovalSettings } from '../reducers'

@Injectable()
export class ApprovalSettingsEffects {
    @Effect()
    fetchApprovalSettings$ = this.actions$
        .ofType(fromApprovalSettings.FETCH_APPROVAL_SETTINGS)
        .switchMap(() => {
            return this.approvalSettingsService
                .fetchApprovalSettings()
                .map(
                    approvalSettings =>
                        new fromApprovalSettings.FetchApprovalSettingsSuccessAction(
                            approvalSettings
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromApprovalSettings.FetchApprovalSettingsFailureAction()
                    )
                )
        })

    @Effect()
    updateApprovalSettings$ = this.actions$
        .ofType(fromApprovalSettings.UPDATE_APPROVAL_SETTINGS)
        .map(
            (action: fromApprovalSettings.UpdateApprovalSettingsAction) =>
                action.payload
        )
        .withLatestFrom(this.store.select(getApprovalSettings))
        .switchMap(([params, { id }]) => {
            return this.approvalSettingsService
                .updateApprovalSettings({
                    ...params,
                    id
                })
                .concatMap(() => [
                    new fromApprovalSettings.UpdateApprovalSettingsSuccessAction(
                        params.autoApprove
                    ),
                    new fromApprovalSettings.FetchApprovalSettingsAction()
                ])
                .catch(err =>
                    Observable.of(
                        new fromApprovalSettings.UpdateApprovalSettingsFailureAction(
                            params.autoApprove
                        )
                    )
                )
        })

    @Effect({ dispatch: false })
    updateApprovalSettingsSuccess$ = this.actions$
        .ofType(fromApprovalSettings.UPDATE_APPROVAL_SETTINGS_SUCCESS)
        .map(
            (
                action: fromApprovalSettings.UpdateApprovalSettingsSuccessAction
            ) => action.autoApprove
        )
        .do(autoApprove => {
            this.notify.success(
                '托管审核',
                `恭喜您, ${autoApprove ? '开启' : '关闭'}自动托管审核成功！`
            )
        })
    @Effect({ dispatch: false })
    updateApprovalSettingsFailure$ = this.actions$
        .ofType(fromApprovalSettings.UPDATE_APPROVAL_SETTINGS_FAILURE)
        .map(
            (
                action: fromApprovalSettings.UpdateApprovalSettingsFailureAction
            ) => action.autoApprove
        )
        .do(autoApprove => {
            this.notify.error(
                '托管审核',
                `啊哦, ${autoApprove ? '开启' : '关闭'}自动托管审核失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private approvalSettingsService: ApprovalSettingsService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
