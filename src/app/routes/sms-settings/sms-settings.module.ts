import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'

import { SMSSettingsComponent } from './sms-settings.component'

export const routes: Routes = [
  {
    path: '',
    component: SMSSettingsComponent
  }
]
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
  declarations: [SMSSettingsComponent],
  providers: []
})
export class SMSSettingsModule {}
