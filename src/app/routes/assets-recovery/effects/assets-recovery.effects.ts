import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { map, switchMap, catchError, concatMap, tap } from 'rxjs/operators'

import { fromAssetsRecovery } from '../actions'
import { AssetsRecoveryService } from '../services'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class AssetsRecoveryEffects {
    @Effect()
    fetchAssetsRecoveries$ = this.actions$
        .ofType(fromAssetsRecovery.FETCH_ASSETS_RECOVERIES)
        .pipe(
            map(
                (action: fromAssetsRecovery.FetchAssetsRecoveriesAction) =>
                    action.payload
            ),
            switchMap(params => this.assetsRecoveryService.fetchAssetsRecoveries(params)),
            map(assetsRecoveries =>
                new fromAssetsRecovery.FetchAssetsRecoveriesSuccessAction(
                    assetsRecoveries
                )),
            catchError(() => of(new fromAssetsRecovery.FetchAssetsRecoveriesFailureAction()))
        )


    @Effect()
    fetchAssetsRecoveriesCount$ = this.actions$
        .ofType(fromAssetsRecovery.FETCH_ASSETS_RECOVERIES_COUNT)
        .pipe(
            map(
                (action: fromAssetsRecovery.FetchAssetsRecoveriesCountAction) =>
                    action.params
            ),
            switchMap(params => this.assetsRecoveryService.fetchAssetsRecoveriesCount(params)),
            map(count =>
                new fromAssetsRecovery.FetchAssetsRecoveriesCountSuccessAction(
                    count
                )),
            catchError(() => of(new fromAssetsRecovery.FetchAssetsRecoveriesCountFailureAction()))
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    ensureRecovery$ = this.actions$
        .ofType(fromAssetsRecovery.ENSURE_RECOVERY)
        .pipe(
            map(
                (action: fromAssetsRecovery.EnsureRecoveryAction) =>
                    action.assetsRecovery
            ),
            switchMap(assetsRecovery => this.assetsRecoveryService.ensureRecovery(assetsRecovery)),
            concatMap(() => [
                new fromAssetsRecovery.EnsureRecoverySuccessAction(),
                new fromAssetsRecovery.FetchAssetsRecoveriesAction()
            ]),
            catchError(() => of(new fromAssetsRecovery.EnsureRecoveryFailureAction()))
        )



    @Effect({ dispatch: false })
    ensureRecoverySuccess$ = this.actions$
        .ofType(fromAssetsRecovery.ENSURE_RECOVERY_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(`回收资产`, `恭喜您，回收资产成功！`)
            })
        )

    @Effect({ dispatch: false })
    ensureRecoveryFailure$ = this.actions$
        .ofType(fromAssetsRecovery.ENSURE_RECOVERY_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`回收资产`, `啊哦，回收资产失败！`)
            })
        )

    constructor(
        private actions$: Actions,
        private assetsRecoveryService: AssetsRecoveryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
