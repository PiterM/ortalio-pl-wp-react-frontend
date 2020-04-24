import { all, CallEffect, fork, ForkEffect, TakeEffect } from 'redux-saga/effects';
import { watchMediaPlayer } from '../Containers/MediaPlayer/MediaPlayer.sagas';
import { watchKeyDown } from '../Containers/Pages/HomePage/HomePage.sagas';

const sagas: Array<() => IterableIterator<ForkEffect | CallEffect | TakeEffect>> = [
  watchMediaPlayer,
  watchKeyDown
];

function* globalSagas() {
  const globalSagasForks = sagas.map(saga => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
