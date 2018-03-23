import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    VersionReleaseApply,
    FetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/version-release.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class VersionReleaseService {
    constructor() { }
    fetchApplyInfo(): Observable<ApplyInfo> {
        return Observable.of(ApplyInfo.generateFakeData()).delay(4e2)
    }

    fetchApprovers(): Observable<Approver[]> {
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

    saveVersionReleaseApply(apply: Partial<VersionReleaseApply>): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    submitVersionReleaseApply(apply: Partial<VersionReleaseApply>): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchSavedVersionReleaseApplies(): Observable<VersionReleaseApply[]> {
        return Observable.of(VersionReleaseApply.generateFakeDataItems()).delay(
            3e2
        )
    }

    submitSavedApply(apply: VersionReleaseApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    deleteSavedApply(apply: VersionReleaseApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSavedApply(apply: VersionReleaseApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
