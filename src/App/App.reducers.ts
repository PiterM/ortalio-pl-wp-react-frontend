import { combineReducers, Reducer } from 'redux';
import { StoreState } from './App.store.d';
import { mediaReducer, keyDownReducer } from '../Containers/Pages/HomePage/HomePage.reducers';
import errorMessageReducer from '../Containers/MediaPlayer/ErrorMessage.reducers';
import mediaPlayerReducer from '../Containers/MediaPlayer/MediaPlayer.reducers';

const applicationReducers: Reducer<StoreState> =
  combineReducers({
    media: mediaReducer,
    selectedMediaId: mediaPlayerReducer,
    errorMessage: errorMessageReducer,
    keyDownCode: keyDownReducer,
  });

export default applicationReducers;
