import * as React from 'react';
import { connect} from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { AudioItemState } from '../AudioItem/AudioItem.state';
import { MediaState } from '../Pages/HomePage/HomePage.state';
import { dimensions } from '../../Common/variables';
import { soundcloudConfig, youtubeConfig } from './MediaPlayer.configs';
import MediaPlayer from './MediaPlayer';
import { MediaPlayerMode } from './MediaPlayer.constants';

interface MediaPlayerMappedProps {
    media?: MediaState;
    selectedMediaId?: string;
    selectedMediaItem?: AudioItemState;
}

type MediaPlayerProps = MediaPlayerMappedProps;

interface MediaPlayerState {
    hovered: boolean;
}

export class MediaPlayerContainer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    public state = { hovered: false };

    render() {
        const { selectedMediaItem } = this.props;

        if (!selectedMediaItem) {
            return null;
        }

        const { soundcloudUrl, youtubeUrl, title, featuredImage } = selectedMediaItem
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
                <MediaPlayer
                    url={youtubeUrl}
                    config={youtubeConfig}
                    playerHeight={playerHeight}
                    minimalMode={!hovered}
                    title={title}
                    thumbnailUrl={featuredImage.sourceUrl}
                    playerMode={MediaPlayerMode.Youtube}
                />                   
            }
            { soundcloudUrl && !youtubeUrl &&
                <MediaPlayer
                    url={soundcloudUrl}
                    config={soundcloudConfig}
                    playerHeight={playerHeight}
                    minimalMode={!hovered}
                    title={title}
                    thumbnailUrl={featuredImage.sourceUrl}
                    playerMode={MediaPlayerMode.Soundcloud}
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
  
export default connect<MediaPlayerMappedProps>(mapStateToProps)(MediaPlayerContainer);