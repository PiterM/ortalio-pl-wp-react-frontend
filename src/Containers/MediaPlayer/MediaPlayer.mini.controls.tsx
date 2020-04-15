import * as React from 'react';
import styled from '@emotion/styled';
import { dimensions } from '../../Common/variables';

const StyledControlsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledPlayerPauseControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize}px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
    opacity: 0.8;
    margin-left: 10px;
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
`;

const StyledPlayerSimpleControlImage = styled.img`
    width: ${dimensions.mediaPlayer.playPauseControlSize}px;
    height: ${dimensions.mediaPlayer.playPauseControlSize}px;
    opacity: 0.8;
    margin-left: 10px;
    display: inline-block;
    cursor: pointer;
`;

interface MediaPlayerMiniControlsOwnProps {
    playing: boolean;
    onPlayClick: () => void;
    onPauseClick: () => void;
    onPreviousClick: () => void;
    onNextClick: () => void;
}

export default class MediaPlayerMiniControls extends React.Component<MediaPlayerMiniControlsOwnProps> {

    render() {
        const { playing } = this.props;
        const playerImgSrc = playing
            ? '/images/pause-icon.svg'
            : '/images/play-icon.svg';
        
        return (
            <StyledControlsWrapper>
                <StyledPlayerSimpleControlImage 
                        src={'/images/arrow-left-icon.svg'} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPreviousClick()}
                />
                { playing && 
                    <StyledPlayerSimpleControlImage 
                        src={playerImgSrc} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPauseClick()}
                    />
                }
                { !playing && 
                    <StyledPlayerPauseControlImage 
                        src={playerImgSrc} 
                        width={dimensions.mediaPlayer.playPauseControlSize}
                        height={dimensions.mediaPlayer.playPauseControlSize}
                        onClick={() => this.props.onPlayClick()}
                    />
                }
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


