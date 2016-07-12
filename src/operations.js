/**
 * @file Abstract core operation.
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import * as _ from 'lodash/fp'
import * as Rx from 'rx'
import util from 'util'

/**
 * Return a Observable that will return as a single
 * element the result of a count query to the specified entity of
 * QBO API.
 *
 * @param {String} entity A part of the URL like Customers
 * @returns {Observable}
 */
const count = _.curry((req, entity) => {
  const qs = { 'query': `select count(*) from ${entity}` }
  return Rx.Observable.fromPromise(req(entity, 'GET', { 'Accept': 'application/json' }, qs, {'uri': '/query'}))
})

/**
 * Return a Observable that will return as a single
 * element the result of the request for the object with the
 * given ID.
 *
 * @param {String} entity A part of the URL like Customers
 * @param {any} id The ID of the object to fetch.
 * @returns {Observable}
 */
const fetchById = _.curry((req, entity, id) => {
  const uri = `/${entity.toLowerCase()}/${id}`
  return Rx.Observable.fromPromise(req(entity, 'GET', { 'Accept': 'application/json' }, {}, {uri}))
})

/**
 * Return a Observable that will produce a sequence of pages
 * of information.
 *
 * @param {String} entity A part of the URL like Customers
 * @returns {Observable}
 */
const fetchAll = _.curry((req, pageSize, entity) => {
  return count(req, entity)
    .map((data) => _.get('QueryResponse.totalCount', data))
    .map((num) => buildPages(pageSize, num))
    .flatMap((pages) => Rx.Observable.from(pages))
    .flatMap((page) => {
      const {startPosition, maxResult} = page
      return fetchPage(req, entity, startPosition, maxResult)
    })
})

const buildPages = (pageSize, count) => {
  let pages = []
  const numberOfPages = Math.floor(count / pageSize)
  const left = count % pageSize

  if (numberOfPages <= 1) {
    pages.push({'startPosition': 1, 'maxReult': count})
  }

  for (let index = 0; index < numberOfPages; index++) {
    let startPosition = (index * pageSize) + 1
    let maxResult = (index + 1) * pageSize
    pages.push({startPosition, maxResult})
  }

  if (left > 0) {
    pages.push({'startPosition': count - left + 1, 'maxResult': count})
  }

  return pages
}

const fetchPage = (req, entity, startPosition, maxResult) => {
  const query = `SELECT * FROM ${entity} STARTPOSITION ${startPosition} MAXRESULTS ${maxResult}`
  return req(entity, 'GET', { 'Accept': 'application/json' }, {query}, {'uri': '/query'})
}

/**
 * Return a Observable that will return as a single
 * element the result of the POST request to create
 * the object.
 *
 * @param {String} entity A part of the URL like Customers
 * @param {Object} body The object to create
 * @returns {Observable}
 */
const create = _.curry((req, entity, body) => {
  const uri = `/${entity.toLowerCase()}`
  return Rx.Observable.fromPromise(req(entity, 'POST', { }, null, {uri, body}))
})

/**
 * Return a Observable that will return as a single
 * element the result of the POST request to update
 * the object.
 *
 * @param {String} entity A part of the URL like Customers
 * @param {Object} body The object to create. Must contains a Id and a SyncToken.
 * @returns {Observable}
 */
const update = _.curry((req, entity, body) => {
  if (_.isUndefined(body.Id) ||
    _.isEmpty(body.Id + '') ||
    _.isUndefined(body.SyncToken) ||
    _.isEmpty(body.SyncToken + '')) {
    if (entity !== 'exchangerate') {
      const err = new Error(entity + ' must contain Id and SyncToken fields: ' +
        util.inspect(body, {showHidden: false, depth: null}))
      return Rx.Observable.throw(err)
    }
  }

  if (!body.hasOwnProperty('sparse')) {
    body.sparse = true
  }

  const uri = `/${entity.toLowerCase()}?operation=update`
  let opts = {uri}
  if (body.void && body.void.toString() === 'true') {
    opts.qs = { include: 'void' }
    delete body.void
  }
  opts.body = body
  return Rx.Observable.fromPromise(req(entity, 'POST', null, null, opts))
})

/**
 * Return a Observable that will return as a single
 * element the result of the POST request to delete
 * the object.
 *
 * @param {String} entity A part of the URL like Customers
 * @param {String} objectId The Identifies in QBO of the object to delete
 * @param {String} objectSyncToken The sync token of the object to delete
 * @returns {Observable}
 */
const del = _.curry((req, entity, objectId, objectSyncToken) => {
  const uri = `/${entity.toLowerCase()}?operation=delete`
  const body = { 'Id': objectId, 'SyncToken': objectSyncToken }
  let opts = {uri, body}
  return Rx.Observable.fromPromise(req(entity, 'POST', null, null, opts))
})

module.exports = (req, pageSize = 1000) => {
  return {
    'count': count(req),
    'fetchById': fetchById(req),
    'fetchAll': fetchAll(req, pageSize),
    'create': create(req),
    'update': update(req),
    'del': del(req)
  }
}
