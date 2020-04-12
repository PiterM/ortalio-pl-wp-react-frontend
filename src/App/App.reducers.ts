import { combineReducers, Reducer } from 'redux';
import { StoreState } from './App.store.d';
import mediaReducer from '../Containers/Pages/HomePage/HomePage.reducers';
import mediaPlayerReducer from '../Containers/MediaPlayer/MediaPlayer.reducers';

const applicationReducers: Reducer<StoreState> =
  combineReducers({
    media: mediaReducer,
    selectedMediaId: mediaPlayerReducer,
  });

export default applicationReducers;
