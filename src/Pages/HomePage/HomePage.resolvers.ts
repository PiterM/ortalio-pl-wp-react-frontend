import { 
    getGlobalDataItemsArray,
    getOrtalioMediaItemsArray, 
    getOrtalioMediaItemData 
} from './HomePage.selectors';

export const getAllOrtalioMediaDataResolver = (root: any) => {
    return getOrtalioMediaItemsArray(root).map((media: any) => getOrtalioMediaItemData(media));
}

export const getSiteGlobalDataResolver = (root: any) => {
    return getGlobalDataItemsArray(root);
}