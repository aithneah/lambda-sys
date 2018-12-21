import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import Actions from "../actions";
import * as selectors from "./selectors";

export function* getAllDeclarationsData() {
    const studentIndex = yield select(selectors.studentIndex);
    let { data: lists } = yield call(axios.get, "http://localhost:8000/api/students/" + studentIndex + "/declarations");
    yield put(Actions.setDeclarationsData(lists));
}