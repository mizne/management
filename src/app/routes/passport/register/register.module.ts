import { NgModule } from '@angular/core'

import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../../shared/shared.module'
import { UserRegisterComponent } from './register.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { RegisterEffects } from './effects/register.effects'
import { RegisterService } from './services/register.service'

export const routes: Routes = [
    {
        path: '',
        component: UserRegisterComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromRegister', reducers),
        EffectsModule.forFeature([RegisterEffects])
    ],
    exports: [],
    declarations: [UserRegisterComponent],
    providers: [RegisterService]
})
export class RegisterModule {}
