import axios from "axios";
import { put, call, select } from "redux-saga/effects";
import Actions from "../actions";
import * as selectors from "./selectors";
import {push} from "connected-react-router";


export function* updateDeclaration(action) {
  const studentIndex = yield select(selectors.studentIndex);
  console.log(action);
  yield call(axios.post, "http://localhost:8000/api/students/" + studentIndex + "/declarations/" + action.classesId + "/structure",
    {structure: action.declarationStructure})
  yield put(push("/declarations"));
}