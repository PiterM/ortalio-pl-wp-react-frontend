import { put, takeLatest, PutEffect } from 'redux-saga/effects';
import {
    SetKeyDownInitAction,
    SetKeyDownSuccessAction,
    setKeyDownSuccessAction
} from './HomePage.actions';
import ACTION_TYPES from './HomePage.actionTypes';

type KeyDownCodeIterator = IterableIterator<PutEffect<SetKeyDownSuccessAction>>;

export function* setKeyDownCode(action: SetKeyDownInitAction): KeyDownCodeIterator {
    yield put(setKeyDownSuccessAction(action.payload));
}

export function* watchKeyDown() {
    yield takeLatest(ACTION_TYPES.SET_KEY_DOWN_INIT, setKeyDownCode);
}
