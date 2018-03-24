import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
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
        return of(ApplyInfo.generateFakeData()).pipe(delay(4e2))
    }

    fetchApprovers(): Observable<Approver[]> {
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

    saveVersionReleaseApply(apply: Partial<VersionReleaseApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    submitVersionReleaseApply(apply: Partial<VersionReleaseApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchSavedVersionReleaseApplies(): Observable<VersionReleaseApply[]> {
        return of(VersionReleaseApply.generateFakeDataItems()).pipe(delay(3e2)
        )
    }

    submitSavedApply(apply: VersionReleaseApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    deleteSavedApply(apply: VersionReleaseApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSavedApply(apply: VersionReleaseApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
