import * as React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '../../Common/variables';
import { LoopMode } from './MediaPlayer.constants';

const StyledControlsWrapper = styled.div`
    display: flex;
    flex-direction: row;

    .play-pause-control {
        width: 20px;
        height: 20px;
        margin-left: 10px;
        padding: 0;
    }
`;

const StyledPlayerPauseControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize}px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
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

const StyledPlayerPlayControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize}px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
    opacity: 0.8;
    display: inline-block;
    cursor: pointer;

    &:active {
        border: 2px solid transparent;
        opacity: 1;
    }
`;

const StyledPlayerSimpleControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize}px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
    opacity: 0.8;
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;

    &:active {
        border: 2px solid transparent;
        opacity: 1;
    }
`;

const StyledPlayerLoopModeControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize }px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
    opacity: 0.3;
    margin-left: 10px;
    display: inline-block;
    cursor: pointer;

    &.looped {
        opacity: 0.85;
    }

    &:active {
        border: 2px solid transparent;
    }
`;

interface MediaPlayerMiniControlsOwnProps {
    playing: boolean;
    loopMode: LoopMode;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
    toggleLoopMode: () => void;
}

export default class MediaPlayerMiniControls extends React.Component<MediaPlayerMiniControlsOwnProps> {

    render() {
        const { playing, loopMode } = this.props;
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
        
        return (
            <StyledControlsWrapper>
                <StyledPlayerLoopModeControlImage
                        className={LoopModeClassName}
                        src={'/images/loop-icon.svg'} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.toggleLoopMode()}
                />
                <StyledPlayerSimpleControlImage 
                        src={'/images/arrow-left-icon.svg'} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPreviousClick()}
                />
                <span className="play-pause-control">
                    <StyledPlayerPlayControlImage 
                        style={playButtonCss}
                        src={playerImgSrc} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPauseClick()}
                    />
                    <StyledPlayerPauseControlImage 
                        style={pauseButtonCss}
                        src={playerImgSrc} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPlayClick()}
                    />
                </span>
                <StyledPlayerSimpleControlImage 
                        src={'/images/arrow-right-icon.svg'} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onNextClick()}
                />
            </StyledControlsWrapper>
        );
    }
}


