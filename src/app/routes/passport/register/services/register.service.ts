import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { RegisterParams } from '../models/register.model'

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) {}
    register(params: RegisterParams): Observable<any> {
        return Observable.of({}).delay(1e3)
    }

    fetchCaptcha(phone: string): Observable<any> {
        return Observable.defer(() => {
            return Math.random() > 0.5
                ? Observable.of(null).delay(4e2)
                : Observable.of(null)
                      .delay(4e2)
                      .mergeMap(() => Observable.throw(new Error('test')))
        })
    }

    private handleError(error: any) {
        const errMsg = error.message
            ? error.message
            : error.status
              ? `${error.status} - ${error.statusText}`
              : 'Server error'
        console.error(errMsg) // log to console instead
        return Observable.throw(errMsg)
    }
}
