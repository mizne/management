export interface PaginationParams {
    pageIndex: number
    pageSize: number
}

export const defaultPaginationParams: PaginationParams = {
    pageIndex: 1,
    pageSize: 10
}

export interface FetchItemsParams {
    condition: { [key: string]: any }
    options: PaginationParams
}
export const defaultFetchItemsParams: FetchItemsParams = {
    condition: {},
    options: defaultPaginationParams
}

export interface FetchItemsCountParams {
    condition: { [key: string]: any }
}
export const defaultFetchItemsCountParams: FetchItemsCountParams = {
    condition: {}
}
