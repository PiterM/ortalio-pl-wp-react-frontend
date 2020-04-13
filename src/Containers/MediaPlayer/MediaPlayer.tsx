import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';
import { MediaPlayerMode } from './MediaPlayer.constants';

const StyledMediaPlayer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: ${colors.white};
    z-index: 2;
    min-height: ${dimensions.mediaPlayerHeight.mini}px;
`;

interface MediaPlayerOwnProps {
    title: string;
    url: string;
    thumbnailUrl: string;
    config: any;
    playerHeight: any;
    minimalMode: boolean;
    playerMode: MediaPlayerMode;
}

export class MediaPlayer extends React.Component<MediaPlayerOwnProps> {
    render() {
        const { 
            title, 
            url, 
            thumbnailUrl,
            config, 
            minimalMode,
            playerMode
        } = this.props;

        const playerVisibility = minimalMode ? 'hidden' : 'visible';
        const playerHeight = minimalMode ? 0 : this.props.playerHeight;

        const soundcloudConfig = playerMode === MediaPlayerMode.Soundcloud 
            ? config
            : undefined;

        const youtubeConfig = playerMode === MediaPlayerMode.Youtube 
            ? config
            : undefined;
        
        return (
        <StyledMediaPlayer>
            <MediaPlayerMini
                visible={minimalMode} 
                title={title}
                thumbnailUrl={thumbnailUrl}
            />
            <ReactPlayer 
                style={{ visibility: playerVisibility }}
                url={url}
                playing={true}
                width="100%"
                height={playerHeight}
                soundcloudConfig={soundcloudConfig}
                youtubeConfig={youtubeConfig}
            />
        </StyledMediaPlayer>
        );
    }
}

export default MediaPlayer;