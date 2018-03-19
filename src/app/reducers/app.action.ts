import { Action } from '@ngrx/store'

export const INCREMENT = '[App] Increment'
export const DECREMENT = '[App] Decrement'

export interface State {
    count: number
}
const initialState: State = {
    count: 0
}

export class IncrementAction implements Action {
    readonly type = INCREMENT
}
export class DecrementAction implements Action {
    readonly type = DECREMENT
}

export type Actions = IncrementAction | DecrementAction

export function reduder(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            }
        case DECREMENT:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}

export const getCount = (state: State) => state.count
