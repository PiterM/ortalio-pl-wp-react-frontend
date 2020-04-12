import * as React from 'react';
import styled from '@emotion/styled';
import { connect} from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { AudioItemState } from '../AudioItem/AudioItem.state';
import { MediaState } from '../Pages/HomePage/HomePage.state';
import { colors, dimensions } from '../../Common/variables';

const StyledMediaPlayer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${dimensions.mediaPlayer.height}px;
    width: 100%;
    background-color: ${colors.mediaPlayer.background};
    z-index: 2;
`;

interface MediaPlayerMappedProps {
    media?: MediaState;
    selectedMediaId?: string;
    selectedMediaItem?: AudioItemState;
}

type MediaPlayerProps = MediaPlayerMappedProps;

export class MediaPlayer extends React.Component<MediaPlayerProps> {
    render() {
        const { selectedMediaItem } = this.props;

        if (!selectedMediaItem) {
            return null;
        }

        const { title } = selectedMediaItem
        return (
            <StyledMediaPlayer>
                {title}
            </StyledMediaPlayer>
        );
    }
}

const mapStateToProps: any = (store: StoreState): MediaPlayerMappedProps => {
    const selectedAudioItemKey: any = store.selectedMediaId && store.media
        ? Object.keys(store.media).find((key: any) => store.media![key].id === store.selectedMediaId)
        : null;

    return {
        media: store.media ? store.media : undefined,
        selectedMediaId: store.selectedMediaId ? store.selectedMediaId : undefined,
        selectedMediaItem: selectedAudioItemKey && store.media
            ? store.media[selectedAudioItemKey] 
            : undefined
    }
};
  
export default connect<MediaPlayerMappedProps>(mapStateToProps)(MediaPlayer);