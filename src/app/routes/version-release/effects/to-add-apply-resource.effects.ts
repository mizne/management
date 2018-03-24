import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import * as fromToAddApplyResource from '../actions/to-add-apply-resource.action'
import { VersionReleaseService } from '../services/version-release.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import {
    State,
    getApplyInfo,
    getAddedApplyResources,
    getApprovers
} from '../reducers'
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ToAddApplyResourceEffects {
    @Effect()
    fetchAddableApplyResources$ = this.actions$
        .ofType(fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE)
        .pipe(
            map(
                (action: fromToAddApplyResource.FetchAddableApplyResourceAction) =>
                    action.payload
            ),
            switchMap(params => {
                return this.versionReleaseApplyService
                    .fetchAddableApplyResources(params)

            }),
            map(
                resources =>
                    new fromToAddApplyResource.FetchAddableApplyResourceSuccessAction(
                        resources
                    )
            ),
            catchError(() =>
                of(
                    new fromToAddApplyResource.FetchAddableApplyResourceFailureAction()
                )
            )
        )

    @Effect()
    fetchAddableApplyResourcesCount$ = this.actions$
        .ofType(fromToAddApplyResource.FETCH_ADDABLE_APPLY_RESOURCE_COUNT)
        .pipe(
            map(
                (
                    action: fromToAddApplyResource.FetchAddableApplyResourceCountAction
                ) => action.payload
            ),
            switchMap(params => {
                return this.versionReleaseApplyService
                    .fetchAddableApplyResourcesCount(params)

            }),
            map(
                count =>
                    new fromToAddApplyResource.FetchAddableApplyResourceCountSuccessAction(
                        count
                    )
            ),
            catchError(() =>
                of(
                    new fromToAddApplyResource.FetchAddableApplyResourceCountFailureAction()
                )
            )
        )

    constructor(
        private actions$: Actions,
        private versionReleaseApplyService: VersionReleaseService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
