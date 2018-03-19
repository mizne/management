import { NgModule, Optional, SkipSelf } from '@angular/core'
import { throwIfAlreadyLoaded } from './module-import-guard'

import { ErrorLoggerService } from './services/error-logger.service'
import { I18NService } from './i18n/i18n.service'
import { TenantService } from './services/tenant.service'
import { AuthGuard } from './services/auth-guard.service'
import { TerminalService } from './services/terminal.service'
import { ExhibitorService } from './services/exhibitor.service'
import { ExhibitionService } from './services/exhibition.service'
import { VisitorService } from './services/visitor.service'
import { VisitorInvitationService } from './services/visitor-invitation.service'
import { ExhibitorInvitationService } from './services/exhibitor-invitation.service'
import { MessageService } from './services/message.service'

@NgModule({
    providers: [
        ErrorLoggerService,
        I18NService,
        TenantService,
        AuthGuard,
        TerminalService,
        ExhibitorService,
        ExhibitionService,
        VisitorService,
        VisitorInvitationService,
        ExhibitorInvitationService,
        MessageService
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
