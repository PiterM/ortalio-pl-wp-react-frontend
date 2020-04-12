import { AnyAction } from 'redux';
import ACTION_TYPE from './MediaPlayer.actionTypes';

export interface SetHoveredAudioItemAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_HOVERED_AUDIO_ITEM;
}
export type setHoveredAudioItemAction = (payload: string) => SetHoveredAudioItemAction;
export const setHoveredAudioItemAction: setHoveredAudioItemAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_HOVERED_AUDIO_ITEM
  };
};

export type MediaPlayerActions =
  | SetHoveredAudioItemAction;
