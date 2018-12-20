import axios from "axios";
import {put, call} from "redux-saga/effects";
import Actions from "../actions";
import {push} from 'connected-react-router'


export function* getAccountData() {
    let {data: account} = yield call(axios.get, "http://localhost:8000/api/accounts/123456");
    yield put(Actions.setAccountData(account.index, account.name, account.course));
    yield put(push("/home"));
}