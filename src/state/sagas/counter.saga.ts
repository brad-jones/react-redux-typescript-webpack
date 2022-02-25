import { put, call, takeEvery } from 'redux-saga/effects'
import { increment, decrement, incrementAsync, decrementAsync } from '~state/actions/counter.actions'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function* watchIncrementAsync() {
    yield takeEvery(incrementAsync, function* () {
        yield call(delay, 1000)
        yield put(increment())
    })
}

export function* watchDecrementAsync() {
    yield takeEvery(decrementAsync, function* () {
        yield call(delay, 1000)
        yield put(decrement())
    })
}