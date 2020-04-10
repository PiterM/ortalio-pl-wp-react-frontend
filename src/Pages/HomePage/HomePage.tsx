import React from 'react';
import styled from '@emotion/styled'
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
    data: OrtalioMedia;
}

export default class HomePage extends React.Component<HomePageOwnProps> {
    componentDidMount() {
        console.log('socialMediaData', this.props.socialMediaData);
    }

    render() {
        const { globalData, socialMediaData } = this.props;

        return (
            <HomePageLayout
                globalData={globalData}
            >
                <SocialIcons 
                    socialMediaData={socialMediaData}
                />
                <StyledPage>
                    <p>Moja stronka</p>
                </StyledPage>
            </HomePageLayout>
        );
    }
}