/**
 * Created by radughitescu on 12/07/2019
 */

import { capitalize } from 'lodash';

export default function keyMirror(prefix, obj = {}) {
  const ret = {};
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      let val = key;
      if (prefix) val = `${capitalize(prefix)}${capitalize(key)}`;
      ret[key] = val;
    }
  }
  return ret;
}
