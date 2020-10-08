import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../App/App.store.d';
import { colors, dimensions, fonts } from '../../Common/variables';
import { LayoutOptionsState } from '../Pages/HomePage/HomePage.state.d';
import MediaPlayerMini from './MediaPlayer.mini';
import {
    MediaPlayerMode,
    TimerMode,
    ProgressTime,
    LoopMode,
    KeyCodes
} from './MediaPlayer.constants';
import {
    MediaPlayerActions,
    setSelectedNextAudioItemAction,
    setSelectedPreviousAudioItemAction,
    setSelectedUpperAudioItemAction,
    setSelectedLowerAudioItemAction
} from './MediaPlayer.actions';
import { LayoutModes } from '../../Common/constants';

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
    background: url('/images/player-pattern.png') left top repeat rgba(249,247,241,1);
`;

interface StyledNotMediaPlayerProps {
    moreIconHeight: number
}

const StyledNotMediaPlayer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 8fr 1fr;
    margin: 0 30px;
    
    .layout-extended & {
        padding: 7px 0;
    }

    & > p {
        grid-column: 2;
        height: 100%;
        pading: 0;
        margin: 0;
        justify-self: center;
        font-family: ${fonts.monospace};
        font-size: ${dimensions.fontSize.regular}px;
        font-weight: bold;
    }

    & > p.more-icon {
        height: 100%;
        width: auto;
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
            
            height: ${(props: StyledNotMediaPlayerProps) => props.moreIconHeight}px;
            width: auto;
            max-width: none;
            background-color: ${colors.mediaPlayer}
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
    errorMessage?: string;
    selectedMediaId?: string | null;
    keyDownCode?: number | null;
    layoutOptions?: LayoutOptionsState | null;
}

interface MediaPlayerDispatchProps {
    selectPreviousMediaItem: () => void;
    selectNextMediaItem: () => void;
    selectUpperMediaItem: () => void;
    selectLowerMediaItem: () => void;
}

type MediaPlayerProps = MediaPlayerOwnProps & MediaPlayerMappedProps & MediaPlayerDispatchProps;

interface MediaPlayerState {
    playing: boolean;
    loading: boolean;
    progress?: ProgressTime;
    duration?: number;
    timerMode: TimerMode;
    loopMode: LoopMode;
    errorMessage?: string;
}

const initProgressState = {
    dashCharacter: '&nbsp;',
    minutesDisplayed: '&nbsp;&nbsp;',
    secondsDisplayed: '&nbsp;&nbsp;',
};

const initState: MediaPlayerState = {
    playing: false,
    loading: true,
    timerMode: TimerMode.RemainingTime,
    progress: initProgressState,
    loopMode: LoopMode.NoLoop
};

export class MediaPlayer extends React.Component<MediaPlayerProps, MediaPlayerState> {
    public state: MediaPlayerState = initState;
    private reactPlayer: any;
    private miniPlayer: any;

    componentDidUpdate(prevProps: MediaPlayerProps) {
        if (prevProps.selectedMediaId !== this.props.selectedMediaId) {
            this.resetTrackProgress();
        }

        const { keyDownCode } = this.props;
        if (keyDownCode && prevProps.keyDownCode !== keyDownCode) {
            this.handleKeyDown(keyDownCode);
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
            errorMessage,
            layoutOptions
        } = this.props;

        const playerDisplayCss = minimalMode ? 'none' : 'block';
        const playerHeight = minimalMode ? 0 : this.props.playerHeight;
        const moreIcon = playerMode === MediaPlayerMode.Soundcloud
            ? '/images/soundcloud200-logo.png'
            : '/images/youtube200-logo.png';

        if (minimalMode && this.miniPlayer && this.miniPlayer.current) {
            this.miniPlayer.current.focus();
        }

        const displayMode = layoutOptions
            ? layoutOptions.mode
            : LayoutModes.Extended;

        const moreIconHeight = displayMode === LayoutModes.Compact
            ? dimensions.mediaPlayerHeight.compact - 30
            : dimensions.mediaPlayerHeight.mini - 10;

        const showMoreIcon = layoutOptions && layoutOptions.columnsNumber > 3;

        const config = {
            youtube: youtubeConfig,
            soundcloud: soundcloudConfig
        };

        return (
            <>
                {minimalMode &&
                    <StyledMediaPlayer>
                        <MediaPlayerMini
                            ref={this.miniPlayerRef}
                            errorMessage={errorMessage}
                            visible={minimalMode}
                            title={title}
                            slug={slug}
                            url={url}
                            thumbnailUrl={thumbnailUrl}
                            playing={this.state.playing}
                            loading={this.state.loading}
                            progress={this.state.progress}
                            timerMode={this.state.timerMode}
                            loopMode={this.state.loopMode}
                            displayMode={displayMode}
                            onPlayClick={this.onPlayClick}
                            onPauseClick={this.onPauseClick}
                            onPreviousClick={this.onPreviousClick}
                            onNextClick={this.onNextClick}
                            toggleTimerMode={() => this.toggleTimerModeState()}
                            toggleLoopMode={() => this.toggleLoopModeState()}
                        />
                        {showMoreIcon &&
                            <StyledNotMediaPlayer
                                onMouseOver={() => this.props.onMouseOver()}
                                moreIconHeight={moreIconHeight}
                            >
                                <p className="more-icon">
                                    <img
                                        alt={''}
                                        src={moreIcon}
                                        width="auto"
                                        height={dimensions.mediaPlayerHeight.mini - 10}
                                    />
                                </p>
                            </StyledNotMediaPlayer>
                        }
                    </StyledMediaPlayer>
                }
                <StyledMediaPlayer
                    onMouseOut={() => this.props.onMouseOut()}
                >
                    <ReactPlayer
                        ref={this.reactPlayerRef}
                        style={{ display: playerDisplayCss }}
                        url={url}
                        playing={this.state.playing}
                        width="100%"
                        height={playerHeight}
                        config={config}
                        onReady={() => this.onReady()}
                        onProgress={(progress: any) => this.onProgress(progress)}
                        onEnded={() => this.onEnded()}
                        onError={() => this.onError()}
                    />
                </StyledMediaPlayer>
            </>
        );
    }

    private onReady = () => this.trySetPlayingState(true);

    private onProgress = (progress: any) => {
        const duration = this.reactPlayer.getDuration();
        if (duration) {
            const trackLength = Math.floor(this.reactPlayer.getDuration());
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

            const dashCharacter = 
                minutes && seconds && timerMode === TimerMode.RemainingTime
                    ? '-'
                    : '&nbsp;';

            this.setState({
                progress: {
                    dashCharacter,
                    minutesDisplayed: `${minutes}`.padStart(2, '0'),
                    secondsDisplayed: `${seconds}`.padStart(2, '0')
                },
            });
        }
    }

    private onPlayClick = () => this.trySetPlayingState(true);
    private onPauseClick = () => this.trySetPlayingState(false);

    private onPreviousClick = () => {
        this.resetErrorMessage();
        this.props.selectPreviousMediaItem();
    }
    private onNextClick = () => {
        this.resetErrorMessage();
        this.props.selectNextMediaItem();
    }

    private onUpperClick = () => {
        this.resetErrorMessage();
        this.props.selectUpperMediaItem();
    }

    private onLowerClick = () => {
        this.resetErrorMessage();
        this.props.selectLowerMediaItem();
    }

    private handleKeyDown(keyDownCode: number) {
        const { playing } = this.state;

        switch (keyDownCode) {
            case KeyCodes.Space:
                if (playing) {
                    this.onPauseClick();
                } else {
                    this.onPlayClick();
                }
                break;
            case KeyCodes.ArrowRight:
                this.onNextClick();
                break;
            case KeyCodes.ArrowLeft:
                this.onPreviousClick();
                break;
            case KeyCodes.ArrowUp:
                this.onUpperClick();
                break;
            case KeyCodes.ArrowDown:
                this.onLowerClick();
                break;
            case KeyCodes.Enter:
                this.toggleLoopModeState();
                break;
            default:
        }
    }

    private onEnded = () => {
        this.setState({ playing: false }, () => {
            if (this.state.loopMode === LoopMode.NoLoop) {
                this.props.selectNextMediaItem();
            } else {
                this.resetTrackProgress();
                this.trySetPlayingState(true);
            }
        });
    }

    private onError = () => {
        this.setState({
            errorMessage: 'I am sorry. Error while streaming!'
        });
    }

    private resetErrorMessage() {
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
            this.setState({ 
                playing,
                loading: false,
            }, () => {
                const internalPlayer = this.reactPlayer.getInternalPlayer();
                if (internalPlayer && internalPlayer.play) {
                    if (playing) {
                        internalPlayer.play();
                    } else {
                        internalPlayer.pause();
                    }
                }
    
                if (internalPlayer && internalPlayer.playVideo) {
                    if (playing) {
                        internalPlayer.playVideo();
                    } else {
                        internalPlayer.pauseVideo();
                    }
                }
            });
        }
    }

    private resetTrackProgress() {
        this.setState({
            progress: undefined,
            duration: undefined,
            playing: false,
            errorMessage: undefined,
            loading: true,
        });
    }

    private reactPlayerRef = (player: any) => this.reactPlayer = player;
    private miniPlayerRef = (player: any) => this.miniPlayer = player;
}

const mapStateToProps: any = (store: StoreState, props: MediaPlayerProps): MediaPlayerMappedProps => ({
    errorMessage: store.errorMessage ? store.errorMessage : undefined,
    selectedMediaId: store.selectedMediaId,
    keyDownCode: store.keyDownCode,
    layoutOptions: store.layoutOptions,
});

const mapDispatchToProps: any = (dispatch: Dispatch<MediaPlayerActions>) => ({
    selectPreviousMediaItem: () => dispatch(setSelectedPreviousAudioItemAction()),
    selectNextMediaItem: () => dispatch(setSelectedNextAudioItemAction()),
    selectUpperMediaItem: () => dispatch(setSelectedUpperAudioItemAction()),
    selectLowerMediaItem: () => dispatch(setSelectedLowerAudioItemAction()),
});

export default connect<MediaPlayerMappedProps, MediaPlayerDispatchProps>(
    mapStateToProps, mapDispatchToProps
)(MediaPlayer);