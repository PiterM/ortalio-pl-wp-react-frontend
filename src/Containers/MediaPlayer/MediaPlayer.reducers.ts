import ACTION_TYPES from './MediaPlayer.actionTypes';
import { AnyAction } from 'redux';

export const initState: string | null = null;

export const mediaPlayerReducer = (state: string | null = initState, action: AnyAction): string | null => {
  switch (action.type) {
    case ACTION_TYPES.SET_SELECTED_AUDIO_ITEM:
    case ACTION_TYPES.SET_SELECTED_PREVIOUS_AUDIO_ITEM_SUCCESS:
    case ACTION_TYPES.SET_SELECTED_NEXT_AUDIO_ITEM_SUCCESS:
    case ACTION_TYPES.SET_SELECTED_UPPER_AUDIO_ITEM_SUCCESS:
    case ACTION_TYPES.SET_SELECTED_LOWER_AUDIO_ITEM_SUCCESS:
      return action.payload;      
    default:
      return state;
  }
};

export const loadingTrackIdReducer = (state: string = '', action: AnyAction): string => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING_TRACK_ID:
      return action.payload;      
    default:
      return state;
  }
};
