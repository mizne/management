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
        component: LayoutDefaultComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard/workspace', pathMatch: 'full' },
            {
                path: 'dashboard/workspace',
                loadChildren:
                    './dashboard/workspace/workspace.module#WorkspaceModule'
                // component: DashboardWorkspaceComponent,
                // data: { translate: 'dashboard_workspace' }
            },
            { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
            {
                path: 'message-management',
                redirectTo: 'message-management/platform-message',
                pathMatch: 'full'
            },
            {
                path: 'message-management/platform-message',
                loadChildren:
                    './platform-message/platform-message.module#PlatformMessageModule'
            },
            {
                path: 'message-management/exhibitor-message',
                loadChildren:
                    './exhibitor-message/exhibitor-message.module#ExhibitorMessageModule'
            },
            {
                path: 'message-management/visitor-message',
                loadChildren:
                    './visitor-message/visitor-message.module#VisitorMessageModule'
            },
            {
                path: 'approval-management',
                redirectTo: 'approval-management/to-approve',
                pathMatch: 'full'
            },
            {
                path: 'approval-management/to-approve',
                loadChildren: './to-approve/to-approve.module#ToApproveModule'
            },
            {
                path: 'approval-management/approval-history',
                loadChildren:
                    './approval-history/approval-history.module#ApprovalHistoryModule'
            },
            {
                path: 'invitation-management',
                redirectTo: 'invitation-management/invitation-query',
                pathMatch: 'full'
            },
            {
                path: 'invitation-management/invitation-query',
                loadChildren:
                    './invitation-query/invitation-query.module#InvitationQueryModule'
            },
            {
                path: 'exhibitor-management',
                redirectTo: 'exhibitor-management/exhibitor-list',
                pathMatch: 'full'
            },
            {
                path: 'exhibitor-management/exhibitor-list',
                loadChildren:
                    './exhibitor-list/exhibitor-list.module#ExhibitorListModule'
            },
            {
                path: 'visitor-management',
                redirectTo: 'visitor-management/visitor-list',
                pathMatch: 'full'
            },
            {
                path: 'visitor-management/visitor-list',
                loadChildren:
                    './visitor-list/visitor-list.module#VisitorListModule'
            },
            {
                path: 'terminal-management',
                redirectTo: 'terminal-management/terminal-list',
                pathMatch: 'full'
            },
            {
                path: 'terminal-management/terminal-list',
                loadChildren:
                    './terminal-list/terminal-list.module#TerminalListModule'
            },
            {
                path: 'system-settings',
                redirectTo: 'system-settings/invitation-settings',
                pathMatch: 'full'
            },
            {
                path: 'system-settings/invitation-settings',
                loadChildren:
                    './invitation-settings/invitation-settings.module#InvitationSettingsModule'
            },
            {
                path: 'system-settings/sms-settings',
                loadChildren:
                    './sms-settings/sms-settings.module#SMSSettingsModule'
            },
            {
                path: 'search-result',
                loadChildren:
                    './search-result/search-result.module#SearchResultModule'
            }
        ]
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            {
                path: 'login',
                loadChildren: './passport/login/login.module#LoginModule',
                data: { title: '登录' }
            },
            {
                path: 'register',
                loadChildren:
                    './passport/register/register.module#RegisterModule',
                data: { title: '注册' }
            },
            {
                path: 'register-result',
                component: UserRegisterResultComponent,
                data: { title: '注册结果' }
            }
        ]
    },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: '404' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RouteRoutingModule {}
