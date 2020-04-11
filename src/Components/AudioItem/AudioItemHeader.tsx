import * as React from 'react';
import styled from '@emotion/styled';
import {
  audioItemHeaderTextVariants,
  colors,
} from '../../Common/variables';

const StyledAudioItemHeadline = styled.div`
  text-align: center;
  position: relative;
`;

interface AudioItemHeadlineProps {
  index: number;
}

const AudioItemHeadlineTop: React.FC<AudioItemHeadlineProps> = ({ index, children }) => {
  console.log('index', index);
  const textVariantIndex = index % audioItemHeaderTextVariants.length;
  const textVariant = audioItemHeaderTextVariants[textVariantIndex];

  const StyledDiv = styled.div`
    text-align: center;
    line-height: normal;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    padding: 10px 0 20px 0;
    font-family: ${textVariant.top.font};
    font-size: ${textVariant.top.fontSize}px;
    font-weight: ${textVariant.top.fontWeight};
    font-style: ${textVariant.top.fontStyle};
    text-transform: ${textVariant.top.textTransform};
  `;

  return <StyledDiv>{children}</StyledDiv>;
};

const AudioItemHeadlineBottom: React.FC<AudioItemHeadlineProps> = ({ index, children }) => {
  const textVariantIndex = index % audioItemHeaderTextVariants.length;
  const textVariant = audioItemHeaderTextVariants[textVariantIndex];
  const StyledDiv = styled.div`
    text-align: center;
    line-height: normal;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    letter-spacing: 1px;
    padding: 10px 0 30px 0;
    font-family: ${textVariant.bottom.font};
    font-size: ${textVariant.bottom.fontSize}px;
    font-weight: ${textVariant.bottom.fontWeight};
    font-style: ${textVariant.bottom.fontStyle};
    text-transform: ${textVariant.bottom.textTransform};

    &:before {
      border-top: 1px solid ${colors.newspaperText};
      content: '';
      width: 200px;
      height: 7px;
      display: block;
      margin: 0 auto;
    }

    &:after {
      border-bottom: 1px solid ${colors.newspaperText};
      content: '';
      width: 200px;
      height: 10px;
      display: block;
      margin: 0 auto;
    }
  `;

  return <StyledDiv>{children}</StyledDiv>;
};

interface AudioItemHeaderProps {
  index: number;
  title: string;
  shortDescription: string;
}

const AudioItemHeader: React.FC<AudioItemHeaderProps> = ({ index, title, shortDescription }) => (
  <StyledAudioItemHeadline>
    <AudioItemHeadlineTop index={index}>
      {title}
    </AudioItemHeadlineTop>
    <AudioItemHeadlineBottom index={index}>
      <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    </AudioItemHeadlineBottom>
  </StyledAudioItemHeadline>
);

export default AudioItemHeader;
