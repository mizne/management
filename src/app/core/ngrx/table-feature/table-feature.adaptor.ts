import { DataItem, instanceOf } from '../feature.action'
import {
    BaseTableState,
    TableFeatureAction,
    TableActionCreator,
} from './table-feature.action'
import { TableFeatureEffectsHelper } from './table-feature.effects'

class TableFeatureAdaptor<E extends DataItem> {
    private actionCreator: TableActionCreator
    constructor(private name: string) {
    }

    getActionCreator() {
        if (!this.actionCreator) {
            this.actionCreator = new TableActionCreator(this.name)
        }
        return this.actionCreator
    }

    getEffectsHelper() {
        if (!this.actionCreator) {
            this.actionCreator = new TableActionCreator(this.name)
        }
        return new TableFeatureEffectsHelper<E>(this.actionCreator)
    }

    getReducers(initialState: BaseTableState<E>): (s: BaseTableState<E>, action: TableFeatureAction<E>) => BaseTableState<E> {
        return (state: BaseTableState<E>, action: TableFeatureAction<E>): BaseTableState<E> => {
            return action instanceof TableFeatureAction && action.name === state.name ? action.reducer(state || initialState) : state
        }
    }

    getSelectors() {
        return {
            getLoading: (s: BaseTableState<E>) => s.loading,
            getItems: (s: BaseTableState<E>) => s.items,
            getItemsCount: (s: BaseTableState<E>) => s.itemsCount,
            getPageParams: (s: BaseTableState<E>) => ({ pageIndex: s.pageIndex, pageSize: s.pageSize })
        }
    }

    getInitialState(): BaseTableState<E> {
        return {
            name: this.name,
            items: [],
            itemsCount: 0,
            loading: false,
            pageIndex: 1,
            pageSize: 10
        }
    }
}

export function createAdaptor<E extends DataItem>(name: string) {
    return new TableFeatureAdaptor<E>(name)
}
