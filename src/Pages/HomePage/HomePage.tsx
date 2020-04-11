import React from 'react';
import styled from '@emotion/styled'
import { colors, dimensions } from '../../Common/variables';
import AudioItem from '../../Components/AudioItem/AudioItem';
import SocialIcons from '../../Components/SocialIcons/SocialIcons';
import HomePageLayout from '../../Layouts/Pages/HomePage.layout';
import {
    GlobalData,
    OrtalioMedia,
    SocialMediaData
} from './HomePage.models';

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(${dimensions.homePage.columnsNumber}, 2fr);
  text-align: center;
`;

const StyledPageColumn = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    & + & {
        border-left: 1px solid ${colors.newspaperText};
    }
`;

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

        const { columnsNumber } = dimensions.homePage;

        const rowsNumber = Math.floor(items.length / columnsNumber) + 1;
        let result: any[] = [];

        for (let j=0; j<columnsNumber; j++) {
            let columnIndices: number[] = [];
            for (let i=0; i<rowsNumber; i++) {
                if (items[j + i * columnsNumber] !== undefined) {
                    columnIndices.push(j + i * 5);
                }
            }

            const columnItems: OrtalioMedia[] = items.filter((item, index) => columnIndices.indexOf(index) !== -1)
            const columnItemsResult = (
                <StyledPageColumn key={columnIndices.reduce((a: number, b: number) => a * b)}>
                    {this.renderAudioItemsColumn(columnItems)}
                </StyledPageColumn>
            );
            result = result.concat(columnItemsResult);
            columnIndices = [];
        }

        return result;
    }

    private renderAudioItemsColumn(columnItems: OrtalioMedia[]): any[] {
        return columnItems.map((item) => this.renderAudioItem(item));
    }

    private renderAudioItem(item: OrtalioMedia) {
        const { id, title, shortDescription, content } = item;
        let index = 0;
        for (let i=0; i<id.length; i++) {
            index += id.charCodeAt(i)
        }

        return (
            <AudioItem
                key={id}
                index={index}
                title={title}
                shortDescription={shortDescription}
                content={content}
            />
        );
    }
}