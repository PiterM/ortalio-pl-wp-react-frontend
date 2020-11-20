import { MediaState, LayoutOptionsState, ItemsGraphState } from '../Containers/Pages/HomePage/HomePage.state';
import { GraphNode } from '../Common/models';
import { AudioItemState } from '../../AudioItem/AudioItem.state';

export interface StoreState {
  media: MediaState | null;
  selectedMediaId: string | null;
  loadingTrackId: string;
  errorMessage: string | null;
  keyDownCode: number | null;
  layoutOptions: LayoutOptionsState;
  itemsGraph: ItemsGraphState | GraphNode[];
}
