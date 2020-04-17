import ACTION_TYPES from './MediaPlayer.actionTypes';
import { AnyAction } from 'redux';

export const initState: string | null = null;

export default (state: string | null = initState, action: AnyAction): string | null => {
  switch (action.type) {
    case ACTION_TYPES.SET_SELECTED_PREVIOUS_AUDIO_ITEM_ERROR:
    case ACTION_TYPES.SET_SELECTED_NEXT_AUDIO_ITEM_ERROR:
      return action.payload;      
    default:
      return state;
  }
};