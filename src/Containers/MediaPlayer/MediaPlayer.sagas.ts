import { put, takeLatest, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { OrtalioMedia } from '../../Pages/HomePage/HomePage.models';
import { StoreState } from '../../App/App.store.d'
import { setWindowLocationHash } from '../../Common/CommonHelpers';
import {
    MediaPlayerActions,
    setSelectedNextAudioItemSuccessAction,
    setSelectedNextAudioItemErrorAction,
    setSelectedPreviousAudioItemErrorAction,
    setSelectedPreviousAudioItemSuccessAction,
    setSelectedUpperAudioItemSuccessAction,
    setSelectedUpperAudioItemErrorAction,
    setSelectedLowerAudioItemSuccessAction,
    setSelectedLowerAudioItemErrorAction
} from './MediaPlayer.actions';
import { dimensions } from '../../Common/variables';
import ACTION_TYPES from './MediaPlayer.actionTypes';

const getNextKey = (): any => ({ 
    vector: 1,
    actionSuccess: setSelectedNextAudioItemSuccessAction,
    actionError: setSelectedNextAudioItemErrorAction
});

const getPreviousKey = (): any => ({ 
    vector: -1,
    actionSuccess: setSelectedPreviousAudioItemSuccessAction,
    actionError: setSelectedPreviousAudioItemErrorAction
});

const getUpperKey = (): any => ({ 
    vector: -1 * dimensions.homePage.columnsNumber,
    actionSuccess: setSelectedUpperAudioItemSuccessAction,
    actionError: setSelectedUpperAudioItemErrorAction
});

const getLowerKey = (): any => ({ 
    vector: dimensions.homePage.columnsNumber,
    actionSuccess: setSelectedLowerAudioItemSuccessAction,
    actionError: setSelectedLowerAudioItemErrorAction
});

type GetAllMediaDataIterator = IterableIterator<
    PutEffect<MediaPlayerActions> | SelectEffect
>;

export function selectNextAudioItem() {
    return selectCurrentAudioItem(getNextKey()) ;
}

export function selectPreviousAudioItem() {
    return selectCurrentAudioItem(getPreviousKey()) ;
}

export function selectUpperAudioItem() {
    return selectCurrentAudioItem(getUpperKey()) ;
}

export function selectLowerAudioItem() {
    return selectCurrentAudioItem(getLowerKey()) ;
}

export function* selectCurrentAudioItem(getKey: any): GetAllMediaDataIterator {
    try {
        const mediaData: any = yield select((store: StoreState) => store.media);
        if (mediaData) {
            const currentSelectedMediaId = yield select((store: StoreState) => store.selectedMediaId);
            const currentKey: any = Object.keys(mediaData).find(
                (key: string) => (mediaData[key] as OrtalioMedia).id === currentSelectedMediaId
            );

            const itemsNumber = mediaData.length;
            let newKey = parseInt(currentKey) + getKey.vector;
            newKey = newKey < 0 ? itemsNumber + newKey : newKey;
            newKey = newKey % itemsNumber;
            setWindowLocationHash(mediaData[newKey].slug);
                        
            yield put(getKey.actionSuccess(mediaData[newKey].id));
        }
    } catch (error) {
        yield put(getKey.actionError(error.toString()))
    }
}

export function* watchMediaPlayer() {
    yield takeLatest(ACTION_TYPES.SET_SELECTED_NEXT_AUDIO_ITEM, selectNextAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_PREVIOUS_AUDIO_ITEM, selectPreviousAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_UPPER_AUDIO_ITEM, selectUpperAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_LOWER_AUDIO_ITEM, selectLowerAudioItem);
}
