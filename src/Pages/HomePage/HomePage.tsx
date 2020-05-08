import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from '@emotion/styled'
import { colors, dimensions } from '../../Common/variables';
import { LayoutModes } from '../../Common/constants';
import AudioItem from '../../Containers/AudioItem/AudioItem';
import { KeyCodes } from '../../Containers/MediaPlayer/MediaPlayer.constants';
import MediaPlayerContainer from '../../Containers/MediaPlayer/MediaPlayer.container';
import SocialIcons from '../../Components/SocialIcons/SocialIcons';
import { 
    MediaState, 
    LayoutOptionsState,
    ItemsGraphState
} from '../../Containers/Pages/HomePage/HomePage.state';
import HomePageLayout from '../../Layouts/Pages/HomePage.layout';
import { WindowResolution } from '../../Common/models';
import { 
    getLayoutColumnsNumber, 
    getLayoutMode,
    getItemsGraph,
} from '../../Common/CommonHelpers';
import {
    HomePageActions,
    setAllMediaDataSuccessAction,
    setKeyDownInitAction,
    setLayoutOptionsSuccessAction,
    setItemsGraphSuccessAction,
} from '../../Containers/Pages/HomePage/HomePage.actions';
import { StoreState } from '../../App/App.store.d';
import { getRandomNumberFromString } from './HomePage.helpers';
import {
    GlobalData,
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';
import './HomePage.scss';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  text-align: center;
  padding-bottom: ${dimensions.mediaPlayerHeight.mini}px;
  margin-top: 50px;
`;

const StyledPageColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    width: auto;

    & + & {
        border-left: 1px solid ${colors.newspaperText};
    }
`;

interface HomePageMappedProps {
    selectedMediaId?: string | null;
}

interface HomePageDispatchProps {
    saveAllMediaData: (mediaState: MediaState) => void;
    setKeyDownCode: (keyCode: number) => void;
    setLayoutOptions: (options: LayoutOptionsState) => void;
    setItemsGraph: (graph: ItemsGraphState) => void;
}

interface HomePageOwnProps {
    globalData: GlobalData;
    socialMediaData: SocialMediaData[];
    data: OrtalioMedia[];
}

interface HomePageState {
    windowResolution: WindowResolution;
    layoutOptions: LayoutOptionsState;
}

const initState = {
    windowResolution: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    layoutOptions: {
        columnsNumber: 5,
        mode: LayoutModes.Extended,
    }
};

type HomePageProps = HomePageOwnProps & HomePageMappedProps & HomePageDispatchProps;

export class HomePage extends React.Component<HomePageProps, HomePageState> {
    public state: HomePageState = initState;

    shouldComponentUpdate(nextProps: HomePageProps) {
        return nextProps.selectedMediaId !== this.props.selectedMediaId
            ? false
            : true;
    }

    componentDidMount() {
        const reduxData: MediaState = this.props.data.map((item: OrtalioMedia, index: number) => (
            {
                id: item.id,
                slug: item.slug,
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

        document.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("resize", this.onWindowResize)
        this.onWindowResize();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('resize', this.onWindowResize);
    }

    render() {
        const { globalData, socialMediaData, data } = this.props;
        let { mode, columnsNumber} = this.state.layoutOptions;
        
        mode = mode ? mode : LayoutModes.Extended;
        columnsNumber = columnsNumber ? columnsNumber : 5;

        return (
            <HomePageLayout
                globalData={globalData}
                className={`layout-${mode} columns${columnsNumber}`}
            >
                <SocialIcons
                    socialMediaData={socialMediaData}
                />
                <h2 className="listen-header">Click to play:</h2>
                <StyledPage 
                    id="main-grid"
                >
                    {this.renderAudioItems(data)}
                </StyledPage>
                <MediaPlayerContainer />
            </HomePageLayout>
        );
    }

    private renderAudioItems(items: OrtalioMedia[]) {
        if (!items || !items.length) {
            return null;
        }

        const columnsNumber = getLayoutColumnsNumber(this.state.windowResolution);

        const rowsNumber = Math.floor(items.length / columnsNumber) + 1;
        let result: any[] = [];
        let columns: any[] = [];

        for (let j=0; j<columnsNumber; j++) {
            let columnIndices: number[] = [];
            for (let i=0; i<rowsNumber; i++) {
                if (items[j + i * columnsNumber] !== undefined) {
                    columnIndices.push(j + i * columnsNumber);
                }
            }

            columns.push(columnIndices);

            const columnItems: OrtalioMedia[] = items.filter((item, index) => columnIndices.indexOf(index) !== -1)
            const columnItemsResult = (
                <StyledPageColumn 
                    key={columnIndices.reduce((a: number, b: number) => a * b)} 
                    className="grid-flex"
                >
                    {this.renderAudioItemsColumn(columnItems)}
                </StyledPageColumn>
            );
            result = result.concat(columnItemsResult);
            columnIndices = [];
        }

        this.props.setItemsGraph(getItemsGraph(columns) as ItemsGraphState);

        return result;
    }

    private renderAudioItemsColumn(columnItems: OrtalioMedia[]): any[] {
        return columnItems.map((item) => this.renderAudioItem(item));
    }

    private renderAudioItem(item: OrtalioMedia) {
        const { id, title, slug, shortDescription, content } = item;

        return (
            <AudioItem
                key={id}
                id={id}
                slug={slug}
                index={getRandomNumberFromString(id)}
                title={title}
                shortDescription={shortDescription}
                content={content}
            />
        );
    }

    private onKeyDown = (event: any) => { 
        if (this.props.selectedMediaId && Object.values(KeyCodes).includes(event.keyCode)) {
            event.preventDefault();
        }
        this.props.setKeyDownCode(event.keyCode);
    }

    private onWindowResize = () => {
        const windowResolution = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        const columnsNumber = getLayoutColumnsNumber(windowResolution);
        const mode = getLayoutMode(windowResolution);

        this.setState({ 
            windowResolution,
            layoutOptions: { columnsNumber, mode }
        });
        this.props.setLayoutOptions({ columnsNumber, mode });
    }
}

const mapStateToProps: any = (store: StoreState): HomePageMappedProps => ({
    selectedMediaId: store.selectedMediaId,
});

const mapDispatchToProps = (
    dispatch: Dispatch<HomePageActions>
    ) => ({
    saveAllMediaData: (mediaState: MediaState) => dispatch(setAllMediaDataSuccessAction(mediaState)),
    setKeyDownCode: (keyCode: number) => dispatch(setKeyDownInitAction(keyCode)),
    setLayoutOptions: (options: LayoutOptionsState) => dispatch(setLayoutOptionsSuccessAction(options)),
    setItemsGraph: (graph: ItemsGraphState) => dispatch(setItemsGraphSuccessAction(graph))
});
  
export default connect<HomePageMappedProps, HomePageDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
  