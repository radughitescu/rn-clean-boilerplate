/**
 * Created by radughitescu on 12/07/2019
 */

import { ERROR } from './../constants';

export function error(error) {
  // eslint-disable-line no-shadow
  return {
    type: ERROR.error,
    payload: error
  };
}

export function closeNotifications() {
  return {
    type: ERROR.close
  };
}

export const errorActionsFacade = {
  error,
  closeNotifications
};
