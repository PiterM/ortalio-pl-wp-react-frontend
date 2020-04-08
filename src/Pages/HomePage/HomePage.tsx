import React from 'react';
import styled from '@emotion/styled'
import HomePageLayout from '../../Layouts/Pages/HomePage.layout';
import { GlobalData, OrtalioMedia } from './HomePage.models';

const StyledPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  height: 5000px;
`

interface HomePageOwnProps {
    globalData: GlobalData;
    data: OrtalioMedia;
}

export default class HomePage extends React.Component<HomePageOwnProps> {
    componentDidMount() {
        console.log('data', this.props.data);
    }

    render() {
        return (
            <HomePageLayout
                globalData={this.props.globalData}
            >
                <StyledPage>
                    <p>Moja stronka</p>
                </StyledPage>
            </HomePageLayout>
        );
    }
}