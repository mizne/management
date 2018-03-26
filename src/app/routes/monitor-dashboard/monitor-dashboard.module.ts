import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module'
import { MonitorDashboardComponent } from './monitor-dashboard.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { effects } from './effects'
import { reducers } from './reducers'
import { services } from './services'

export const routes: Routes = [
    {
        path: '',
        component: MonitorDashboardComponent
    }
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
        // StoreModule.forFeature('fromServerAccount', reducers),
        // EffectsModule.forFeature(effects)
    ],
    exports: [],
    declarations: [MonitorDashboardComponent],
    providers: [...services],
    entryComponents: []
})
export class MonitorDashboardModule {}
