import {
    Component,
    HostBinding,
    ViewChild,
    Input,
    OnInit,
    ElementRef,
    AfterViewInit,
    EventEmitter,
    Output
} from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'header-search',
    template: `
    <nz-input [formControl]="inputCtrl" nzPlaceHolder='{{ "top-search-ph" | translate}}' (keypress)="ensure($event)"
        (nzFocus)="qFocus()" (nzBlur)="qBlur()">
        <ng-template #prefix>
            <i class="anticon anticon-search"></i>
        </ng-template>
    </nz-input>
    `
})
export class HeaderSearchComponent implements AfterViewInit {
    qIpt: HTMLInputElement

    inputCtrl: FormControl = new FormControl('')
    @Output() search: EventEmitter<string> = new EventEmitter<string>()

    @HostBinding('class.header-search__focus') focus = false

    @HostBinding('class.header-search__toggled') searchToggled = false

    @Input()
    set toggleChange(value: boolean) {
        if (typeof value === 'undefined') return
        this.searchToggled = true
        this.focus = true
        setTimeout(() => this.qIpt.focus(), 300)
    }

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        this.qIpt = (this.el.nativeElement as HTMLElement).querySelector(
            '.ant-input'
        ) as HTMLInputElement
    }

    qFocus() {
        this.focus = true
    }

    qBlur() {
        this.focus = false
        this.searchToggled = false
    }

    ensure(ev) {
        if (ev.keyCode === 13) {
            this.search.emit(this.inputCtrl.value)
        }
    }
}
