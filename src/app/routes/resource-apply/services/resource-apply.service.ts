import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
        return Observable.of(ApplyInfo.generateFakeData(applyType)).delay(4e2)
    }

    fetchApprovers(applyType: string): Observable<Approver[]> {
        return Observable.of(Approver.generateFakeDataItems()).delay(3e2)
    }

    fetchAddableApplyResources(
        params: Partial<FetchAddableApplyResourceParams>
    ): Observable<ApplyResource[]> {
        return Observable.of(ApplyResource.generateFakeDataItems()).delay(4e2)
    }

    fetchAddableApplyResourcesCount(
        params: Partial<FetchAddableApplyResourceCountParams>
    ): Observable<number> {
        return Observable.of(42).delay(4e2)
    }

    saveRequirementApply(apply: Partial<RequirementApply>): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    submitRequirementApply(apply: Partial<RequirementApply>): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchRequirementApplies(): Observable<RequirementApply[]> {
        return Observable.of(RequirementApply.generateFakeDataItems()).delay(
            3e2
        )
    }

    submitSavedApply(apply: RequirementApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    deleteSavedApply(apply: RequirementApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSavedApply(apply: RequirementApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
