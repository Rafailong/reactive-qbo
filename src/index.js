/**
 * @file Reactive client for QBO V3 API
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import requestGenerator from './requestGenerator'
import operations from './operations'

const V3_ENDPOINT_BASE_URL = 'https://sandbox-quickbooks.api.intuit.com/v3/company/'

/**
 * Will generate a object configured with the given tokens.
 * This object provides function to CRUD over the QBO API objects
 * and to batch over GET operations to read all the information form i.e. Invoices
 *
 * Every operation will return a RxJS Observable.
 *
 * The batch operations will return a Array of Observables
 * simulating paging over the information of the requested objects.
 *
 * @param {String} consumerKey
 * @param {String} consumerSecret
 * @param {String} token
 * @param {String} tokenSecret
 * @param {String} realmId
 * @param {Boolean} useSandbox
 * @return {Object} The client object to QBO API.
 */
const generateClient = (consumerKey, consumerSecret, token, tokenSecret, realmId, useSandbox) => {
  const baseURI = useSandbox ? V3_ENDPOINT_BASE_URL : V3_ENDPOINT_BASE_URL.replace('sandbox-', '')
  const r = requestGenerator.generate(baseURI, consumerKey, consumerSecret, token, tokenSecret, realmId) // left 'Customer', 'GET', { 'Accept': 'application/json' }
  const ops = operations(r)
  return {
    'countCustomer': () => ops.count('Customer'),
    'findCustomer': (id) => ops.fetchById('customer', id)
  }
}

module.exports = generateClient