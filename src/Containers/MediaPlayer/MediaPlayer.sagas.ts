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
import ACTION_TYPES from './MediaPlayer.actionTypes';

const getNextItem = (): any => ({ 
    direction: 'right',
    actionSuccess: setSelectedNextAudioItemSuccessAction,
    actionError: setSelectedNextAudioItemErrorAction
});

const getPreviousItem = (): any => ({ 
    direction: 'left',
    actionSuccess: setSelectedPreviousAudioItemSuccessAction,
    actionError: setSelectedPreviousAudioItemErrorAction
});

const getUpperItem = (): any => ({ 
    direction: 'up',
    actionSuccess: setSelectedUpperAudioItemSuccessAction,
    actionError: setSelectedUpperAudioItemErrorAction
});

const getLowerItem = (): any => ({ 
    direction: 'down',
    actionSuccess: setSelectedLowerAudioItemSuccessAction,
    actionError: setSelectedLowerAudioItemErrorAction
});

type GetAllMediaDataIterator = IterableIterator<
    PutEffect<MediaPlayerActions> | SelectEffect
>;

export function selectNextAudioItem() {
    return selectCurrentAudioItem(getNextItem());
}

export function selectPreviousAudioItem() {
    return selectCurrentAudioItem(getPreviousItem()) ;
}

export function* selectUpperAudioItem() {
    yield selectCurrentAudioItem(getUpperItem());
}

export function* selectLowerAudioItem() {
    yield selectCurrentAudioItem(getLowerItem());
}

const getItemKeyById = (mediaData: any, id: string): any => {
    return Object.keys(mediaData).find(
        (key: string) => (mediaData[key] as OrtalioMedia).id === id
    );
}

export function* selectCurrentAudioItem(getItem: any): GetAllMediaDataIterator {
    try {
        const mediaData: any = yield select((store: StoreState) => store.media);

        if (mediaData) {
            const itemsGraph: any = yield select((store: StoreState) => store.itemsGraph);
            if (itemsGraph && itemsGraph.length) {
                const currentSelectedMediaId: any = yield select((store: StoreState) => store.selectedMediaId);
                const currentKey = getItemKeyById(mediaData, currentSelectedMediaId as string);
                const firstItemId: string = (mediaData[0] as OrtalioMedia).id;
                const lastItemId: string = (mediaData[mediaData.length - 1] as OrtalioMedia).id;
    
                let newKey;
                if (getItem.direction === 'left' && currentSelectedMediaId === firstItemId) {
                    newKey = getItemKeyById(mediaData, lastItemId);
                } else if (getItem.direction === 'right' && currentSelectedMediaId === lastItemId) {
                    newKey = getItemKeyById(mediaData, firstItemId);
                } else {
                    newKey = itemsGraph[currentKey][getItem.direction];
                }
                
                setWindowLocationHash(mediaData[newKey].slug);
                yield put(getItem.actionSuccess(mediaData[newKey].id));
            }
        }
    } catch (error) {
        yield put(getItem.actionError(error.toString()))
    }
}

export function* watchMediaPlayer() {
    yield takeLatest(ACTION_TYPES.SET_SELECTED_NEXT_AUDIO_ITEM, selectNextAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_PREVIOUS_AUDIO_ITEM, selectPreviousAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_UPPER_AUDIO_ITEM, selectUpperAudioItem);
    yield takeLatest(ACTION_TYPES.SET_SELECTED_LOWER_AUDIO_ITEM, selectLowerAudioItem);
}
