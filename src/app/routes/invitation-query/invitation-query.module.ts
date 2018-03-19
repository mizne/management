import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { InvitationQueryComponent } from './invitation-query.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { VisitorInvitationEffects } from './effects/visitor-invitation.effects'
import { ExhibitorInvitationEffects } from './effects/exhibitor-invitation.effects'
import { InvitationQueryService } from './services/invitation-query.service'

export const routes: Routes = [
    {
        path: '',
        component: InvitationQueryComponent
    }
]
@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromInvitationQuery', reducers),
        EffectsModule.forFeature([
            VisitorInvitationEffects,
            ExhibitorInvitationEffects
        ])
    ],
    exports: [],
    declarations: [InvitationQueryComponent],
    providers: [InvitationQueryService]
})
export class InvitationQueryModule {}
