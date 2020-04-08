import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from '@emotion/styled'
import { GET_SITE_GLOBAL_DATA_QUERY, GET_ORTALIO_MEDIA_QUERY } from './HomePage.gql';
import HomePage from './HomePage';
import { GlobalData, OrtalioMedia } from './HomePage.models';

const LoaderScreen = styled.div`
    background: url('/images/audio-loader.svg') center center no-repeat #fff;
    fill: #E3C07D;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const ErrorScreen = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ErrorMessage = styled.div`
    background: url('/images/error-icon.svg') top center no-repeat #fff;
    width: 200px;;
    height: 100px;
    & > p {
        margin-top: 85px;
    }
`;

const HomePageContainer = () => {
    const globalData = useQuery(GET_SITE_GLOBAL_DATA_QUERY);
    const ortalioMediaData = useQuery(GET_ORTALIO_MEDIA_QUERY);

    if (globalData.loading || ortalioMediaData.loading) {
        return <LoaderScreen />;
    }

    if (globalData.error || ortalioMediaData.error) {
        return ( 
            <ErrorScreen>
                <ErrorMessage>
                    <p>Sorry. Come back later.</p>
                </ErrorMessage>
            </ErrorScreen>
        );
    }

    return (
        <HomePage 
            globalData={globalData.data.globalData as GlobalData}
            data={ortalioMediaData.data.data as OrtalioMedia}
        />
    );
};

export default HomePageContainer;