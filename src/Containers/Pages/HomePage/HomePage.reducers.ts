import ACTION_TYPES from './HomePage.actionTypes';
import { MediaState } from './HomePage.state';
import { AnyAction } from 'redux';

export const initState: MediaState = [];

export default (state: MediaState = initState, action: AnyAction): MediaState => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_MEDIA_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
