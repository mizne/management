import {
    FetchItemsParams,
    FetchItemsCountParams
} from '@core/models/pagination.model'
import { Observable } from 'rxjs/Observable'
import { Action } from '@ngrx/store'
import {
    filter,
    map,
    switchMap,
    catchError,
    concatMap,
    tap
} from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import { DataItem, instanceOf } from '../feature.action'
import {
    TableFeatureAction,
    TableActionCreator,
    FetchItemsAction,
    FetchItemsCountAction,
    CreateItemAction,
    CreateItemSuccessAction,
    CreateItemFailureAction,
    EditItemAction,
    EditItemSuccessAction,
    EditItemFailureAction
} from './table-feature.action'

export class TableFeatureEffectsHelper<E extends DataItem> {
    constructor(private actionCreator: TableActionCreator) {}

    fetchItemsPipeable(handler: (params: FetchItemsParams) => Observable<E[]>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf(FetchItemsAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(params =>
                    handler(params).pipe(
                        map(results =>
                            this.actionCreator.fetchItemsSuccessAction<E>(
                                results
                            )
                        ),
                        catchError(() =>
                            of(this.actionCreator.fetchItemsFailureAction<E>())
                        )
                    )
                )
            )
        }
    }
    fetchItemsCountPipeable(
        handler: (params: FetchItemsCountParams) => Observable<number>
    ) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf(FetchItemsCountAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(params =>
                    handler(params).pipe(
                        map(count =>
                            this.actionCreator.fetchItemsCountSuccessAction<E>(
                                count
                            )
                        ),
                        catchError(() =>
                            of(
                                this.actionCreator.fetchItemsCountFailureAction<
                                    E
                                >()
                            )
                        )
                    )
                )
            )
        }
    }
    createItemPipeable(handler: (params: E) => Observable<any>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf<CreateItemAction<E>>(CreateItemAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(params =>
                    handler(params).pipe(
                        concatMap(() => [
                            this.actionCreator.createItemSuccessAction<E>(),
                            this.actionCreator.fetchItemsAction<E>()
                        ]),
                        catchError(() =>
                            of(this.actionCreator.createItemFailureAction<E>())
                        )
                    )
                )
            )
        }
    }
    createItemSuccessPipeable(handler: () => void) {
        return (src: Observable<Action>): Observable<any> => {
            return src.pipe(
                instanceOf(CreateItemSuccessAction),
                filter(action => this.actionCreator.has(action)),
                tap(handler)
            )
        }
    }
    createItemFailurePipeable(handler: () => void) {
        return (src: Observable<Action>): Observable<any> => {
            return src.pipe(
                instanceOf(CreateItemFailureAction),
                filter(action => this.actionCreator.has(action)),
                tap(handler)
            )
        }
    }
    editItemPipeable(handler: (params: E) => Observable<E>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf<EditItemAction<E>>(EditItemAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(params =>
                    handler(params).pipe(
                        concatMap(result => [
                            this.actionCreator.editItemSuccessAction<E>(result)
                        ]),
                        catchError(() =>
                            of(this.actionCreator.editItemFailureAction<E>())
                        )
                    )
                )
            )
        }
    }
    editItemSuccessPipeable(handler: () => void) {
        return (src: Observable<Action>): Observable<any> => {
            return src.pipe(
                instanceOf(EditItemSuccessAction),
                filter(action => this.actionCreator.has(action)),
                tap(handler)
            )
        }
    }
    editItemFailurePipeable(handler: () => void) {
        return (src: Observable<Action>): Observable<any> => {
            return src.pipe(
                instanceOf(EditItemFailureAction),
                filter(action => this.actionCreator.has(action)),
                tap(handler)
            )
        }
    }
}
