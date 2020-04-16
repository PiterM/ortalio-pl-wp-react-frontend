import { put, takeLatest, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { OrtalioMedia } from '../../Pages/HomePage/HomePage.models';
import { StoreState } from '../../App/App.store.d'
import {
    SetSelectedNextAudioItemSuccessAction,
    setSelectedNextAudioItemSuccessAction,
} from './MediaPlayer.actions';
import ACTION_TYPES from './MediaPlayer.actionTypes';

type GetAllMediaDataIterator = IterableIterator<
    PutEffect<SetSelectedNextAudioItemSuccessAction> | SelectEffect
>;

export function* selectNextAudioItem(): GetAllMediaDataIterator {
    try {
        const mediaData: any = yield select((store: StoreState) => store.media);
        if (mediaData) {
            const currentSelectedMediaId = yield select((store: StoreState) => store.selectedMediaId);
            const currentKey: any = Object.keys(mediaData).find(
                (key: string) => (mediaData[key] as OrtalioMedia).id === currentSelectedMediaId
            );
            const itemsNumber = mediaData.length + 1;
            const nextKey = `${(parseInt(currentKey) + 1) % itemsNumber}`;
            
            yield put(setSelectedNextAudioItemSuccessAction(mediaData[nextKey].id));
        }
    } catch (error) {
        // yield put(fetchAllMediaDataErrorAction(error.getMessage()))
    }
}

export function* watchMediaPlayer() {
    yield takeLatest(ACTION_TYPES.SET_SELECTED_NEXT_AUDIO_ITEM, selectNextAudioItem);
}
