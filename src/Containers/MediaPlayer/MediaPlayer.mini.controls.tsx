import * as React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '../../Common/variables';
import { LoopMode } from './MediaPlayer.constants';
import { LayoutModes } from '../../Common/constants';

interface StyledControlsWrapperProps {
    buttonsMargin: number;
}

const StyledControlsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    .play-pause-control {
        width: 20px;
        height: 20px;
        margin-left: ${(props: StyledControlsWrapperProps) => props.buttonsMargin}px;
        padding: 0;
    }
`;

interface StyledPlayerPauseControlImageProps {
    playPauseControlSize: number;
    buttonsMargin: number;
}

const StyledPlayerPauseControlImage = styled.img`
    width: ${(props: StyledPlayerPauseControlImageProps) => props.playPauseControlSize}px;
    height: ${(props: StyledPlayerPauseControlImageProps) => props.playPauseControlSize}px;
    opacity: 0.8;
    display: inline-block;
    cursor: pointer;
    animation: blinking 1.5s infinite;
    @keyframes blinking {
        0% { opacity: 0.8; };
        49% { opacity: 0.8; };
        60% { opacity: 0; };
        99% { opacity: 0; }
        100% { opacity: 0.8; }
    }

    &:hover {
        animation: none;
    }

    &:active {
        border: 2px solid transparent;
        opacity: 1;
    }
`;

interface StyledPlayerPlayControlImageProps {
    playPauseControlSize: number;
}

const StyledPlayerPlayControlImage = styled.img`
    width: ${(props: StyledPlayerPlayControlImageProps) => props.playPauseControlSize}px;
    height: ${(props: StyledPlayerPlayControlImageProps) => props.playPauseControlSize}px;
    opacity: 0.8;
    display: inline-block;
    cursor: pointer;

    &:active {
        border: 2px solid transparent;
        opacity: 1;
    }
`;

interface StyledPlayerSimpleControlImageProps {
    playPauseControlSize: number;
    buttonsMargin: number;
}

const StyledPlayerSimpleControlImage = styled.img`
    width: ${(props: StyledPlayerSimpleControlImageProps) => props.playPauseControlSize}px;
    height: ${(props: StyledPlayerSimpleControlImageProps) => props.playPauseControlSize}px;
    opacity: 0.8;
    display: inline-block;
    margin-left: ${(props: StyledPlayerSimpleControlImageProps) => props.buttonsMargin}px;
    cursor: pointer;

    &:active {
        border: 2px solid transparent;
        opacity: 1;
    }
`;

interface StyledPlayerLoopModeControlImageProps {
    playPauseControlSize: number;
    buttonsMargin: number;
}

const StyledPlayerLoopModeControlImage = styled.img`
    width: ${(props: StyledPlayerLoopModeControlImageProps) => props.playPauseControlSize}px;
    height: ${(props: StyledPlayerLoopModeControlImageProps) => props.playPauseControlSize}px;
    opacity: 0.3;
    margin-left: ${(props: StyledPlayerLoopModeControlImageProps) => props.buttonsMargin}px;
    display: inline-block;
    cursor: pointer;

    &.looped {
        opacity: 0.65;
    }

    &:active {
        border: 2px solid transparent;
    }
`;

interface MediaPlayerMiniControlsOwnProps {
    playing: boolean;
    loopMode: LoopMode;
    displayMode?: LayoutModes;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
    toggleLoopMode: () => void;
}

export default class MediaPlayerMiniControls extends React.Component<MediaPlayerMiniControlsOwnProps> {

    render() {
        const { playing, loopMode, displayMode } = this.props;
        const playerImgSrc = playing
            ? '/images/pause-icon.svg'
            : '/images/play-icon.svg';

        const LoopModeClassName = loopMode === LoopMode.LoopCurrent
            ? 'looped'
            : '';

        const pauseButtonCss: any = playing 
            ? { display: 'none' }
            : { display: 'inline-block' };

        const playButtonCss: any = playing 
            ? { display: 'inline-block' }
            : { display: 'none' };

        const isCompactMode = displayMode === LayoutModes.Compact;
        const isMobileMode = displayMode === LayoutModes.Mobile;

        const buttonsSize = isCompactMode || isMobileMode
            ? dimensions.mediaPlayer.playPauseControlCompactSize
            : dimensions.mediaPlayer.playPauseControlExtendedSize;

        const buttonsMargin = isCompactMode || isMobileMode
            ? dimensions.mediaPlayer.buttonsMarginCompact
            : dimensions.mediaPlayer.buttonsMarginExtended;

        return (
            <StyledControlsWrapper
                buttonsMargin={buttonsMargin}
            >   
                <StyledPlayerLoopModeControlImage
                        className={LoopModeClassName}
                        src={'/images/loop-icon.svg'} 
                        width={buttonsSize}
                        height={buttonsSize}
                        playPauseControlSize={buttonsSize}
                        buttonsMargin={buttonsMargin}
                        onClick={() => this.props.toggleLoopMode()}
                />
                {!isCompactMode && !isMobileMode &&
                    <StyledPlayerSimpleControlImage 
                            src={'/images/arrow-left-icon.svg'} 
                            width={buttonsSize}
                            height={buttonsSize}
                            playPauseControlSize={buttonsSize}
                            buttonsMargin={buttonsMargin}
                            onClick={() => this.props.onPreviousClick()}
                    />
                }
                <span className="play-pause-control">
                    <StyledPlayerPlayControlImage 
                        style={playButtonCss}
                        src={playerImgSrc} 
                        width={buttonsSize}
                        height={buttonsSize}
                        playPauseControlSize={buttonsSize}
                        onClick={() => this.props.onPauseClick()}
                    />
                    <StyledPlayerPauseControlImage 
                        style={pauseButtonCss}
                        src={playerImgSrc} 
                        width={buttonsSize}
                        height={buttonsSize}
                        playPauseControlSize={buttonsSize}
                        buttonsMargin={buttonsMargin}
                        onClick={() => this.props.onPlayClick()}
                    />
                </span>
                {!isCompactMode && !isMobileMode &&
                    <StyledPlayerSimpleControlImage 
                            src={'/images/arrow-right-icon.svg'} 
                            width={buttonsSize}
                            height={buttonsSize}
                            playPauseControlSize={buttonsSize}
                            buttonsMargin={buttonsMargin}
                            onClick={() => this.props.onNextClick()}
                    />
                }
            </StyledControlsWrapper>
        );
    }
}


