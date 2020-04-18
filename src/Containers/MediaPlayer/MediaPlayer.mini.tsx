import * as React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, fonts } from '../../Common/variables';
import MediaPlayerMiniControls from './MediaPlayer.mini.controls';
import { TimerMode, ProgressTime } from './MediaPlayer.constants';

const StyledMediaPlayerMiniContainer = styled.div`
    display: inline-block;
`;

const StyledMediaPlayerMini = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 5.5fr 2fr 1fr;
    text-align: center;
    height: 100%;
    padding: 0 30px;
    min-width: 39.8vw;
    background-color: ${colors.white};
    border-right: 1px ${colors.newspaperPaperHovered} solid;

    & > div {
        text-align: center;
        align-self: center;
        justify-self: center;
    }

    & img.thumbnail {
        border: 3px solid ${colors.newspaperPaperHovered};
        grid-column: 1;
        align-self: center;
        justify-self: center;
    }

    & p {
        margin: 0;
        margin-left: 10px;
        text-align: center;
        align-self: center;
        justify-self: center;
    }

    & .title {
        grid-column: 2;
        font-family: ${fonts.serif};
        font-weight: bold;
        letter-spacing: 1px;
    }

    & .controls {
        grid-column: 3;
    }

    & .timer {
        grid-column: 4;
        border-left: 1px solid ${colors.newspaperText};
        font-family: ${fonts.monospace};
        font-weight: bold;
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
    thumbnailUrl: string;
    visible: boolean;
    playing: boolean;
    progress: ProgressTime;
    timerMode: TimerMode;
    errorMessage: string | null;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
    toggleTimerMode: () => void;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { title, visible, thumbnailUrl, playing, errorMessage } = this.props;

        return visible ? (
            <StyledMediaPlayerMiniContainer>
                <StyledMediaPlayerMini>
                    <div
                        className="thumbnail"
                    >
                        <img 
                            src={thumbnailUrl} 
                            width={dimensions.mediaPlayerHeight.mini - 16}
                            height={dimensions.mediaPlayerHeight.mini - 16}
                            alt={title} 
                        />
                    </div>
                    { errorMessage && 
                        <p className="error-message">
                            {errorMessage}
                        </p>
                    }
                    { !errorMessage && 
                        <>
                            <p className="title">
                                {title}
                            </p>
                            <div className="controls">
                                <MediaPlayerMiniControls 
                                    playing={playing}
                                    onPlayClick={this.props.onPlayClick}
                                    onPauseClick={this.props.onPauseClick}
                                    onPreviousClick={this.props.onPreviousClick}
                                    onNextClick={this.props.onNextClick}
                                />
                            </div>
                            <div className="timer">
                                {this.renderPlayerTimer()}
                            </div>
                        </>
                    }
                </StyledMediaPlayerMini>
            </StyledMediaPlayerMiniContainer>
        ): null;
    }

    private renderPlayerTimer() {
        const emptyTimer = (
            <p>
                &nbsp;<span>--</span>:<span>--</span>
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