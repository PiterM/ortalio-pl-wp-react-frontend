import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ORTALIO_MEDIA_QUERY } from './HomePage.gql';
import HomePage from './HomePage';
import { OrtalioMedia } from './HomePage.models';

const HomePageContainer = () => {
    let {
        loading,
        error,
        data
    } = useQuery(GET_ORTALIO_MEDIA_QUERY);

    if (loading) {
        return <p>Still loading</p>;
    }

    if (error) {
        return <p>Był error</p>;
    }

    return (
        <HomePage data={data.data as OrtalioMedia}/>
    );
};

export default HomePageContainer;