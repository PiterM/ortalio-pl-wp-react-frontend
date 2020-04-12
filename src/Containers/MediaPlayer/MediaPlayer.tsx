import * as React from 'react';
import styled from '@emotion/styled';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { AudioItemState } from '../AudioItem/AudioItem.state';
import { MediaState } from '../Pages/HomePage/HomePage.state';
import { colors, dimensions, transition } from '../../Common/variables';

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
    id?: string;
    hoveredMediaItem?: AudioItemState;
}

type MediaPlayerProps = MediaPlayerMappedProps;

export class MediaPlayer extends React.Component<MediaPlayerProps> {
    render() {
        const { hoveredMediaItem } = this.props;

        if (!hoveredMediaItem) {
            return null;
        }

        const { title } = hoveredMediaItem
        return (
            <StyledMediaPlayer>
                {title}
            </StyledMediaPlayer>
        );
    }
}

const mapStateToProps = (store: StoreState): MediaPlayerMappedProps => {
    const hoveredAudioItemKey: any = store.hoveredMediaId && store.media
        ? Object.keys(store.media).find((key: any) => store.media![key].id === store.hoveredMediaId)
        : undefined;

    return {
        media: store.media,
        id: store.hoveredMediaId,
        hoveredMediaItem: hoveredAudioItemKey && store.media
            ? store.media[hoveredAudioItemKey] 
            : undefined
    }
};
  
export default connect<MediaPlayerMappedProps>(mapStateToProps)(MediaPlayer);