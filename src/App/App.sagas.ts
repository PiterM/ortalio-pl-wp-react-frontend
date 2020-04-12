import { all, CallEffect, fork, ForkEffect, TakeEffect } from 'redux-saga/effects';
import { watchMedia } from '../Containers/Pages/HomePage/HomePage.sagas';

const sagas: Array<() => IterableIterator<ForkEffect | CallEffect | TakeEffect>> = [
  watchMedia,
];

function* globalSagas() {
  const globalSagasForks = sagas.map(saga => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;
