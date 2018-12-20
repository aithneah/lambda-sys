import { put } from "redux-saga/effects";
import Actions from "../actions";
import { push } from 'connected-react-router'

export function* logOut() {
    yield put(Actions.clearAccounts());
    yield put(Actions.clearStudents());
    yield put(Actions.clearGroups());
    yield put(Actions.clearDeclarations());
    yield put(push("/home"));
}