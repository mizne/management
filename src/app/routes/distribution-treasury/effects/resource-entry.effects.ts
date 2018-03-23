import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

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
        .map(
            (action: fromResourceEntry.FetchResourceInfoesAction) =>
                action.payload
        )
        .switchMap(params => {
            return this.distributionTreasuryService
                .fetchResourceInfoes(params)
                .map(
                    accounts =>
                        new fromResourceEntry.FetchResourceInfoesSuccessAction(
                            accounts
                        )
                )
                .catch(err =>
                    Observable.of(
                        new fromResourceEntry.FetchResourceInfoesFailureAction()
                    )
                )
        })

    @Effect()
    fetchResourceInfoesCount$ = this.actions$
        .ofType(fromResourceEntry.FETCH_RESOURCE_INFOES_COUNT)
        .map(
            (action: fromResourceEntry.FetchResourceInfoesCountAction) =>
                action.params
        )
        .switchMap(params => {
            return this.distributionTreasuryService
                .fetchResourceInfoesCount(params)
                .map(
                    count =>
                        new fromResourceEntry.FetchResourceInfoesCountSuccessAction(
                            count
                        )
                )
                .catch(e =>
                    Observable.of(
                        new fromResourceEntry.FetchResourceInfoesCountFailureAction()
                    )
                )
        })

    // TODO 新增完的查询逻辑
    @Effect()
    createResourceInfo$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO)
        .map(
            (action: fromResourceEntry.CreateResourceInfoAction) =>
                action.resourceInfo
        )
        .switchMap(resourceInfo => {
            return this.distributionTreasuryService
                .createResourceInfo(resourceInfo)
                .concatMap(() => [
                    new fromResourceEntry.CreateResourceInfouccessAction(),
                    new fromResourceEntry.FetchResourceInfoesAction(),
                    new fromResourceEntry.FetchResourceInfoesCountAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromResourceEntry.CreateResourceInfoFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    createResourceInfoSuccess$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO_SUCCESS)
        .do(() => {
            this.notify.success(`新增资源信息`, `恭喜您，新增资源信息成功！`)
        })

    @Effect({ dispatch: false })
    createResourceInfoFailure$ = this.actions$
        .ofType(fromResourceEntry.CREATE_RESOURCE_INFO_FAILURE)
        .do(() => {
            this.notify.error(`新增资源信息`, `啊哦，新增资源信息失败！`)
        })

    // TODO 编辑完的查询逻辑
    @Effect()
    editResourceInfo$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO)
        .map(
            (action: fromResourceEntry.EditResourceInfoAction) =>
                action.resourceInfo
        )
        .switchMap(resourceInfo => {
            return this.distributionTreasuryService
                .editResourceInfo(resourceInfo)
                .concatMap(() => [
                    new fromResourceEntry.EditResourceInfouccessAction(),
                    new fromResourceEntry.FetchResourceInfoesAction()
                ])
                .catch(() =>
                    Observable.of(
                        new fromResourceEntry.EditResourceInfoFailureAction()
                    )
                )
        })

    @Effect({ dispatch: false })
    editResourceInfoSuccess$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO_SUCCESS)
        .do(() => {
            this.notify.success(`编辑资源信息`, `恭喜您，编辑资源信息成功！`)
        })

    @Effect({ dispatch: false })
    editResourceInfoFailure$ = this.actions$
        .ofType(fromResourceEntry.EDIT_RESOURCE_INFO_FAILURE)
        .do(() => {
            this.notify.error(`编辑资源信息`, `啊哦，编辑资源信息失败！`)
        })

    constructor(
        private actions$: Actions,
        private distributionTreasuryService: DistributionTreasuryService,
        private notify: NzNotificationService,
        private store: Store<State>
    ) {}
}
