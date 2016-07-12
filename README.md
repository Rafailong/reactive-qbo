# Reactive QBO

This is a QBO API cliente inspired by [node-quickbooks](https://github.com/mcohen01/node-quickbooks).

It is based on [Promises](bluebirdjs.com/docs/api-reference.html) and [Observables](https://github.com/Reactive-Extensions/RxJS).

## Install

`npm install reactive-qbo`

## Usage

This is a really simple to use module as you can see bellow

```javascript
import reactiveQBO from 'reactive-qbo' // this is a function

// now we have a bunch of function to interact with QBO API
// all the function of qboClient return a Rx.Observable
const qboClient = reactiveQBO(consumerKey, consumerSecret, token, tokenSecret, realmId, useSandbox)
```

## Functions

Once we init the module as above we can use a bunch of function to interact with QBO API.

- Accont
  - findAccount
    - Arguments
      - `accountId` The ID of the account to fetch
  - createAccount
    - Arguments
      - `body` The object to create
  - updateAccount
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchAccounts
    - This will perform a pagination by 1000 to fetch all the Accounts
  - countAccounts
    - Will count the Acconts

- Bill
  - findBill
    - Arguments
      - `billId` The ID of the bill to fetch
  - createBill
    - Arguments
      - `body` The object to create
  - updateBill
  - fetchBills
  - countBills
  - deleteBill

- BillPayment
  - findBillPayment
    - Arguments
      - `billPaymentId` The ID of the bill payment to fetch
  - createBillPayment
    - Arguments
      - `body` The object to create
  - updateBillPayment
  - fetchBillPayment
  - countBillPayments
  - deleteBillPayments

- Class
  - findClass
    - Arguments
      - `classId` The ID of the class to fetch
  - createClass
    - Arguments
      - `body` The object to create
  - updateClass
  - fetchClasses
  - countClasses

- CompanyInfo
  - findCompanyInfo
    - Arguments
      - `companyInfoId` The ID of the companyInfo to fetch
  - fetchCompanyInfo

- CreditMemo
  - findCreditMemo
    - Arguments
      - `accountId` The ID of the account to fetch
  - createCreditMemo
    - Arguments
      - `body` The object to create
  - updateCreditMemo
  - fetchCreditMemos
  - countCreditMemos
  - deleteCreditMemo

- Customer
  - findCustomer
    - Arguments
      - `customerId` The ID of the customer to fetch
  - createCustomer
    - Arguments
      - `body` The object to create
  - updateCustomer
  - fetchCustomers
  - countCustomers

- Department
  - findDepartment
    - Arguments
      - `departmentId` The ID of the department to fetch
  - createDepartment
    - Arguments
      - `body` The object to create
  - updateDepartment
  - fetchDepartments
  - countDepartments

- Deposit
  - findDeposit
    - Arguments
      - `depositId` The ID of the deposit to fetch
  - createDeposit
    - Arguments
      - `body` The object to create
  - updateDeposit
  - fetchDeposits
  - countDeposits
  - deleteDeposit

- Employee
  - findEmployee
    - Arguments
      - `employeeId` The ID of the employee to fetch
  - createEmployee
  - updateEmployee
  - fetchEmployees
  - countEmployees

- Estimate
  - findEstimate
    - Arguments
      - `estimateId` The ID of the estimate to fetch
  - createEstimate
    - Arguments
      - `body` The object to create
  - updateEstimate
  - fetchEstimates
  - countEstimates
  - deleteEstimate

- Invoice
  - findInvoice
    - Arguments
      - `invoiceId` The ID of the invoice to fetch
  - createInvoice
  - updateInvoice
  - fetchInvoices
  - countInvoices
  - deleteInvoice

- Item
  - findItem
    - Arguments
      - `itemId` The ID of the item to fetch
  - createItem
  - updateItem
  - fetchItems
  - countItems

- JournalEntry
  - findJournalEntry
    - Arguments
      - `journalEntryId` The ID of the journalEntry to fetch
  - createJournalEntry
  - updateJournalEntry
  - fetchJournalEntries
  - countJournalEntries
  - deleteJournalEntry

- Payment
  - findPayment
    - Arguments
      - `paymentId` The ID of the payment to fetch
  - createPayment
  - updatePayment
  - fetchPayments
  - countPayments
  - deletePayment

- PaymentMethod
  - findPaymentMethod
    - Arguments
      - `paymentMethodId` The ID of the paymentMethod to fetch
  - createPaymentMethod
  - updatePaymentMethod
  - fetchPaymentMethods
  - countPaymentMethods

- Purchase
  - findPurchase
    - Arguments
      - `purchaseId` The ID of the purchase to fetch
  - createPurchase
  - updatePurchase
  - fetchPurchases
  - countPurchases
  - deletePurchase

- PurchaseOrder
  - findPurchaseOrder
    - Arguments
      - `purchaseOrderId` The ID of the purchaseOrder to fetch
  - createPurchaseOrder
  - updatePurchaseOrder
  - fetchPurchaseOrder
  - countPurchaseOrders
  - deletePurchaseOrder

- RefundReceipt
  - findRefundReceipt
    - Arguments
      - `refundreceiptId` The ID of the refundreceipt to fetch
  - createRefundReceipt
  - updateRefundReceipt
  - fetchRefundReceipts
  - countRefundReceipts
  - deleteRefundReceipt

- SalesReceipt
  - findSalesReceipt
    - Arguments
      - `salesReceiptId` The ID of the salesReceipt to fetch
  - createSalesReceipt
  - updateSalesReceipt
  - fetchSalesReceipts
  - countSalesReceipts
  - deleteSalesReceipt

- TaxAgency
  - findTaxAgency
    - Arguments
      - `taxAgencyId` The ID of the taxAgency to fetch
  - createTaxAgency
  - fetchTaxAgencys
  - countTaxAgency

- TaxCode
  - findTaxCode
    - Arguments
      - `taxCodeId` The ID of the taxCode to fetch
  - fetchTaxCodes
  - countTaxCodes

- TaxRate
  - findTaxRate
    - Arguments
      - `taxRateId` The ID of the taxRate to fetch
  - fetchTaxRates
  - countTaxRates

- TaxService
  - createtaxservice

- Term
   - findTerm
    - Arguments
      - `termId` The ID of the term to fetch
   - createTerm
   - updateTerm
   - fetchTerms
   - countTerms

- TimeActivity
  - findTimeActivity
    - Arguments
      - `timeActivityId` The ID of the timeActivity to fetch
  - createTimeActivity
  - updateTimeActivity
  - fetchTimeActivities
  - countTimeActivities
  - deleteTimeActivity

- Transfer
  - findTransfer
    - Arguments
      - `transferId` The ID of the transfer to fetch
  - createTransfer
  - updateTransfer
  - fetchTransfer
  - countTransfer

- Vendor
  - findVendor
    - Arguments
      - `vendorId` The ID of the vendor to fetch
  - createVendor
  - updateVendor
  - fetchVendor
  - countVendor

- VendorCredit
  - findVendorCredit
    - Arguments
      - `vendorCreditId` The ID of the vendorCredit to fetch
  - createVendorCredit
  - updateVendorCredit
  - fetchVendorCredits
  - countVendorCredits
  - deleteVendorCredit