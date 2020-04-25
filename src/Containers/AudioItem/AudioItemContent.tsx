import * as React from 'react';
import styled from '@emotion/styled';

const StyledAudioItemText = styled.div`
  margin-top: 20px;
  text-align: center;
`;

interface AudioItemTextProps {
    content?: string;
}

const AudioItemContent: React.FC<AudioItemTextProps> = ({ content }) => {
  return content ? (
    <StyledAudioItemText
      className="audio-content"
    >
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </StyledAudioItemText>
  ): null;
};

export default AudioItemContent;
