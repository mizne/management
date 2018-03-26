import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    SystemOnOffApply,
    FetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/system-onoff.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class SystemOnOffService {
    constructor() { }
    fetchApplyInfo(applyType: string): Observable<ApplyInfo> {
        return of(ApplyInfo.generateFakeData(applyType)).pipe(delay(4e2))
    }

    fetchApprovers(applyType: string): Observable<Approver[]> {
        return of(Approver.generateFakeDataItems()).pipe(delay(3e2))
    }

    fetchAddableApplyResources(
        params: Partial<FetchAddableApplyResourceParams>
    ): Observable<ApplyResource[]> {
        return of(ApplyResource.generateFakeDataItems()).pipe(delay(4e2))
    }

    fetchAddableApplyResourcesCount(
        params: Partial<FetchAddableApplyResourceCountParams>
    ): Observable<number> {
        return of(42).pipe(delay(4e2))
    }

    saveSystemOnOffApply(apply: Partial<SystemOnOffApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    submitSystemOnOffApply(apply: Partial<SystemOnOffApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchSavedSystemOnOffApplies(): Observable<SystemOnOffApply[]> {
        return of(SystemOnOffApply.generateFakeDataItems()).pipe(delay(3e2)
        )
    }

    submitSavedApply(apply: SystemOnOffApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    deleteSavedApply(apply: SystemOnOffApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSavedApply(apply: SystemOnOffApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}