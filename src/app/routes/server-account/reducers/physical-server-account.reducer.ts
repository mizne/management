import { createTableAdaptor, BaseTableState, TableFeatureAction } from '@core/ngrx'
import { PhysicalServerAccount } from '@core/models/server-account.model'


const adaptor = createTableAdaptor<PhysicalServerAccount>('Physical Server Account')

export interface State extends BaseTableState<PhysicalServerAccount> { }

export const initialState: State = adaptor.getInitialState()

export function reducer(
    state: State = initialState,
    action: TableFeatureAction<PhysicalServerAccount>
): State {
    return adaptor.getReducers(initialState)(state, action)
}
const { getLoading, getItems, getItemsCount, getPageParams } = adaptor.getSelectors()

export {
    getLoading,
    getItems as getAccounts,
    getItemsCount as getAccountsCount,
    getPageParams
}

export const actionCreator = adaptor.getActionCreator()
export const effectsHelps = adaptor.getEffectsHelper()

