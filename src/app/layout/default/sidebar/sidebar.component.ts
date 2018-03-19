import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { SettingsService } from '@delon/theme'
import { TenantService } from '@core/services/tenant.service'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    userName: string
    tenantName: string
    avatarUrl: string
    constructor(
        public settings: SettingsService,
        public msgSrv: NzMessageService,
        public tenantService: TenantService
    ) {}

    ngOnInit() {
        this.userName = this.tenantService.getUserName()
        this.tenantName = this.tenantService.getTenantName()
        this.avatarUrl = this.tenantService.getAvatarUrl()
    }

    logout() {
        this.tenantService.logout()
    }
}
