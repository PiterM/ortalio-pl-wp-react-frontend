import { WindowResolution } from './constants';
import { dimensions } from './variables';

export const setWindowLocationHash = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView();
}

export const getLayoutColumnsNumber = (resolution: WindowResolution) => {
    if (!resolution || !resolution.height || !resolution.width) {
        return dimensions.homePage.columnsNumber;
    }

    if (resolution.width < 768) {
        return dimensions.homePage.columnsNumber - 1;
    } else if (resolution.width < 600) {
        return dimensions.homePage.columnsNumber - 2;
    }
    
    return dimensions.homePage.columnsNumber;
}