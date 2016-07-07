import { get } from 'lodash'
import operationsGenerator from '../lib/operations'
import requestGenerator from '../lib/requestGenerator'

describe('operations.count', () => {
  let req
  let countObs

  before(() => {
    expect(requestGenerator).to.be.a.Object
    expect(requestGenerator.generate).to.be.a.Funtion

    expect(operationsGenerator).to.be.a.Funtion

    // left: entity, verb, headers, qs, ops = {}
    req = requestGenerator.generate(global.BASE_URL, global.QBO_CONSUMER_KEY, global.QBO_CONSUMER_SECRETE, global.TOKEN, global.TOKEN_SECRET, global.REALM_ID)
  })

  beforeEach(() => {
    const countOp = operationsGenerator(req).count
    expect(countOp).to.be.a.Funtion

    countObs = countOp('Customer')
  })

  it('should count customers', (done) => {
    countObs.subscribe(
      (data) => {
        expect(get(data, 'QueryResponse')).to.be.a.Object
        expect(get(data, 'QueryResponse.totalCount')).to.be.a.Number
        done()
      },
      done // on error
    )
  })

  it('should count customers, extend the observable to get only the count value', (done) => {
    countObs
      .map((data) => get(data, 'QueryResponse.totalCount'))
      .subscribe(
        (count) => {
          expect(count).to.be.a.Number
          done()
        },
        done) // on error
  })
})
