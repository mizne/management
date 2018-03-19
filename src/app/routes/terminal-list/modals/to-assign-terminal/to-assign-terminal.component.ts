import { Component, OnInit, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
import { State, getSearchExhibitors } from '../../reducers'
import {
    SearchExhibitorsAction,
    InitFetchExhibitorsAction
} from '../../actions/terminal-list.action'
import { Exhibitor } from '@core/models/exhibitor.model'
import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-assign-terminal',
    templateUrl: './to-assign-terminal.component.html',
    providers: [DestroyService]
})
export class ToAssignTerminalComponent implements OnInit {
    private _id: string
    form: FormGroup
    searchOptions$: Observable<Exhibitor[]>
    searchChangeSub: Subject<string> = new Subject<string>()

    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private store: Store<State>,
        private destroyService: DestroyService
    ) { }

    get exhibitorID() {
        return this.form.controls.exhibitorID
    }

    @Input()
    set id(v: string) {
        this._id = v
    }

    ngOnInit() {
        this.buildForm()
        this.initDataSource()
        this.initDispatcher()
        this.initSubscriber()
    }

    searchChange(searchText: string) {
        this.searchChangeSub.next(searchText)
    }

    toSave() {
        if (this.form.valid) {
            this.subject.next({
                ...this.form.value,
                id: this._id
            })
            this.subject.destroy('onOk')
        }
    }

    toCancel() {
        this.subject.destroy('onCancel')
    }

    private initDataSource() {
        this.searchOptions$ = this.store.select(getSearchExhibitors)
    }

    private initDispatcher() {
        this.store.dispatch(new InitFetchExhibitorsAction())
    }

    private buildForm() {
        this.form = this.fb.group({
            exhibitorID: [null, Validators.required]
        })
    }

    private initSubscriber() {
        this.searchChangeSub
            .asObservable()
            .debounceTime(3e2)
            .takeUntil(this.destroyService)
            .subscribe(query => {
                this.store.dispatch(new SearchExhibitorsAction(query))
            })
    }
}
