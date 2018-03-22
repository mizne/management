import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { environment } from '@env/environment'
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component'
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component'
import { LayoutPassportComponent } from '../layout/passport/passport.component'

// passport pages
import { UserLoginComponent } from './passport/login/login.component'
import { UserRegisterComponent } from './passport/register/register.component'
import { UserRegisterResultComponent } from './passport/register-result/register-result.component'
import { AuthGuard } from 'app/core/services/auth-guard.service'
// dashboard pages
import { DashboardWorkspaceComponent } from './dashboard/workspace/workspace.component'
// single pages
import { Exception403Component } from './exception/403.component'
import { Exception404Component } from './exception/404.component'
import { Exception500Component } from './exception/500.component'

const routes: Routes = [
    {
        path: '',
        // pathMatch: 'full',
        component: LayoutDefaultComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard/workspace', pathMatch: 'full' },
            {
                path: 'dashboard/workspace',
                loadChildren:
                    './dashboard/workspace/workspace.module#WorkspaceModule'
            },
            { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
            {
                path: 'account-management',
                redirectTo: 'account-management/software-account'
            },
            {
                path: 'account-management/software-account',
                loadChildren:
                    'app/routes/software-account/software-account.module#SoftwareAccountModule'
            },
            {
                path: 'account-management/server-account',
                loadChildren:
                    'app/routes/server-account/server-account.module#ServerAccountModule'
            },
            {
                path: 'assets-management',
                redirectTo: 'assets-management/resource-apply'
            },
            {
                path: 'assets-management/resource-apply',
                loadChildren:
                    'app/routes/resource-apply/resource-apply.module#ResourceApplyModule'
            },
            {
                path: 'assets-management/unified-apply',
                loadChildren:
                    'app/routes/unified-apply/unified-apply.module#UnifiedApplyModule'
            }
            // {
            //     path: 'assets-management/to-approve',
            //     loadChildren: './to-approve/to-approve.module#ToApproveModule'
            // },
            // {
            //     path: 'assets-management/my-apply',
            //     loadChildren: './my-apply/my-apply.module#MyApplyModule'
            // },
            // {
            //     path: 'assets-management/distribution-treasury',
            //     loadChildren:
            //         './distribution-treasury/distribution-treasury.module#DistributionTreasuryModule'
            // },
            // {
            //     path: 'assets-management/assets-recovery',
            //     loadChildren:
            //         './assets-recovery/assets-recovery.module#AssetsRecoveryModule'
            // },
            // {
            //     path: 'monitor-management',
            //     redirectTo: 'monitor-management/monitor-dashboard',
            //     pathMatch: 'full'
            // },
            // {
            //     path: 'monitor-management/monitor-dashboard',
            //     loadChildren:
            //         './monitor-dashboard/monitor-dashboard.module#MonitorDashboardModule'
            // }
        ]
    }
    // passport
    // {
    //     path: 'passport',
    //     component: LayoutPassportComponent,
    //     children: [
    //         {
    //             path: 'login',
    //             loadChildren: './passport/login/login.module#LoginModule',
    //             data: { title: '登录' }
    //         },
    //         {
    //             path: 'register',
    //             loadChildren:
    //                 './passport/register/register.module#RegisterModule',
    //             data: { title: '注册' }
    //         },
    //         {
    //             path: 'register-result',
    //             component: UserRegisterResultComponent,
    //             data: { title: '注册结果' }
    //         }
    //     ]
    // },
    // { path: '403', component: Exception403Component },
    // { path: '404', component: Exception404Component },
    // { path: '500', component: Exception500Component },
    // { path: '**', redirectTo: '404' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RouteRoutingModule {}
