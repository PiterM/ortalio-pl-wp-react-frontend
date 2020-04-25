import { AudioItemState } from '../../AudioItem/AudioItem.state';
import { LayoutModes } from '../../../Common/constants';

export interface MediaState {
  [id: number]: AudioItemState;
}

export interface LayoutOptionsState {
  columnsNumber: number;
  mode: LayoutModes;
}