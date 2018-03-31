import { FetchItemsParams, FetchItemsCountParams } from '@core/models/pagination.model';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { filter, map, switchMap, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
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
    constructor(private actionCreator: TableActionCreator) { }

    fetchItemsPipeable(handler: (params: FetchItemsParams) => Observable<E[]>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf(FetchItemsAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(handler),
                map(results => this.actionCreator.createFetchItemsSuccessAction<E>(results)),
                catchError(() => of(this.actionCreator.createFetchItemsFailureAction<E>()))
            )
        }
    }
    fetchItemsCountPipeable(handler: (params: FetchItemsCountParams) => Observable<number>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf(FetchItemsCountAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(handler),
                map(count => this.actionCreator.createFetchItemsCountSuccessAction<E>(count)),
                catchError(() => of(this.actionCreator.createFetchItemsCountFailureAction<E>()))
            )
        }
    }
    createItemPipeable(handler: (params: E) => Observable<any>) {
        return (src: Observable<Action>): Observable<TableFeatureAction<E>> => {
            return src.pipe(
                instanceOf(CreateItemAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(handler),
                concatMap(() => [
                    this.actionCreator.createCreateItemSuccessAction<E>(),
                    this.actionCreator.createFetchItemsAction<E>()
                ]),
                catchError(() => of(this.actionCreator.createCreateItemFailureAction<E>()))
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
                instanceOf(EditItemAction),
                filter(action => this.actionCreator.has(action)),
                map(action => action.params),
                switchMap(handler),
                concatMap((result) => [
                    this.actionCreator.createEditItemSuccessAction<E>(result),
                ]),
                catchError(() => of(this.actionCreator.createEditItemFailureAction<E>()))
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
