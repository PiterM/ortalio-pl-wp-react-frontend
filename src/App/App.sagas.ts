import { all, CallEffect, fork, ForkEffect, TakeEffect } from 'redux-saga/effects';
import { watchMediaPlayer } from '../Containers/MediaPlayer/MediaPlayer.sagas';

const sagas: Array<() => IterableIterator<ForkEffect | CallEffect | TakeEffect>> = [
  watchMediaPlayer,
];

function* globalSagas() {
  const globalSagasForks = sagas.map(saga => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
