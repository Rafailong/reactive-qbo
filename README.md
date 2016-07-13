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
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchBills
    - This will perform a pagination by 1000 to fetch all the Bill
  - countBills
    - Will count the Bill
  - deleteBill
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- BillPayment
  - findBillPayment
    - Arguments
      - `billPaymentId` The ID of the bill payment to fetch
  - createBillPayment
    - Arguments
      - `body` The object to create
  - updateBillPayment
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchBillPayment
    - This will perform a pagination by 1000 to fetch all the BillPayment
  - countBillPayments
    - Will count the BillPayment
  - deleteBillPayments
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Class
  - findClass
    - Arguments
      - `classId` The ID of the class to fetch
  - createClass
    - Arguments
      - `body` The object to create
  - updateClass
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchClasses
    - This will perform a pagination by 1000 to fetch all the Class
  - countClasses
    - Will count the Class

- CompanyInfo
  - findCompanyInfo
    - Arguments
      - `companyInfoId` The ID of the companyInfo to fetch
  - fetchCompanyInfo
    - This will perform a pagination by 1000 to fetch all the CompanyInfo

- CreditMemo
  - findCreditMemo
    - Arguments
      - `accountId` The ID of the account to fetch
  - createCreditMemo
    - Arguments
      - `body` The object to create
  - updateCreditMemo
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchCreditMemos
    - This will perform a pagination by 1000 to fetch all the CreditMemo
  - countCreditMemos
    - Will count the CreditMemo
  - deleteCreditMemo
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Customer
  - findCustomer
    - Arguments
      - `customerId` The ID of the customer to fetch
  - createCustomer
    - Arguments
      - `body` The object to create
  - updateCustomer
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchCustomers
    - This will perform a pagination by 1000 to fetch all the Customer
  - countCustomers
    - Will count the Customer

- Department
  - findDepartment
    - Arguments
      - `departmentId` The ID of the department to fetch
  - createDepartment
    - Arguments
      - `body` The object to create
  - updateDepartment
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchDepartments
    - This will perform a pagination by 1000 to fetch all the Department
  - countDepartments
    - Will count the Department

- Deposit
  - findDeposit
    - Arguments
      - `depositId` The ID of the deposit to fetch
  - createDeposit
    - Arguments
      - `body` The object to create
  - updateDeposit
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchDeposits
    - This will perform a pagination by 1000 to fetch all the Deposit
  - countDeposits
    - Will count the Deposit
  - deleteDeposit
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Employee
  - findEmployee
    - Arguments
      - `employeeId` The ID of the employee to fetch
  - createEmployee
    - Arguments
      - `body` The object to create
  - updateEmployee
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchEmployees
    - This will perform a pagination by 1000 to fetch all the Employee
  - countEmployees
    - Will count the Employee

- Estimate
  - findEstimate
    - Arguments
      - `estimateId` The ID of the estimate to fetch
  - createEstimate
    - Arguments
      - `body` The object to create
  - updateEstimate
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchEstimates
    - This will perform a pagination by 1000 to fetch all the Estimates
  - countEstimates
    - Will count the Estimates
  - deleteEstimate
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Invoice
  - findInvoice
    - Arguments
      - `invoiceId` The ID of the invoice to fetch
  - createInvoice
    - Arguments
      - `body` The object to create
  - updateInvoice
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchInvoices
    - This will perform a pagination by 1000 to fetch all the Invoices
  - countInvoices
    - Will count the Invoices
  - deleteInvoice
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Item
  - findItem
    - Arguments
      - `itemId` The ID of the item to fetch
  - createItem
    - Arguments
      - `body` The object to create
  - updateItem
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchItems
    - This will perform a pagination by 1000 to fetch all the Items
  - countItems
    - Will count the Items

- JournalEntry
  - findJournalEntry
    - Arguments
      - `journalEntryId` The ID of the journalEntry to fetch
  - createJournalEntry
    - Arguments
      - `body` The object to create
  - updateJournalEntry
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchJournalEntries
    - This will perform a pagination by 1000 to fetch all the JournalEntries
  - countJournalEntries
    - Will count the JournalEntries
  - deleteJournalEntry
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Payment
  - findPayment
    - Arguments
      - `paymentId` The ID of the payment to fetch
  - createPayment
    - Arguments
      - `body` The object to create
  - updatePayment
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchPayments
    - This will perform a pagination by 1000 to fetch all the Payments
  - countPayments
    - Will count the Payments
  - deletePayment
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- PaymentMethod
  - findPaymentMethod
    - Arguments
      - `paymentMethodId` The ID of the paymentMethod to fetch
  - createPaymentMethod
    - Arguments
      - `body` The object to create
  - updatePaymentMethod
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchPaymentMethods
    - This will perform a pagination by 1000 to fetch all the PaymentMethods
  - countPaymentMethods
    - Will count the PaymentMethods

