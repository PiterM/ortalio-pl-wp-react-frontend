import * as React from 'react';
import ReactPlayer from 'react-player';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';
import MediaPlayerMini from './MediaPlayer.mini';

const StyledMediaPlayerMedium = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: ${colors.mediaPlayer.background};
    z-index: 2;
    min-height: ${dimensions.mediaPlayerHeight.mini}px;
`;

interface MediaPlayerMediumOwnProps {
    title: string;
    url: string;
    config: any;
    playerHeight: any;
    minimalMode: boolean;
}

export class MediaPlayerMedium extends React.Component<MediaPlayerMediumOwnProps> {
    render() {
        const { title, url, config, playerHeight, minimalMode } = this.props;
        const playerDisplay = minimalMode ? 'none' : 'block';

        return (
            <StyledMediaPlayerMedium>
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
                    youtubeConfig={config}
                />
            </StyledMediaPlayerMedium>
        );
    }
}

export default MediaPlayerMedium;