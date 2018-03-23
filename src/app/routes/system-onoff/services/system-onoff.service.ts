import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
    constructor() {}
    fetchApplyInfo(applyType: string): Observable<ApplyInfo> {
        return Observable.of(ApplyInfo.generateFakeData(applyType)).delay(4e2)
    }

    fetchApprovers(applyType: string): Observable<Approver[]> {
        return Observable.of(Approver.generateFakeDataItems()).delay(3e2)
    }

    fetchAddableApplyResources(
        params: FetchAddableApplyResourceParams
    ): Observable<ApplyResource[]> {
        return Observable.of(ApplyResource.generateFakeDataItems()).delay(4e2)
    }

    fetchAddableApplyResourcesCount(
        params: FetchAddableApplyResourceCountParams
    ): Observable<number> {
        return Observable.of(42).delay(4e2)
    }

    saveSystemOnOffApply(apply: SystemOnOffApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    submitSystemOnOffApply(apply: SystemOnOffApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchSavedSystemOnOffApplies(): Observable<SystemOnOffApply[]> {
        return Observable.of(SystemOnOffApply.generateFakeDataItems()).delay(
            3e2
        )
    }

    submitSavedApply(apply: SystemOnOffApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    deleteSavedApply(apply: SystemOnOffApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSavedApply(apply: SystemOnOffApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
