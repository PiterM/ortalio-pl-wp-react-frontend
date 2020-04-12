import { put, takeLatest, PutEffect } from 'redux-saga/effects';
import {
    SetAllMediaDataSuccessAction,
    setAllMediaDataSuccessAction,
} from './HomePage.actions';
import ACTION_TYPES from './HomePage.actionTypes';

type GetAllMediaDataIterator = IterableIterator<
    PutEffect<SetAllMediaDataSuccessAction>
>;

export function* getAllMediaData(): GetAllMediaDataIterator {
    try {
        yield put(setAllMediaDataSuccessAction([
            {
                id: 'anId',
                title: 'Kawałek #1',
                shortDescription: 'Opis kawałka 1',
                content: 'Jakieś słowa do utworu<br/>coś tam coś tam',
                soundcloudUrl: 'http://costam.pl',
                youtubeUrl: 'http://costam.pl',
                isPlaying: false,
                order: 1,
                featuredImage: {
                    altText: 'alt text',
                    imageSourceUrl: 'http://costam.pl'
                }
            }
        ]));
    } catch (error) {
        // yield put(fetchAllMediaDataErrorAction(error.getMessage()))
    }
}

// export function* watchMedia() {
//     yield takeLatest(ACTION_TYPES.FETCH_ALL_MEDIA_DATA_INIT, getAllMediaData);
// }
