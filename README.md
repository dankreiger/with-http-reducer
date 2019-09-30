# With HTTP Reducer

[![Build Status](https://travis-ci.org/dankreiger/with-http-reducer.svg?branch=master)](https://travis-ci.org/dankreiger/with-http-reducer)

Higher order reducer for generic `FETCH_BEGIN`, `FETCH_SUCCESS`, and `FETCH_FAILURE` actions

---

```sh
$ npm install with-http-reducer
```

## Usage

1. Add helpers to a constants file

   ```js
   // users.constants.js
   import whr from 'with-http-reducer';

   export const usersReducerName = 'users';

   export const usersHttpReducer = reducer =>
     whr.withHttpReducer(reducer, usersReducerName);

   export const usersHttpBegin = payload =>
     whr.httpBegin(usersReducerName, payload);
   export const usersHttpFailure = payload =>
     whr.httpFailure(usersReducerName, payload);
   export const usersHttpSuccess = payload =>
     whr.httpSuccess(usersReducerName, payload);
   ```

2. Attach `withHttpReducer` to a reducer, and pass it a name to assign to a specific domain:

   ```js
   import { usersHttpReducer } from './users.constants';

   const users = (state = { current: null }, { type, payload }) => {
     switch (type) {
       // any other case statements
       case 'SET_CURRENT_USER':
         return { ...state, current: payload };
       default:
         return state;
     }
   };

   export default usersHttpReducer(users);
   ```

3. Users other helpers where you need them

   ```js
   // components
   import React, { useEffect } from 'react';
   import { usersHttpBegin } from './users.constants';

   export default () => {
     const dispatch = useDispatch();
     const loading = useSelector(({ loading }) => loading);
     useEffect(() => {
       dispatch(usersHttpBegin());
     }, [fetchUsersBegin, dispatch]);

     if (loading) {
       return <div>loading</div>;
     }
     return <div>content</div>;
   };
   ```

   ```js
   // epics
   import { normalize } from 'normalizr';
   import { switchMap, map, catchError } from 'rxjs/operators';
   import { ajax } from 'rxjs/ajax';
   import { ofType } from 'redux-observable';
   import {
     usersHttpBegin,
     usersHttpSuccess,
     usersHttpFailure,
     usersReducerName
   } from './users.constants';
   import { usersSchema } from './users.schema';
   import { of } from 'rxjs';

   export function fetchUsersEpic(action$) {
     return action$.pipe(
       ofType(usersHttpBegin().type),
       switchMap(() => {
         return ajax.getJSON(`someendpoint/users`).pipe(
           map(users => normalize(users, usersSchema)),
           map(({ entities, result }) =>
             usersHttpSuccess({
               byId: entities[usersReducerName],
               allIds: result
             })
           ),
           catchError(err => of(usersHttpFailure({ err })))
         );
       })
     );
   }
   ```

   ```js
   // sagas
   import { normalize } from 'normalizr';
   import { call, put, takeLatest } from 'redux-saga/effects';
   import {
     usersHttpBegin,
     usersHttpSuccess,
     usersHttpFailure,
     usersReducerName
   } from './users.constants';
   function* handleFetchTodosBeginAsync() {
     try {
       const response = yield call(fetch('someendpoint/users', action.payload));
       const usersDictionary = yield normalize(users, usersSchema);
       yield put(
         usersHttpSuccess({
           byId: usersDictionary.entities[usersReducerName],
           allIds: usersDictionary.result
         })
       );
     } catch (err) {
       put(usersHttpFailure({ err }));
     }
   }

   export function* watchFetchUsersBegin() {
     yield takeLatest(usersHttpBegin().type, handleFetchUsersBeginAsync);
   }
   ```

TODO

## Todo:

- more tests
- update docs to describe functionality
- fix the issues with module exports
- make it clearer in general
