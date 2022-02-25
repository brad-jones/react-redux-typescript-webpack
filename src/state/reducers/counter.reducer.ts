import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement } from '~state/actions/counter.actions'

export interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterReducer = createReducer(initialState, (builder) => builder
    .addCase(increment, (state, action) => ({ value: state.value + (action.payload ?? 1) }))
    .addCase(decrement, (state, action) => ({ value: state.value - (action.payload ?? 1) }))
)