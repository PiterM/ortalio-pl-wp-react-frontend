import * as React from 'react';
import { connect} from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { AudioItemState } from '../AudioItem/AudioItem.state';
import { MediaState } from '../Pages/HomePage/HomePage.state';
import { dimensions } from '../../Common/variables';
import { soundcloudConfig, youtubeConfig } from './MediaPlayer.configs';
import MediaPlayer from './MediaPlayer';
import { MediaPlayerMode } from './MediaPlayer.constants';

interface MediaPlayerContainerMappedProps {
    media?: MediaState;
    selectedMediaId?: string;
    selectedMediaItem?: AudioItemState;
}

type MediaPlayerContainerProps = MediaPlayerContainerMappedProps;

interface MediaPlayerContainerState {
    hovered: boolean;
}

const initState: MediaPlayerContainerState = {
    hovered: false,
};

export class MediaPlayerContainer extends React.Component<MediaPlayerContainerProps, MediaPlayerContainerState> {
    public state: MediaPlayerContainerState = initState;

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

        const mediaUrl = youtubeUrl 
            ? youtubeUrl
            : soundcloudUrl;

        const playerMode = youtubeUrl 
            ? MediaPlayerMode.Youtube
            : MediaPlayerMode.Soundcloud;

        return (
            <div>
                <MediaPlayer
                    url={mediaUrl}
                    youtubeConfig={youtubeConfig}
                    soundcloudConfig={soundcloudConfig}
                    playerHeight={playerHeight}
                    minimalMode={!hovered}
                    title={title}
                    thumbnailUrl={featuredImage.sourceUrl}
                    playerMode={playerMode}
                    errorMessage={null}
                    onMouseOver={() => this.onMouseOver()}
                    onMouseOut={() => this.onMouseOut()}
                />                   
            </div>
        );
    }

    private onMouseOver = () => this.setState({ hovered: true });
    private onMouseOut = () => this.setState({ hovered: false });
}

const mapStateToProps: any = (store: StoreState): MediaPlayerContainerMappedProps => {
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
  
export default connect<MediaPlayerContainerMappedProps>(mapStateToProps)(MediaPlayerContainer);