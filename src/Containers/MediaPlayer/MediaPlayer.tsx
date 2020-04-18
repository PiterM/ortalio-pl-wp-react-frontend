import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../App/App.store.d';
import { colors, dimensions } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';
import { MediaPlayerMode, TimerMode, ProgressTime } from './MediaPlayer.constants';
import { 
    MediaPlayerActions,
    setSelectedNextAudioItemAction,
    setSelectedPreviousAudioItemAction,
} from './MediaPlayer.actions';

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

interface MediaPlayerMappedProps {
    errorMessage: string | null;
}

interface MediaPlayerDispatchProps {
    selectPreviousMediaItem: () => void;
    selectNextMediaItem: () => void;
}

type MediaPlayerProps = MediaPlayerOwnProps & MediaPlayerMappedProps & MediaPlayerDispatchProps;

interface MediaPlayerState {
    playing: boolean;
    progress: ProgressTime;
    duration?: number;
    timerMode: TimerMode;
}

const initProgressState = {
    dashCharacter: '&nbsp;',
    minutesDisplayed: '--',
    secondsDisplayed: '--'
};

const initState: MediaPlayerState = {
    playing: true,
    timerMode: TimerMode.RemainingTime,
    progress: initProgressState
};

export class MediaPlayer extends React.Component<MediaPlayerProps> {
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
            errorMessage
        } = this.props;

        const playerVisibility = minimalMode ? 'hidden' : 'visible';
        const playerHeight = minimalMode ? 0 : this.props.playerHeight;

        return (
            <>
                { minimalMode && 
                    <StyledMediaPlayer>
                        <MediaPlayerMini
                            errorMessage={errorMessage}
                            visible={minimalMode} 
                            title={title}
                            thumbnailUrl={thumbnailUrl}
                            playing={this.state.playing}
                            progress={this.state.progress}
                            timerMode={this.state.timerMode}
                            onPlayClick={this.onPlayClick}
                            onPauseClick={this.onPauseClick}
                            onPreviousClick={this.onPreviousClick}
                            onNextClick={this.onNextClick}
                            toggleTimerMode={this.toggleTimerMode}
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
                        playing={this.state.playing}
                        width="100%"
                        height={playerHeight}
                        soundcloudConfig={soundcloudConfig}
                        youtubeConfig={youtubeConfig}
                        onReady={() => this.resetTrackProgress()}
                        onStart={() => this.onPlay()}
                        onPlay={() => this.onPlay()}
                        onProgress={(progress: any) => this.onProgress(progress)}
                        onPause={() => this.onPause()}
                        onEnded={() => this.onEnded()}
                        // onError={() => this.onError()}
                    />
                </StyledMediaPlayer>
            </>
        );
    }

    private onPlay = () => this.trySetPlayingState(true);
    private onPause = () => this.trySetPlayingState(false);

    private onProgress = (progress: any) => {
        const duration = this.player.getDuration();
        if (duration) {
            const trackLength = Math.floor(this.player.getDuration());
            const played = Math.floor(progress.playedSeconds);

            let minutes, seconds;
            const { timerMode } = this.state;

            if (timerMode === TimerMode.RemainingTime) {
                seconds = trackLength - played;
                minutes = Math.floor(seconds / 60);
                seconds = seconds - minutes * 60;
            } else {
                minutes = Math.floor(played / 60);
                seconds = played - minutes * 60;
            }

            const dashCharacter = timerMode === TimerMode.RemainingTime
                ? '-'
                : '&nbsp;';

            this.setState({ progress: { 
                dashCharacter,
                minutesDisplayed: `${minutes}`.padStart(2, '0'), 
                secondsDisplayed: `${seconds}`.padStart(2, '0')
            }});
        }
    }

    private onPlayClick = () => this.trySetPlayingState(true);
    private onPauseClick = () => this.trySetPlayingState(false);

    private onPreviousClick = () => this.props.selectPreviousMediaItem();
    private onNextClick = () => this.props.selectNextMediaItem();

    private onEnded = () => this.props.selectNextMediaItem();

    private toggleTimerMode = () => this.toggleTimerModeState();

    private toggleTimerModeState = () => {
        const timerMode = this.state.timerMode === TimerMode.RemainingTime
            ? TimerMode.PlayedTime
            : TimerMode.RemainingTime;

        this.setState({ 
            timerMode,
            progress: initProgressState
        });
    }

    private trySetPlayingState(playing: boolean) {
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

const mapStateToProps: any = (store: StoreState, props: MediaPlayerProps): MediaPlayerMappedProps => ({
    errorMessage: store.errorMessage
});

const mapDispatchToProps: any = (dispatch: Dispatch<MediaPlayerActions>) => ({
    selectPreviousMediaItem: () => dispatch(setSelectedPreviousAudioItemAction()),
    selectNextMediaItem: () => dispatch(setSelectedNextAudioItemAction())
});
  
export default connect<MediaPlayerMappedProps, MediaPlayerDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(MediaPlayer);