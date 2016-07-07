/**
 * @file Abstract core operation.
 * @name reactive-qbo
 * @author Rafael Avila <ravila@nearbpo.com>
 * @license ISC
 * @copyright 2016 Rafailong
 */

import * as _ from 'lodash'
import * as Rx from 'rxjs'

/**
 * Page size.
 *
 * @access private
 */
const PAGE_SIZE = 1000

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
  const uri = '/' + id
  return Rx.Observable.fromPromise(req(entity, 'GET', { 'Accept': 'application/json' }, {}, {uri}))
})

/**
 * Return a Observable that will produce a sequence of pages
 * of information.
 *
 * @param {String} entity A part of the URL like Customers
 * @returns {Observable}
 */
const fetchAll = _.curry((req, entity) => {
  const fP = fetchPage(req, entity)
  return count(req, entity)
    .map(buildPages)
    .flatMap(Rx.Observable.fromArray)
    .flatMap((page) => {
      const {startPosition, maxResult} = page
      return fP(startPosition, maxResult)
    })
})

const buildPages = (count) => {
  let pages = []
  const numberOfPages = Math.floor(count / PAGE_SIZE)
  const left = count % PAGE_SIZE

  if (numberOfPages <= 1) {
    pages.push({'startPosition': 1, 'maxReult': count})
  }

  for (let index = 0; index < numberOfPages; index++) {
    let startPosition = (index * PAGE_SIZE) + 1
    let maxResult = (index + 1) * PAGE_SIZE
    pages.push({startPosition, maxResult})
  }

  if(left > 0) {
    pages.push({'startPosition': count - left, 'maxResult': count})
  }

  return pages
}

const fetchPage = (req, entity, startPosition, maxResult) => {
  const query = `SELECT * FROM ${entity} STARTPOSITION ${startPosition} MAXRESULT ${maxResult}`
  return Rx.Observable.fromPromise(req(entity, 'GET', { 'Accept': 'application/json' }, {query}, {}))
}

module.exports = (req) => {
  return {
    'count': count(req),
    'fetchById': fetchById(req),
    'fetchAll': fetchAll(req)
  }
}
