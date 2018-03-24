import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { LoginParams, LoginResult } from '../models/login.model'
import { ErrorLoggerService } from '@core/services/error-logger.service'
import { environment } from '@env/environment'

@Injectable()
export class LoginService {
    private url = '/data/userLogin'
    constructor(
        private http: HttpClient,
        private errorLogger: ErrorLoggerService
    ) { }
    login(
        params: LoginParams
    ): Observable<{ login: LoginResult; exhibition: any }> {
        return of({
            login: {
                tenantId: `string`,
                userId: `string`,
                userName: `string`,
                tenantName: `string`,
                token: `string`,
                organizationId: `string`,
                exhibitionId: `string`
            },
            exhibition: {
                id: `id`,
                name: `name`,
                startDate: `2018-03-11`,
                endDate: `2018-03-16`,
                address: `address`
            }
        })
    }
}
