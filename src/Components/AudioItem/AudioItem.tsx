import * as React from 'react';
import styled from '@emotion/styled';
import { colors, dimensions, transition } from '../../Common/variables';
import AudioItemHeader from './AudioItemHeader';
import AudioItemContent from './AudioItemContent';

const StyledAudioItem = styled.div`
  line-height: ${dimensions.lineHeight.regular};
  width: ${dimensions.width.headline};
  padding: 0 1% 0 1%;
  padding-bottom: 50px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: all ${transition.duration};
  flex: 0 1;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                        supported by Chrome, Opera and Firefox */

  &:hover {
    background-color ${colors.newspaperPaperHovered};
    border-top: 1px solid ${colors.newspaperText};
    border-bottom: 1px solid ${colors.newspaperText};
    color: #000;
  }

  & + & {
    border-left: 1px solid ${colors.newspaperText};
  }
`;

interface AudioItemProps {
  index: number;
  title: string;
  shortDescription: string;
  content?: string;
}

const AudioItem: React.FC<AudioItemProps> = ({ index, title, shortDescription, content }) => (
  <StyledAudioItem
    key={index}
  >
    <AudioItemHeader
      index={index}
      title={title}
      shortDescription={shortDescription}
    />
    <AudioItemContent
      content={content}
    />
  </StyledAudioItem>
);

export default AudioItem;
