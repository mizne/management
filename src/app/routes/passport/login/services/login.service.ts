import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { LoginParams, LoginResult } from '../models/login.model'
import { ErrorLoggerService } from '@core/services/error-logger.service'
import { ExhibitionService } from '@core/services/exhibition.service'
import { Exhibition } from '@core/models/exhibition.model'

@Injectable()
export class LoginService {
    private url = '/data/userLogin'
    constructor(
        private http: HttpClient,
        private errorLogger: ErrorLoggerService,
        private exhibitionService: ExhibitionService
    ) {}
    login(
        params: LoginParams
    ): Observable<{ login: LoginResult; exhibition: Exhibition }> {
        return this.http
            .post(this.url, {
                params: {
                    UserName: params.name,
                    UserPassword: params.password
                }
            })
            .map(res => LoginResult.convertFromResp((res as any).result[0]))
            .mergeMap(loginResult => {
                return this.exhibitionService
                    .fetchLatestExhibition(loginResult.tenantId)
                    .map(exhibition => ({
                        login: loginResult,
                        exhibition
                    }))
            })
            .catch(e => {
                return this.errorLogger.httpError({
                    module: 'LoginService',
                    method: 'login',
                    error: e
                })
            })
    }
}
