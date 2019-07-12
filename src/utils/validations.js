/**
 * Created by radughitescu on 12/07/2019
 */

import { isInteger, toNumber, isArray, isNumber, isNaN } from 'lodash';
// import moment from 'moment';

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) =>
  rules
    .map(rule => rule(value, data))
    .filter(error => !!error)[0 /* first error */];

export function email(value) {
  if (
    !isEmpty(value) &&
    !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
      value
    )
  ) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function checked(value) {
  console.log('vaaaaa', value);
  if (!value) {
    return 'Required';
  }
}

export function oneNumber(value) {
  if (!/\d/.test(value)) {
    return 'The password must contain at least one number.';
  }
}

/*export function isValidDate(value) {
    if (!moment(value).isValid()) {
        return 'Must be a date';
    }
}*/

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function phoneNumber(value) {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,})$/;
  if (!phoneRegex.test(value)) {
    return 'Invalid phone number format';
  }
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function minValue(min) {
  return value => {
    if (!isEmpty(value) && value < min) {
      return `Must be bigger than ${min}`;
    }
  };
}

export function maxValue(max) {
  return value => {
    if (!isEmpty(value) && value > max) {
      return `Must be smaller than ${max}`;
    }
  };
}

export function url(value) {
  if (
    !isEmpty(value) &&
    !/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(
      value
    )
  ) {
    return 'Invalid url';
  }
}

/**
 * The method delete all HTML tags from the string and after that it checks the new string length
 * @param max
 * @returns {Function}
 */
export function maxLengthWithHTML(max) {
  return value => {
    if (!isEmpty(value)) {
      const trimmedValue = value.replace(/<[^>]*>/g, '');
      if (!isEmpty(trimmedValue) && trimmedValue.length > max) {
        return `Must be no more than ${max} characters`;
      }
    }
  };
}

export function requiredWithHTML(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
  if (!isEmpty(value)) {
    const trimmedValue = value.replace(/<[^>]*>/g, '');
    if (isEmpty(trimmedValue)) {
      return 'Required';
    }
  }
}

export function jsonKeysRequired() {
  return value => {
    let errors = {};
    let hasErrors = false;
    Object.keys(value).map(key => {
      if (isEmpty(value[key])) {
        errors = Object.assign({}, errors, { [key]: 'Required' });
        hasErrors = true;
      }
    });
    if (hasErrors) {
      return errors;
    }
  };
}

export function integer(value) {
  if (!isInteger(toNumber(value))) {
    return 'Must be an integer';
  }
}

export function image(file) {
  if (file) {
    if (file.length >= 0) {
      for (let i = 0; i < file.length; i++) {
        if (!/^data:image\/(png|jpe?g|bmp|gif)/.test(file[i].file)) {
          return 'Must be an image';
        }
      }
    } else {
      if (!/^data:image\/(png|jpe?g|bmp|gif)/.test(file.file)) {
        return 'Must be an image';
      }
    }
  }
}

export function phone(value) {
  if (/[a-zA-Z]/.test(value)) {
    return 'Must be an number';
  }
}

export function number() {
  return value => {
    if (!isNumber(+value) || isNaN(+value)) {
      return 'Must be an number';
    }
  };
}

export function emails(emails) {
  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = {};

  if (isArray(emails)) {
    emails.forEach((email, index) => {
      if (email && !emailReg.test(email.trim())) {
        errors[index] = { error: 'Must enter a valid email' };
      }
    });
  } else {
    if (emails && !emailReg.test(emails.trim())) {
      return 'Must enter a valid email';
    }
  }

  if (Object.keys(errors).length) {
    return errors;
  }
}

export function requiredEmails(emails) {
  const errors = {};
  if (!emails) {
    return { error: 'Required email' };
  }

  if (isArray(emails)) {
    emails.forEach((email, index) => {
      if (isEmpty(email)) {
        errors[index] = { error: 'Required email' };
      }
    });
  } else {
    if (isEmpty(emails)) {
      return 'Required email';
    }
  }
  if (Object.keys(errors).length) {
    return errors;
  }
}

export function phones(phones) {
  const phoneReg = /[a-zA-Z]/;
  const errors = {};

  if (isArray(phones)) {
    phones.forEach((phone, index) => {
      if (!phone || phoneReg.test(phone)) {
        errors[index] = { error: 'Must enter a valid phone' };
      }
    });
  } else {
    if (!phones || phoneReg.test(phones)) {
      return 'Must enter a valid phone';
    }
  }
  if (Object.keys(errors).length) {
    return errors;
  }
}

export function requiredPhones(phones) {
  const errors = {};
  if (!phones) {
    return { error: 'Required phone' };
  }

  if (isArray(phones)) {
    phones.forEach((phone, index) => {
      if (isEmpty(phone)) {
        errors[index] = { error: 'Required phone' };
      }
    });
  } else {
    if (isEmpty(phones)) {
      return 'Required phone';
    }
  }
  if (Object.keys(errors).length) {
    return errors;
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}
