import React from 'react'
import { useAppDispatch, useAppSelector } from '~state/hooks';

// Use the slice or the separate actions and selector, not both they do the same thing.
//import { increment, decrement, selectCount } from '~redux/slices/counter.slice'
import { increment, decrement, incrementAsync, decrementAsync } from "~state/actions/counter.actions"
import { selectCount } from "~state/selectors/counter.selectors"

export const Counter = () =>
    <div>
        <h2>Counter: {useAppSelector(selectCount)}</h2>
        <div>
            <button
                aria-label="Increment value"
                onClick={() => useAppDispatch(increment())}
            >
                Increment
            </button>
            <button
                aria-label="Decrement value"
                onClick={() => useAppDispatch(decrement())}
            >
                Decrement
            </button>
            <button
                aria-label="Increment value, slowly"
                onClick={() => useAppDispatch(incrementAsync())}
            >
                Increment ASYNC
            </button>
            <button
                aria-label="Decrement value, slowly"
                onClick={() => useAppDispatch(decrementAsync())}
            >
                Decrement ASYNC
            </button>
        </div>
    </div>