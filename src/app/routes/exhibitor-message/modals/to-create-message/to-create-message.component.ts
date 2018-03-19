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
} from '../../actions/exhibitor-message.action'
import { DestroyService } from '@core/services/destroy.service'
import { TargetExhibitor } from '@core/models/message.model'

@Component({
    selector: 'app-to-create-message',
    templateUrl: './to-create-message.component.html',
    providers: [DestroyService]
})
export class ToCreateMessageComponent implements OnInit {
    form: FormGroup
    searchOptions$: Observable<Exhibitor[]>
    searchChangeSub: Subject<string> = new Subject<string>()
    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private store: Store<State>,
        private destroyService: DestroyService
    ) { }

    get title() {
        return this.form.controls.title
    }
    get content() {
        return this.form.controls.content
    }
    get receiver() {
        return this.form.controls.receiver
    }
    get isTotal() {
        return this.form.controls.isTotal
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
            // if (this.isTotal.value) {
            this.subject.next({
                title: this.title.value,
                content: this.content.value,
                receiver: TargetExhibitor.ALL
            })
            // } else {
            //     this.subject.next({
            //         title: this.title.value,
            //         content: this.content.value,
            //         receiver: this.receiver.value
            //     })
            // }

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
            title: [null, Validators.required],
            content: [null, Validators.required],
            receiver: [null],
            isTotal: [null]
        })
    }
}
