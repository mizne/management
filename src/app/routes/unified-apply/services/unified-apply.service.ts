import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
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
    constructor() {}
    fetchApplyInfo(): Observable<ApplyInfo> {
        return Observable.of(ApplyInfo.generateFakeData()).delay(4e2)
    }

    fetchApprovers(): Observable<Approver[]> {
        return Observable.of(Approver.generateFakeDataItems()).delay(3e2)
    }

    fetchSubPackageInfo(): Observable<SubPackageInfo> {
        return Observable.of(SubPackageInfo.generateFakeData()).delay(4e2)
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

    saveUnifiedApply(apply: UnifiedApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    submitUnifiedApply(apply: UnifiedApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchUnifiedApplies(): Observable<UnifiedApply[]> {
        return Observable.of(UnifiedApply.generateFakeDataItems()).delay(
            3e2
        )
    }

    submitSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    deleteSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSavedUnifiedApply(apply: UnifiedApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }





    saveSubPackageApply(apply: SubPackageApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    submitSubPackageApply(apply: SubPackageApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    fetchSubPackageApplies(): Observable<SubPackageApply[]> {
        return Observable.of(SubPackageApply.generateFakeDataItems()).delay(
            3e2
        )
    }

    submitSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    deleteSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }

    editSavedSubPackageApply(apply: SubPackageApply): Observable<any> {
        return Observable.of(null).delay(4e2)
    }
}
