import ACTION_TYPES from './MediaPlayer.actionTypes';
import { AnyAction } from 'redux';

export const initState: string = '';

export default (state: string = initState, action: AnyAction):string => {
  switch (action.type) {
    case ACTION_TYPES.SET_HOVERED_AUDIO_ITEM:
      return action.payload;
    default:
      return state;
  }
};
