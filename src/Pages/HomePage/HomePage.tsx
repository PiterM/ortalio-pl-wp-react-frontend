import React from 'react';
import { connect} from 'react-redux';
import { Dispatch } from 'redux';
import styled from '@emotion/styled'
import { colors, dimensions } from '../../Common/variables';
import AudioItem from '../../Containers/AudioItem/AudioItem';
import MediaPlayer from '../../Containers/MediaPlayer/MediaPlayer';
import SocialIcons from '../../Components/SocialIcons/SocialIcons';
import { MediaState } from '../../Containers/Pages/HomePage/HomePage.state';
import HomePageLayout from '../../Layouts/Pages/HomePage.layout';
import {
    SetAllMediaDataSuccessAction,
    setAllMediaDataSuccessAction,
} from '../../Containers/Pages/HomePage/HomePage.actions';
import { getRandomNumberFromString } from './HomePage.helpers';
import {
    GlobalData,
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(${dimensions.homePage.columnsNumber}, 2fr);
  text-align: center;
  padding-bottom: ${dimensions.mediaPlayer.height}px;
`;

const StyledPageColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    & + & {
        border-left: 1px solid ${colors.newspaperText};
    }
`;

interface HomePageDispatchProps {
    saveAllMediaData: (mediaState: MediaState) => void;
}

interface HomePageOwnProps {
    globalData: GlobalData;
    socialMediaData: SocialMediaData[];
    data: OrtalioMedia[];
}

type HomePageProps = HomePageOwnProps & HomePageDispatchProps;

export class HomePage extends React.Component<HomePageProps> {
    componentDidMount() {
        const reduxData: MediaState = this.props.data.map((item: OrtalioMedia, index: number) => (
            {
                id: item.id,
                title: item.title,
                soundcloudUrl: item.soundcloudUrl,
                youtubeUrl: item.youtubeUrl,
                shortDescription: item.shortDescription,
                content: item.content,
                order: index,
                isPlaying: false,
                featuredImage: item.featuredImage
            }
        ));
        this.props.saveAllMediaData(reduxData);
    }

    render() {
        const { globalData, socialMediaData, data } = this.props;

        return (
            <HomePageLayout
                globalData={globalData}
            >
                <SocialIcons
                    socialMediaData={socialMediaData}
                />
                <StyledPage>
                    {this.renderAudioItems(data)}
                </StyledPage>
                <MediaPlayer />
            </HomePageLayout>
        );
    }

    private renderAudioItems(items: OrtalioMedia[]) {
        if (!items || !items.length) {
            return null;
        }

        const { columnsNumber } = dimensions.homePage;

        const rowsNumber = Math.floor(items.length / columnsNumber) + 1;
        let result: any[] = [];

        for (let j=0; j<columnsNumber; j++) {
            let columnIndices: number[] = [];
            for (let i=0; i<rowsNumber; i++) {
                if (items[j + i * columnsNumber] !== undefined) {
                    columnIndices.push(j + i * 5);
                }
            }

            const columnItems: OrtalioMedia[] = items.filter((item, index) => columnIndices.indexOf(index) !== -1)
            const columnItemsResult = (
                <StyledPageColumn key={columnIndices.reduce((a: number, b: number) => a * b)}>
                    {this.renderAudioItemsColumn(columnItems)}
                </StyledPageColumn>
            );
            result = result.concat(columnItemsResult);
            columnIndices = [];
        }

        return result;
    }

    private renderAudioItemsColumn(columnItems: OrtalioMedia[]): any[] {
        return columnItems.map((item) => this.renderAudioItem(item));
    }

    private renderAudioItem(item: OrtalioMedia) {
        const { id, title, shortDescription, content } = item;

        return (
            <AudioItem
                key={id}
                id={id}
                index={getRandomNumberFromString(id)}
                title={title}
                shortDescription={shortDescription}
                content={content}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<SetAllMediaDataSuccessAction>) => ({
    saveAllMediaData: (mediaState: MediaState) => dispatch(setAllMediaDataSuccessAction(mediaState))
});
  
export default connect<{}, HomePageDispatchProps>(
    null,
    mapDispatchToProps
)(HomePage);
  