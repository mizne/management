import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import {
    ApplyInfo,
    ApplyResource,
    Approver,
    SubPackageInfo,
    UnifiedApply,
    SubPackageApply,
    FetchAddableApplyResourceParams,
    FetchAddableApplyResourceCountParams,
    defaultFetchAddableApplyResourceParams,
    defaultFetchAddableApplyResourceCountParams
} from '@core/models/unified-apply.model'
import {
    PaginationParams,
    FetchItemsParams
} from '@core/models/pagination.model'

@Injectable()
export class UnifiedApplyService {
    constructor() { }
    fetchApplyInfo(): Observable<ApplyInfo> {
        return of(ApplyInfo.generateFakeData()).pipe(delay(4e2))
    }

    fetchApprovers(): Observable<Approver[]> {
        return of(Approver.generateFakeDataItems()).pipe(delay(3e2))
    }

    fetchSubPackageInfo(): Observable<SubPackageInfo> {
        return of(SubPackageInfo.generateFakeData()).pipe(delay(4e2))
    }

    fetchAddableApplyResources(
        params: FetchAddableApplyResourceParams
    ): Observable<ApplyResource[]> {
        return of(ApplyResource.generateFakeDataItems()).pipe(delay(4e2))
    }

    fetchAddableApplyResourcesCount(
        params: FetchAddableApplyResourceCountParams
    ): Observable<number> {
        return of(42).pipe(delay(4e2))
    }

    saveUnifiedApply(apply: Partial<UnifiedApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    submitUnifiedApply(apply: Partial<UnifiedApply>): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchUnifiedApplies(): Observable<UnifiedApply[]> {
        return of(UnifiedApply.generateFakeDataItems()).pipe(delay(3e2)

        )
    }

    submitSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    deleteSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }





    saveSubPackageApply(apply: SubPackageApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    submitSubPackageApply(apply: SubPackageApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    fetchSubPackageApplies(): Observable<SubPackageApply[]> {
        return of(SubPackageApply.generateFakeDataItems()).pipe(delay(3e2)
        )
    }

    submitSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    deleteSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }

    editSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return of(null).pipe(delay(4e2))
    }
}
