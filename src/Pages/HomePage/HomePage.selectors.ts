import { createSelector } from 'reselect';

export const getOrtalioMediaItemsArray = (data: any) => 
    data.ortalioMedia.edges;

export const getOrtalioMediaFieldData = (item: any) => item.ortalioMediaField;
export const getOrtalioMediaFeatureImageData = (item: any) => item.featuredImage;
export const getOrtalioMediaItem = (item: any) => item;

export const getOrtalioMediaItemData = createSelector(
    [getOrtalioMediaItem, getOrtalioMediaFieldData, getOrtalioMediaFeatureImageData],
    (mediaItem, mediaFieldData, featuredImageData) => {
        return {
            id: mediaItem.id,
            slug: mediaItem.slug,
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
    data.ortalioSocialMedia.edges;

export const getOrtalioSocialMediaFieldData = (node: any) => node.ortalioSocialMediaField;
export const getOrtalioSocialMediaFeaturedImageData = (node: any) => node.featuredImage;

export const getOrtalioSocialMediaData = createSelector(
    [getOrtalioSocialMediaFieldData, getOrtalioSocialMediaFeaturedImageData],
    (socialMediaFieldData, featuredImageData) => {
        return {
            url: socialMediaFieldData.url,
            imageAltText: featuredImageData.altText,
            imageSourceUrl: featuredImageData.sourceUrl
        }
    }
);