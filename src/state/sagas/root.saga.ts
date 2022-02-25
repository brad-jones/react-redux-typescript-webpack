import { all } from 'redux-saga/effects'
import { watchIncrementAsync, watchDecrementAsync } from '~state/sagas/counter.saga'

export function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        watchDecrementAsync()
    ])
}