import applicationReducers from './App.reducers';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import saga from './App.sagas';
import { StoreState } from './App.store.d';
import { EnvironmentMode } from '../Utils/Constants';

let store: Store<StoreState>;
const composeEnhancers = composeWithDevTools({});
// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];
const middlewares: any[] = [];

if (process.env.NODE_ENV === EnvironmentMode.Production) {
  store = createStore<StoreState>(applicationReducers, applyMiddleware(...middlewares));
} else {
  store = createStore<StoreState>(applicationReducers, composeEnhancers(applyMiddleware(...middlewares)));
}

// sagaMiddleware.run(saga);

export default store;
