import React from 'react';
import { OrtalioMedia } from './HomePage.models';

interface HomePageOwnProps {
    data: OrtalioMedia;
}

export default class HomePage extends React.Component<HomePageOwnProps> {
    componentDidMount() {
        console.log('data', this.props.data);
    }

    render() {
        return <p>Mój fajny HomePage</p>
    }
}