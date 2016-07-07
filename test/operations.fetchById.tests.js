import { get } from 'lodash'
import operationsGenerator from '../lib/operations'
import requestGenerator from '../lib/requestGenerator'

describe('operations.fetchById', () => {
  let req
  let fetchByIdObs

  before(() => {
    expect(requestGenerator).to.be.a.Object
    expect(requestGenerator.generate).to.be.a.Funtion

    expect(operationsGenerator).to.be.a.Funtion

    // left: entity, verb, headers, qs, ops = {}
    req = requestGenerator.generate(global.BASE_URL, global.QBO_CONSUMER_KEY, global.QBO_CONSUMER_SECRETE, global.TOKEN, global.TOKEN_SECRET, global.REALM_ID)
  })

  beforeEach(() => {
    const fetchByIdOp = operationsGenerator(req).fetchById
    expect(fetchByIdOp).to.be.a.Funtion

    fetchByIdObs = fetchByIdOp('CompanyInfo', global.REALM_ID)
  })

  it('should fetchById the CompanyInfo', (done) => {
    fetchByIdObs.subscribe(
      (data) => {
        expect(get(data, 'CompanyInfo')).to.be.a.Object
        done()
      },
      done // on error
    )
  })
})
