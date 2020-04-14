import * as React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';

const StyledMediaPlayerMiniContainer = styled.div`
    display: inline-block;
`;

const StyledMediaPlayerMini = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    height: 100%;
    padding: 10px 30px;;
    min-width: 600px;
    background-color: ${colors.white};

    & > img.thumbnail {
        border: 3px solid ${colors.newspaperPaperHovered};
    }

    & > p {
        margin: 0;
        letter-spacing: 2px;
        margin-left: 10px;
    }
`;

const StyledPlayerPauseControlImage = styled.img`
    width: 30px;
    height: 30px;
    opacity: 0.8;
    margin-left: 10px;
    animation: blinking 1.5s infinite;
    @keyframes blinking {
        0% { opacity: 0.8; };
        49% { opacity: 0.8; };
        60% { opacity: 0; };
        99% { opacity: 0; }
        100% { opacity: 0.8; }
    }
`;

const StyledPlayerPlayControlImage = styled.img`
    width: 30px;
    height: 30px;
    opacity: 0.8;
    margin-left: 10px;
`;

interface MediaPlayerMiniOwnProps {
    title: string;
    thumbnailUrl: string;
    visible: boolean;
    playing: boolean;
    progress: any;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { title, visible, thumbnailUrl, playing } = this.props;
        const playerImgSrc = playing
            ? '/images/pause-icon.svg'
            : '/images/play-icon.svg';

        return visible ? (
            <StyledMediaPlayerMiniContainer>
                <StyledMediaPlayerMini>
                    <img 
                        className="thumbnail"
                        src={thumbnailUrl} 
                        width={dimensions.mediaPlayerHeight.mini - 16}
                        height={dimensions.mediaPlayerHeight.mini - 16}
                        alt={title} 
                    />
                    <p>
                        {title}
                    </p>
                    { playing && 
                        <StyledPlayerPlayControlImage 
                            src={playerImgSrc} 
                            width="30"
                            height="30"
                        />
                    }
                    { !playing && 
                        <StyledPlayerPauseControlImage 
                            src={playerImgSrc} 
                            width="30"
                            height="30"
                        />
                    }
                    {this.renderPlayerTimer()}
                </StyledMediaPlayerMini>
            </StyledMediaPlayerMiniContainer>
        ): null;
    }

    private renderPlayerTimer() {
        const { progress } = this.props;
        return progress && progress.minutesLeft && progress.secondsLeft ? (
            <p>
                - <strong>{ progress.minutesLeft }</strong>:
                <strong>{ progress.secondsLeft }</strong>
            </p>
        ): <p>
            <strong>-</strong>:<strong>-</strong>
        </p>;
    }
}

export default MediaPlayerMini;