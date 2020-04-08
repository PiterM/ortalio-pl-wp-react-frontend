import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_SITE_GLOBAL_DATA_QUERY, GET_ORTALIO_MEDIA_QUERY } from './HomePage.gql';
import HomePage from './HomePage';
import { GlobalData, OrtalioMedia } from './HomePage.models';

const HomePageContainer = () => {
    const globalData = useQuery(GET_SITE_GLOBAL_DATA_QUERY);
    const ortalioMediaData = useQuery(GET_ORTALIO_MEDIA_QUERY);

    if (globalData.loading || ortalioMediaData.loading) {
        return <p>Still loading</p>;
    }

    if (globalData.error || ortalioMediaData.error) {
        return <p>Był error</p>;
    }

    return (
        <HomePage 
            globalData={globalData.data.globalData as GlobalData}
            data={ortalioMediaData.data.data as OrtalioMedia}
        />
    );
};

export default HomePageContainer;