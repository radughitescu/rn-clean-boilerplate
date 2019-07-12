/**
 * Created by radughitescu on 12/07/2019
 */

import { createValidator } from './validations';

export default function getAsyncValidator(config) {
  return data => {
    const validator = createValidator(config(data));
    return new Promise((resolve, reject) => {
      const errors = validator(data);

      if (Object.keys(errors).length) {
        reject(errors);
      }

      resolve();
    });
  };
}

export function getValidator(config) {
  return data => {
    const validator = createValidator(config(data));
    return validator(data);
  };
}
