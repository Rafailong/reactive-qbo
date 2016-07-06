/**
 * @file Expose a curried function to create configurable request object.
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import * as Promise from 'bluebird'
import * as _ from 'lodash'
import * as request from 'request'
import { v1 as uuidV1 } from 'uuid'

request.defaults({
  'headers': {
    'User-Agent': 'reactive-qbo',
  }
})

const formOAuth = (consumerKey, consumerSecret, token, tokenSecret) => {
  return {
    'token': token,
    'token_secret': tokenSecret,
    'consumer_key': consumerKey,
    'consumer_secret': consumerSecret
  }
}

const generateRequestOpts = (oauth, entity, verb, headers, qs) => {
  let opts = {
    'verb': verb,
    'qs': qs || {},
    'headers': headers || {},
    'oauth': oauth,
    'json': true
  }

  opts.qs.minorversion = opts.qs.minorversion || 4
  opts.headers['Request-Id'] = uuidV1()

  if (entity !== null) {
    opts.body = entity
  }

  return opts
}

const generateRequest = (url, opts) => {
  return new Promise((reject, resolve) => {
    request(opts, function (err, res, body) {
      if (err ||
          res.statusCode >= 300 ||
          (_.isObject(body) && body.Fault && body.Fault.Error && body.Fault.Error.length) ||
          (_.isString(body) && !_.isEmpty(body) && body.indexOf('<') === 0)) {
        return reject(err || body)
      }

      return resolve(body)
    })
  })
}

/**
 * Function that is exported as the complete module.
 *
 * @param {String} baseURI Base URL
 * @param {String} consumerKey OAuth consumer key.
 * @param {String} consumerSecret OAuth consumer secret.
 * @param {String} token OAuth token.
 * @param {String} tokenSecret OAuth token secret.
 * @param {String} realmId The realmId of the OAuth startegy.
 * @param {String} entity A URL part like Customers
 * @param {String} verb The HTTP verb.
 * @param {Object} headers The headers of the request.
 * @param {Object} qs A key-value hashs that will be added as query string.
 * @param {Object} [ops={}] Options for the request.
 * @returns {Promise} The promise of the request.
 */
const generate = (baseURI, consumerKey, consumerSecret, token, tokenSecret, realmId, entity, verb, headers, qs, ops = {}) => {
  const uri = ops.uri || ''
  const url = baseURI + realmId + uri
  const oauth = formOAuth(consumerKey, consumerSecret, token, tokenSecret)
  const requestOpts = generateRequestOpts(oauth, entity, realmId, verb, headers, qs)
  return generateRequest(url, requestOpts)
}

module.exports = { 'generate': _.curry(generate) }