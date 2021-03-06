/**
 * @file Expose a curried function to create configurable request object.
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import Promise from 'bluebird'
import * as _ from 'lodash'
import request from 'request'

if (process.env.NODE_ENV !== 'production') {
  require('request-debug')(request)
}

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

const generateRequestOpts = (oauth, entity, verb, headers, qs, body) => {
  let opts = {
    'method': verb,
    'qs': qs || {},
    'headers': headers || {},
    'oauth': oauth,
    'json': true
  }

  if (verb === 'PUT' || verb === 'POST') {
    opts.body = body
  }

  opts.qs.minorversion = opts.qs.minorversion || 4

  return opts
}

const generateRequest = (url, opts) => {
  return new Promise((resolve, reject) => {
    request(url, opts, function (err, res, body) {
      if (err ||
          res.statusCode >= 300 ||
          ((_.isObject(body) && body.Fault && body.Fault.Error && body.Fault.Error.length)) ||
          ((_.isString(body) && !_.isEmpty(body) && body.indexOf('<') === 0))) {
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
  const body = ops.body || {}
  const url = baseURI + realmId + uri
  const oauth = formOAuth(consumerKey, consumerSecret, token, tokenSecret)
  const requestOpts = generateRequestOpts(oauth, entity, verb.toLocaleUpperCase(), headers, qs, body)
  console.log(`url: ${url}`)
  console.log(`ops: ${JSON.stringify(requestOpts)}`)
  return generateRequest(url, requestOpts)
}

module.exports = { 'generate': _.curry(generate) }