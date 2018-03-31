import { createTableAdaptor, BaseTableState, TableFeatureAction } from '@core/ngrx'
import { VirtualServerAccount } from '@core/models/server-account.model'


const adaptor = createTableAdaptor<VirtualServerAccount>('Virtual Server Account')

export interface State extends BaseTableState<VirtualServerAccount> { }

export const initialState: State = adaptor.getInitialState()

export function reducer(
    state: State = initialState,
    action: TableFeatureAction<VirtualServerAccount>
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

