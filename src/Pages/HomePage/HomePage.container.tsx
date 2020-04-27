import React from 'react';
import { Query } from 'react-apollo';
import styled from '@emotion/styled'
import ErrorPage from '../ErrorPage/ErrorPage';
import GQL_QUERIES from './HomePage.gql';
import HomePage from './HomePage';
import { 
    GlobalData, 
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';

const LoaderScreen = styled.div`
    background: url('/images/audio-loader.svg') center center no-repeat #fff;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const renderLoadingOrErrorScreen = (data: any) => {
    if (data.loading) {
        return <LoaderScreen />;
    }
    if (data.error) {
        return <ErrorPage description="Sorry. Come back later" />;
    }
    return null;
}

const HomePageContainer = React.memo(() => {
    return (
        <>
            <Query query={GQL_QUERIES.GET_SITE_GLOBAL_DATA_QUERY}>
                {
                    (globalData: any) => {
                        const LoadingOrErrorScreen: any = renderLoadingOrErrorScreen(globalData);
                        if (LoadingOrErrorScreen !== null) {
                            return LoadingOrErrorScreen;
                        }

                        return <Query query={GQL_QUERIES.GET_SOCIAL_MEDIA_DATA_QUERY}>
                            {
                                (socialMediaData: any) => {
                                    const LoadingOrErrorScreen: any = renderLoadingOrErrorScreen(socialMediaData);
                                    if (LoadingOrErrorScreen !== null) {
                                        return LoadingOrErrorScreen;
                                    }
            
                                    return <Query query={GQL_QUERIES.GET_ORTALIO_MEDIA_QUERY}>
                                        {
                                            (ortalioMediaData: any) => {
                                                const LoadingOrErrorScreen: any = renderLoadingOrErrorScreen(ortalioMediaData);
                                                if (LoadingOrErrorScreen !== null) {
                                                    return LoadingOrErrorScreen;
                                                }

                                                return (
                                                    <HomePage 
                                                        globalData={globalData.data.globalData as GlobalData}
                                                        socialMediaData={socialMediaData.data.socialMediaData as SocialMediaData[]}
                                                        data={ortalioMediaData.data.data as OrtalioMedia[]}
                                                    />
                                                );
                                            }
                                        }
                                    </Query>
                                }
                            }
                        </Query>
                    }
                }
            </Query>
        </>
    );
});

export default HomePageContainer;