import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* shelfSagaWatcher() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
}

function* fetchItems() {
    let items = yield axios.get('/api/shelf');
    yield put({type: 'SET_LIST_ITEMS', payload: items.data})
}

export default shelfSagaWatcher;