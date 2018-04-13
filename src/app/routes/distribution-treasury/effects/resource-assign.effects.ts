import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { switchMap, map, catchError, concatMap, tap } from 'rxjs/operators'

import { fromResourceAssign } from '../actions'
import { DistributionTreasuryService } from '../services'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class ResourceAssignEffects {
    @Effect()
    fetchResourceUseInfoes$ = this.actions$
        .ofType(fromResourceAssign.FETCH_RESOURCE_USE_INFOES)
        .pipe(
            map(
                (action: fromResourceAssign.FetchResourceUseInfoesAction) =>
                    action.payload
            ),
            switchMap(params =>
                this.distributionTreasuryService
                    .fetchResourceUseInfoes(params)
                    .pipe(
                        map(
                            accounts =>
                                new fromResourceAssign.FetchResourceUseInfoesSuccessAction(
                                    accounts
                                ),
                            catchError(() =>
                                of(
                                    new fromResourceAssign.FetchResourceUseInfoesFailureAction()
                                )
                            )
                        )
                    )
            )
        )

    @Effect()
    fetchResourceUseInfoesCount$ = this.actions$
        .ofType(fromResourceAssign.FETCH_RESOURCE_USE_INFOES_COUNT)
        .pipe(
            map(
                (
                    action: fromResourceAssign.FetchResourceUseInfoesCountAction
                ) => action.params
            ),
            switchMap(params =>
                this.distributionTreasuryService
                    .fetchResourceUseInfoesCount(params)
                    .pipe(
                        map(
                            count =>
                                new fromResourceAssign.FetchResourceUseInfoesCountSuccessAction(
                                    count
                                )
                        ),
                        catchError(() =>
                            of(
                                new fromResourceAssign.FetchResourceUseInfoesCountFailureAction()
                            )
                        )
                    )
            )
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editResourceUseInfo$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO)
        .pipe(
            map(
                (action: fromResourceAssign.EditResourceUseInfoAction) =>
                    action.resourceUseInfo
            ),
            switchMap(params =>
                this.distributionTreasuryService
                    .editResourceUseInfo(params)
                    .pipe(
                        concatMap(count => [
                            new fromResourceAssign.EditResourceUseInfouccessAction(),
                            new fromResourceAssign.FetchResourceUseInfoesAction()
                        ]),
                        catchError(() =>
                            of(
                                new fromResourceAssign.EditResourceUseInfoFailureAction()
                            )
                        )
                    )
            )
        )

    @Effect({ dispatch: false })
    editResourceUseInfoSuccess$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(
                    `编辑资源使用信息`,
                    `恭喜您，编辑资源使用信息成功！`
                )
            })
        )

    @Effect({ dispatch: false })
    editResourceUseInfoFailure$ = this.actions$
        .ofType(fromResourceAssign.EDIT_RESOURCE_USE_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(
                    `编辑资源使用信息`,
                    `啊哦，编辑资源使用信息失败！`
                )
            })
        )

    constructor(
        private actions$: Actions,
        private distributionTreasuryService: DistributionTreasuryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
