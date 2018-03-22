import { NgModule } from '@angular/core'

import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../../shared/shared.module'
import { UserLoginComponent } from './login.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { reducers } from './reducers'
import { LoginEffects } from './effects/login.effects'
import { LoginService } from './services/login.service'

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserLoginComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('fromLogin', reducers),
        EffectsModule.forFeature([LoginEffects])
    ],
    exports: [],
    declarations: [UserLoginComponent],
    providers: [LoginService]
})
export class LoginModule {}
