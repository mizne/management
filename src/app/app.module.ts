import {
    NgModule,
    LOCALE_ID,
    APP_INITIALIZER,
    Injector,
    ErrorHandler
} from '@angular/core'
import {
    HttpClient,
    HTTP_INTERCEPTORS,
    HttpClientModule
} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AngularWebStoreModule } from 'angular-web-store'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers } from './reducers'

import { DelonModule } from './delon.module'
import { CoreModule } from '@core/core.module'
import { SharedModule } from '@shared/shared.module'
import { AppComponent } from './app.component'
import { RoutesModule } from './routes/routes.module'
import { LayoutModule } from './layout/layout.module'
import { StartupService } from '@core/startup/startup.service'
import { ApiErrorInterceptor } from './core/interceptors/api-error.interceptor'
import { TokenInterceptor } from './core/interceptors/token.interceptor'
// angular i18n
import { registerLocaleData } from '@angular/common'
import localeZhHans from '@angular/common/locales/zh-Hans'
registerLocaleData(localeZhHans)
// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ALAIN_I18N_TOKEN } from '@delon/theme'
import { I18NService } from '@core/i18n/i18n.service'
import * as Raven from 'raven-js'
import { environment } from '@env/environment'

Raven.config(
    'https://3a7450892e464bae9a39ee881f3852bc@sentry.io/281854'
).install()

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        Raven.captureException(err)
    }
}
export class LoggerErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        console.error(err)
    }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, `assets/i18n/`, '.json')
}

export function StartupServiceFactory(
    startupService: StartupService
): Function {
    return () => startupService.load()
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        LayoutModule,
        RoutesModule,
        DelonModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument({
                  maxAge: 42
              }),
        AngularWebStoreModule.forRoot()
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh-Hans' },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiErrorInterceptor,
            multi: true
        },
        { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
        StartupService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        environment.production
            ? { provide: ErrorHandler, useClass: RavenErrorHandler }
            : { provide: ErrorHandler, useClass: LoggerErrorHandler }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
