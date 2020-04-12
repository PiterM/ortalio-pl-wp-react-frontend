import { MediaState } from '../Containers/Pages/HomePage/HomePage.state';
import { AudioItemState } from '../../AudioItem/AudioItem.state';

export interface StoreState {
  media: MediaState | null;
  hoveredMediaId: string | null;
}
