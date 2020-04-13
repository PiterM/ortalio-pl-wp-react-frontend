import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { connect} from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { AudioItemState } from '../AudioItem/AudioItem.state';
import { MediaState } from '../Pages/HomePage/HomePage.state';
import { colors, dimensions } from '../../Common/variables';
import { soundcloudConfig, youtubeConfig } from './MediaPlayer.configs';
import MediaPlayerSmall from './MediaPlayer.soundcloud';
import MediaPlayerMedium from './MediaPlayer.youtube';

interface MediaPlayerMappedProps {
    media?: MediaState;
    selectedMediaId?: string;
    selectedMediaItem?: AudioItemState;
}

type MediaPlayerProps = MediaPlayerMappedProps;

enum MediaPlayerMode {
    Soundcloud = 'Soundcloud',
    Youtube = 'Youtube'
}

interface MediaPlayerState {
    hovered: boolean;
}

export class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    public state = { hovered: false };

    render() {
        const { selectedMediaItem } = this.props;

        if (!selectedMediaItem) {
            return null;
        }

        const { soundcloudUrl, youtubeUrl, title } = selectedMediaItem
        const { hovered } = this.state;

        const mediaPlayerMode: MediaPlayerMode = soundcloudUrl && !youtubeUrl
            ? MediaPlayerMode.Soundcloud
            : MediaPlayerMode.Youtube;

        const playerHeight = hovered && mediaPlayerMode === MediaPlayerMode.Soundcloud
            ? dimensions.mediaPlayerHeight.small
            : (hovered && mediaPlayerMode === MediaPlayerMode.Youtube
                ? dimensions.mediaPlayerHeight.medium
                : dimensions.mediaPlayerHeight.mini)

        return (
            <div
                onMouseOver={() => this.onMouseOver()}
                onMouseOut={() => this.onMouseOut()}
            >

            { youtubeUrl && 
                <MediaPlayerMedium
                    url={youtubeUrl}
                    config={youtubeConfig}
                    playerHeight={playerHeight}
                    minimalMode={!hovered}
                    title={title}
                />                   
            }
            { soundcloudUrl && !youtubeUrl &&
                <MediaPlayerSmall
                    url={soundcloudUrl}
                    config={soundcloudConfig}
                    playerHeight={playerHeight}
                    minimalMode={!hovered}
                    title={title}
                />  
            }
            </div>
        );
    }

    private onMouseOver = () => this.setState({ hovered: true });
    private onMouseOut = () => this.setState({ hovered: false });
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