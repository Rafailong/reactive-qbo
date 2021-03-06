import { get } from 'lodash'
import faker from 'faker'
import operationsGenerator from '../lib/operations'
import requestGenerator from '../lib/requestGenerator'

describe('operations.update', () => {
  let req
  let createObs
  let updateObs
  let item = {
    'Name': 'Garden Supplies',
    'IncomeAccountRef': {
      'value': '79',
      'name': 'Sales of Product Income'
    },
    'ExpenseAccountRef': {
      'value': '80',
      'name': 'Cost of Goods Sold'
    },
    'AssetAccountRef': {
      'value': '81',
      'name': 'Inventory Asset'
    },
    'Type': 'Inventory',
    'TrackQtyOnHand': true,
    'QtyOnHand': 10,
    'InvStartDate': '2015-01-01'
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
    item.Name = faker.random.uuid()
    createObs = createOp('item', item)
    updateObs = operationsGenerator(req).update('item')
  })

  it('should create a Item and update its Name', (done) => {
    createObs.flatMap(
      (data) => {
        const i = get(data, 'Item')
        expect(i).to.be.a.Object
        expect(i.Name).equals(item.Name)
        expect(i.Id).to.not.be.null

        i.Name = faker.random.uuid()
        return updateObs(i)
      }).subscribe(
      (data) => {
        const i = get(data, 'Item')
        expect(i).to.be.a.Object
        expect(i.Name).not.equals(item.Name)
        done()
      },
      done)
  })
})
