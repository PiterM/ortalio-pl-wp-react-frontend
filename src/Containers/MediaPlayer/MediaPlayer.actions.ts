import { AnyAction } from 'redux';
import ACTION_TYPE from './MediaPlayer.actionTypes';

export interface SetSelectedAudioItemAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_SELECTED_AUDIO_ITEM;
}
export type setSelectedAudioItemAction = (payload: string) => SetSelectedAudioItemAction;
export const setSelectedAudioItemAction: setSelectedAudioItemAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_SELECTED_AUDIO_ITEM
  };
};

export type MediaPlayerActions =
  | SetSelectedAudioItemAction;
