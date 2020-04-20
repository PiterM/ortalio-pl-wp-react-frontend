import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../App/App.store.d';
import { colors, dimensions, fonts } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';
import {
    MediaPlayerMode,
    TimerMode,
    ProgressTime,
    LoopMode
} from './MediaPlayer.constants';
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
    z-index: 2;
    display: flex;
    border-top: 2px solid ${colors.white};

    background: -moz-radial-gradient(center, ellipse cover, rgba(255,175,75,1) 0%, rgba(255,146,10,0.52) 100%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,175,75,1)), color-stop(100%, rgba(255,146,10,0.52)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(255,175,75,1) 0%, rgba(255,146,10,0.52) 100%);
    background: -o-radial-gradient(center, ellipse cover, rgba(255,175,75,1) 0%, rgba(255,146,10,0.52) 100%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(255,175,75,1) 0%, rgba(255,146,10,0.52) 100%);
    background: radial-gradient(ellipse at center, rgba(255,175,75,1) 0%, rgba(255,146,10,0.52) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaf4b', endColorstr='#ff920a', GradientType=1 );
    background: url('/images/player-pattern.png') left top repeat rgba(249,247,241,0.9);
`;

const StyledNotMediaPlayer = styled.div`
    height: ${dimensions.mediaPlayerHeight.mini}px;
    width: 100%;
    display: grid;
    grid-template-columns: 10fr;
    height: 100%;
    padding: 10px 0;
    margin: 0 30px;

    & > p {
        height: 100%;
        pading: 0;
        margin: 0;
        justify-self: right;
        font-family: ${fonts.monospace};
        font-size: ${dimensions.fontSize.regular}px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        line

        & img {
            display: inline;
        }
    }
`;

interface MediaPlayerOwnProps {
    title: string;
    url: string;
    slug: string;
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
    selectedMediaId?: string | null;
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
    loopMode: LoopMode;
    errorMessage?: string;
}

const initProgressState = {
    dashCharacter: '&nbsp;',
    minutesDisplayed: '--',
    secondsDisplayed: '--'
};

const initState: MediaPlayerState = {
    playing: true,
    timerMode: TimerMode.RemainingTime,
    progress: initProgressState,
    loopMode: LoopMode.NoLoop
};

export class MediaPlayer extends React.Component<MediaPlayerProps> {
    public state: MediaPlayerState = initState;
    private player: any;

    componentDidUpdate(prevProps: MediaPlayerProps, prevState: MediaPlayerState) {
        if (prevProps.selectedMediaId !== this.props.selectedMediaId) {
            this.resetTrackProgress();
        }
    }

    render() {
        const {
            title,
            slug,
            url,
            thumbnailUrl,
            soundcloudConfig,
            youtubeConfig,
            minimalMode,
            playerMode,
            errorMessage
        } = this.props;

        const playerVisibility = minimalMode ? 'hidden' : 'visible';
        const playerHeight = minimalMode ? 0 : this.props.playerHeight;
        const moreIcon = playerMode === MediaPlayerMode.Soundcloud
            ? '/images/soundcloud200-logo.png'
            : '/images/youtube200-logo.png';

        const activeErrorMessage = this.state.errorMessage
            ? this.state.errorMessage
            : errorMessage;

        return (
            <>
                {minimalMode &&
                    <StyledMediaPlayer>
                        <MediaPlayerMini
                            errorMessage={activeErrorMessage}
                            visible={minimalMode}
                            title={title}
                            slug={slug}
                            url={url}
                            thumbnailUrl={thumbnailUrl}
                            playing={this.state.playing}
                            progress={this.state.progress}
                            timerMode={this.state.timerMode}
                            loopMode={this.state.loopMode}
                            onPlayClick={this.onPlayClick}
                            onPauseClick={this.onPauseClick}
                            onPreviousClick={this.onPreviousClick}
                            onNextClick={this.onNextClick}
                            toggleTimerMode={() => this.toggleTimerModeState()}
                            toggleLoopMode={() => this.toggleLoopModeState()}
                        />
                        <StyledNotMediaPlayer
                            onMouseOver={() => this.props.onMouseOver()}
                        >
                            <p>
                                <img
                                    src={moreIcon}
                                    width="auto"
                                    height={dimensions.mediaPlayerHeight.mini - 10}
                                />
                            </p>
                        </StyledNotMediaPlayer>
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
                        onError={() => this.onError()}
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

            this.setState({
                progress: {
                    dashCharacter,
                    minutesDisplayed: `${minutes}`.padStart(2, '0'),
                    secondsDisplayed: `${seconds}`.padStart(2, '0')
                }
            });
        }
    }

    private onPlayClick = () => this.trySetPlayingState(true);
    private onPauseClick = () => this.trySetPlayingState(false);

    private onPreviousClick = () => {
        this.resetEroroMessage();
        this.props.selectPreviousMediaItem();
    }
    private onNextClick = () => {
        this.resetEroroMessage();
        this.props.selectNextMediaItem();
    }

    private onEnded = () => {
        this.setState({ playing: false }, () => {
            if (this.state.loopMode === LoopMode.NoLoop) {
                this.props.selectNextMediaItem();
            }
            this.setState({ playing: true });
        });
    }

    private onError = () => {
        this.setState({
            errorMessage: 'I am sorry. Error while streaming!'
        });
    }

    private resetEroroMessage() {
        this.setState({ errorMessage: undefined });
    }

    private toggleTimerModeState = () => {
        const timerMode = this.state.timerMode === TimerMode.RemainingTime
            ? TimerMode.PlayedTime
            : TimerMode.RemainingTime;

        this.setState({
            timerMode,
            progress: initProgressState
        });
    }

    private toggleLoopModeState = () => {
        const loopMode = this.state.loopMode === LoopMode.NoLoop
            ? LoopMode.LoopCurrent
            : LoopMode.NoLoop;

        this.setState({ loopMode });
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
    errorMessage: store.errorMessage,
    selectedMediaId: store.selectedMediaId
});

const mapDispatchToProps: any = (dispatch: Dispatch<MediaPlayerActions>) => ({
    selectPreviousMediaItem: () => dispatch(setSelectedPreviousAudioItemAction()),
    selectNextMediaItem: () => dispatch(setSelectedNextAudioItemAction())
});

export default connect<MediaPlayerMappedProps, MediaPlayerDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(MediaPlayer);