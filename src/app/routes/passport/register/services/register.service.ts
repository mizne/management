import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { defer } from 'rxjs/observable/defer'
import { _throw } from 'rxjs/observable/throw'
import { delay, mergeMap } from 'rxjs/operators'
import { RegisterParams } from '../models/register.model'

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) { }
    register(params: RegisterParams): Observable<any> {
        return of({}).pipe(delay(1e3))
    }

    fetchCaptcha(phone: string): Observable<any> {
        return defer(() => {
            return Math.random() > 0.5
                ? of(null).pipe(delay(4e2))
                : of(null)
                    .pipe(
                        delay(4e2),
                        mergeMap(() => _throw(new Error('test')))
                    )
        })
    }

    private handleError(error: any) {
        const errMsg = error.message
            ? error.message
            : error.status
                ? `${error.status} - ${error.statusText}`
                : 'Server error'
        console.error(errMsg) // log to console instead
        return _throw(errMsg)
    }
}
