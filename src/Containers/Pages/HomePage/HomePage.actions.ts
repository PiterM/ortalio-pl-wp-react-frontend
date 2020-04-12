import { AnyAction } from 'redux';
import ACTION_TYPE from './HomePage.actionTypes';
import { MediaState } from './HomePage.state';

export interface FetchAllMediaDataInitAction extends AnyAction {
  type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_INIT;
}
export type fetchAllMediaDataInitAction = () => FetchAllMediaDataInitAction;
export const fetchAllMediaDataInitAction: fetchAllMediaDataInitAction = () => {
  return {
    type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_INIT
  };
};

export interface FetchAllMediaDataSuccessAction extends AnyAction {
  payload: MediaState;
  type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_SUCCESS;
}
export type fetchAllMediaDataSuccessAction = (payload: MediaState) => FetchAllMediaDataSuccessAction;
export const fetchAllMediaDataSuccessAction: fetchAllMediaDataSuccessAction = (payload: MediaState) => {
  return {
    payload,
    type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_SUCCESS
  };
};

export interface FetchAllMediaDataErrorAction extends AnyAction {
  payload: string;
  type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_SUCCESS;
}
export type fetchAllMediaDataErrorAction = (payload: string) => FetchAllMediaDataErrorAction;
export const fetchAllMediaDataErrorAction: fetchAllMediaDataErrorAction = (error: string) => {
  return {
    payload: error,
    type: ACTION_TYPE.FETCH_ALL_MEDIA_DATA_SUCCESS
  };
};

export type IndexPageMediaActions =
  | FetchAllMediaDataInitAction
  | FetchAllMediaDataSuccessAction
  | FetchAllMediaDataErrorAction;
