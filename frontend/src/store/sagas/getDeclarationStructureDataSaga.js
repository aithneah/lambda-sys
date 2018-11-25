import axios from "axios";
import { put, call } from "redux-saga/effects";
import Actions from "../actions";

export function* getDeclarationStructureData(action) {
    let { data } = yield call(axios.get, "http://localhost:8000/api/declarations/" + action.classesId + "/structure");
    yield put(Actions.setDeclarationStructureData(action.classesId, data.structure));
}

