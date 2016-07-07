import requestGenerator from '../lib/requestGenerator'

describe('requestGenerator', () => {
  let req

  before(() => {
    expect(requestGenerator).to.be.a.Object
    expect(requestGenerator.generate).to.be.a.Funtion

    // left: entity, verb, headers, qs, ops = {}
    req = requestGenerator.generate(global.BASE_URL, global.QBO_CONSUMER_KEY, global.QBO_CONSUMER_SECRETE, global.TOKEN, global.TOKEN_SECRET, global.REALM_ID)
  })

  it('should request Company information', (done) => {
    const uri = `/companyinfo/${global.REALM_ID}`
    req('companyinfo', 'GET', {}, {}, {uri})
      .then((data) => {
        expect(data).to.not.be.null
        expect(data).to.be.a.Object
        done()
      })
      .catch(done)
  })
})
