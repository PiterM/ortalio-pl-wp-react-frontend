import React from 'react';
import { Query } from 'react-apollo';
import styled from '@emotion/styled'
import ErrorPage from '../ErrorPage/ErrorPage';
import { GET_ORTALO_FULL_DATA_QUERY } from './HomePage.gql';
import HomePage from './HomePage';
import { 
    GlobalData, 
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';

const LoaderScreen = styled.div`
    background: url('/images/audio-loader-black.svg') center center no-repeat #f9f7f1;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const renderLoadingOrErrorScreen = (data: any) => {
    if (!data || data.loading) {
        return <LoaderScreen />;
    }
    if (data.error) {
        return <ErrorPage description="Sorry. Come back later" />;
    }
    return null;
}

class HomePageContainer extends React.Component {
    shouldComponentUpdate() {
        return false;
    }
    
    render() {
        return (
            <Query query={GET_ORTALO_FULL_DATA_QUERY}>
                {
                    (fullData: any) => {
                        if (!fullData || fullData.loading) {
                            return <LoaderScreen />;
                        }
                        if (fullData.error) {
                            return <Query query={GET_ORTALO_FULL_DATA_QUERY}>
                                {
                                    (fullData: any) => {
                                        const LoadingOrErrorScreen: any = renderLoadingOrErrorScreen(fullData);
                                        if (LoadingOrErrorScreen !== null) {
                                            return LoadingOrErrorScreen;
                                        }

                                        return (
                                            <HomePage 
                                                globalData={fullData.data.globalData as GlobalData}
                                                socialMediaData={fullData.data.socialMediaData as SocialMediaData[]}
                                                data={fullData.data.data as OrtalioMedia[]}
                                            />
                                        );
                                    }
                                }
                            </Query>
                        }

                        return (
                            <HomePage 
                                globalData={fullData.data.globalData as GlobalData}
                                socialMediaData={fullData.data.socialMediaData as SocialMediaData[]}
                                data={fullData.data.data as OrtalioMedia[]}
                            />
                        );
                    }
                }
            </Query>
        );
    }
}

export default HomePageContainer;