/**
 * @file Abstract core operation.
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import * as _ from 'lodash/fp'
import * as Rx from 'rx'

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

  if(left > 0) {
    pages.push({'startPosition': count - left + 1, 'maxResult': count})
  }

  return pages
}

const fetchPage = (req, entity, startPosition, maxResult) => {
  const query = `SELECT * FROM ${entity} STARTPOSITION ${startPosition} MAXRESULTS ${maxResult}`
  return req(entity, 'GET', { 'Accept': 'application/json' }, {query}, {'uri': '/query'})
}

module.exports = (req, pageSize = 1000) => {
  return {
    'count': count(req),
    'fetchById': fetchById(req),
    'fetchAll': fetchAll(req, pageSize)
  }
}
