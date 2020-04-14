import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';
import { MediaPlayerMode } from './MediaPlayer.constants';

const StyledMediaPlayer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: ${colors.white};
    z-index: 2;
    background-color: ${colors.newspaperPaper};
    display: flex;
`;

const StyledNotMediaPlayer = styled.div`
    height: ${dimensions.mediaPlayerHeight.mini}px;
    width: 100%;
`;

interface MediaPlayerOwnProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    youtubeConfig: any;
    soundcloudConfig: any;
    playerHeight: any;
    minimalMode: boolean;
    playerMode: MediaPlayerMode;
    onMouseOver: () => void;
    onMouseOut: () => void;
}

interface MediaPlayerState {
    playing: boolean;
    progress?: any;
    duration?: number;
}

const initState: MediaPlayerState = {
    playing: false,
};

export class MediaPlayer extends React.Component<MediaPlayerOwnProps> {
    public state: MediaPlayerState = initState;
    private player: any;

    componentDidUpdate(prevProps: MediaPlayerOwnProps) {
        if (prevProps.url !== this.props.url) {
            this.resetTrackProgress();
        }
    }

    render() {
        const { 
            title, 
            url, 
            thumbnailUrl,
            soundcloudConfig, 
            youtubeConfig,
            minimalMode,
        } = this.props;

        const playerVisibility = minimalMode ? 'hidden' : 'visible';
        const playerHeight = minimalMode ? 0 : this.props.playerHeight;

        return (
            <>
                { minimalMode && 
                    <StyledMediaPlayer>
                        <MediaPlayerMini
                            visible={minimalMode} 
                            title={title}
                            thumbnailUrl={thumbnailUrl}
                            playing={this.state.playing}
                            progress={this.state.progress}
                        />
                        <StyledNotMediaPlayer
                            onMouseOver={() => this.props.onMouseOver()}
                        />
                    </StyledMediaPlayer>
                }
                <StyledMediaPlayer
                    onMouseOut={() => this.props.onMouseOut()}
                >
                    <ReactPlayer 
                        ref={this.ref}
                        style={{ visibility: playerVisibility }}
                        url={url}
                        playing={true}
                        width="100%"
                        height={playerHeight}
                        soundcloudConfig={soundcloudConfig}
                        youtubeConfig={youtubeConfig}
                        onReady={() => this.resetTrackProgress()}
                        onStart={() => this.onPlay()}
                        onPlay={() => this.onPlay()}
                        onProgress={(progress: any) => this.onProgress(progress)}
                        onPause={() => this.onPause()}
                        // onEnded={() => this.onEnded()}
                        // onError={() => this.onError()}
                    />
                </StyledMediaPlayer>
            </>
        );
    }

    private onPlay = () => this.trySetPlayinState(true);
    private onPause = () => this.trySetPlayinState(false);

    private onProgress = (progress: any) => {
        const duration = this.player.getDuration();
        if (duration) {
            const trackLength = Math.floor(this.player.getDuration());
            const played = Math.floor(progress.playedSeconds);
            let secondsLeft = trackLength - played;
            const minutesLeft = Math.floor(secondsLeft / 60);
            secondsLeft = secondsLeft - minutesLeft * 60;
            this.setState({ progress: { 
                minutesLeft: `${minutesLeft}`.padStart(2, '0'), 
                secondsLeft: `${secondsLeft}`.padStart(2, '0')
            }});
        }
    }

    private trySetPlayinState(playing: boolean) {
        if (playing !== this.state.playing) {
            this.setState({ playing });
        }
    }

    private resetTrackProgress() {
        this.setState({
            progress: undefined,
            duration: undefined
       });
    }

    private ref = (player: any) => this.player = player;
}

export default MediaPlayer;