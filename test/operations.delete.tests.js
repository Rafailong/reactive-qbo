import { get } from 'lodash'
import operationsGenerator from '../lib/operations'
import requestGenerator from '../lib/requestGenerator'

describe('operations.del', () => {
  let req
  let createObs
  let deleteObs
  let timeActivity = {
    'NameOf': 'Employee',
    'EmployeeRef': {
      'value': '55',
      'name': 'Emily Platt'
    },
    'StartTime': '2015-07-05T08:00:00-08:00',
    'EndTime': '2013-07-05T17:00:00-08:00'
  }

  before(() => {
    expect(requestGenerator).to.be.a.Object
    expect(requestGenerator.generate).to.be.a.Funtion

    expect(operationsGenerator).to.be.a.Funtion

    // left: entity, verb, headers, qs, ops = {}
    req = requestGenerator.generate(global.BASE_URL, global.QBO_CONSUMER_KEY, global.QBO_CONSUMER_SECRETE, global.TOKEN, global.TOKEN_SECRET, global.REALM_ID)
  })

  beforeEach(() => {
    const createOp = operationsGenerator(req).create
    expect(createOp).to.be.a.Funtion
    createObs = createOp('timeactivity', timeActivity)

    const deleteOp = operationsGenerator(req).del
    expect(deleteOp).to.be.a.Funtion
    deleteObs = deleteOp('timeactivity')
  })

  it('should create and delete a TimeActivity in QBO', (done) => {
    createObs
      .flatMap(
        (data) => {
          const tA = get(data, 'TimeActivity')
          expect(tA).to.be.a.Object
          expect(tA.Id).to.not.be.null
          return deleteObs(tA.Id, tA.SyncToken)
        })
      .subscribe(
        (data) => {
          const status = get(data, 'TimeActivity.status')
          expect(status).to.be.a.Object
          expect(status).equals('Deleted')
          done()
        },
        done // on error
    )
  })
})
