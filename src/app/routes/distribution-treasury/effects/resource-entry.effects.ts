import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { switchMap, map, catchError, concatMap, tap } from 'rxjs/operators'

import * as fromResourceEntry from '../actions/resource-entry.action'
import { DistributionTreasuryService } from '../services/distribution-treasury.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { Store } from '@ngrx/store'
import { State } from '../reducers'

@Injectable()
export class ResourceEntryEffects {
    @Effect()
    fetchResourceInfoes$ = this.actions$
        .ofType(fromResourceEntry.FETCH_RESOURCE_INFOES)
        .pipe(
            map((action: fromResourceEntry.FetchResourceInfoesAction) =>
                action.payload),
            switchMap((params) => this.distributionTreasuryService.fetchResourceInfoes(params)),
            map(accounts =>
                new fromResourceEntry.FetchResourceInfoesSuccessAction(
                    accounts
                )),
            catchError(() => of(new fromResourceEntry.FetchResourceInfoesFailureAction()))
        )


    @Effect()
    fetchResourceInfoesCount$ = this.actions$
        .ofType(fromResourceEntry.FETCH_RESOURCE_INFOES_COUNT)
        .pipe(
            map((action: fromResourceEntry.FetchResourceInfoesCountAction) =>
                action.params),
            switchMap((params) => this.distributionTreasuryService.fetchResourceInfoesCount(params)),
            map(count =>
                new fromResourceEntry.FetchResourceInfoesCountSuccessAction(
                    count
                )),
            catchError(() => of(new fromResourceEntry.FetchResourceInfoesCountFailureAction()))
        )

    // TODO 新增完的查询逻辑
    @Effect()
    createResourceInfo$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO)
        .pipe(
            map((action: fromResourceEntry.CreateResourceInfoAction) =>
                action.resourceInfo),
            switchMap((resourceInfo) => this.distributionTreasuryService.createResourceInfo(resourceInfo)),
            concatMap(count => [
                new fromResourceEntry.CreateResourceInfouccessAction(),
                new fromResourceEntry.FetchResourceInfoesAction(),
                new fromResourceEntry.FetchResourceInfoesCountAction()
            ]),
            catchError(() => of(new fromResourceEntry.CreateResourceInfoFailureAction()))
        )


    @Effect({ dispatch: false })
    createResourceInfoSuccess$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(`新增资源信息`, `恭喜您，新增资源信息成功！`)
            })
        )

    @Effect({ dispatch: false })
    createResourceInfoFailure$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`新增资源信息`, `啊哦，新增资源信息失败！`)
            })
        )

    // TODO 编辑完的查询逻辑
    @Effect()
    editResourceInfo$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO)
        .pipe(
            map((action: fromResourceEntry.EditResourceInfoAction) =>
                action.resourceInfo),
            switchMap((resourceInfo) => this.distributionTreasuryService.editResourceInfo(resourceInfo)),
            concatMap(count => [
                new fromResourceEntry.EditResourceInfouccessAction(),
                new fromResourceEntry.FetchResourceInfoesAction()
            ]),
            catchError(() => of(new fromResourceEntry.EditResourceInfoFailureAction()))
        )

    @Effect({ dispatch: false })
    editResourceInfoSuccess$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO_SUCCESS)
        .pipe(
            tap(() => {
                this.notify.success(`编辑资源信息`, `恭喜您，编辑资源信息成功！`)
            })
        )


    @Effect({ dispatch: false })
    editResourceInfoFailure$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO_FAILURE)
        .pipe(
            tap(() => {
                this.notify.error(`编辑资源信息`, `啊哦，编辑资源信息失败！`)
            })
        )


    constructor(
        private actions$: Actions,
        private distributionTreasuryService: DistributionTreasuryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) { }
}
