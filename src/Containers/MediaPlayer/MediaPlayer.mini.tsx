import * as React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions } from '../../Common/variables';

const StyledMediaPlayerSmall = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    padding: 10px;
    background-color: ${colors.white};

    & > img {
        border: 3px solid ${colors.white};
    }

    & > p {
        height: 100%;
        margin: 0;
        letter-spacing: 2px;
        margin-left: 10px;
    }
`;

interface MediaPlayerMiniOwnProps {
    title: string;
    thumbnailUrl: string;
    visible: boolean;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { title, visible, thumbnailUrl } = this.props;

        return visible ? (
            <StyledMediaPlayerSmall>
                <img 
                        src={thumbnailUrl} 
                        width={dimensions.mediaPlayerHeight.mini - 16}
                        height={dimensions.mediaPlayerHeight.mini - 16}
                        alt={title} 
                    />
                <p>
                    {title}
                </p>
            </StyledMediaPlayerSmall>
        ): null;
    }
}

export default MediaPlayerMini;