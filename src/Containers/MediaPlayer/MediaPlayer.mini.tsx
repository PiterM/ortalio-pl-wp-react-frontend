import * as React from 'react';
import styled from '@emotion/styled';

const StyledMediaPlayerSmall = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;

    & > p {
        height: 100%;
        margin: 0;
        padding: 20px;
        letter-spacing: 2px;
    }
`;

interface MediaPlayerMiniOwnProps {
    title: string;
    thumbnail?: string;
    visible: boolean;
}

export class MediaPlayerMini extends React.Component<MediaPlayerMiniOwnProps> {
    render() {
        const { title, visible } = this.props;

        return visible ? (
            <StyledMediaPlayerSmall>
                <p>{title}</p>
            </StyledMediaPlayerSmall>
        ): null;
    }
}

export default MediaPlayerMini;