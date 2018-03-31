import { FeatureAction, DataItem } from '../feature.action'
import { FetchItemsParams, defaultFetchItemsParams, FetchItemsCountParams, PaginationParams, defaultFetchItemsCountParams } from '@core/models/pagination.model';


export abstract class TableFeatureAction<E extends DataItem> extends FeatureAction<BaseTableState<E>> {
    constructor(public name: string, action: string) {
        super(name, action)
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return state
    }
}

export interface BaseTableState<E extends DataItem> {
    name: string
    items: E[]
    itemsCount: number
    loading: boolean
    pageIndex: number
    pageSize: number
}

export class FetchItemsAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: FetchItemsParams) {
        super(name, 'Fetch Items')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            loading: true
        })
    }
}

export class FetchItemsSuccessAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public items: E[]) {
        super(name, 'Fetch Items Success')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            loading: false,
            items: this.items
        })
    }
}

export class FetchItemsFailureAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public errMsg?: string) {
        super(name, 'Fetch Items Failure')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            loading: false,
        })
    }
}


export class FetchItemsCountAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: FetchItemsCountParams) {
        super(name, 'Fetch Items Count')
    }
}

export class FetchItemsCountSuccessAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public count: number) {
        super(name, 'Fetch Items Count Success')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            itemsCount: this.count
        })
    }
}

export class FetchItemsCountFailureAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public errMsg?: string) {
        super(name, 'Fetch Items Count Failure')
    }
}



export class CreateItemAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: E) {
        super(name, 'Create Item')
    }
}

export class CreateItemSuccessAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string) {
        super(name, 'Create Item Success')
    }
}

export class CreateItemFailureAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public errMsg?: string) {
        super(name, 'Create Item Failure')
    }
}


export class EditItemAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: E) {
        super(name, 'Edit Item')
    }
}

export class EditItemSuccessAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: E) {
        super(name, 'Edit Item Success')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            items: state.items.map(e =>
                e.id === this.params.id
                    ? Object.assign({}, this.params)
                    : Object.assign({}, e)
            )
        })
    }
}

export class EditItemFailureAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public errMsg?: string) {
        super(name, 'Edit Item Failure')
    }
}

export class EnsurePageParamsAction<E extends DataItem> extends TableFeatureAction<E> {
    constructor(name: string, public params: PaginationParams) {
        super(name, 'Ensure Page Params')
    }

    reducer(state: BaseTableState<E>): BaseTableState<E> {
        return Object.assign({}, state, {
            pageIndex: this.params.pageIndex,
            pageSize: this.params.pageSize
        })
    }
}

export class TableActionCreator {
    constructor(private name: string) { }

    has<E>(action: TableFeatureAction<E>): boolean {
        return this.name === action.name
    }

    fetchItemsAction<E>(params: FetchItemsParams = defaultFetchItemsParams): FetchItemsAction<E> {
        return new FetchItemsAction(this.name, params)
    }

    fetchItemsSuccessAction<E>(items: E[]): FetchItemsSuccessAction<E> {
        return new FetchItemsSuccessAction(this.name, items)
    }

    fetchItemsFailureAction<E>(errMsg?: string): FetchItemsFailureAction<E> {
        return new FetchItemsFailureAction(this.name, errMsg)
    }

    fetchItemsCountAction<E>(params: FetchItemsCountParams = defaultFetchItemsCountParams): FetchItemsCountAction<E> {
        return new FetchItemsCountAction(this.name, params)
    }

    fetchItemsCountSuccessAction<E>(count: number): FetchItemsCountSuccessAction<E> {
        return new FetchItemsCountSuccessAction(this.name, count)
    }

    fetchItemsCountFailureAction<E>(errMsg?: string): FetchItemsCountFailureAction<E> {
        return new FetchItemsCountFailureAction(this.name, errMsg)
    }

    createItemAction<E>(params: E): CreateItemAction<E> {
        return new CreateItemAction(this.name, params)
    }

    createItemSuccessAction<E>(): CreateItemSuccessAction<E> {
        return new CreateItemSuccessAction(this.name)
    }

    createItemFailureAction<E>(errMsg?: string): CreateItemFailureAction<E> {
        return new CreateItemFailureAction(this.name, errMsg)
    }

    editItemAction<E>(params: E): EditItemAction<E> {
        return new EditItemAction(this.name, params)
    }

    editItemSuccessAction<E>(params: E): EditItemSuccessAction<E> {
        return new EditItemSuccessAction(this.name, params)
    }

    editItemFailureAction<E>(errMsg?: string): EditItemFailureAction<E> {
        return new EditItemFailureAction(this.name, errMsg)
    }

    ensurePageParamsAction<E>(params: PaginationParams): EnsurePageParamsAction<E> {
        return new EnsurePageParamsAction(this.name, params)
    }
}

export type TableActionUnion<E extends DataItem> =
    | FetchItemsAction<E>
    | FetchItemsSuccessAction<E>
    | FetchItemsFailureAction<E>
    | FetchItemsCountAction<E>
    | FetchItemsCountSuccessAction<E>
    | FetchItemsCountFailureAction<E>
    | CreateItemAction<E>
    | CreateItemSuccessAction<E>
    | CreateItemFailureAction<E>
    | EditItemAction<E>
    | EditItemSuccessAction<E>
    | EditItemFailureAction<E>
    | EnsurePageParamsAction<E>
