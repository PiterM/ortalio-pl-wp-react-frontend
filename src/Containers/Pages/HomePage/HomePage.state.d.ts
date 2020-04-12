import { AudioItemState } from '../../AudioItem/AudioItem.state';

export interface MediaState {
  [id: number]: AudioItemState;
}
