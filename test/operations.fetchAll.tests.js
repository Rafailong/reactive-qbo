import { get } from 'lodash'
import operationsGenerator from '../lib/operations'
import requestGenerator from '../lib/requestGenerator'

describe('operations.fetchAll', () => {
  let req
  let fetchAllObs

  before(() => {
    expect(requestGenerator).to.be.a.Object
    expect(requestGenerator.generate).to.be.a.Funtion

    expect(operationsGenerator).to.be.a.Funtion

    // left: entity, verb, headers, qs, ops = {}
    req = requestGenerator.generate(global.BASE_URL, global.QBO_CONSUMER_KEY, global.QBO_CONSUMER_SECRETE, global.TOKEN, global.TOKEN_SECRET, global.REALM_ID)
  })

  beforeEach(() => {
    const pageSize = 5
    const fetchAllOp = operationsGenerator(req, pageSize).fetchAll
    expect(fetchAllOp).to.be.a.Funtion

    fetchAllObs = fetchAllOp('Customer')
  })

  it('should fetch all the customers', (done) => {
    fetchAllObs.subscribe(
      (response) => {
        expect(get(response, 'QueryResponse')).to.be.a.Object
        expect(get(response, 'QueryResponse.Customer')).to.be.a.Array
      },
      done, done)
  })
})
