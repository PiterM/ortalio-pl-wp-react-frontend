import * as React from 'react';
import styled from '@emotion/styled';
import { setWindowLocationHash } from '../../Common/CommonHelpers';
import { colors, dimensions, fonts } from '../../Common/variables';
import MediaPlayerMiniControls from './MediaPlayer.mini.controls';
import { TimerMode, ProgressTime, LoopMode } from './MediaPlayer.constants';

import './MediaPlayer.mini.css';

const StyledMediaPlayerMiniContainer = styled.div`
    display: inline-block;
`;

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

    & > div {
        text-align: center;
        align-self: center;
        justify-self: flex-start;
    }

    & > .thumbnail {
        grid-column: 1;

        & a {
            text-decoration: none;
            padding: 0;
            display: inline-block;
            width: 20px;
            height: 20px;
            position: relative;
            
            &:hover img {
                opacity: 1;
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
            width: 20px;
            height: 20px;
        }
    }

    & p {
        margin: 0;
        margin-left: 10px;
        text-align: center;
        align-self: center;
        justify-self: center;
    }

    & .title button {
        text-decoration: none;
        grid-column: 2;
        font-family: ${fonts.monospace};
        font-size: ${dimensions.fontSize.regular}px;
        font-weight: bold;
        color: #444;
        cursor: pointer;
        border: none;
        background-color: transparent;
        outline: none;

        &:hover {
            color: #000;
            background-color: #fff;
            -webkit-transition: all 0s ease-in-out 0.1s;
            -moz-transition: all 0s ease-in-out 0.1s;
            -o-transition: all 0s ease-in-out 0.1s;
            transition: all 0s ease-in-out 0.1;
        }
    }

    & .controls {
        grid-column: 3;
    }

    & .timer {
        grid-column: 4;
        border-right: 1px solid ${colors.newspaperText};
        font-family: ${fonts.monospace};
        font-weight: bold;
        padding: 0 20px;

        & > p {
            padding: 0;
            margin: 0;
        }
    }

    & .error-message {
        grid-column: 2;
        font-family: ${fonts.monospace};
        font-size: ${dimensions.fontSize.regular}px;
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
    progress: ProgressTime;
    timerMode: TimerMode;
    loopMode: LoopMode;
    errorMessage: string | null;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
    toggleTimerMode: () => void;
    toggleLoopMode: () => void;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { title, slug, url, visible, thumbnailUrl, playing, errorMessage } = this.props;

        return visible ? (
            <StyledMediaPlayerMiniContainer
                className="media-player"
            >
                <StyledMediaPlayerMini>
                    <div
                        className="thumbnail"
                    >
                        <a href={url} target="_blank">
                            <img 
                                alt={title}
                                src={thumbnailUrl} 
                                width={dimensions.mediaPlayerHeight.mini - 10}
                                height={dimensions.mediaPlayerHeight.mini - 10}
                            />
                        </a>
                    </div>
                    { errorMessage && 
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    }
                    { !errorMessage && 
                        <p className="title">
                            <button
                                onClick={() => setWindowLocationHash(slug)}
                            >
                                {title}
                            </button>
                        </p>
                    }
                    <div className="controls">
                        <MediaPlayerMiniControls 
                            playing={playing}
                            onPlayClick={this.props.onPlayClick}
                            onPauseClick={this.props.onPauseClick}
                            onPreviousClick={this.props.onPreviousClick}
                            onNextClick={this.props.onNextClick}
                            toggleLoopMode={this.props.toggleLoopMode}
                            loopMode={this.props.loopMode}
                        />
                    </div>
                    <div className="timer">
                        {this.renderPlayerTimer()}
                    </div>
                </StyledMediaPlayerMini>
            </StyledMediaPlayerMiniContainer>
        ): null;
    }

    private renderPlayerTimer() {
        const emptyTimer = (
            <p>
                <span
                    dangerouslySetInnerHTML={{__html: '&nbsp;'}} 
                ></span>
                <span
                    dangerouslySetInnerHTML={{__html: '--'}} 
                ></span>:
                <span
                    dangerouslySetInnerHTML={{__html: '--'}} 
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
                        dangerouslySetInnerHTML={{__html: dashCharacter}} 
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