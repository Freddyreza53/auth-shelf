import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* shelfSagaWatcher() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('DELETE_ITEM', deleteItem);
    yield takeEvery('UPDATE_ITEM', updateItem);
}

function* updateItem(action) {
    yield axios.put(`/api/shelf`, action.payload );
    yield put({type: 'FETCH_ITEMS'})
}

function* addItem(action) {
    yield axios.post('/api/shelf', action.payload);
    yield put({type: 'FETCH_ITEMS'})
}

function* fetchItems() {
    let items = yield axios.get('/api/shelf');
    yield put({type: 'SET_LIST_ITEMS', payload: items.data})
}

function* deleteItem(action) {
    yield axios.delete(`/api/shelf/${action.payload}`);
    yield put({type: 'FETCH_ITEMS'})
}

export default shelfSagaWatcher;