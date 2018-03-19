import { NgModule, Optional, SkipSelf } from '@angular/core'
import { throwIfAlreadyLoaded } from './module-import-guard'

import { ErrorLoggerService } from './services/error-logger.service'
import { I18NService } from './i18n/i18n.service'
import { TenantService } from './services/tenant.service'
import { AuthGuard } from './services/auth-guard.service'

@NgModule({
    providers: [ErrorLoggerService, I18NService, TenantService, AuthGuard]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule')
    }
}
