import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import Actions from "../actions";
import * as selectors from "./selectors";

export function* getDeclarationStructureData(action) {
    const studentIndex = yield select(selectors.studentIndex);
    let { data } = yield call(axios.get, "http://localhost:8000/api/students/" + studentIndex + "/declarations/" + action.classesId + "/structure");
    console.log(data);
    yield put(Actions.setDeclarationStructureData(action.classesId, data.structure));
}

