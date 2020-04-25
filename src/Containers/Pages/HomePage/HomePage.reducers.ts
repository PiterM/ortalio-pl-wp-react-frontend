import { LayoutModes } from '../../../Common/constants';
import ACTION_TYPES from './HomePage.actionTypes';
import { MediaState, LayoutOptionsState } from './HomePage.state';
import { AnyAction } from 'redux';

export const mediaInitState: MediaState | null = null;

export const mediaReducer = (state: MediaState | null = mediaInitState, action: AnyAction): MediaState | null => {
  switch (action.type) {
    case ACTION_TYPES.SET_ALL_MEDIA_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const keyDownInitState: number | null = null;

export const keyDownReducer = (state: number | null = keyDownInitState, action: AnyAction): number | null => {
  switch (action.type) {
    case ACTION_TYPES.SET_KEY_DOWN_INIT:
      return null;
    case ACTION_TYPES.SET_KEY_DOWN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const layoutOptionsInitState: LayoutOptionsState = {
  columnsNumber: 5,
  mode: LayoutModes.Extended
};

export const layoutOptionsReducer = (
  state: LayoutOptionsState = layoutOptionsInitState, action: AnyAction
  ): LayoutOptionsState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAYOUT_OPTIONS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
