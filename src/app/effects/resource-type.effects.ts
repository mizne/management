import { Injectable } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'

import * as ResourceTypeActions from '../actions/resource-type.action'
import { ResourceTypeService } from '@core/services/resource-type.service'
import { NzNotificationService } from 'ng-zorro-antd'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

@Injectable()
export class ResourceTypeEffects {
    @Effect()
    fetchResourceTypes$ = this.actions$.pipe(
        ofType(ResourceTypeActions.FETCH_RESOURCE_TYPES),
        switchMap(() =>
            this.resourceTypeService
                .fetchResourceTypes()
                .pipe(
                    map(
                        types =>
                            new ResourceTypeActions.FetchResourceTypesSuccessAction(
                                types
                            )
                    ),
                    catchError(() =>
                        of(
                            new ResourceTypeActions.FetchResourceTypesFailureAction()
                        )
                    )
                )
        )
    )

    @Effect()
    createResourceType$ = this.actions$.pipe(
        ofType(ResourceTypeActions.CREATE_RESOURCE_TYPE),
        map(
            (action: ResourceTypeActions.CreateResourceTypeAction) =>
                action.payload
        ),
        switchMap(params => {
            return this.resourceTypeService
                .createResourceType(params)
                .pipe(
                    concatMap(() => [
                        new ResourceTypeActions.CreateResourceTypeSuccessAction(),
                        new ResourceTypeActions.FetchResourceTypesAction()
                    ]),
                    catchError(() =>
                        of(
                            new ResourceTypeActions.CreateResourceTypeFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    createResourceTypeSuccess$ = this.actions$.pipe(
        ofType(ResourceTypeActions.CREATE_RESOURCE_TYPE_SUCCESS),
        tap(() => {
            this.notify.success(`新增资源类型`, `恭喜您，新增资源类型成功！`)
        })
    )

    @Effect({ dispatch: false })
    createResourceTypeFailure$ = this.actions$.pipe(
        ofType(ResourceTypeActions.CREATE_RESOURCE_TYPE_FAILURE),
        tap(() => {
            this.notify.error(`新增资源类型`, `啊哦，新增资源类型失败`)
        })
    )

    @Effect()
    deleteResourceType$ = this.actions$.pipe(
        ofType(ResourceTypeActions.DELETE_RESOURCE_TYPE),
        map(
            (action: ResourceTypeActions.DeleteResourceTypeAction) => action.id
        ),
        switchMap(id => {
            return this.resourceTypeService
                .deleteResourceType(id)
                .pipe(
                    concatMap(() => [
                        new ResourceTypeActions.DeleteResourceTypeSuccessAction(),
                        new ResourceTypeActions.FetchResourceTypesAction()
                    ]),
                    catchError(() =>
                        of(
                            new ResourceTypeActions.DeleteResourceTypeFailureAction()
                        )
                    )
                )
        })
    )

    @Effect({ dispatch: false })
    deleteResourceTypeSuccess$ = this.actions$.pipe(
        ofType(ResourceTypeActions.DELETE_RESOURCE_TYPE_SUCCESS),
        tap(() => {
            this.notify.success(`删除资源类型`, `恭喜您，删除资源类型成功！`)
        })
    )

    @Effect({ dispatch: false })
    deleteResourceTypeFailure$ = this.actions$.pipe(
        ofType(ResourceTypeActions.DELETE_RESOURCE_TYPE_FAILURE),
        tap(() => {
            this.notify.error(`删除资源类型`, `啊哦，删除资源类型失败`)
        })
    )

    constructor(
        private actions$: Actions,
        private resourceTypeService: ResourceTypeService,
        private notify: NzNotificationService
    ) {}
}
