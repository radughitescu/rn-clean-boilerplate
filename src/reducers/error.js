/**
 * Created by radughitescu on 2019-07-14
 */

const initialState = {};

export default function error(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case 'ERROR':
      return { ...state, error: true };

    default:
      return state;
  }
}
