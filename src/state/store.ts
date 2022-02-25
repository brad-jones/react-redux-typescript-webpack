import { configureStore } from '@reduxjs/toolkit'

// Use one or the other, not both they do the same thing.
//import counter from '~redux/slices/counter.slice';
import { counterReducer as counter } from '~state/reducers/counter.reducer';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '~state/sagas/root.saga'
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
    reducer: {
        counter
    },
});

sagaMiddleware.run(rootSaga);