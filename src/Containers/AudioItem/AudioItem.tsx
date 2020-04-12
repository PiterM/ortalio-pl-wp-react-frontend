import * as React from 'react';
import styled from '@emotion/styled';
import { connect} from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../App/App.store.d';
import { colors, dimensions } from '../../Common/variables';
import AudioItemHeader from './AudioItemHeader';
import AudioItemContent from './AudioItemContent';
import { 
  SetSelectedAudioItemAction,
  setSelectedAudioItemAction 
} from '../MediaPlayer/MediaPlayer.actions';

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

  &:active, &.selected {
    border-top: 1px solid ${colors.newspaperText};
    border-bottom: 1px solid ${colors.newspaperText};
    background-color #fff;
    color: ${colors.black};
    -webkit-touch-callout: auto; /* iOS Safari */
    -webkit-user-select: auto; /* Safari */
    -khtml-user-select: auto; /* Konqueror HTML */
    -moz-user-select: auto; /* Old versions of Firefox */
    -ms-user-select: auto; /* Internet Explorer/Edge */
    user-select: auto; /* Non-prefixed version, currently
                          supported by Chrome, Opera and Firefox */
  }

  &.selected {
    cursor: text;
  }
`;

interface AudioItemOwnProps {
  id: string;
  index: number;
  title: string;
  shortDescription: string;
  content?: string;
}

interface AudioItemMappedProps {
  selected?: boolean;
}

interface AudioItemDispatchProps {
  setSelectedAudioItem: (id: string) => void;
}

type AudioItemProps = AudioItemOwnProps & AudioItemMappedProps & AudioItemDispatchProps;

export class AudioItem extends React.Component<AudioItemProps> {
  render() {
    const { index, title, shortDescription, content, selected } = this.props;
    return (
      <StyledAudioItem
        className={`audio-item${selected ? ' selected' : ''}`}
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

  private onClick = () => this.props.setSelectedAudioItem(this.props.id);
};

const mapStateToProps: any = (store: StoreState, props: AudioItemOwnProps): AudioItemMappedProps => {
  const selected: boolean = store.selectedMediaId && store.media
      ? !!Object.keys(store.media).find((key: any) => props.id === store.selectedMediaId)
      : false;

  return { selected };
};

const mapDispatchToProps = (dispatch: Dispatch<SetSelectedAudioItemAction>) => ({
  setSelectedAudioItem: (id: string) => dispatch(setSelectedAudioItemAction(id))
});

export default connect<AudioItemMappedProps, AudioItemDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(AudioItem);
