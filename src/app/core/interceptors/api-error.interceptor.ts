import { Injectable, Injector } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http'
import { NzModalService } from 'ng-zorro-antd'
import { Observable } from 'rxjs/Observable'
import { _throw } from 'rxjs/observable/throw'
import { environment } from '@env/environment'
import { TenantService } from '@core/services/tenant.service'
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
    private modalService: NzModalService
    private tenantService: TenantService

    constructor(private injector: Injector) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (this.requestWithSelf(req.url)) {
                            if (
                                event.body &&
                                event.body.resCode !== 0 &&
                                event.body.resCode !== 10000
                            ) {
                                console.warn(
                                    `resCode: ${event.body.resCode}; resMsg: ${
                                    event.body.resMsg
                                    }`
                                )
                            }
                        }
                    }
                }),
                catchError(res => {
                    if (res instanceof HttpErrorResponse) {
                        if (res.status === 401) {
                            this.tenantService = this.injector.get(TenantService)
                            this.tenantService.toLogin()
                        }

                        if (res.status === 500) {
                            this.modalService = this.injector.get(NzModalService)
                            this.modalService.error({
                                title: '内部错误，请稍候重试',
                                content: '会展人 遇到了意外情况，无法完成您的请求。'
                            })
                        }
                    }

                    return _throw(res)
                })
            )

    }

    private requestWithSelf(url: string): boolean {
        return !/assets/i.test(url)
    }
}

