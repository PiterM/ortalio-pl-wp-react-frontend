import React from 'react';
import styled from '@emotion/styled'
import AudioItem from '../../Components/AudioItem/AudioItem';
import SocialIcons from '../../Components/SocialIcons/SocialIcons';
import HomePageLayout from '../../Layouts/Pages/HomePage.layout';
import { 
    GlobalData, 
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';

const StyledPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  height: 5000px;
`

interface HomePageOwnProps {
    globalData: GlobalData;
    socialMediaData: SocialMediaData[];
    data: OrtalioMedia[];
}

export default class HomePage extends React.Component<HomePageOwnProps> {
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
            </HomePageLayout>
        );
    }

    private renderAudioItems(items: OrtalioMedia[]) {
        if (!items || !items.length) {
          return null;
        }
    
        return items.map((item, i) => {
          return this.renderAudioItem(i, item);
        });
      }
    
    private renderAudioItem(i: number, item: OrtalioMedia) {
        const { title, shortDescription, content } = item;
    
        return (
          <AudioItem
            index={i}
            title={title}
            shortDescription={shortDescription}
            content={content}
          />
        );
      }
}