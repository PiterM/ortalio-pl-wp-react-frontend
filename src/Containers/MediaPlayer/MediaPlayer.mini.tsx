import * as React from 'react';
import styled from '@emotion/styled';
import { setWindowLocationHash } from '../../Common/CommonHelpers';
import { colors, dimensions, fonts } from '../../Common/variables';
import MediaPlayerMiniControls from './MediaPlayer.mini.controls';
import { TimerMode, ProgressTimeFormat, LoopMode } from './MediaPlayer.constants';
import { LayoutModes } from '../../Common/constants';

import './MediaPlayer.mini.scss';

const StyledMediaPlayerMiniContainer = styled.div`
    display: inline-block;
    
    .layout-extended & {
        padding: 7px 0;
    }
`;

interface StyledMediaPlayerMiniProps {
    mediaPlayerHeight: number;
    mediaPlayerFontSize: number;
    mediaPlayerButtonsMargin: number;
    mediaPlayerTimerMinWidth: number;
}

const StyledMediaPlayerMini = styled.div`
    display: grid;
    grid-template-columns: 0.7fr 5.5fr 2fr 2fr;
    text-align: center;
    height: 100%;
    padding: 0 30px;
    min-width: 44.6vw;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Opera and Firefox */

    .layout-compact & {
        padding-left: 0;
    }

    & > div {
        text-align: center;
        align-self: center;
        justify-self: flex-start;
    }

    & > .thumbnail {
        grid-column: 1;
        height: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerHeight  }px;

        & a {
            text-decoration: none;
            padding: 0;
            display: inline-block;
            width: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerHeight}px;
            height: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerHeight}px;
            position: relative;
            
            &:hover img {
                opacity: 1;
                border: none;
            }
        }

        & img {
            opacity: 0.85;
            -webkit-transition: all 0s ease-in-out 0.1s;
            -moz-transition: all 0s ease-in-out 0.1s;
            -o-transition: all 0s ease-in-out 0.1s;
            transition: all 0s ease-in-out 0.1;
            position: absolute;
            left: 0;
            top: 0;
            width: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerHeight}px;
            height: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerHeight}px;
            border: 2px solid transparent;
        }
    }

    .media-player.loading & .thumbnail img {
        opacity: 0.3;
    }

    & p {
        margin: 0;
        margin-left: 10px;
        text-align: center;
        align-self: center;
        justify-self: center;
    }

    & .title button, .title.loader {
        text-decoration: none;
        grid-column: 2;
        font-family: ${fonts.sansSerif};
        font-size: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerFontSize}px;
        font-weight: bold;
        color: #444;
        cursor: pointer;
        border: none;
        background-color: transparent;
        outline: none;
    }

    & .title button:hover {
        color: #000;
        background-color: #fff;
        -webkit-transition: all 0s ease-in-out 0.1s;
        -moz-transition: all 0s ease-in-out 0.1s;
        -o-transition: all 0s ease-in-out 0.1s;
        transition: all 0s ease-in-out 0.1;
    }

    & .title.loader {
        color: #444;
        animation: blinking 1.5s infinite;
        @keyframes blinking {
            0% { opacity: 0.8; };
            49% { opacity: 0.8; };
            60% { opacity: 0; };
            99% { opacity: 0; }
            100% { opacity: 0.8; }
        }
        cursor: auto;
    }

    & .controls {
        grid-column: 3;
    }

    .media-player.loading & .controls {
        opacity: 0.3;
    }

    & .timer-wrapper {
        border-right: 1px solid ${colors.newspaperText};
        display; none;
        grid-column: 4;
        padding: 0 20px;
        margin-left: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerButtonsMargin}px;
        min-width: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerTimerMinWidth}px;
    }

    & .timer {
        font-family: ${fonts.sansSerif};
        font-weight: bold;
        &.blinking p, &.loading p {
            animation: blinking 1.5s infinite;
        }

        &.loading {
            opacity: 0.3;
        }

        & > p {
            padding: 0;
            margin: 0;
        }
    }

    .layout-compact & .timer {
        font-size: ${dimensions.fontSize.large}px;
    }

    & .error-message {
        grid-column: 2;
        font-family: ${fonts.sansSerif};
        font-size: ${(props: StyledMediaPlayerMiniProps) => props.mediaPlayerFontSize}px;
        font-weight: bold;
        color: darkred;
        background: white;
    }
`;

const StyledTimerAnchor = styled.a`
    text-decoration: none;
    cursor: pointer;
    &:hover, &:active {
        text-decoration: none;
    }
`;

interface MediaPlayerMiniOwnProps {
    title: string;
    slug: string;
    url: string;
    thumbnailUrl: string;
    visible: boolean;
    playing: boolean;
    loading: boolean;
    progress?: ProgressTimeFormat;
    timerMode: TimerMode;
    loopMode: LoopMode;
    errorMessage?: string;
    displayMode?: LayoutModes;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
    toggleTimerMode: () => void;
    toggleLoopMode: () => void;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { 
            title, 
            slug, 
            url, 
            visible, 
            thumbnailUrl, 
            playing, 
            errorMessage, 
            displayMode,
            loading,
        } = this.props;

