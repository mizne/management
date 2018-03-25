import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { fromToAddApplyResource } from '../actions'
import { ResourceApplyService } from '../services'
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
            switchMap(params => this.resourceApplyService.fetchAddableApplyResources(params)),
            map(resources => new fromToAddApplyResource.FetchAddableApplyResourceSuccessAction(
                resources
            )),
            catchError(() => of(new fromToAddApplyResource.FetchAddableApplyResourceFailureAction()))
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
            switchMap(params => this.resourceApplyService.fetchAddableApplyResourcesCount(params)),
            map(count => new fromToAddApplyResource.FetchAddableApplyResourceCountSuccessAction(
                count
            )),
            catchError(() => of(new fromToAddApplyResource.FetchAddableApplyResourceCountFailureAction()))
        )


    constructor(
        private actions$: Actions,
        private resourceApplyService: ResourceApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
