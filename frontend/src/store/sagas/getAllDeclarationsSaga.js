import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getAllDeclarationsData() {
    let { data: lists } = yield call(axios.get, "http://localhost:8000/api/students/382333/declarations");
    yield put(Actions.setDeclarationsData(lists));
}