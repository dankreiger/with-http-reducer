# With HTTP Reducer

[![Build Status](https://travis-ci.org/dankreiger/with-http-reducer.svg?branch=master)](https://travis-ci.org/dankreiger/with-http-reducer)

Higher order reducer for generic `FETCH_BEGIN`, `FETCH_SUCCESS`, and `FETCH_FAILURE` actions

---

```sh
$ npm install with-http-reducer
```

## Todo

- fix module exporting so imports can be destructured
- organize `src` so helpers are more compact and easy to use
- more tests
- update docs to describe functionality
- fix the issues with module exports
- add better typescript interfaces, enums, and types

## Usage

1. Add helpers to a constants file

   ```js
   // users.constants.js
   import whr from 'with-http-reducer';

   export const usersReducerName = 'users';

   export const usersWithHttp = reducer =>
     whr.withHttpReducer(reducer, usersReducerName);

   export const usersHttpBegin = payload =>
     whr.httpBegin(usersReducerName, payload);
   export const usersHttpFailure = payload =>
     whr.httpFailure(usersReducerName, payload);
   export const usersHttpSuccess = payload =>
     whr.httpSuccess(usersReducerName, payload);
   ```

2. Add in higher order reducer:

   ```js
   import { usersWithHttp } from './users.constants';

   const users = (state = { current: null }, { type, payload }) => {
     switch (type) {
       // any other case statements
       case 'SET_CURRENT_USER':
         return { ...state, current: payload };
       default:
         return state;
     }
   };

   export default usersWithHttp(users);
   ```

3. Use other helpers where you need them

   ```js
   // components
   import React, { useEffect } from 'react';
   import { usersHttpBegin, selectUsersLoading } from './users.constants';
   import { useSelector, useDispatch } from 'react-redux';

   export default () => {
     const dispatch = useDispatch();
     const loading = useSelector(selectUsersLoading);
     const httpError = useSelector(selectUsersHttpError);
     useEffect(() => {
       dispatch(usersHttpBegin());
     }, [dispatch]);

     if (httpError) {
       // show error boundary
       throw new Error(httpError.message);
     }
     if (loading) {
       return <Spinner />;
     }
     return <div>content</div>;
   };
   ```

   ```js
   // thunks
   import { normalize } from 'normalizr';
   import {
     usersHttpBegin,
     usersHttpSuccess,
     usersHttpFailure,
     usersReducerName
   } from './users.constants';

   function fetchUsers() {
     return async dispatch => {
       dispatch(usersHttpBegin());
       try {
         const res = await fetch(`someendpoint/users`);
         const users = await res.json();
         const usersDictionary = normalize(users, usersSchema);
         dispatch(
           usersHttpSuccess({
             byId: usersDictionary.entities[usersReducerName],
             allIds: usersDictionary.result
           })
         );
       } catch (err) {
         dispatch(usersHttpFailure({ err }));
       }
     };
   }
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
   const api = url => fetch(url).then(res => res.json());

   function* handleFetchUsersBeginAsync() {
     try {
       const users = yield call(api, `someendpoint/users`);
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
