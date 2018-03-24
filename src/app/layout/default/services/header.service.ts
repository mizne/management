import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { forkJoin } from 'rxjs/observable/forkJoin'
import { map, delay } from 'rxjs/operators';


@Injectable()
export class HeaderService {
    constructor() { }

    fetchApprovalsCount(): Observable<number> {
        return forkJoin(
            this.fetchVisitorApprovalsCount(),
            this.fetchExhibitorApprovalsCount()
        ).pipe(
            map(([count1, count2]) => count1 + count2)
        )
    }

    fetchVisitorApprovalsCount(): Observable<number> {
        return of(11).pipe(delay(4e2))
    }

    fetchExhibitorApprovalsCount(): Observable<number> {
        return of(13).pipe(delay(4e2))
    }
}
