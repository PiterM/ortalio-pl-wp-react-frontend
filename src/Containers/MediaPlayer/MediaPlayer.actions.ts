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

export interface SetSelectedNextAudioItemErrorAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM_ERROR;
}
export type setSelectedNextAudioItemErrorAction = (payload: string) => SetSelectedNextAudioItemErrorAction;
export const setSelectedNextAudioItemErrorAction: setSelectedNextAudioItemErrorAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_SELECTED_NEXT_AUDIO_ITEM_ERROR
  };
};

export interface SetSelectedPreviousAudioItemAction extends AnyAction {
  type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM;
}
export type setSelectedPreviousAudioItemAction = () => SetSelectedPreviousAudioItemAction;
export const setSelectedPreviousAudioItemAction: setSelectedPreviousAudioItemAction = () => {
  return {
    type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM
  };
};

export interface SetSelectedPreviousAudioItemSuccessAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM_SUCCESS;
}
export type setSelectedPreviousAudioItemSuccessAction = (payload: string) => SetSelectedPreviousAudioItemSuccessAction;
export const setSelectedPreviousAudioItemSuccessAction: setSelectedPreviousAudioItemSuccessAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM_SUCCESS
  };
};

export interface SetSelectedPreviousAudioItemErrorAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM_ERROR;
}
export type setSelectedPreviousAudioItemErrorAction = (payload: string) => SetSelectedPreviousAudioItemErrorAction;
export const setSelectedPreviousAudioItemErrorAction: setSelectedPreviousAudioItemErrorAction = (payload: string) => {
  return {
    payload,
    type: ACTION_TYPE.SET_SELECTED_PREVIOUS_AUDIO_ITEM_ERROR
  };
};

export type MediaPlayerActions =
  | SetSelectedAudioItemAction
  | SetSelectedNextAudioItemAction
  | SetSelectedNextAudioItemSuccessAction
  | SetSelectedPreviousAudioItemAction
  | SetSelectedPreviousAudioItemSuccessAction
  | SetSelectedNextAudioItemErrorAction
  | SetSelectedPreviousAudioItemErrorAction;