        const mediaPlayerHeight = [LayoutModes.Compact, LayoutModes.Mobile].includes(displayMode!)
            ? dimensions.mediaPlayerHeight.compact
            : dimensions.mediaPlayerHeight.mini;

        const mediaPlayerFontSize = [LayoutModes.Compact, LayoutModes.Mobile].includes(displayMode!)
            ? dimensions.fontSize.large
            : dimensions.fontSize.regular;
        
        const mediaPlayerButtonsMargin = [LayoutModes.Compact, LayoutModes.Mobile].includes(displayMode!)
            ? dimensions.mediaPlayer.buttonsMarginCompact
            : dimensions.mediaPlayer.buttonsMarginExtended;

        const mediaPlayerTimerMinWidth = [LayoutModes.Compact, LayoutModes.Mobile].includes(displayMode!)
            ? dimensions.mediaPlayer.timerMinWidthCompact
            : dimensions.mediaPlayer.timerMinWidthExtended;

        const isPlayerDisplayMobile = displayMode === LayoutModes.Mobile;

        const mediaPlayerClass = `media-player${loading ? ' loading' : ' loaded'}`;

        const timerClass = loading 
            ? 'timer loading'
            : (playing ? 'timer' : 'timer blinking');
        
        return visible ? (
            <StyledMediaPlayerMiniContainer
                className={mediaPlayerClass}
            >
                <StyledMediaPlayerMini
                    mediaPlayerHeight={mediaPlayerHeight}
                    mediaPlayerFontSize={mediaPlayerFontSize}
                    mediaPlayerButtonsMargin={mediaPlayerButtonsMargin}
                    mediaPlayerTimerMinWidth={mediaPlayerTimerMinWidth}
                >
                        <div
                            className="thumbnail"
                        >
                            <a 
                                href={url} 
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img 
                                    alt={''}
                                    src={thumbnailUrl} 
                                    width={dimensions.mediaPlayerHeight.mini}
                                    height={dimensions.mediaPlayerHeight.mini}
                                />
                            </a>
                        </div>
                    { !isPlayerDisplayMobile &&
                        <>                            
                            { errorMessage &&
                                <p className="error-message">
                                    {errorMessage}
                                </p>
                            }
                            { loading && 
                                <p className="title loader">
                                   Loading track...
                                </p>
                            }
                            { !errorMessage && !loading &&
                                <p className="title">
                                    <button
                                        onClick={() => setWindowLocationHash(slug)}
                                    >
                                        {title}
                                    </button>
                                </p>
                            }
                        </>
                    }
                    <div className="controls">
                        <MediaPlayerMiniControls 
                            playing={playing}
                            onPlayClick={() => !loading && this.props.onPlayClick()}
                            onPauseClick={() => !loading && this.props.onPauseClick()}
                            onPreviousClick={() => !loading && this.props.onPreviousClick()}
                            onNextClick={() => !loading && this.props.onNextClick()}
                            toggleLoopMode={() => !loading && this.props.toggleLoopMode()}
                            loopMode={this.props.loopMode}
                            displayMode={this.props.displayMode}
                        />
                    </div>

                    <div className="timer-wrapper">
                        <div className={timerClass}>
                            {this.renderPlayerTimer()}
                        </div>
                    </div>
                </StyledMediaPlayerMini>
            </StyledMediaPlayerMiniContainer>
        ): null;
    }

    private renderPlayerTimer() {
        const emptyTimer = (
            <p>
                <span
                    dangerouslySetInnerHTML={{__html: '&nbsp;&nbsp'}} 
                ></span>
                <span
                    dangerouslySetInnerHTML={{__html: '&nbsp;&nbsp;'}} 
                ></span>:
                <span
                    dangerouslySetInnerHTML={{__html: '&nbsp;&nbsp;'}} 
                ></span>
            </p>
        );

        if (!this.props.progress) {
            return emptyTimer;
        }
        
        const { minutesDisplayed, secondsDisplayed, dashCharacter } = this.props.progress;

        return minutesDisplayed && secondsDisplayed ? (
            <p>
                <StyledTimerAnchor
                    onClick={() => this.props.toggleTimerMode()}
                >
                    <span 
                        dangerouslySetInnerHTML={{__html: `${dashCharacter}`}} 
                    ></span>
                    <span
                        dangerouslySetInnerHTML={{__html: minutesDisplayed}} 
                    ></span>:
                    <span
                        dangerouslySetInnerHTML={{__html: secondsDisplayed}} 
                    ></span>
                </StyledTimerAnchor>
            </p>
        ): emptyTimer;
    }
}

export default MediaPlayerMini;