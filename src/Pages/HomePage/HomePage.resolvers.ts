import { 
    getGlobalDataItemsArray,
    getOrtalioMediaItemsArray, 
    getOrtalioMediaItemData,
    getOrtalioSocialMediaArray,
    getOrtalioSocialMediaData
} from './HomePage.selectors';

export const getAllOrtalioMediaDataResolver = (root: any) => {
    return getOrtalioMediaItemsArray(root).map((media: any) => getOrtalioMediaItemData(media));
}

export const getSiteGlobalDataResolver = (root: any) => {
    return getGlobalDataItemsArray(root);
}

export const getSocialMediaDataResolver = (root: any) => {
    return getOrtalioSocialMediaArray(root).map((item: any) => getOrtalioSocialMediaData(item));
}