import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { InvitationSettingsComponent } from './invitation-settings.component'
import { reducers } from './reducers'
import { CalendarSettingsEffects } from './effects/calendar-settings.effects'
import { ApprovalSettingsEffects } from './effects/approval-settings.effects'
import { KeySettingsEffects } from './effects/key-settings.effects'
import { TemplateSettingsEffects } from './effects/template-settings.effects'
import { CalendarSettingsService } from './services/calendar-settings.service'
import { ApprovalSettingsService } from './services/approval-settings.service'
import { KeySettingsService } from './services/key-settings.service'
import { TemplateSettingsService } from './services/template-settings.service'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

export const routes: Routes = [
  {
    path: '',
    component: InvitationSettingsComponent
  }
]
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('fromInvitationSettings', reducers),
    EffectsModule.forFeature([
      CalendarSettingsEffects,
      ApprovalSettingsEffects,
      KeySettingsEffects,
      TemplateSettingsEffects
    ])
  ],
  exports: [],
  declarations: [InvitationSettingsComponent],
  providers: [
    CalendarSettingsService,
    ApprovalSettingsService,
    KeySettingsService,
    TemplateSettingsService
  ]
})
export class InvitationSettingsModule {}
