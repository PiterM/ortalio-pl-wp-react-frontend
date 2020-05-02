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
  textVariant: any;
}

const AudioItemHeadlineTop: React.FC<AudioItemHeadlineProps> = ({ textVariant, children }) => {
  const StyledHeader = styled.h3`
    text-align: center;
    line-height: normal;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    padding: 10px 10px 20px 10px;
    font-family: ${textVariant.top.font};
    font-size: ${textVariant.top.fontSize}px;
    font-weight: ${textVariant.top.fontWeight};
    font-style: ${textVariant.top.fontStyle};
    text-transform: ${textVariant.top.textTransform};
    & > div {
      position: relative;
      display: inline-block;
      text-decoration: none;
      color: ${colors.glitchyTitleEffect.main};
      z-index: 1;
    }

    .audio-item.selected & {
      color: #7f1818;
    }
  }
`;

  return <StyledHeader>{children}</StyledHeader>;
};

const AudioItemHeadlineBottom: React.FC<AudioItemHeadlineProps> = ({ textVariant, children }) => {
  const StyledParagraph = styled.p`
    text-align: center;
    line-height: normal;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    letter-spacing: 1px;
    padding: 15px 10px 30px 15px;
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

  return <StyledParagraph>{children}</StyledParagraph>;
};

interface AudioItemHeaderProps {
  index: number;
  title: string;
  shortDescription: string;
}

interface AudioItemHeaderState {
  textVariant: any;
}

const initState = {
  textVariant: audioItemHeaderTextVariants[0]
};

export class AudioItemHeader extends React.Component<AudioItemHeaderProps, AudioItemHeaderState> {
  public state: AudioItemHeaderState = initState;

  shouldComponentUpdate(nextProps: AudioItemHeaderProps) {
    return nextProps.index !== this.props.index;
  }

  componentDidMount() {
    const { index } = this.props;
    const textVariantIndex = index % audioItemHeaderTextVariants.length;
    const textVariant = audioItemHeaderTextVariants[textVariantIndex];
    this.setState({ textVariant });
  }

  render() {
    const { title, shortDescription } = this.props;
    const { textVariant } = this.state;

    return (
      <StyledAudioItemHeadline>
        <AudioItemHeadlineTop textVariant={textVariant}>
          <span>{title}</span>
        </AudioItemHeadlineTop>
        <AudioItemHeadlineBottom textVariant={textVariant}>
          <span dangerouslySetInnerHTML={{ __html: shortDescription }} />
        </AudioItemHeadlineBottom>
      </StyledAudioItemHeadline>
    );
  }
}

export default AudioItemHeader;
