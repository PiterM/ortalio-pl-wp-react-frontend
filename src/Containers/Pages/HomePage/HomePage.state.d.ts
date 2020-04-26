import { AudioItemState } from '../../AudioItem/AudioItem.state';
import { LayoutModes } from '../../../Common/constants';
import { GraphNode } from '../../../Common/models';

export interface MediaState {
  [id: number]: AudioItemState;
}

export interface LayoutOptionsState {
  columnsNumber: number;
  mode: LayoutModes;
}

export interface ItemsGraphState {
  [key: string]: GraphNode;
}