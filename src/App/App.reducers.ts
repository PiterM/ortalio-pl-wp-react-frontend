import { combineReducers, Reducer } from 'redux';
import { StoreState } from './App.store.d';
import mediaReducer from '../Containers/Pages/HomePage/HomePage.reducers';

const applicationReducers: Reducer<StoreState> =
  combineReducers({
    media: mediaReducer,
  });

export default applicationReducers;
