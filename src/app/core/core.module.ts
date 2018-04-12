import { NgModule, Optional, SkipSelf } from '@angular/core'
import { throwIfAlreadyLoaded } from './module-import-guard'

import { ErrorLoggerService } from './services/error-logger.service'
import { I18NService } from './i18n/i18n.service'
import { TenantService } from './services/tenant.service'
import { AuthGuard } from './services/auth-guard.service'

import { ResourceTypeService } from './services/resource-type.service'
import { SoftwareNameService } from './services/software-name.service'
import { SoftwareSpecService } from './services/software-spec.service'
import { SoftwareTypeService } from './services/software-type.service'
import { UseEnvironmentService } from './services/use-environment.service'

@NgModule({
    providers: [
        ErrorLoggerService,
        I18NService,
        TenantService,
        AuthGuard,
        ResourceTypeService,
        SoftwareNameService,
        SoftwareSpecService,
        SoftwareTypeService,
        UseEnvironmentService
    ]
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
