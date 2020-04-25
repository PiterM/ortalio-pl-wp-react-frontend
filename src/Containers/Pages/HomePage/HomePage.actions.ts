import { AnyAction } from 'redux';
import ACTION_TYPE from './HomePage.actionTypes';
import { MediaState, LayoutOptionsState } from './HomePage.state';

export interface SetAllMediaDataSuccessAction extends AnyAction {
  payload: MediaState;
  type: ACTION_TYPE.SET_ALL_MEDIA_DATA_SUCCESS;
}
export type setAllMediaDataSuccessAction = (payload: MediaState) => SetAllMediaDataSuccessAction;
export const setAllMediaDataSuccessAction: setAllMediaDataSuccessAction = (payload: MediaState) => {
  return {
    payload,
    type: ACTION_TYPE.SET_ALL_MEDIA_DATA_SUCCESS
  };
};

export interface SetKeyDownInitAction extends AnyAction {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_INIT;
}
export type setKeyDownInitAction = (payload: number) => SetKeyDownInitAction;
export const setKeyDownInitAction: setKeyDownInitAction = (payload: number) => {
  return {
    payload,
    type: ACTION_TYPE.SET_KEY_DOWN_INIT
  };
};

export interface SetKeyDownSuccessAction extends AnyAction {
  payload: number;
  type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS;
}
export type setKeyDownSuccessAction = (payload: number) => SetKeyDownSuccessAction;
export const setKeyDownSuccessAction: setKeyDownSuccessAction = (payload: number) => {
  return {
    payload,
    type: ACTION_TYPE.SET_KEY_DOWN_SUCCESS
  };
};

export interface SetLayoutOptionsSuccessAction extends AnyAction {
  payload: LayoutOptionsState;
  type: ACTION_TYPE.SET_LAYOUT_OPTIONS_SUCCESS;
}
export type setLayoutOptionsSuccessAction = (payload: LayoutOptionsState) => SetLayoutOptionsSuccessAction;
export const setLayoutOptionsSuccessAction: setLayoutOptionsSuccessAction = (payload: LayoutOptionsState) => {
  return {
    payload,
    type: ACTION_TYPE.SET_LAYOUT_OPTIONS_SUCCESS
  };
};

export type HomePageActions =
  | SetAllMediaDataSuccessAction
  | SetKeyDownInitAction
  | SetKeyDownSuccessAction
  | SetLayoutOptionsSuccessAction;