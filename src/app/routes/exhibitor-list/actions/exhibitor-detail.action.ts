import { Action } from '@ngrx/store'
import { Exhibitor } from '@core/models/exhibitor.model'

export const FETCH_EXHIBITOR_DETAIL =
    '[Exhibitor Detail] Fetch Exhibitor Detail'
export const FETCH_EXHIBITOR_DETAIL_SUCCESS =
    '[Exhibitor Detail] Fetch Exhibitor Detail Success'
export const FETCH_EXHIBITOR_DETAIL_FAILURE =
    '[Exhibitor Detail] Fetch Exhibitor Detail Failure'

export class FetchExhibitorDetailAction implements Action {
    readonly type = FETCH_EXHIBITOR_DETAIL
    constructor(public id: string) {}
}
export class FetchExhibitorDetailSuccessAction implements Action {
    readonly type = FETCH_EXHIBITOR_DETAIL_SUCCESS
    constructor(public exhibitor: Exhibitor) {}
}
export class FetchExhibitorDetailFailureAction implements Action {
    readonly type = FETCH_EXHIBITOR_DETAIL_FAILURE
}

export type Actions =
    | FetchExhibitorDetailAction
    | FetchExhibitorDetailSuccessAction
    | FetchExhibitorDetailFailureAction
