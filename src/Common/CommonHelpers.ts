import { WindowResolution, LayoutModes } from './constants';
import { dimensions } from './variables';

export const setWindowLocationHash = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) element.scrollIntoView();
}

export const getLayoutColumnsNumber = (resolution: WindowResolution) => {
    if (!resolution || !resolution.height || !resolution.width) {
        return dimensions.homePage.columnsNumber;
    }

    if (resolution.width <= 600) {
        return dimensions.homePage.columnsNumber - 3;
    } else if (resolution.width <= 960) {
        return dimensions.homePage.columnsNumber - 2;
    } else if (resolution.width <= 1024) {
        return dimensions.homePage.columnsNumber - 1;
    }
    
    return dimensions.homePage.columnsNumber;
}

export const getLayoutMode = (resolution: WindowResolution) => {
    if (!resolution || !resolution.height || !resolution.width) {
        return LayoutModes.Extended;
    }

    if (resolution.width <= 768) {
        return LayoutModes.Mobile;
    } else if (resolution.width <= 1024) {
        return LayoutModes.Compact;
    }
    return LayoutModes.Extended;
}