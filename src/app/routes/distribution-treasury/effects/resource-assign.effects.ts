import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromResourceAssign from '../actions/resource-assign.action'
import { DistributionTreasuryService } from '../services/distribution-treasury.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class ResourceAssignEffects {
    @Effect()
    fetchResourceUseInfoes$ = this.actions$
        .ofType(fromResourceAssign.FETCH_RESOURCE_USE_INFOES)
        .map(
            (action: fromResourceAssign.FetchResourceUseInfoesAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.distributionTreasuryService
                .fetchResourceUseInfoes(params)
                .map(
                    accounts =>
                        new fromResourceAssign.FetchResourceUseInfoesSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromResourceAssign.FetchResourceUseInfoesFailureAction()
                    )
                )
        })

    @Effect()
    fetchResourceUseInfoesCount$ = this.actions$
        .ofType(fromResourceAssign.FETCH_RESOURCE_USE_INFOES_COUNT)
        .map(
            (action: fromResourceAssign.FetchResourceUseInfoesCountAction) =>
                action.params
        )
        .switchMap(params => {
            return this.distributionTreasuryService
                .fetchResourceUseInfoesCount(params)
                .map(
                    count =>
                        new fromResourceAssign.FetchResourceUseInfoesCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromResourceAssign.FetchResourceUseInfoesCountFailureAction()
                    )
                )
        })

    // TODO 编辑完的查询逻辑
    @Effect()
    editResourceUseInfo$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO)
        .map(
            (action: fromResourceAssign.EditResourceUseInfoAction) =>
                action.resourceUseInfo
        )
        .switchMap(resourceUseInfo => {
            return this.distributionTreasuryService
                .editResourceUseInfo(resourceUseInfo)
                .concatMap(() => [
                    new fromResourceAssign.EditResourceUseInfouccessAction(),
                    new fromResourceAssign.FetchResourceUseInfoesAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromResourceAssign.EditResourceUseInfoFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    editResourceUseInfoSuccess$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO_SUCCESS)
        .do(() => {
            this.notify.success(
                `编辑资源使用信息`,
                `恭喜您，编辑资源使用信息成功！`
            )
        })

    @Effect({ dispatch: false })
    editResourceUseInfoFailure$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO_FAILURE)
        .do(() => {
            this.notify.error(
                `编辑资源使用信息`,
                `啊哦，编辑资源使用信息失败！`
            )
        })

    constructor(
        private actions$: Actions,
        private distributionTreasuryService: DistributionTreasuryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
