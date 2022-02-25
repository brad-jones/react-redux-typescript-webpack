import { createAction } from '@reduxjs/toolkit';

const PREFIX = "counter";

export const increment = createAction<number | undefined>(`${PREFIX}/increment`);

export const decrement = createAction<number | undefined>(`${PREFIX}/decrement`);

export const incrementAsync = createAction<number | undefined>(`${PREFIX}/increment/async`);

export const decrementAsync = createAction<number | undefined>(`${PREFIX}/decrement/async`);