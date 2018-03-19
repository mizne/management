import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Exhibitor } from '@core/models/exhibitor.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State, getSearchExhibitors } from '../../reducers'
import {
    SearchExhibitorsAction,
    InitFetchExhibitorsAction
} from '../../actions/terminal-list.action'
import { DestroyService } from '@core/services/destroy.service'

@Component({
    selector: 'app-to-create-terminal',
    templateUrl: './to-create-terminal.component.html',
    providers: [DestroyService]
})
export class ToCreateTerminalComponent implements OnInit {
    form: FormGroup
    searchOptions$: Observable<Exhibitor[]>
    searchChangeSub: Subject<string> = new Subject<string>()
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private store: Store<State>,
        private destroyService: DestroyService
    ) { }

    get name() {
        return this.form.controls.name
    }
    get exhibitorID() {
        return this.form.controls.exhibitorID
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
            this.subject.next(this.form.value)
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

    private initSubscriber() {
        this.searchChangeSub
            .asObservable()
            .debounceTime(3e2)
            .takeUntil(this.destroyService)
            .subscribe(query => {
                this.store.dispatch(new SearchExhibitorsAction(query))
            })
    }

    private buildForm() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            exhibitorID: [null]
        })
    }

}
