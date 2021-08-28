import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
/* import dashboardSaga from './dashboard/saga'  */

export default function* rootSaga() {
  yield all([ authSaga(),]);
}