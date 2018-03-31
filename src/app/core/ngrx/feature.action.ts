import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';

export abstract class FeatureAction<S> implements Action {
    public readonly type: string

    constructor(feature: string, action: string) {
        this.type = `[${feature}] ${action}`
    }

    reducer(state: S): S {
        return state
    }
}

export interface DataItem {
    id?: string
}

export function instanceOf<T>(type: { new(...args: any[]): T }): (src: Observable<T>) => Observable<T> {
    return (src: Observable<T>) => src.pipe(
        filter(action => action instanceof type)
    )
}