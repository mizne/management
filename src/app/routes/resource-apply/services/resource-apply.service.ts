import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    RequirementApply,
    FetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/resource-apply.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class ResourceApplyService {
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

    saveRequirementApply(apply: Partial<RequirementApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    submitRequirementApply(apply: Partial<RequirementApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchRequirementApplies(): Observable<RequirementApply[]> {
        return of(RequirementApply.generateFakeDataItems()).pipe(delay(3e2))
    }

    submitSavedApply(apply: RequirementApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    deleteSavedApply(apply: RequirementApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSavedApply(apply: RequirementApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
