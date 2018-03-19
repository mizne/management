import { Component, OnInit, Inject } from '@angular/core'
import { TenantService } from '@core/services/tenant.service'

@Component({
    selector: 'header-user',
    template: `
    <nz-dropdown nzPlacement="bottomRight">
        <div class="item d-flex align-items-center px-sm" nz-dropdown>
            <nz-avatar class="avatar" [nzSrc]="avatarUrl"></nz-avatar>
            {{userName}}
        </div>
        <div nz-menu class="width-sm">
            <div nz-menu-item [nzDisable]="true"><i class="anticon anticon-user mr-sm"></i>个人中心</div>
            <div nz-menu-item [nzDisable]="true"><i class="anticon anticon-setting mr-sm"></i>设置</div>
            <li nz-menu-divider></li>
            <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>退出登录</div>
        </div>
    </nz-dropdown>
    `
})
export class HeaderUserComponent implements OnInit {
    userName: string
    avatarUrl: string
    constructor(public tenantService: TenantService) {}

    ngOnInit(): void {
        this.userName = this.tenantService.getUserName()
        this.avatarUrl = this.tenantService.getAvatarUrl()
    }

    logout() {
        this.tenantService.logout()
    }
}
