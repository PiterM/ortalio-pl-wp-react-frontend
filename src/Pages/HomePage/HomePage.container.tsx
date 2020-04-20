import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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

const HomePageContainer = () => {
    const globalData = useQuery(GQL_QUERIES.GET_SITE_GLOBAL_DATA_QUERY);
    const socialMediaData = useQuery(GQL_QUERIES.GET_SOCIAL_MEDIA_DATA_QUERY);
    const ortalioMediaData = useQuery(GQL_QUERIES.GET_ORTALIO_MEDIA_QUERY);

    if (globalData.loading || socialMediaData.loading || ortalioMediaData.loading) {
        return <LoaderScreen />;
    }

    if (globalData.error || socialMediaData.error || ortalioMediaData.error) {
        return <ErrorPage description="Sorry. Come back later" />;
    }

    return (
        <HomePage 
            globalData={globalData.data.globalData as GlobalData}
            socialMediaData={socialMediaData.data.socialMediaData as SocialMediaData[]}
            data={ortalioMediaData.data.data as OrtalioMedia[]}
        />
    );
};

export default HomePageContainer;