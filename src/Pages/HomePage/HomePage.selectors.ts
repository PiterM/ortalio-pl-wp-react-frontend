import { createSelector } from 'reselect';

export const getOrtalioMediaItemsArray = (data: any) => 
    data.ortalioMedia.edges;

export const getOrtalioMediaFieldData = (item: any) => item.node.ortalioMediaField;
export const getOrtalioMediaFeatureImageData = (item: any) => item.node.featuredImage;

export const getOrtalioMediaItemData = createSelector(
    [getOrtalioMediaFieldData, getOrtalioMediaFeatureImageData],
    (mediaFieldData, featuredImageData) => {
        return {
            ...mediaFieldData,
            featuredImage: {
                ...featuredImageData
            }
        };
    }
);

export const getGlobalDataItemsArray = (data: any) => 
    data.ortalioSettingBy.ortalioSettingsField;

export const getOrtalioSocialMediaArray = (data: any) => 
    data.ortalioSocialMedia.nodes;

export const getOrtalioSocialMediaFieldData = (node: any) => node.ortalioSocialMediaField;
export const getOrtalioSocialMediaFeaturedImageData = (node: any) => node.featuredImage;

export const getOrtalioSocialMediaData = createSelector(
    [getOrtalioSocialMediaFieldData, getOrtalioSocialMediaFeaturedImageData],
    (socialMediaFieldData, featuredImageData) => {
        console.log('1', socialMediaFieldData);
        console.log('2', featuredImageData);
        return {
            url: socialMediaFieldData.url,
            imageAltText: featuredImageData.altText,
            imageSourceUrl: featuredImageData.sourceUrl
        }
    }
);