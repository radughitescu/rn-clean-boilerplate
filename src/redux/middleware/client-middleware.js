/**
 * Created by mateimisarca on 24/07/2018
 */

import { errorActionsFacade as errorActions } from './../../actions/error';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return promise
      .then(
        result => {
          return result.json();
        },
        error => {
          console.error('MIDDLEWARE ERROR:', error);
          dispatch({ ...rest, error, type: FAILURE });
          dispatch(errorActions.error({ ...rest, error }));
          return Promise.reject(error);
        }
      )
      .then(myResult =>
        dispatch({ ...rest, payload: myResult, type: SUCCESS })
      );
  };
}
