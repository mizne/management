import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromToAddApplyResource from '../actions/to-add-apply-resource.action'
import { ResourceApplyService } from '../services/resource-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getAddedApplyResources,
    getApprovers
} from '../reducers'

@Injectable()
export class ToAddApplyResourceEffects {
    @Effect()
    fetchAddableApplyResources$ = this.actions$
        .ofType(fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE)
        .map(
            (action: fromToAddApplyResource.FetchAddableApplyResourceAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.resourceApplyService
                .fetchAddableApplyResources(params)
                .map(
                    resources =>
                        new fromToAddApplyResource.FetchAddableApplyResourceSuccessAction(
                            resources
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromToAddApplyResource.FetchAddableApplyResourceFailureAction()
                    )
                )
        })

    @Effect()
    fetchAddableApplyResourcesCount$ = this.actions$
        .ofType(fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE_COUNT)
        .map(
            (
                action: fromToAddApplyResource.FetchAddableApplyResourceCountAction
            ) => action.payload
        )
        .switchMap(params => {
            return this.resourceApplyService
                .fetchAddableApplyResourcesCount(params)
                .map(
                    count =>
                        new fromToAddApplyResource.FetchAddableApplyResourceCountSuccessAction(
                            count
                        )
                )
                .catch(() =>
                    Observable.of(
                        new fromToAddApplyResource.FetchAddableApplyResourceCountFailureAction()
                    )
                )
        })

    constructor(
        private actions$: Actions,
        private resourceApplyService: ResourceApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}