- Purchase
  - findPurchase
    - Arguments
      - `purchaseId` The ID of the purchase to fetch
  - createPurchase
    - Arguments
      - `body` The object to create
  - updatePurchase
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchPurchases
    - This will perform a pagination by 1000 to fetch all the Purchases
  - countPurchases
    - Will count the Purchases
  - deletePurchase
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- PurchaseOrder
  - findPurchaseOrder
    - Arguments
      - `purchaseOrderId` The ID of the purchaseOrder to fetch
  - createPurchaseOrder
    - Arguments
      - `body` The object to create
  - updatePurchaseOrder
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchPurchaseOrder
    - This will perform a pagination by 1000 to fetch all the PurchaseOrders
  - countPurchaseOrders
    - Will count the PurchaseOrders
  - deletePurchaseOrder
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- RefundReceipt
  - findRefundReceipt
    - Arguments
      - `refundreceiptId` The ID of the refundreceipt to fetch
  - createRefundReceipt
    - Arguments
      - `body` The object to create
  - updateRefundReceipt
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchRefundReceipts
    - This will perform a pagination by 1000 to fetch all the RefundReceipts
  - countRefundReceipts
    - Will count the RefundReceipts
  - deleteRefundReceipt
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- SalesReceipt
  - findSalesReceipt
    - Arguments
      - `salesReceiptId` The ID of the salesReceipt to fetch
  - createSalesReceipt
    - Arguments
      - `body` The object to create
  - updateSalesReceipt
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchSalesReceipts
    - This will perform a pagination by 1000 to fetch all the SalesReceipts
  - countSalesReceipts
    - Will count the SalesReceipts
  - deleteSalesReceipt
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- TaxAgency
  - findTaxAgency
    - Arguments
      - `taxAgencyId` The ID of the taxAgency to fetch
  - createTaxAgency
    - Arguments
      - `body` The object to create
  - fetchTaxAgencys
    - This will perform a pagination by 1000 to fetch all the TaxAgencies
  - countTaxAgency
    - Will count the TaxAgencies

- TaxCode
  - findTaxCode
    - Arguments
      - `taxCodeId` The ID of the taxCode to fetch
  - fetchTaxCodes
    - This will perform a pagination by 1000 to fetch all the TaxCodes
  - countTaxCodes
    - Will count the TaxCodes

- TaxRate
  - findTaxRate
    - Arguments
      - `taxRateId` The ID of the taxRate to fetch
  - fetchTaxRates
    - This will perform a pagination by 1000 to fetch all the TaxRates
  - countTaxRates
    - Will count the TaxRates

- TaxService
  - createtaxservice
    - Arguments
      - `body` The object to create

- Term
   - findTerm
    - Arguments
      - `termId` The ID of the term to fetch
   - createTerm
    - Arguments
      - `body` The object to create
   - updateTerm
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
   - fetchTerms
    - This will perform a pagination by 1000 to fetch all the Terms
   - countTerms
    - Will count the Terms

- TimeActivity
  - findTimeActivity
    - Arguments
      - `timeActivityId` The ID of the timeActivity to fetch
  - createTimeActivity
    - Arguments
      - `body` The object to create
  - updateTimeActivity
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchTimeActivities
    - This will perform a pagination by 1000 to fetch all the TimeActivities
  - countTimeActivities
    - Will count the TimeActivities
  - deleteTimeActivity
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

- Transfer
  - findTransfer
    - Arguments
      - `transferId` The ID of the transfer to fetch
  - createTransfer
    - Arguments
      - `body` The object to create
  - updateTransfer
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchTransfer
    - This will perform a pagination by 1000 to fetch all the Transfers
  - countTransfer
    - Will count the Transfer

- Vendor
  - findVendor
    - Arguments
      - `vendorId` The ID of the vendor to fetch
  - createVendor
    - Arguments
      - `body` The object to create
  - updateVendor
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchVendor
    - This will perform a pagination by 1000 to fetch all the Vendor
  - countVendor
    - Will count the Vendor

- VendorCredit
  - findVendorCredit
    - Arguments
      - `vendorCreditId` The ID of the vendorCredit to fetch
  - createVendorCredit
    - Arguments
      - `body` The object to create
  - updateVendorCredit
    - Arguments
      - `body` The object to create. Must contains a Id and a SyncToken
  - fetchVendorCredits
    - This will perform a pagination by 1000 to fetch all the VendorCredit
  - countVendorCredits
    - Will count the VendorCredit
  - deleteVendorCredit
    - Arguments
      - `objectId` The Id of the object to delete
      - `syncToken` The SyncToken of the object to delete

## Left

- Query function
- Attachables
- Batches