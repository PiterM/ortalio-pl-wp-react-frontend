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

export interface SetSelectedNextAudioItemAction extends AnyAction {
  type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM;
}
export type setSelectedNextAudioItemAction = () => SetSelectedNextAudioItemAction;
export const setSelectedNextAudioItemAction: setSelectedNextAudioItemAction = () => {
  return {
    type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM
  };
};

export interface SetSelectedNextAudioItemSuccessAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM_SUCCESS;
}
export type setSelectedNextAudioItemSuccessAction = (payload: string) => SetSelectedNextAudioItemSuccessAction;
export const setSelectedNextAudioItemSuccessAction: setSelectedNextAudioItemSuccessAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM_SUCCESS
  };
};

export type MediaPlayerActions =
  | SetSelectedAudioItemAction
  | SetSelectedNextAudioItemAction
  | SetSelectedNextAudioItemSuccessAction;
