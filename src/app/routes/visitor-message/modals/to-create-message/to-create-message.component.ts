import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { NzModalSubject } from 'ng-zorro-antd'
import { Visitor } from '@core/models/visitor.model'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'
import { State, getSearchVisitors, getSearchMoreLoading } from '../../reducers'
import {
    SearchVisitorsAction,
    InitFetchVisitorsAction,
    SearchMoreVisitorsAction
} from '../../actions/to-create-message.action'
import { DestroyService } from '@core/services/destroy.service'
import { TargetVisitor } from '@core/models/message.model'

@Component({
    selector: 'app-to-create-message',
    templateUrl: './to-create-message.component.html',
    providers: [DestroyService]
})
export class ToCreateMessageComponent implements OnInit {
    form: FormGroup
    searchOptions$: Observable<Visitor[]>
    searchLoading$: Observable<boolean>
    searchChangeSub: Subject<string> = new Subject<string>()
    searchMoreSub: Subject<void> = new Subject<void>()

    constructor(
        private fb: FormBuilder,
        private subject: NzModalSubject,
        private store: Store<State>,
        private destroyService: DestroyService
    ) {}

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

    searchChange(searchText) {
        const query = searchText
        this.searchChangeSub.next(query)
    }

    searchMore() {
        this.searchMoreSub.next()
    }

    private initDataSource() {
        this.searchOptions$ = this.store.select(getSearchVisitors)
        this.searchLoading$ = this.store.select(getSearchMoreLoading)
    }

    private initDispatcher() {
        this.store.dispatch(new InitFetchVisitorsAction())
    }

    private initSubscriber() {
        this.initSearchChange()
        this.initSearchMore()
    }

    private initSearchChange() {
        this.searchChangeSub
            .asObservable()
            .debounceTime(3e2)
            .takeUntil(this.destroyService)
            .subscribe(query => {
                this.store.dispatch(new SearchVisitorsAction(query))
            })
    }

    private initSearchMore() {
        this.searchMoreSub
            .asObservable()
            .withLatestFrom(this.searchChangeSub.asObservable().startWith(''))
            .takeUntil(this.destroyService)
            .subscribe(([_, searchText]) => {
                this.store.dispatch(new SearchMoreVisitorsAction(searchText))
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

    toSave() {
        if (this.form.valid) {
            // if (this.isTotal.value) {
            this.subject.next({
                title: this.title.value,
                content: this.content.value,
                receiver: TargetVisitor.ALL
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
}
