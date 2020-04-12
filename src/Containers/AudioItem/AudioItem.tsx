import * as React from 'react';
import styled from '@emotion/styled';
import { connect, Dispatch } from 'react-redux';
import { StoreState } from '../../App/App.store.d';
import { colors, dimensions } from '../../Common/variables';
import AudioItemHeader from './AudioItemHeader';
import AudioItemContent from './AudioItemContent';
import { setHoveredAudioItemAction } from '../MediaPlayer/MediaPlayer.actions';

const StyledAudioItem = styled.div`
  line-height: ${dimensions.lineHeight.regular};
  padding: 0 1% 0 1%;
  padding-bottom: 50px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  width: 100%;
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
    cursor: pointer;
  }

  &:active {
    background-color #fff;
    color: ${colors.black};
  }
`;

interface AudioItemOwnProps {
  id: string;
  index: number;
  title: string;
  shortDescription: string;
  content?: string;
}

interface AudioItemDispatchProps {
  setHoveredAudioItem: (id: string) => void;
}

type AudioItemProps = AudioItemOwnProps & AudioItemDispatchProps;

export class AudioItem extends React.Component<AudioItemProps> {
  render() {
    const { index, title, shortDescription, content } = this.props;
    return (
      <StyledAudioItem
        className="audio-item"
        onClick={() => this.onClick()}
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
  }

  private onClick = () => this.props.setHoveredAudioItem(this.props.id);
};

const mapDispatchToProps = (dispatch: Dispatch<StoreState>) => ({
  setHoveredAudioItem: (id: string) => dispatch(setHoveredAudioItemAction(id))
});

export default connect<{}, AudioItemDispatchProps>(
  null,
  mapDispatchToProps
)(AudioItem);
