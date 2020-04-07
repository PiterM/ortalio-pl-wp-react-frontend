import { createSelector } from 'reselect';

export const getOrtalioMediaItemsArray = (data: any) => 
    data.ortalioMedia.edges.slice(0).reverse();

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