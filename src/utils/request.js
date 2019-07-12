/**
 * Created by radughitescu on 12/07/2019
 */

import { cloneDeep } from 'lodash';

const TOKEN_KEY = 'Authorization';

export const defaultParams = {
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

export function addToken(token) {
  defaultParams.headers[TOKEN_KEY] = token;
}

export function getToken() {
  return defaultParams.headers[TOKEN_KEY];
}

/**
 * HTTP GET
 * @param  {string} url api endpoint
 * @return {Promise}
 */

export function get(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

/**
 * HTTP POST
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function post(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP POST BINARY
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function postBinary(url, body = new FormData()) {
  const binaryParams = cloneDeep(defaultParams);
  delete binaryParams.headers['Content-Type'];

  return fetch(url, {
    ...binaryParams,
    method: 'post',
    body
  });
}

/**
 * HTTP PUT
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function put(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP PUT BINARY
 * @param  {string} url api endpoint
 * @param  {object} body
 * @return {Promise}
 */
export function putBinary(url, body = new FormData()) {
  const binaryParams = Object.assign({}, defaultParams);
  delete binaryParams.headers['Content-Type'];

  return fetch(url, {
    ...binaryParams,
    method: 'put',
    body
  });
}

/**
 * HTTP DELETE
 * @param  {string} url api endpoint
 * @return {Promise}
 */
export function del(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete',
    body: JSON.stringify(body)
  });
}
