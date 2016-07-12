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

  const gCF = (type) => ops.create(type)
  const gUF = (type) => ops.update(type)
  const gFX = (type) => ops.fetchById(type)
  const gFA = (type) => ops.fetchAll(type)
  const gDA = (type) => ops.del(type)

  return {
    // Accont
    'findAccount': gFX('account'),
    'createAccount': gCF('account'),
    'updateAccount': gUF('account'),
    'fetchAccounts': gFA('account'),
    'countAccounts': () => ops.count('Account'),

    // Bill
    'findBill': gFX('bill'),
    'createBill': gCF('bill'),
    'updateBill': gUF('bill'),
    'fetchBills': gFA('bill'),
    'countBills': () => ops.count('Bill'),
    'deleteBill': gDA('bill'),

    // BillPayment
    'findBillPayment': gFX('billpayment'),
    'createBillPayment': gCF('billpayment'),
    'updateBillPayment': gUF('billpayment'),
    'fetchBillPayment': gFA('billpayment'),
    'countBillPayments': () => ops.count('BillPayment'),
    'deleteBillPayments': gDA('billpayment'),

    // Class
    'findClass': gFX('class'),
    'createClass': gCF('class'),
    'updateClass': gUF('class'),
    'fetchClasses': gFA('class'),
    'countClasses': () => ops.count('Class'),

    // CompanyInfo
    'findCompanyInfo': gFX('companyinfo'),
    'fetchCompanyInfo': gFA('companyinfo'),

    // CreditMemo
    'findCreditMemo': gFX('creditmemo'),
    'createCreditMemo': gCF('creditmemo'),
    'updateCreditMemo': gUF('creditmemo'),
    'fetchCreditMemos': gFA('creditmemo'),
    'countCreditMemos': () => ops.count('CreditMemo'),
    'deleteCreditMemo': gDA('creditmemo'),

    // customer
    'findCustomer': gFX('customer'),
    'createCustomer': gCF('Customer'),
    'updateCustomer': gUF('Customer'),
    'fetchCustomers': gFA('Customer'),
    'countCustomers': () => ops.count('Customer'),

    // Department
    'findDepartment': gFX('customer'),
    'createDepartment': gCF('Customer'),
    'updateDepartment': gUF('Customer'),
    'fetchDepartments': gFA('Customer'),
    'countDepartments': () => ops.count('Department'),

    // Deposit
    'findDeposit': gFX('deposit'),
    'createDeposit': gCF('deposit'),
    'updateDeposit': gUF('deposit'),
    'fetchDeposits': gFA('deposit'),
    'countDeposits': () => ops.count('Deposit'),
    'deleteDeposit': gDA('deposit'),

    // Employee
    'findEmployee': gFX('employee'),
    'createEmployee': gCF('employee'),
    'updateEmployee': gUF('employee'),
    'fetchEmployees': gFA('employee'),
    'countEmployees': () => ops.count('Employee'),

    // Estimate
    'findEstimate': gFX('estimate'),
    'createEstimate': gCF('estimate'),
    'updateEstimate': gUF('estimate'),
    'fetchEstimates': gFA('estimate'),
    'countEstimates': () => ops.count('Estimate'),
    'deleteEstimate': gDA('estimate'),

    // Invoice
    'findInvoice': gFX('invoice'),
    'createInvoice': gCF('invoice'),
    'updateInvoice': gUF('invoice'),
    'fetchInvoices': gFA('invoice'),
    'countInvoices': () => ops.count('Invoice'),
    'deleteInvoice': gDA('invoice'),

    // Item
    'findItem': gFX('item'),
    'createItem': gCF('item'),
    'updateItem': gUF('item'),
    'fetchItems': gFA('item'),
    'countItems': () => ops.count('Item'),

    // JournalEntry
    'findJournalEntry': gFX('journalentry'),
    'createJournalEntry': gCF('journalentry'),
    'updateJournalEntry': gUF('journalentry'),
    'fetchJournalEntries': gFA('journalentry'),
    'countJournalEntries': () => ops.count('JournalEntry'),
    'deleteJournalEntry': gDA('journalentry'),

    // Payment
    'findPayment': gFX('payment'),
    'createPayment': gCF('payment'),
    'updatePayment': gUF('payment'),
    'fetchPayments': gFA('payment'),
    'countPayments': () => ops.count('Payment'),
    'deletePayment': gDA('payment'),

    // PaymentMethod
    'findPaymentMethod': gFX('paymentmethod'),
    'createPaymentMethod': gCF('paymentmethod'),
    'updatePaymentMethod': gUF('paymentmethod'),
    'fetchPaymentMethods': gFA('paymentmethod'),
    'countPaymentMethods': () => ops.count('PaymentMethod'),

    // Purchase
    'findPurchase': gFX('purchase'),
    'createPurchase': gCF('purchase'),
    'updatePurchase': gUF('purchase'),
    'fetchPurchases': gFA('purchase'),
    'countPurchases': () => ops.count('Purchase'),
    'deletePurchase': gDA('purchase'),

    // PurchaseOrder
    'findPurchaseOrder': gFX('purchaseorder'),
    'createPurchaseOrder': gCF('purchaseorder'),
    'updatePurchaseOrder': gUF('purchaseorder'),
    'fetchPurchaseOrder': gFA('purchaseorder'),
    'countPurchaseOrders': () => ops.count('PurchaseOrder'),
    'deletePurchaseOrder': gDA('purchaseorder'),

    // RefundReceipt
    'findRefundReceipt': gFX('refundreceipt'),
    'createRefundReceipt': gCF('refundreceipt'),
    'updateRefundReceipt': gUF('refundreceipt'),
    'fetchRefundReceipts': gFA('refundreceipt'),
    'countRefundReceipts': () => ops.count('RefundReceipt'),
    'deleteRefundReceipt': gDA('refundreceipt'),

    // SalesReceipt
    'findSalesReceipt': gFX('salesreceipt'),
    'createSalesReceipt': gCF('salesreceipt'),
    'updateSalesReceipt': gUF('salesreceipt'),
    'fetchSalesReceipts': gFA('salesreceipt'),
    'countSalesReceipts': () => ops.count('SalesReceipt'),
    'deleteSalesReceipt': gDA('salesreceipt'),

    // TaxAgency
    'findTaxAgency': gFX('taxagency'),
    'createTaxAgency': gCF('taxagency'),
    'fetchTaxAgencys': gFA('taxagency'),
    'countTaxAgency': () => ops.count('TaxAgency'),

    // TaxCode
    'findTaxCode': gFX('taxcode'),
    'fetchTaxCodes': gFA('taxcode'),
    'countTaxCodes': () => ops.count('TaxCode'),

    // TaxRate
    'findTaxRate': gFX('taxrate'),
    'fetchTaxRates': gFA('taxrate'),
    'countTaxRates': () => ops.count('TaxRate'),

    // TaxService
    'createtaxservice': gCF('taxservice'),

    // term
    'findTerm': gFX('term'),
    'createTerm': gCF('term'),
    'updateTerm': gUF('term'),
    'fetchTerms': gFA('term'),
    'countTerms': () => ops.count('Term'),

    // TimeActivity
    'findTimeActivity': gFX('timeactivity'),
    'createTimeActivity': gCF('timeactivity'),
    'updateTimeActivity': gUF('timeactivity'),
    'fetchTimeActivities': gFA('timeactivity'),
    'countTimeActivities': () => ops.count('TimeActivity'),
    'deleteTimeActivity': gDA('timeactivity'),

    // Transfer
    'findTransfer': gFX('transfer'),
    'createTransfer': gCF('transfer'),
    'updateTransfer': gUF('transfer'),
    'fetchTransfer': gFA('transfer'),
    'countTransfer': () => ops.count('Transfer'),

    // Vendor
    'findVendor': gFX('vendor'),
    'createVendor': gCF('vendor'),
    'updateVendor': gUF('vendor'),
    'fetchVendor': gFA('vendor'),
    'countVendor': () => ops.count('Vendor'),

    // VendorCredit
    'findVendorCredit': gFX('vendorcredit'),
    'createVendorCredit': gCF('vendorcredit'),
    'updateVendorCredit': gUF('vendorcredit'),
    'fetchVendorCredits': gFA('vendorcredit'),
    'countVendorCredits': () => ops.count('VendorCredit'),
    'deleteVendorCredit': gDA('vendorcredit')
  }
}

module.exports = generateClient