# With HTTP Reducer

[![Build Status](https://travis-ci.org/dankreiger/with-http-reducer.svg?branch=master)](https://travis-ci.org/dankreiger/with-http-reducer)

Higher order reducer for generic `FETCH_BEGIN`, `FETCH_SUCCESS`, and `FETCH_FAILURE` actions

---

```sh
$ npm install with-http-reducer
```

## Usage

1. Attach `withHttpReducer` to a reducer, and pass it an optional name to assign to a specific domain:

   ```js
   import withHttpReducer from 'with-http-reducer';

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

2. Import actions as needed with an optional payload

TODO

## Todo:

- more tests
- update docs to describe functionality
