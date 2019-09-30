# With HTTP Reducer

[![Build Status](https://travis-ci.org/dankreiger/with-http-reducer.svg?branch=master)](https://travis-ci.org/dankreiger/with-http-reducer)

Higher order reducer for generic `FETCH_BEGIN`, `FETCH_SUCCESS`, and `FETCH_FAILURE` actions

---

```sh
$ npm install with-http-reducer
```

## Usage

1. Attach `withHttpReducer` to a reducer, and pass it a name to assign to a specific domain:

   ```js
   import { withHttpReducer, HTTP_BEGIN } from 'with-http-reducer';

   const users = (state = { current: null }, { type, payload }) => {
     switch (type) {
       case 'SET_CURRENT_USER':
         return { ...state, current: payload };
       default:
         return state;
     }
   };

   // 'users' string param is optional
   export default withHttpReducer(users, 'users');
   ```

2. Import actions as needed (supply optional payload - TODO in docs)

   ```js
    import from 'with-http-reducer';
    import React, { useEffect } from 'react';
    import { useDispatch } from 'react-redux';
    import whr from 'with-http-reducer';

    // component
    export default () => {
      const dispatch = useDispatch();
      const loading = useSelector(({loading}) => loading);
      useEffect(() => {
        dispatch(whr.httpBegin('users'));
      }, [fetchUsersBegin, dispatch]);

      if(loading) {
        return <div>loading</div>
      }
      return (
        <div>content</div>
      )
    }
   ```

TODO

## Todo:

- more tests
- update docs to describe functionality
- fix the issues with module exports
