import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';

const StyledMediaPlayerSmall = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: ${colors.mediaPlayer.background};
    z-index: 2;
    min-height: ${dimensions.mediaPlayerHeight.mini}px;
`;

interface MediaPlayerSmallOwnProps {
    title: string;
    url: string;
    config: any;
    playerHeight: any;
    minimalMode: boolean;
}

export class MediaPlayerSmall extends React.Component<MediaPlayerSmallOwnProps> {
    render() {
        const { title, url, config, playerHeight, minimalMode } = this.props;
        const playerDisplay = minimalMode ? 'none' : 'block';
        
        return (
        <StyledMediaPlayerSmall>
            <MediaPlayerMini
                visible={minimalMode} 
                title={title}
            />
            <ReactPlayer 
                style={{ display: playerDisplay }}
                url={url}
                playing={true}
                width="100%"
                height={playerHeight}
                soundcloudConfig={config}
            />
        </StyledMediaPlayerSmall>
        );
    }
}

export default MediaPlayerSmall;