import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromExtraTabs from '../actions/extra-tabs.action'
import { ResourceApplyService } from '../services/resource-apply.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class ExtraTabsEffects {
    // @Effect()
    // fetchSavedApplies$ = this.actions$
    //     .ofType(fromSavedApply.FETCH_SAVED_APPLIES)
    //     .switchMap(() => {
    //         return this.resourceApplyService
    //             .fetchRequirementApplies()
    //             .map(
    //                 applies =>
    //                     new fromSavedApply.FetchSavedAppliesSuccessAction(
    //                         applies
    //                     )
    //             )
    //             .catch(err =>
    //                 Observable.of(
    //                     new fromSavedApply.FetchSavedAppliesFailureAction()
    //                 )
    //             )
    //     })

    // @Effect({ dispatch: false })
    // fetchSavedAppliesSuccess$ = this.actions$
    //     .ofType(fromSavedApply.FETCH_SAVED_APPLIES_SUCCESS)
    //     .do(() => {
    //         this.notify.success(
    //             `获取已保存申请`,
    //             `恭喜您，获取已保存申请成功！`
    //         )
    //     })

    // @Effect({ dispatch: false })
    // fetchSavedAppliesFailure$ = this.actions$
    //     .ofType(fromSavedApply.FETCH_SAVED_APPLIES_FAILURE)
    //     .do(() => {
    //         this.notify.error(`获取已保存申请`, `啊哦，获取已保存申请失败！`)
    //     })

    constructor(
        private actions$: Actions,
        private resourceApplyService: ResourceApplyService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
