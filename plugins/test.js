// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import $ from 'jquery'
// // import floatNumber from './floatNumber'
// // import intNumber from './intNumber'
// // import isDateValid from './isDateValid'
// // import customDateGetVal from './customDateGetVal'
// // import customDateSetVal from './customDateSetVal'
// import { openItemTable } from './uCommonInvoice'
// import {
//   confirmDialog,
//   notificationMessage,
//   openObjectUcustomTable,
//   getHeaderElements,
//   validateHederElement,
//   getCurrencyRate,
// } from './customTable'
// // eslint-disable-next-line no-unused-vars
// const arrLength = 0
// const groupIdArr = []
// const uniqueProductIdArr = []
// // eslint-disable-next-line no-unused-vars
// let dataSaved = false
// let responseData
// // eslint-disable-next-line no-unused-vars
// let initialProducts = true
// const productOwnId = []
// let addResponseRow = false
// let addNewTableBody = false
// const modalBtn = $('<button>')
//   .addClass('btn btn-primary')
//   .attr('name', 'logistics')
//   .attr('id', 'logisticsBtnId')
//   .text('<s:text name="getText(logisticsCalculation)"/>') // logisticsCalculation
// let isCanImport = false
// const importSubmit = document.getElementById('file__import__submit')

// const fileChooser = document.getElementById('file__chooser')
// fileChooser.addEventListener('change', function (event) {
//   const selectedFile = event.target.files[0]
//   if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
//     isCanImport = true
//     const formData = new FormData()
//     formData.append('file', selectedFile)
//     importSubmit.addEventListener('click', function () {
//       $.ajax({
//         url: 'preparePurchaseInvoiceNew.htm',
//         type: 'POST',
//         data: formData,
//         processData: false,
//         contentType: false,
//         success: function (invoiceJson) {},
//         error: function (_error) {},
//       })
//     })
//   } else {
//     alert('Please select a excell file')
//     fileChooser.value = ''
//   }
// })

// importSubmit.addEventListener('click', function () {
//   if (isCanImport === false) {
//     notificationMessage('<s:text name="error" />')
//   }
// })

// $(document).ready(function () {
//   // var fromCopyInvocieBtn = <s:property value="fromCopyInvocieBtn"/>;
//   // var fromCopyInvocieBtn = <s:property value="fromCopyInvocieBtn"/>;
//   // var payInvoiceAccess = <s:property value="payInvoiceAccess"/>;
//   // var confirmInvoiceForMakeBillAccess = <s:property value="confirmInvoiceForMakeBillAccess"/>;
//   // var branchInvoiceConfirmStatus = <s:property value="branchInvoiceConfirmStatus"/>;
//   // var makeBillInvoiceAccess = <s:property value="makeBillInvoiceAccess"/>;
//   // var fromCopyInvocieBtn = <s:property value="fromCopyInvocieBtn"/>;
//   let fromCopyInvocieBtn = true
//   const payInvoiceAccess = true
//   const confirmInvoiceForMakeBillAccess = true
//   const branchInvoiceConfirmStatus = true
//   const makeBillInvoiceAccess = true
//   let invoiceHeaderAccess = false
//   // <% if (invoiceHeaderAccess) { %>
//   invoiceHeaderAccess = true
//   // <%} %>

//   const printPreviewAccess = true
//   const changeInvoiceCompanyAccess = true
//   const invoicePaymentLimit = true
//   // var printPreviewAccess = <s:property value="printPreviewAccess"/>;
//   // var changeInvoiceCompanyAccess = <s:property value="changeInvoiceCompanyAccess"/>;
//   // var invoicePaymentLimit = <s:property value="invoicePaymentLimit"/>;
//   const headerColumnNames = [
//     'date',
//     'company',
//     'sellDate',
//     'branch',
//     'companyGroup',
//     'department',
//     'warehouse',
//     'currency',
//     'orderProductionType',
//     'currencyRate',
//     'supplierCurSymbol',
//     'currencySymbol',
//     'companyCurrencyRate',
//     'supplierRefCurSymbol',
//     'companyRefCurrencyRate',
//     'driverName',
//     'plateNumber',
//     'car',
//     'calcType',
//     'systemNumber',
//     'invoiceBillStatus',
//     'invoiceStatus',
//     'invoiceNo',
//     'notes',
//     'invoiceNominal',
//     'paymentType',
//     'invoiceOnWayStatus',
//     'order',
//     'invoiceNumber',
//     'sequenceNumber',
//   ]
//   const orderHeaderElements = getHeaderElements(headerColumnNames)
//   orderHeaderElements.company.data({
//     durl: 'findAllCompanyForInvoice',
//     dparam: "'branchcompany':false, 'companyType':'Supplier'",
//   })
//   orderHeaderElements.orderProductionType.data({
//     durl: 'findAllOrderProductionType',
//     dparam: "'tabName':'purchaseInvoice'",
//   })
//   //    ************************************************************************************************************************************************************
//   $('button[name=invoiceAccept]')
//     .off('click')
//     .on('click', function (event) {
//       if (validateHederElement(orderHeaderElements) === 0) {
//         invoice.invoiceItems = []
//         paramsCommon.edit = true
//         paramsCommon.uCustomOrderTable = uCustomOrderTable
//         paramsCommon.invoiceItemColumns = invoiceItemColumns
//         paramsCommon.invoice = invoice
//         paramsCommon.orderHeaderElements = orderHeaderElements
//         paramsCommon.transactionsColumns = transactionsColumns
//         paramsCommon.prepareCreateEditUrl = 'prepareCreateEditPurchaseInvoice'
//         paramsCommon.prepareUrl = 'preparePurchaseInvoiceNew'
//         paramsCommon.backUrl = 'purchaseinvoice'
//         paramsCommon.tabName = 'invoiceItemTable'
//         paramsCommon.canPay = payInvoiceAccess
//         paramsCommon.branchInvoiceConfirmStatus = branchInvoiceConfirmStatus
//         paramsCommon.canConfirmInvoiceForMakeBill =
//           confirmInvoiceForMakeBillAccess
//         paramsCommon.canMakeBill = makeBillInvoiceAccess
//         paramsCommon.invoiceHeaderAccess = invoiceHeaderAccess
//         paramsCommon.printPreviewAccess = printPreviewAccess
//         paramsCommon.branchSettingsProductBarcodeParam =
//           branchSettingsProductBarcodeParam
//         paramsCommon.changeInvoiceCompanyAccess = changeInvoiceCompanyAccess
//         paramsCommon.invoicePaymentLimit = invoicePaymentLimit
//         openItemTable(paramsCommon)
//         //        console.log(paramsCommon.invoice)
//       }
//     })
//   const uCustomOrderTable = new UCustomTable1()
//   let invoice =
//     '<s:property escapeJavaScript="true" escapeHtml="false" value="invoiceJson"/>'
//   invoice = JSON.parse(invoice)
//   $('.invoiceTimeOut').html(invoice.invoiceTimeOut)
//   let objectId = invoice.id === undefined ? null : invoice.id
//   // var invoiceItemColumns = "<s:property escapeJavaScript="true" escapeHtml="false" value="invoiceItemColumns"/>";
//   // invoiceItemColumns = JSON.parse(invoiceItemColumns);
//   // var transactionsColumns = "<s:property escapeJavaScript="true" escapeHtml="false" value="transactionsColumns"/>";
//   // transactionsColumns = JSON.parse(transactionsColumns);
//   // var branchSettingsProductBarcodeParam = "<s:property escapeJavaScript="true" escapeHtml="false" value="branchSettingsProductBarcodeParam"/>";
//   const paramsCommon = {}
//   paramsCommon.openHeaderTable = function (edit, orderHeaderElements, invoice) {
//     objectId = invoice.id
//     // eslint-disable-next-line no-unused-vars
//     const order = null
//     edit = !fromCopyInvocieBtn ? edit : true
//     $.each(orderHeaderElements, function (key, value) {
//       if (edit) {
//         if (invoice.id == null || fromCopyInvocieBtn) {
//           if ($.inArray(key, ['date', 'sellDate']) !== -1) {
//             value.customDateSetVal(invoice[key])
//           } else if (
//             $.inArray(key, [
//               'invoiceNominal',
//               'notes',
//               'companyRefCurrencyRate',
//               'currencyRate',
//               'driverName',
//               'companyCurrencyRate',
//               'paymentType',
//               'invoiceNumber',
//               'sequenceNumber',
//             ]) !== -1 &&
//             invoice[key] != null
//           ) {
//             //              console.log("invoice key: " + invoice[key].disable);
//             if (invoice[key].disable != null && !invoice[key].disable)
//               value.attr('disabled', 'disabled')
//             value.val(invoice[key].text)
//           } else if (
//             $.inArray(key, ['supplierRefCurSymbol', 'currencySymbol']) !== -1 &&
//             invoice[key] != null
//           ) {
//             console.log('hayyy')
//           } else if (
//             $.inArray(key, [
//               'invoiceNominal',
//               'invoiceNumber',
//               'sequenceNumber',
//             ]) !== -1 &&
//             invoice[key] != null
//           ) {
//             value.val(invoice[key])
//             if (invoice[key].disable != null && !invoice[key].disable)
//               value.attr('disabled', 'disabled')
//           }
//         } else if (
//           $.inArray(key, [
//             'branch',
//             'companyGroup',
//             'department',
//             'warehouse',
//             'currency',
//             'orderProductionType',
//             'calcType',
//             'paymentType',
//             'order',
//           ]) !== -1 &&
//           invoice[key] != null
//         ) {
//           value.attr('dval', invoice[key].id)
//           value.attr('dtext', invoice[key].text)
//           if (invoice[key].disable != null && invoice[key].disable)
//             value.attr('disabled', 'disabled')

//           if (key === 'branch')
//             orderHeaderElements.department.data({
//               dparam:
//                 "'branchCompanyId':" +
//                 invoice.branch.id +
//                 ", 'realCountParam': true",
//               val: null,
//             })
//           if (key === 'companyGroup')
//             orderHeaderElements.branch.data({
//               dparam: "'companyGroupId':" + invoice.companyGroup.id,
//               val: null,
//             })
//           if (key === 'department')
//             orderHeaderElements.warehouse.data({
//               dparam: "'departmentId':" + invoice.department.id,
//               val: null,
//             })
//         }
//         $(key).html(value)
//       } else if (
//         $.inArray(key, [
//           'companyCurrencyRate',
//           'companyRefCurrencyRate',
//           'currencyRate',
//           'driverName',
//           'invoiceNominal',
//           'notes',
//           'currency',
//           'calcType',
//           'paymentType',
//           'order',
//           'invoiceNumber',
//           'sequenceNumber',
//         ]) !== -1
//       ) {
//         if (key === 'currency' && invoice[key] != null) {
//           const dval = invoice[key].id
//           const dtext = invoice[key].text
//           const currency = $(
//             '<div required list dname=currencyId dwidth="230"></div>'
//           )
//           currency.html(
//             '<select name="currencyId" class="currencyId" style="display: none;"></select>' +
//               '<input type="text" class="custom_widget_list" required="required" title="' +
//               dtext +
//               '" value="' +
//               dtext +
//               '">' +
//               '<i class="icon-chevron-down icon_list custom_down_click"></i>'
//           )
//           currency.data('durl', 'findAllCurrency')
//           currency.data('val', dval)
//           $(key).html(currency)
//           currencyOnchange()
//         } else if (key === 'paymentType' && invoice[key] != null) {
//           //              console.log("paymentType is OK");
//           const dval = invoice[key].id
//           const dtext = invoice[key].text
//           const paymentType = $(
//             '<div required list dname=paymentTypeId dwidth="230"></div>'
//           )
//           paymentType.html(
//             '<select name="paymentTypeId" class="paymentTypeId" style="display: none;"></select>' +
//               '<input type="text" class="custom_widget_list" required="required" title="' +
//               dtext +
//               '" value="' +
//               dtext +
//               '">' +
//               '<i class="icon-chevron-down icon_list custom_down_click"></i>'
//           )
//           paymentType.data('durl', 'findAllInvoicePaymentType')
//           paymentType.data('val', dval)
//           $(key).html(paymentType)
//         } else if (key === 'calcType' && invoice[key] != null) {
//           const dval = invoice[key].id
//           const dtext = invoice[key].text
//           const calcType = $(
//             '<div required list dname=calcTypeId dwidth="230"></div>'
//           )
//           calcType.html(
//             '<select name="calcTypeId" class="calcTypeId" style="display: none;"></select>' +
//               '<input type="text" class="custom_widget_list" required="required" title="' +
//               dtext +
//               '" value="' +
//               dtext +
//               '">' +
//               '<i class="icon-chevron-down icon_list custom_down_click"></i>'
//           )
//           calcType.data('durl', 'findAllInvoiceCalcType')
//           calcType.data('val', dval)
//           $(key).html(calcType)
//         } else if (key === 'order' && invoice[key] != null) {
//           const dval = invoice[key].id
//           const dtext = invoice[key].text
//           const order = $('<div required list dname=order dwidth="230"></div>')
//           order.html(
//             '<select name="order" class="order" style="display: none;"></select>' +
//               '<input type="text" class="custom_widget_list" required="required" title="' +
//               dtext +
//               '" value="' +
//               dtext +
//               '">' +
//               '<i class="icon-chevron-down icon_list custom_down_click"></i>'
//           )
//           order.data('durl', 'findAllContracts')
//           order.data('val', dval)
//           $(key).html(order)
//         } else {
//           value.val(invoice[key])
//           $(key).html(value)
//         }
//       } else {
//         $('.logistics').append(modalBtn)

//         // var text = ($.inArray(key, ['warehouse', 'orderProductionType']) != -1) ? invoice[key].text : invoice[key];
//         const text =
//           invoice[key] != null && invoice[key].text != null
//             ? invoice[key].text
//             : invoice[key]
//         $(key).html(text)
//       }
//     })
//     loaderIconAnimateRemove()
//     // orderHeaderElements.companyCurrencyRate.floatNumber()
//     // orderHeaderElements.companyRefCurrencyRate.floatNumber()
//     // orderHeaderElements.currencyRate.floatNumber()
//     // orderHeaderElements.invoiceNominal.floatNumber()
//     // orderHeaderElements.notes.text()
//     // orderHeaderElements.invoiceNumber.text()
//     // orderHeaderElements.sequenceNumber.text()
//   }
//   paramsCommon.openHeaderTable(
//     objectId == null,
//     orderHeaderElements,
//     invoice,
//     uCustomOrderTable
//   )

//   //    let modalBtn =  $('<button>').addClass('btn btn-primary').attr('name', 'logistics').attr('id', 'logisticsBtnId').text('Logistika');

//   if (objectId != null) {
//     $('.acceptTr').remove()
//     $('.logistics').append(modalBtn) // test

//     paramsCommon.edit = false
//     if (fromCopyInvocieBtn) {
//       paramsCommon.edit = true
//       invoice.id = null
//       fromCopyInvocieBtn = false
//       objectId = null
//     }
//     paramsCommon.uCustomOrderTable = uCustomOrderTable
//     paramsCommon.invoiceItemColumns = invoiceItemColumns
//     paramsCommon.invoice = invoice
//     paramsCommon.orderHeaderElements = orderHeaderElements
//     paramsCommon.transactionsColumns = transactionsColumns
//     paramsCommon.prepareCreateEditUrl = 'prepareCreateEditPurchaseInvoice'
//     paramsCommon.prepareUrl = 'preparePurchaseInvoiceNew'
//     paramsCommon.backUrl = 'purchaseinvoice'
//     paramsCommon.tabName = 'invoiceItemTable'
//     paramsCommon.canPay = payInvoiceAccess
//     paramsCommon.branchInvoiceConfirmStatus = branchInvoiceConfirmStatus
//     paramsCommon.canConfirmInvoiceForMakeBill = confirmInvoiceForMakeBillAccess
//     paramsCommon.canMakeBill = makeBillInvoiceAccess
//     paramsCommon.invoiceHeaderAccess = invoiceHeaderAccess
//     paramsCommon.printPreviewAccess = printPreviewAccess
//     paramsCommon.branchSettingsProductBarcodeParam =
//       branchSettingsProductBarcodeParam
//     paramsCommon.changeInvoiceCompanyAccess = changeInvoiceCompanyAccess
//     paramsCommon.invoicePaymentLimit = invoicePaymentLimit
//     openItemTable(paramsCommon)
//   } else {
//     //      modalBtn.detach();
//   }

//   $('div [dname]').customLookUp()
//   function currencyOnchange() {
//     $('select[name=currencyId]')
//       .off('change')
//       .on('change', function (event) {
//         const currencyId = $(this).data().val
//         if (currencyId == null) {
//           $('currencySymbol').html(null)
//           orderHeaderElements.currencyRate.val(null)
//           return
//         }
//         const result = getCurrencyRate('PURCHASE', currencyId, null, null)
//         $('currencySymbol').html(result.name)
//         orderHeaderElements.currencyRate.val(result.value)
//       })
//   }
//   currencyOnchange()
//   $('select[name=companyId]')
//     .off('change')
//     .on('change', function (event) {
//       const companyId = $(this).data().val
//       $('supplierCurSymbol').html(null)
//       orderHeaderElements.companyCurrencyRate.val(null)
//       const currency = $('[dname=currencyId]')
//       if (companyId != null) {
//         const result = getCurrencyRate('PURCHASE', null, companyId, null)
//         $('supplierCurSymbol').html(result.name)
//         orderHeaderElements.companyCurrencyRate.val(result.value)

//         $('currencySymbol').html(result.name)
//         currency.data('val', result.id)
//         orderHeaderElements.currencyRate.val(result.value)
//         currency.children('input').val(result.currency)
//       } else {
//         $('currencySymbol').html('')
//         currency.data('val', null)
//         orderHeaderElements.currencyRate.val(null)
//         currency.children('input').val(null)
//       }
//     })

//   $('select[name=branchId]')
//     .off('change')
//     .on('change', function (event) {
//       const companyId = $(this).data().val
//       $('[dname=departmentId]').data({
//         dparam: "'branchCompanyId':" + companyId + ", 'realCountParam': true",
//         val: null,
//       })
//       $('[dname=departmentId]').children('input').val(null)
//       $('[dname=warehouseId]').data({
//         dparam: "'branchCompanyId':" + companyId + '',
//         val: null,
//       })
//       $('[dname=warehouseId]').children('input').val(null)
//       $('supplierRefCurSymbol').html(null)
//       orderHeaderElements.companyRefCurrencyRate.val(null)
//       if (companyId != null) {
//         const result = getCurrencyRate('PURCHASE', null, companyId, null)
//         $('supplierRefCurSymbol').html(result.name)
//         orderHeaderElements.companyRefCurrencyRate.val(result.value)
//       }
//     })

//   $('select[name=departmentId]')
//     .off('change')
//     .on('change', function (event) {
//       const departmentId = $(this).data().val
//       $('[dname=warehouseId]').data({
//         dparam: "'departmentId':" + departmentId + '',
//         val: null,
//       })
//       $('[dname=warehouseId]').children('input').val(null)
//     })

//   $('select[name=companyGroupId]')
//     .off('change')
//     .on('change', function (event) {
//       const companyGroupId = $(this).data().val
//       $('[dname=branchId]').data({
//         dparam: "'branchcompany':true, 'companyGroupId':" + companyGroupId + '',
//         val: null,
//       })
//       $('[dname=branchId]').children('input').val(null)
//       $('[dname=departmentId]').data({
//         dparam:
//           "'companyGroupId':" + companyGroupId + ", 'realCountParam': true",
//         val: null,
//       })
//       $('[dname=departmentId]').children('input').val(null)
//       $('[dname=warehouseId]').data({
//         dparam: "'companyGroupId':" + companyGroupId + '',
//         val: null,
//       })
//       $('[dname=warehouseId]').children('input').val(null)
//     })

//   $('button[name="copyInvoiceBtn"]')
//     .off('click')
//     .on('click', function (event) {
//       if (objectId != null)
//         confirmDialog('<s:text name="getText(areYouSure)"/>', function () {
//           const form = $(
//             "<form method='POST' target='_blank' style='display: none;' action='preparePurchaseInvoiceNew.htm'/>"
//           )
//           const id = $("<input name ='id' type='hidden'>").val(objectId)
//           const copyInvoiceBtn = $(
//             "<input name ='fromCopyInvocieBtn' value='true' type='hidden'>"
//           )
//           form.append(id)
//           form.append(copyInvoiceBtn)
//           $('body').append(form)
//           form.submit()
//           form.remove()
//         })
//     })
//   $('button[name="changeToOnWay"]')
//     .off('click')
//     .on('click', function (event) {
//       if (objectId != null)
//         confirmDialog('<s:text name="getText(areYouSure)"/>', function () {
//           const data = '{' + '"invoice":{' + '"id":' + objectId + '}}'

//           loaderIconAnimate()

//           $.ajax({
//             url: 'changeOnWayInvoiceUrl.htm',
//             type: 'POST',
//             cache: false,
//             data,
//             contentType: 'application/json; charset=utf-8',
//             dataType: 'json',

//             traditional: true,
//             success: function (invoiceJson) {
//               if (invoiceJson === 'sessionExpired') {
//                 notificationMessage(
//                   'WARNING!!!',
//                   "Can't change Company. Your session expired."
//                 )
//                 return
//               } else if (invoiceJson == null) {
//                 notificationMessage('You Can not change Company.')
//                 return
//               }
//               openObjectUcustomTable(
//                 this,
//                 objectId,
//                 'preparePurchaseInvoiceNew'
//               )
//               notificationMessage('<s:text name="getText(successMsg)"/>.')
//             },
//           })
//         })
//     })

//   //        CREATING NEW MODAL
//   let optionVal
//   const optionValArr = []
//   let newArr
//   const modalContainer = $(
//     '<div class="modal-container" style="height: 100vh; width: 100%; opacity: 1; position: fixed; top: 0; left: 0; z-index: 222; display: block; padding: 100px;">'
//   )
//   const modalBox = $(
//     '<div class="modal-box modal-dialog" id="modal-box" style="max-width: 100%; overflow-x: auto; max-height: 100%; overflow-y: auto; box-sizing: border-box; display: block">'
//   )

//   const contentBox = $(
//     '<div class="content-box" id="content-box" style="max-width: 42%; max-height: 85%">'
//   )
//   contentBox.draggable()

//   const modalTable = $(
//     '<table class="modal-table-1" id="modal-table" style="background: #ffffff;  border: 1px solid black; z-index: 999;">'
//   )
//   let sortedOptionValArr
//   //    let volumeOption = [];

//   //      NEW MODAL
//   const tableRow1 = $('<tr class="table-row-1 style="height:90px">')
//   const tableRow3 = $('<tr class="table-row-3">')
//   const currencyInput =
//     '<input type="number" id="currency-converter" placeholder="USD Currency">'
//   const currencyCell = $(
//     '<td id="currency-cell" class="currency-cell" style="background-color: #ffffff; z-index: 999; display: flex">'
//   )
//   let addRow1 = false
//   let initialRow1 = false
//   let addRow2 = false
//   let addTable = false
//   // eslint-disable-next-line no-unused-vars
//   const addModal = false
//   const volumeArr = []
//   let tableHeadersAdded = false
//   let addInitialState = false
//   let result

//   function newModalTable(jsonData, arr) {
//     responseData = jsonData.result
//     if (arr == null) {
//       initialProducts = false
//       responseData.forEach(function (item) {
//         const uniqueProductsArr = item.InvoiceCustomsItems
//         uniqueProductsArr.forEach(function (elem) {
//           productOwnId.push(elem.id)
//         })
//       })
//     }
//     const dataArr = arr

//     const modalButton = $(
//       '<button class="btn btn-primary modal-save-button" id="data-btn" style="margin: 0 5px; display:none;" onclick="sendData()">'
//     ).html('<s:text name="getText(allSave)"/>')
//     const editButton = $(
//       '<button class="btn btn-primary modal-edit-button" id="edit-btn" style="margin: 0 5px; display: none;">'
//     ).html('<s:text name="getText(edit)"/>')
//     if (!addRow1) {
//       // && arr != null
//       const th1 = $('<th>')
//         .addClass('table-cell')
//         .html(
//           '<s:text name="getText(invoiceNumber)"/> <s:text name="getText(recipient)"/>'
//         )
//       const th2 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(productCategory)"/>')
//       const th3 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(productName)"/>')
//       const th4 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(quantity)"/>')
//       const th5 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(unitprice)"/>')
//       const th6 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(total)"/>')

//       const optionsAcceptButton = $(
//         '<button class="btn btn-primary" id="rest-table-add">'
//       ).text('OK')
//       const th = $('<th class="table-cell options-block" style="width: 50px">')
//       th.append(optionsAcceptButton)

//       if (!initialRow1) {
//         tableRow1.append(th1)
//         tableRow1.append(th2)
//         tableRow1.append(th3)
//         tableRow1.append(th4)
//         tableRow1.append(th5)
//         tableRow1.append(th6)
//         if (arr) {
//           tableRow1.append(th)
//         }
//         modalTable.append(tableRow1)
//         initialRow1 = true
//       }

//       if (arr) {
//         optionsAcceptButton.on('click', function () {
//           contentBox.css({
//             'max-width': '85%',
//           })
//           const inputVal = document.querySelectorAll('.option-input')

//           inputVal.forEach(function (item) {
//             const value = item.value

//             optionValArr.push(parseInt(value))
//             //            console.log(value)
//             const options = document.querySelectorAll('.dropdown')
//             options.forEach(function (el) {
//               el.style = 'border: 1px solid grey; width: 50px'
//               el.setAttribute('disabled', true)
//             })
//           })

//           sortedOptionValArr = optionValArr.sort(function (a, b) {
//             return a - b
//           })

//           addTableBodyNew(sortedOptionValArr)
//           addTableHeadersAndBodies(sortedOptionValArr)
//           addSeparatedTablePart(sortedOptionValArr)
//           optionsAcceptButton.off('click').prop('disabled', true)
//         })
//       }
//       addRow1 = true
//     }

//     //    start rendering response
//     let groupIdVal
//     const totalValsArr = []
//     const totalVolumeArr = []
//     let uniqueProductsArr
//     let totalRowsCount = 0
//     if (!arr) {
//       contentBox.css('max-width', '85%')
//       result = jsonData.result
//       //      let groupIdArr = []
//       for (let i = 0; i < result.length; i++) {
//         groupIdArr.push(result[i].groupId)
//         uniqueProductIdArr.push(result[i].id)
//       }

//       const th7 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(customs)"/> (UZS)')
//       const th8 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(customs)"/> (USD)')
//       const th9 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(transport)"/>')
//       const th10 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(expenses)"/>')
//       const th11 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(transportationService)"/>')
//       const th12 = $('<th>')
//         .addClass('table-cell')
//         .html("<s:text name='getText(transfer)'/>")
//       const th15 = $('<th>')
//         .addClass('table-cell')
//         .html(
//           '<s:text name="getText(costPrice)"/> <s:text name="getText(total)"/>'
//         )
//       const th17 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(productVolume)"/>')
//       const th18 = $('<th>')
//         .addClass('table-cell')
//         .html(
//           '<s:text name="getText(productVolume)"/> <s:text name="getText(total)"/>'
//         )
//       const th13 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(costPrice)"/> 1')
//       const th14 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(costPrice)"/> 2')
//       const th16 = $('<th>')
//         .addClass('table-cell')
//         .html("<s:text name='getText(additionalPercentage)'/>")
//       const th19 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(wholesalePrice)"/>')
//       const th20 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(retailPrice)"/>')

//       if (!tableHeadersAdded) {
//         tableRow1.append(th7)
//         tableRow1.append(th8)
//         tableRow1.append(th9)
//         tableRow1.append(th10)
//         tableRow1.append(th11)
//         tableRow1.append(th12)
//         tableRow1.append(th15)
//         tableRow1.append(th17)
//         tableRow1.append(th18)
//         tableRow1.append(th13)
//         tableRow1.append(th14)
//         tableRow1.append(th16)
//         tableRow1.append(th19)
//         tableRow1.append(th20)
//         modalTable.append(tableRow1)
//         tableHeadersAdded = true
//       }

//       for (let i = 0; i < result.length; i++) {
//         groupIdVal = result[i].groupId
//         const tbodyTotalValues = result[i].jsonValues // total values
//         totalValsArr.push(tbodyTotalValues)
//         const products = result[i].jsonValues.products // elements arr due to volume val
//         for (let j = 0; j < products.length; j++) {
//           const obj = {
//             id: products[j].id,
//             volumeVal: products[j].idValue,
//           }
//           totalVolumeArr.push(obj)
//           // eslint-disable-next-line no-unused-vars
//           const uniqueVolumeId = products[j].id // unique volume value of each element
//           // eslint-disable-next-line no-unused-vars
//           const uniqueVolume = products[j].idValue // unique volume value of each element
//           const uniqueProducts = products[j].uniqueProducts // value object of each element / unique products
//           const optionId = products[j].id
//           uniqueProductsArr = uniqueProducts
//           // eslint-disable-next-line no-unused-vars
//           totalRowsCount += uniqueProducts.length
//           if (!addInitialState) {
//             createInitialTableBody(uniqueProducts, optionId)
//           }
//         }
//       }
//       addInitialState = true

//       $('.table-row-2').each(function (id, item) {
//         $(item).attr('id', 'table-row-' + id)
//       })

//       if (!addResponseRow) {
//         addTableHeadersAndBodies(result)
//         addResponseRow = true
//       }

//       if (!addNewTableBody) {
//         addTableBodyNew(groupIdArr)
//         const uniqueValueArr = []
//         for (let i = 0; i < result.length; i++) {
//           const resultElem = result[i].jsonValues.products
//           for (let j = 0; j < resultElem.length; j++) {
//             const element = resultElem[j].uniqueProducts
//             element.forEach(function (item) {
//               uniqueValueArr.push(item)
//             })
//           }
//         }

//         $('.table-row-2').each(function (index, element) {
//           const item = $(element)
//           const td13 = $('<td>')
//             .addClass('table-cell cost-price-1')
//             .html(
//               '<label id="costPrice-1-' + index + '" val-1-id="costPriceOne">'
//             ) // text="'+uniqueValueArr[index]['costPriceOne']+'">');
//           const td14 = $('<td>')
//             .addClass('table-cell cost-price-2')
//             .html(
//               '<label id="costPrice-2-' + index + '" val-2-id="costPriceTwo">'
//             ) // text="'+uniqueValueArr[index]['costPriceTwo']+'">');
//           const td16 = $('<td>')
//             .addClass('table-cell bonus-price')
//             .html(
//               '<label id="bonusPercent-' + index + '" percent-val="percentVal">'
//             ) // text="'+uniqueValueArr[index]['additionalPercent']+'">');
//           const td19 = $('<td>')
//             .addClass('table-cell wholesale-price')
//             .html(
//               '<input type="number" placeholder="Wholesale price" id="wholesalePrice-' +
//                 index +
//                 '" wholesale-price="wholesale-price">'
//             ) // value="'+uniqueValueArr[index]['wholesalePrice']+'">');
//           const td20 = $('<td>')
//             .addClass('table-cell retail-price')
//             .html(
//               '<input type="number" placeholder="Retail price" id="retailPrice-' +
//                 index +
//                 '" retail-price="retail-price">'
//             ) // value="'+uniqueValueArr[index]['retailPrice']+'">');

//           td13.find('label').text(uniqueValueArr[index].costPriceOne)
//           td14.find('label').text(uniqueValueArr[index].costPriceTwo)
//           td16.find('label').text(uniqueValueArr[index].additionalPercent)
//           td19.find('input').val(uniqueValueArr[index].wholesalePrice)
//           td20.find('input').val(uniqueValueArr[index].retailPrice)

//           item.append(td13)
//           item.append(td14)
//           item.append(td16)
//           item.append(td19)
//           item.append(td20)
//         })
//       }
//       addNewTableBody = true
//     }
//     //    end rendering response
//     function createInitialTableBody(arr, optionId) {
//       for (let i = 0; i < arr.length; i++) {
//         const tableRow = $('<tr class="table-row-2">') // .attr('id', 'table-row-' + i);
//         if (dataArr) {
//           tableRow.attr('id', 'table-row-' + i)
//         }

//         let barcode // = arr[i].barcodeId;
//         let itemId // = arr[i].id;

//         if (!dataArr) {
//           itemId = arr[i].invoiceId
//           barcode = arr[i].barcodeId
//         } else {
//           barcode = arr[i].barcodeId
//           itemId = arr[i].id
//         }
//         //        let barcode = arr[i].barcodeId;
//         //        let itemId = arr[i].id;

//         const td1 = $('<td>')
//           .addClass('table-cell invoice-number')
//           .html(
//             '<label id="invoice-number-' +
//               i +
//               '" invoice-number="invoice-number">' +
//               jsonData.warehouseName +
//               '</label>'
//           )
//         const barcodeInput = $(
//           '<input type="hidden" id="barcode-' +
//             i +
//             '" barcode-input="barcode-input" class="barcode-input" value="' +
//             barcode +
//             '">'
//         )
//         const idInput = $(
//           '<input type="hidden" id="id-' +
//             i +
//             '" id-input="id-input" class="id-input" value="' +
//             itemId +
//             '">'
//         )
//         td1.append(barcodeInput)
//         td1.append(idInput)
//         const td2 = $('<td>')
//           .addClass('table-cell product-category')
//           .html(
//             '<label id="product-category-' +
//               i +
//               '" product-category="product-category">Product category</label>'
//           )
//         const td3 = $('<td>')
//           .addClass('table-cell product-name')
//           .html(
//             '<label id="product-name-' +
//               i +
//               '" product-name="product-name">' +
//               arr[i].itemName +
//               '</label>'
//           )
//         const td4 = $('<td>')
//           .addClass('table-cell sum')
//           .html(
//             '<label data-sum="sum-' +
//               i +
//               '" id="sum-' +
//               i +
//               '" cost-price="chosen-price">' +
//               Math.trunc(arr[i].qty != null ? arr[i].qty : 0)
//                 .toLocaleString('en-US')
//                 .replace(/,/g, ' ') +
//               '</label>'
//           )
//         const td5 = $('<td>')
//           .addClass('table-cell unit-price')
//           .html(
//             '<label id="unit-price-' +
//               i +
//               '" unit-price="unit-price">' +
//               Math.trunc(arr[i].unitPrice != null ? arr[i].unitPrice : 0)
//                 .toLocaleString('en-US')
//                 .replace(/,/g, ' ') +
//               '</label>'
//           )
//         const totalCount =
//           arr[i].unitPrice != null ? arr[i].unitPrice * arr[i].qty : 0
//         //      totalCount.toLocaleString('en-US').replace(/,/g, ' ')
//         const td6 = $('<td>')
//           .addClass('table-cell sum-amount')
//           .html(
//             '<label id="sum-amount-' +
//               i +
//               '" sum-amount="sum-amount" class="logistic-input">' +
//               totalCount.toLocaleString('en-US').replace(/,/g, ' ') +
//               '<label>'
//           )

//         if (!dataArr) {
//           for (let i = 0; i < uniqueProductsArr.length; i++) {
//             td1.find('label').text(uniqueProductsArr[i].invoiceId)
//             //            td2.text(totalValsArr[i]['customsUzs'])
//             td3.find('label').text(uniqueProductsArr[i].productName)
//             td4.find('label').text(uniqueProductsArr[i].qty)
//             td5.find('label').text(uniqueProductsArr[i].unitCost)
//             const totalCount =
//               uniqueProductsArr[i].unitCost != null
//                 ? +uniqueProductsArr[i].unitCost * +uniqueProductsArr[i].qty
//                 : 0
//             td6
//               .find('label')
//               .text(totalCount.toLocaleString('en-US').replace(/,/g, ' '))
//           }
//         }

//         const uzsCustomInput = $(
//           '<input type="hidden" id="custom-uzs-input-' +
//             i +
//             '" uzs-input="uzs-input" class="custom-uzs-input">'
//         )
//         const usdCustomInput = $(
//           '<input type="hidden" id="custom-usd-input-' +
//             i +
//             '" usd-input="usd-input" class="custom-usd-input">'
//         )
//         const transportValue = $(
//           '<input type="hidden" id="transport-value-' +
//             i +
//             '" transport-value="transport-value" class="transport-value">'
//         )
//         const expensesValue = $(
//           '<input type="hidden" id="expense-value-' +
//             i +
//             '" expense-value="expense-value" class="expense-value">'
//         )
//         const transportationValue = $(
//           '<input type="hidden" id="transportation-value-' +
//             i +
//             '" transportation-value="transportation-value" class="transportation-value">'
//         )
//         const transferValue = $(
//           '<input type="hidden" id="transfer-value-' +
//             i +
//             '" transfer-value="transfer-value" class="transfer-value">'
//         )
//         const costPriceTotal = $(
//           '<input type="hidden" id="price-total-value-' +
//             i +
//             '" price-total-value="price-total-value" class="price-total-value">'
//         )
//         const productVolValue = $(
//           '<input type="hidden" id="product-vol-value-' +
//             i +
//             '" product-vol-value="product-vol-value" class="product-vol-value">'
//         )
//         const productVolTotalValue = $(
//           '<input type="hidden" id="product-vol-total-value-' +
//             i +
//             '" product-vol-total-value="product-vol-total-value" class="product-vol-total-value">'
//         )

//         td6.append(uzsCustomInput)
//         td6.append(usdCustomInput)
//         td6.append(transportValue)
//         td6.append(expensesValue)
//         td6.append(transportationValue)
//         td6.append(transferValue)
//         td6.append(costPriceTotal)
//         td6.append(productVolValue)
//         td6.append(productVolTotalValue)

//         tableRow.append(td1)
//         tableRow.append(td2)
//         tableRow.append(td3)
//         tableRow.append(td4)
//         tableRow.append(td5)
//         tableRow.append(td6)
//         if (dataArr) {
//           const td = $(
//             '<td class="table-cell" id="options-block" style="width: 50px; height: 50px">'
//           )
//           const dropdownMenu = $(
//             '<select class="dropdown" aria-labelledby="dropdownMenuLink" style="width: 50px">'
//           ).attr('id', 'selector-' + i)

//           const defaultOption = $('<option>').text(i + 1)

//           const optionInput = $(
//             '<input type="hidden" id="optionInput" class="option-input">'
//           ).attr('value', i + 1)

//           tableRow.attr('initial-id', i + 1)
//           td.append(optionInput)
//           dropdownMenu.append(defaultOption)

//           for (let j = 0; j <= i; j++) {
//             const option = $('<option>').text(j + 1)
//             dropdownMenu.append(option)
//           }

//           dropdownMenu.on('change', function () {
//             const selectedOption = $(this).find('option:selected')
//             optionVal = selectedOption.text()
//             optionInput.val(optionVal)
//             td.parent().attr('initial-id', optionVal)
//           })

//           td.append(dropdownMenu)

//           tableRow.append(td)
//         } else {
//           tableRow.attr('initial-id', groupIdVal)
//           tableRow.attr('volume-option', optionId)
//         }

//         if (!addRow2) {
//           modalTable.append(tableRow)
//         }
//       }
//     }
//     if (arr && arr.length > 0) {
//       createInitialTableBody(arr)
//       addRow2 = true
//     }

//     function addTableHeadersAndBodies(newArr) {
//       const th7 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(customs)"/> (UZS)')
//       const th8 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(customs)"/> (USD)')
//       const th9 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(transport)"/>')
//       const th10 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(expenses)"/>')
//       const th11 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(transportationService)"/>')
//       const th12 = $('<th>')
//         .addClass('table-cell')
//         .html("<s:text name='getText(transfer)'/>")
//       const th15 = $('<th>')
//         .addClass('table-cell')
//         .html(
//           '<s:text name="getText(costPrice)"/> <s:text name="getText(total)"/>'
//         )

//       const th18 = $('<th>')
//         .addClass('table-cell')
//         .html(
//           '<s:text name="getText(productVolume)"/> <s:text name="getText(total)"/>'
//         )
//       if (!tableHeadersAdded && arr) {
//         tableRow1.append(th7)
//         tableRow1.append(th8)
//         tableRow1.append(th9)
//         tableRow1.append(th10)
//         tableRow1.append(th11)
//         tableRow1.append(th12)
//         tableRow1.append(th15)

//         const volumeAcceptButton = $(
//           '<button class="btn btn-primary" id="volume-change-btn">'
//         ).text('OK')
//         const th = $(
//           '<th class="table-cell options-block" id="volume-button" style="width: 50px">'
//         )
//         th.append(volumeAcceptButton)
//         tableRow1.append(th)

//         tableRow1.append(th18)
//         tableHeadersAdded = true
//       }

//       const groupedObj = {}
//       let groupedArr
//       if (!arr) {
//         groupedArr = newArr
//       } else {
//         for (let i = newArr.length - 1; i >= 0; i--) {
//           const num = newArr[i].toString()
//           if (groupedObj[num]) {
//             groupedObj[num]++
//           } else {
//             groupedObj[num] = 1
//           }
//         }
//         groupedArr = Object.entries(groupedObj)
//       }

//       const mainArr = []
//       for (let i = 0, j = 0; i < groupedArr.length; i++, j++) {
//         let rowId
//         let rowNumber
//         if (!arr) {
//           rowNumber = 0
//           const products = groupedArr[i].jsonValues.products
//           for (let k = 0; k < products.length; k++) {
//             for (let l = 0; l < products[k].uniqueProducts.length; l++) {
//               rowNumber++
//             }
//           }
//         }

//         if (!arr) {
//           rowId = groupedArr[i].groupId
//         } else {
//           rowId = +groupedArr[i][0]
//           rowNumber = groupedArr[i][1]
//         }

//         const rowArr = []

//         const td7 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell customs-uzs')
//           .html(
//             '<input type="number" placeholder="Customs (UZS)" id="customs-uzs-input-' +
//               rowId +
//               '" uzs-id="uzs-id" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )
//         const td8 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell customs-usd')
//           .html(
//             '<label id="customs-usd-input-' +
//               rowId +
//               '" usd-id="usd-id" class="logistic-input">'
//           )
//         const td9 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell transport')
//           .html(
//             '<input type="number" placeholder="Transport" id="transport-' +
//               rowId +
//               '" class="logistic-input" transport-id="transport-id" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )
//         const td10 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell expenses')
//           .html(
//             '<input type="number" placeholder="Expenses" id="expenses-' +
//               rowId +
//               '" expense-id="expense-id" class="logistic-input" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )
//         const td11 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell transportation-service')
//           .html(
//             '<input type="number" placeholder="Transportation service" transportation-id="transportation-id" id="transportation-service' +
//               rowId +
//               '" class="logistic-input" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )
//         const td12 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell transfer')
//           .html(
//             '<input type="number" placeholder="Transfer" id="transfer-' +
//               rowId +
//               '" class="logistic-input" transfer-id="transfer-id" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )
//         const td15 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell total-cost-price')
//           .html(
//             '<label id="totalCostPrice-' +
//               rowId +
//               '" total-price="total-price" onkeyup="totalChange(' +
//               rowId +
//               ')">'
//           )
//         //        let td17 = $('<td rowspan="'+rowNumber+'">').addClass('table-cell product-volume').html('<input type="number" placeholder="Product volume" product-vol="product-vol" id="productVolume-'+rowId+'" onchange="countVal('+rowId+')">');
//         const td18 = $('<td rowspan="' + rowNumber + '">')
//           .addClass('table-cell product-volume-total')
//           .html(
//             '<label product-vol-total="product-vol-total" id="totalProductVolume-' +
//               rowId +
//               '" onkeyup="countVal(' +
//               rowId +
//               ')">'
//           )

//         const tdVol = $(
//           '<td class="table-cell" id="volume-options-' +
//             rowId +
//             '" vol-cell="vol-cell" style="width:50px; height:50px">'
//         )

//         const dropdownMenu = $(
//           '<select class="dropdown volume-dropdown" aria-labelledby="dropdownMenuLink" vol-dropdown="vol-dropdown" style="width: 50px">'
//         )
//         const defaultOption = $('<option>').text(1)
//         const optionInput = $(
//           '<input type="hidden" default-option="default-option" class="volume-input">'
//         ).attr('value', defaultOption.text())
//         dropdownMenu.append(defaultOption)
//         for (let j = 0; j < rowNumber; j++) {
//           const option = $('<option>').text(j + 1)
//           dropdownMenu.append(option)
//         }
//         tdVol.append(dropdownMenu)
//         tdVol.append(optionInput)

//         if (!dataArr) {
//           td7.find('input').val(totalValsArr[i].customsUzs)
//           td8.find('label').text(totalValsArr[i].customsUsd)
//           td9.find('input').val(totalValsArr[i].transport)
//           td10.find('input').val(totalValsArr[i].expense)
//           td11.find('input').val(totalValsArr[i].transportation)
//           td12.find('input').val(totalValsArr[i].transfer)
//           td15.find('label').text(totalValsArr[i].totalPrice)
//           td18.find('label').text(totalValsArr[i].totalProductVolume)
//         }

//         $('[initial-id="' + rowId + '"]:first').append(td7)
//         $('[initial-id="' + rowId + '"]:first').append(td8)
//         $('[initial-id="' + rowId + '"]:first').append(td9)
//         $('[initial-id="' + rowId + '"]:first').append(td10)
//         $('[initial-id="' + rowId + '"]:first').append(td11)
//         $('[initial-id="' + rowId + '"]:first').append(td12)
//         $('[initial-id="' + rowId + '"]:first').append(td15)

//         if (dataArr) {
//           $('[initial-id="' + rowId + '"]').append(tdVol)
//           $('[initial-id="' + rowId + '"]:first')
//             .find('[vol-dropdown="vol-dropdown"]')
//             .attr('disabled', 'disabled')
//         } else {
//           const productsArr = groupedArr[i].jsonValues.products

//           for (let i = 0; i < productsArr.length; i++) {
//             const volumeId = productsArr[i].id
//             const volumeVal = productsArr[i].idValue
//             const volumeRow = productsArr[i].uniqueProducts.length
//             const similarVolRows = $('[initial-id="' + rowId + '"]')
//             let isFirstMatch = true

//             for (let j = 0; j < similarVolRows.length; j++) {
//               if (
//                 $(similarVolRows[j]).attr('volume-option') === volumeId &&
//                 isFirstMatch
//               ) {
//                 const td17 = $('<td rowspan="' + volumeRow + '">')
//                   .addClass('table-cell product-volume')
//                   .html(
//                     '<input type="number"  placeholder="Product volume" onkeyup="countTotalVolume(' +
//                       volumeId +
//                       ')" product-vol="product-vol" id="productVolume-' +
//                       volumeId +
//                       '">'
//                   )
//                   .val(volumeVal)

//                 for (let k = 0; k < totalVolumeArr.length; k++) {
//                   if (
//                     $(similarVolRows[j]).attr('volume-option') ===
//                     totalVolumeArr[k].id
//                   ) {
//                     td17.find('input').val(totalVolumeArr[k].volumeVal)
//                   }
//                 }
//                 $(similarVolRows[j]).eq(0).append($(td17))
//                 isFirstMatch = false // Set isFirstMatch to false after the first match
//               }
//             }
//           }
//         }

//         $('[initial-id="' + rowId + '"]:first').append(td18)

//         //        additional
//         const chosenVolumeCells = $('[initial-id="' + rowId + '"]').find(
//           '[vol-cell="vol-cell"]'
//         )
//         for (let i = 0; i < chosenVolumeCells.length; i++) {
//           rowArr.push(chosenVolumeCells[i])
//         }
//         mainArr.push(rowArr)
//       }

//       const volumeDropdown = $('[vol-dropdown="vol-dropdown"]')
//       const volumeInput = $('[default-option="default-option"]')

//       for (let i = 0; i < volumeDropdown.length; i++) {
//         volumeDropdown[i].setAttribute('id', 'volume-selector-' + i)
//         volumeDropdown[i].setAttribute('vol-selector', 'option')
//         volumeInput[i].setAttribute('id', 'volume-option-' + i)
//         volumeInput[i].parentNode.parentNode.setAttribute(
//           'volume-option',
//           volumeInput[i].value
//         )

//         volumeDropdown[i].addEventListener('change', function () {
//           const selectedValue = $(this).val()
//           volumeInput[i].value = selectedValue
//           volumeInput[i].parentNode.parentNode.setAttribute(
//             'volume-option',
//             selectedValue
//           )
//           volumeInput[i].setAttribute('input-default-val', selectedValue)
//         })
//       }

//       //      ONCHANGE BUTTON PART
//       $(document).on('click', '#volume-change-btn', function () {
//         const th17 = $('<th>')
//           .addClass('table-cell')
//           .html('<s:text name="getText(productVolume)"/>')
//         $('#volume-button').after(th17)

//         const tbody = $('.table-body-sorted')
//         for (let i = 0; i < tbody.length; i++) {
//           // eslint-disable-next-line no-unused-vars
//           const arr = volumeArr[i]
//           const tbodyElement = tbody[i].querySelectorAll('.table-row-2')
//           const rowsArray = Array.from(tbodyElement)
//           rowsArray.sort(function (a, b) {
//             const attrA = parseInt(a.getAttribute('volume-option'))
//             const attrB = parseInt(b.getAttribute('volume-option'))
//             return attrA - attrB
//           })
//           for (let k = 0; k < rowsArray.length; k++) {
//             tbody[i].appendChild(rowsArray[k])
//           }
//         }

//         for (let i = 0; i < groupedArr.length; i++) {
//           const rowId = +groupedArr[i][0]
//           //          let rowNumber = groupedArr[i][1];

//           const volArr = []
//           const values = $('[initial-id="' + rowId + '"]').find(
//             '[default-option="default-option"]'
//           )

//           for (let i = 0; i < values.length; i++) {
//             volArr.push(values[i].value)
//           }
//           volArr.sort()
//           volumeArr.push(volArr)

//           const groupedObj = {}
//           for (let i = volArr.length - 1; i >= 0; i--) {
//             const num = volArr[i].toString()
//             if (groupedObj[num]) {
//               groupedObj[num]++
//             } else {
//               groupedObj[num] = 1
//             }
//           }
//           const gropedOptions = Object.entries(groupedObj)

//           for (let i = 0; i < gropedOptions.length; i++) {
//             const option = gropedOptions[i][0]
//             const optionRow = gropedOptions[i][1]

//             const td17 = $('<td rowspan="' + optionRow + '">')
//               .addClass('table-cell product-volume')
//               .html(
//                 '<input type="number"  placeholder="Product volume" onkeyup="countTotalVolume(' +
//                   option +
//                   ')" product-vol="product-vol" id="productVolume-' +
//                   option +
//                   '">'
//               )

//             const volumeCell = $('#table-body-' + rowId).find(
//               $('.volume-input[value="' + option + '"]')
//             )
//             volumeCell.eq(0).parent().after(td17)
//           }
//         }

//         $('#volume-change-btn').off('click').prop('disabled', true)
//         $('.volume-dropdown').each(function () {
//           $(this).prop('disabled', true)
//         })

//         const inputs = $('#content-box').find('input[type="number"]')
//         inputs.each(function (id, item) {
//           $(item).on('keyup', function () {
//             // Convert inputs object to an array
//             const inputsArray = inputs.get()

//             // Check if all inputs have a value
//             const allInputsHaveValue = inputsArray.every(function (input) {
//               return input.value.trim() !== ''
//             })

//             if (allInputsHaveValue) {
//               console.log('All inputs have a value')
//               $('#data-btn').css('display', 'block')
//             }
//           })
//         })
//       })
//     }

//     if (!dataArr) {
//       const inputs = $('#content-box').find('input[type="number"]')
//       inputs.each(function (id, item) {
//         $(item).on('keyup', function () {
//           // Convert inputs object to an array
//           const inputsArray = inputs.get()

//           // Check if all inputs have a value
//           const allInputsHaveValue = inputsArray.every(function (input) {
//             return input.value.trim() !== ''
//           })

//           if (allInputsHaveValue) {
//             console.log('All inputs have a value')
//             $('#data-btn').css('display', 'block')
//           }
//         })
//       })
//     }

//     function addSeparatedTablePart(sortedArr) {
//       const th13 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(costPrice)"/> 1')
//       const th14 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(costPrice)"/> 2')
//       const th16 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name=getText(additionalPercentage)/>')
//       const th19 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(wholesalePrice)"/>')
//       const th20 = $('<th>')
//         .addClass('table-cell')
//         .html('<s:text name="getText(retailPrice)"/>')

//       tableRow1.append(th13)
//       tableRow1.append(th14)
//       tableRow1.append(th16)
//       tableRow1.append(th19)
//       tableRow1.append(th20)

//       for (let i = 0; i < sortedArr.length; i++) {
//         const td13 = $('<td>')
//           .addClass('table-cell cost-price-1')
//           .html('<label id="costPrice-1-' + i + '" val-1-id="costPriceOne">')
//         const td14 = $('<td>')
//           .addClass('table-cell cost-price-2')
//           .html('<label id="costPrice-2-' + i + '" val-2-id="costPriceTwo">')
//         const td16 = $('<td>')
//           .addClass('table-cell bonus-price')
//           .html('<label id="bonusPercent-' + i + '" percent-val="percentVal">')
//         const td19 = $('<td>')
//           .addClass('table-cell wholesale-price')
//           .html(
//             '<input type="number" placeholder="Wholesale price" id="wholesalePrice-' +
//               i +
//               '" wholesale-price="wholesale-price">'
//           )
//         const td20 = $('<td>')
//           .addClass('table-cell retail-price')
//           .html(
//             '<input type="number" placeholder="Retail price" id="retailPrice-' +
//               i +
//               '" retail-price="retail-price">'
//           )

//         $('#table-row-' + i).append(td13)
//         $('#table-row-' + i).append(td14)
//         $('#table-row-' + i).append(td16)
//         $('#table-row-' + i).append(td19)
//         $('#table-row-' + i).append(td20)
//       }
//     }

//     function addTableBodyNew(newArr) {
//       const unique = []
//       newArr.forEach(function (item) {
//         if (!unique.includes(item)) {
//           unique.push(item)
//         }
//       })
//       unique.forEach(function (item) {
//         const tableSortedBody = $(
//           '<tbody class="table-body-sorted" id="table-body-' + item + '">'
//         )
//         const sortedTableRow = $('[initial-id="' + item + '"]')

//         for (let i = 0; i < sortedTableRow.length; i++) {
//           tableSortedBody.append(sortedTableRow[i])
//         }
//         modalTable.append(tableSortedBody)
//       })

//       //      tableRow3
//       const tableFooterBody = $(
//         '<tbody class="table-footer-body" id="table-footer-body">'
//       )
//       let iteratorVal
//       if (dataArr) {
//         iteratorVal = 21
//       } else {
//         iteratorVal = 20
//       }
//       //      let iteratorVal = 21;
//       for (let i = dataArr ? 0 : 1; i < iteratorVal; i++) {
//         const td = $('<td style="height: 55px">').addClass('table-cell')
//         if (i === 0) {
//           td.html('<label>Total</label>')
//         }
//         if (i === 7) {
//           td.html('<label id="customs-total-uzs">')
//         }
//         if (i === 8) {
//           td.html('<label id="customs-total-usd">')
//         }
//         if (i === 9) {
//           td.html('<label id="transport-total">')
//         }
//         if (i === 10) {
//           td.html('<label id="expense-total">')
//         }
//         if (i === 11) {
//           td.html('<label id="transportation-total"></label>')
//         }
//         if (i === 12) {
//           td.html('<label id="transfer-total"></label>')
//         }
//         if (i === 13) {
//           td.html('<label id="costprice-total-sum">')
//         }
//         tableRow3.append(td)
//       }

//       tableFooterBody.append(tableRow3)

//       modalTable.append(tableFooterBody)
//       currencyCell.append(modalButton)
//       currencyCell.append(editButton)
//       currencyCell.append(currencyInput)
//     }
//     if (!dataArr) {
//       const input = currencyCell.find('input')
//       input.on('keyup', function (e) {
//         const uzsVals = document.querySelectorAll('[uzs-id="uzs-id"]')
//         const usdVals = document.querySelectorAll('[usd-id="usd-id"]')
//         uzsVals.forEach(function (item, id) {
//           if (e.target.value) {
//             const result = +item.value / +e.target.value
//             usdVals[id].textContent = parseFloat(result).toFixed(2)
//           } else {
//             usdVals[id].textContent = 0
//           }
//         })
//       })
//     }
//   }

//   if (!addTable) {
//     modalBox.append(modalTable)
//     contentBox.append(modalBox)
//     contentBox.append(currencyCell)
//     modalContainer.append(contentBox)

//     addTable = true
//   }

//   modalBtn.off('click').on('click', function (event) {
//     createLogisticModal()
//   })

//   function createLogisticModal() {
//     const logData = {
//       id: objectId,
//     }
//     const uniqueData = {
//       id: objectId,
//       statusType: true,
//     }

//     const firstFormData = new FormData()
//     const secondFormData = new FormData()

//     for (const key in logData) {
//       firstFormData.append(key, logData[key])
//     }
//     for (const key in uniqueData) {
//       secondFormData.append(key, uniqueData[key])
//     }
//     let firstResponse
//     let secondResponse

//     fetch('preparePurchaseInvoiceNewJson.htm?id=' + objectId, {
//       method: 'POST',
//       body: firstFormData,
//     })
//       .then(function (response) {
//         return response.json()
//       })
//       .then(function (data) {
//         firstResponse = JSON.parse(data)
//       })

//     fetch('preparePurchaseInvoiceNewJson.htm?id=' + objectId, {
//       method: 'POST',
//       body: secondFormData,
//     })
//       .then(function (response) {
//         return response.json()
//       })
//       .then(function (data) {
//         secondResponse = JSON.parse(data)
//       })
//     setTimeout(function () {
//       if (secondResponse != null && secondResponse) {
//         newModalTable(secondResponse, null)
//       } else {
//         newArr = firstResponse.invoiceItems
//         newModalTable(firstResponse, newArr)
//       }
//     }, 500)

//     if ($('body').has(modalContainer).length === 0) {
//       $('body').append(modalContainer)
//     }
//   }

//   modalContainer.on('click', function (e) {
//     const targetEl = e.target

//     //      content-box
//     if (
//       targetEl.classList.contains('modal-container') ||
//       targetEl.classList.contains('content-box')
//     ) {
//       modalContainer.detach()
//     }
//   })
// })

// function countTotalVolume() {
//   $('.table-body-sorted').each(function (index, elem) {
//     const totalVolume = elem.querySelector(
//       '[product-vol-total="product-vol-total"]'
//     )
//     const productVol = elem.querySelectorAll('[product-vol="product-vol"]')
//     let count = 0
//     for (let i = 0; i < productVol.length; i++) {
//       count += +productVol[i].value
//     }
//     totalVolume.textContent = count.toLocaleString('en-US').replace(/,/g, ' ')
//   })
// }

// function countVal(rowId) {
//   const newArray = []
//   const costPriceFirstArr = []
//   const costPriceSecondArr = []
//   const bonusPercent = []
//   const unitPrice = []
//   const sumAmount = []

//   const id = rowId - 1
//   const inputs = document.querySelectorAll('[initial-id="' + rowId + '"]')
//   const allInputs = []
//   inputs.forEach(function (item) {
//     const inputVal = item.querySelectorAll('.logistic-input')
//     inputVal.forEach(function (val) {
//       allInputs.push(val)
//     })
//   })

//   let sum = 0
//   allInputs.forEach(function (item) {
//     const itemValue = item.value
//       ? item.value.replace(/\s/g, '')
//       : item.textContent.replace(/\s/g, '')
//     sum += Number(itemValue)
//   })
//   document.querySelector('#totalCostPrice-' + rowId).textContent = parseFloat(
//     sum
//   )
//     .toFixed(2)
//     .toLocaleString('en-US', { useGrouping: true })
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

//   const selectedRow = document.querySelectorAll('[initial-id="' + rowId + '"]')
//   selectedRow.forEach(function (item) {
//     newArray.push(
//       item
//         .querySelector('[cost-price="chosen-price"]')
//         .textContent.replace(/\s/g, '')
//     )
//     costPriceFirstArr.push(item.querySelector('[val-1-id="costPriceOne"]'))
//     bonusPercent.push(item.querySelector('[percent-val="percentVal"]'))
//     unitPrice.push(
//       item
//         .querySelector('[unit-price="unit-price"]')
//         .textContent.replace(/\s/g, '')
//     )
//     sumAmount.push(
//       item
//         .querySelector('[sum-amount="sum-amount"]')
//         .textContent.replace(/\s/g, '')
//     )
//     costPriceSecondArr.push(item.querySelector('[val-2-id="costPriceTwo"]'))

//     item.querySelector('input[uzs-input="uzs-input"]').value =
//       selectedRow[0].querySelector('[uzs-id="uzs-id"]').value
//     item.querySelector('input[usd-input="usd-input"]').value =
//       selectedRow[0].querySelector('[usd-id="usd-id"]').textContent
//     item.querySelector('input[transport-value="transport-value"]').value =
//       selectedRow[0].querySelector('[transport-id="transport-id"]').value

//     item.querySelector('input[expense-value="expense-value"]').value =
//       selectedRow[0].querySelector('[expense-id="expense-id"]').value
//     item.querySelector(
//       'input[transportation-value="transportation-value"]'
//     ).value = selectedRow[0].querySelector(
//       '[transportation-id="transportation-id"]'
//     ).value
//     item.querySelector('input[transfer-value="transfer-value"]').value =
//       selectedRow[0].querySelector('[transfer-id="transfer-id"]').value
//     item.querySelector('input[price-total-value="price-total-value"]').value =
//       selectedRow[0].querySelector('[total-price="total-price"]').textContent
//     //      item.querySelector('input[product-vol-value="product-vol-value"]').value = selectedRow[0].querySelector('[product-vol="product-vol"]').value;
//     item.querySelector(
//       'input[product-vol-total-value="product-vol-total-value"]'
//     ).value = selectedRow[0].querySelector(
//       '[product-vol-total="product-vol-total"]'
//     ).value
//   })

//   let customUzsSum = 0
//   const customUzs = document.querySelectorAll('[uzs-id="uzs-id"]')
//   customUzs.forEach(function (item) {
//     if (item.value && item.value > 0) {
//       customUzsSum += +item.value
//     }
//   })
//   document.querySelector('#customs-total-uzs').textContent = parseInt(
//     parseFloat(customUzsSum).toFixed(2)
//   )
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   let transportSum = 0
//   const transportVal = document.querySelectorAll(
//     '[transport-id="transport-id"]'
//   )
//   transportVal.forEach(function (item) {
//     if (item.value && item.value > 0) {
//       transportSum += +item.value
//     }
//   })
//   document.querySelector('#transport-total').textContent = parseInt(
//     parseFloat(transportSum).toFixed(2)
//   )
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   let transferSum = 0
//   const transfer = document.querySelectorAll('[transfer-id="transfer-id"]')
//   transfer.forEach(function (item) {
//     if (item.value && item.value > 0) {
//       transferSum += +item.value
//     }
//   })
//   document.querySelector('#transfer-total').textContent = parseInt(
//     parseFloat(transferSum).toFixed(2)
//   )
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   //    total costprice
//   let totalCostprice = 0
//   const totalPrice = document.querySelectorAll('[total-price="total-price"]')
//   totalPrice.forEach(function (item) {
//     const itemValue = item.textContent
//       ? parseFloat(item.textContent.replace(/\s/g, ''))
//       : 0
//     totalCostprice += Number(itemValue)
//   })
//   document.querySelector('#costprice-total-sum').textContent = totalCostprice
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   //    transport-total
//   let transportationTotal = 0
//   const transportationVal = document.querySelectorAll(
//     '[transportation-id="transportation-id"]'
//   )
//   transportationVal.forEach(function (item) {
//     const itemValue = item.value ? item.value : 0
//     transportationTotal += Number(itemValue)
//   })
//   document.querySelector('#transportation-total').textContent = parseInt(
//     parseFloat(transportationTotal).toFixed(2)
//   )
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   //    expense-total
//   let totalExpenses = 0
//   const expenseVal = document.querySelectorAll('[expense-id="expense-id"]')
//   expenseVal.forEach(function (item) {
//     const itemValue = item.value ? item.value : 0
//     totalExpenses += Number(itemValue)
//   })
//   document.querySelector('#expense-total').textContent = parseInt(
//     parseFloat(totalExpenses).toFixed(2)
//   )
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ')

//   for (let i = 0; i < newArray.length; i++) {
//     const totalPrice = +$('#totalCostPrice-' + rowId)
//       .text()
//       .replace(/\s/g, '')
//     if (totalPrice && totalPrice > 0) {
//       const costPriceFirst =
//         +$('#totalCostPrice-' + rowId)
//           .text()
//           .replace(/\s/g, '') / +newArray[i].replace(/\s/g, '')
//       costPriceFirstArr[i].textContent = parseFloat(costPriceFirst)
//         .toFixed(2)
//         .toLocaleString('en-US', { useGrouping: true })
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//     } else {
//       costPriceFirstArr[i].textContent = 0
//     }
//   }

//   for (let i = 0; i < costPriceSecondArr.length; i++) {
//     if (sumAmount[i] > 0) {
//       const sum = sumAmount.reduce((acc, current) => +acc + +current)
//       const secondPrice = parseFloat(
//         +document
//           .querySelector('#totalCostPrice-' + rowId)
//           .textContent.replace(/\s/g, '')
//       )
//       costPriceSecondArr[i].textContent = parseFloat(
//         secondPrice / (sum * sumAmount[i])
//       )
//         .toFixed(4)
//         .toLocaleString('en-US', { useGrouping: true })
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//     } else {
//       costPriceSecondArr[i].textContent = 0
//     }
//   }

//   for (let i = 0; i < bonusPercent.length; i++) {
//     const firstCostPrice = +costPriceFirstArr[i].textContent.replace(/\s/g, '')
//     if (unitPrice[i] !== 0 && firstCostPrice && firstCostPrice > 0) {
//       const bonusPercentCost =
//         (firstCostPrice / +unitPrice[i].replace(/\s/g, '')) * 100
//       bonusPercent[i].textContent = parseFloat(bonusPercentCost)
//         .toFixed(2)
//         .toLocaleString('en-US', { useGrouping: true })
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//     } else {
//       bonusPercent[i].textContent = 0
//     }
//   }

//   if ($('#currency-converter').val()) {
//     const currency = $('#currency-converter').val()
//     const result = +$('#customs-uzs-input-' + rowId).val() / +currency
//     document.querySelector('#customs-usd-input-' + rowId).textContent =
//       parseFloat(result).toFixed(2)

//     let customUsdSum = 0
//     const customUsd = document.querySelectorAll('[usd-id="usd-id"]')
//     customUsd.forEach(function (item) {
//       if (item.textContent && item.textContent > 0) {
//         customUsdSum += +item.textContent
//       }
//     })
//     $('#customs-total-usd').text(
//       parseFloat(customUsdSum)
//         .toFixed(2)
//         .toLocaleString('en-US', { useGrouping: true })
//         .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//     )

//     let sum = 0
//     allInputs.forEach(function (item) {
//       const itemValue = item.value
//         ? item.value.replace(/\s/g, '')
//         : item.textContent.replace(/\s/g, '')
//       sum += Number(itemValue)
//     })
//     //      document.querySelector('#totalCostPrice-' + rowId).textContent = parseFloat(sum).toFixed(2);  //INITIAL CODE
//     document.querySelector('#totalCostPrice-' + rowId).textContent = parseFloat(
//       sum
//     )
//       .toFixed(2)
//       .toLocaleString('en-US', { useGrouping: true })
//       .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//   } else {
//     document.querySelector('#customs-usd-input-' + rowId).textContent = 0
//     $('#currency-converter').on('keyup', function () {
//       const currency = $('#currency-converter').val()
//       const result = +$('#customs-uzs-input-' + rowId).val() / +currency
//       document.querySelector('#customs-usd-input-' + rowId).textContent =
//         parseFloat(result).toFixed(2)

//       let customUsdSum = 0
//       const customUsd = document.querySelectorAll('[usd-id="usd-id"]')
//       customUsd.forEach(function (item) {
//         if (item.textContent && item.textContent > 0) {
//           customUsdSum += +item.textContent
//         }
//       })
//       $('#customs-total-usd').text(
//         parseFloat(customUsdSum)
//           .toFixed(2)
//           .toLocaleString('en-US', { useGrouping: true })
//           .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
//       )

//       if (currency < 1) {
//         $('#customs-usd-input-' + rowId).text('')
//         $('#customs-total-usd').text('')
//       }

//       let sum = 0
//       allInputs.forEach(function (item) {
//         const itemValue = item.value
//           ? item.value.replace(/\s/g, '')
//           : item.textContent.replace(/\s/g, '')
//         sum += Number(itemValue)
//       })
//       document.querySelector('#totalCostPrice-' + rowId).textContent =
//         parseFloat(sum)
//           .toFixed(2)
//           .toLocaleString('en-US')
//           .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

//       const selectedRow = document.querySelectorAll(
//         '[initial-id="' + rowId + '"]'
//       )
//       selectedRow.forEach(function (item) {
//         item.querySelector('input[usd-input="usd-input"]').textContent =
//           selectedRow[0].querySelector('[usd-id="usd-id"]').textContent
//         item.querySelector(
//           'input[price-total-value="price-total-value"]'
//         ).value = selectedRow[0].querySelector(
//           '[total-price="total-price"]'
//         ).textContent
//       })

//       //    total costprice
//       let totalCostprice = 0
//       const totalPrice = document.querySelectorAll(
//         '[total-price="total-price"]'
//       )
//       totalPrice.forEach(function (item) {
//         const itemValue = item.textContent
//           ? parseFloat(item.textContent.replace(/\s/g, ''))
//           : 0
//         totalCostprice += Number(itemValue)
//       })
//       document.querySelector('#costprice-total-sum').textContent =
//         totalCostprice.toLocaleString('en-US').replace(/,/g, ' ')
//     })
//   }
// }

// function sendData() {
//   dataSaved = true
//   const inputs = $('#modal-table').find('input[type="number"]')
//   inputs.attr('disabled', 'disabled')

//   const tableBodyArr = $('.table-body-sorted')

//   const dataArr = []
//   for (let i = 0; i < tableBodyArr.length; i++) {
//     const barCodeArr = []
//     tableBodyArr[i]
//       .querySelectorAll('[barcode-input="barcode-input"]')
//       .forEach(function (item) {
//         barCodeArr.push(item.value)
//       })

//     const products = []
//     let optionVal = []
//     let options // = tableBodyArr[i].querySelectorAll('.volume-input');
//     if (!initialProducts) {
//       const tableRows = tableBodyArr[i].querySelectorAll('tr')
//       const groupIdArr = []
//       for (let i = 0; i < tableRows.length; i++) {
//         groupIdArr.push(tableRows[i].getAttribute('volume-option'))
//       }
//       optionVal = groupIdArr
//     } else {
//       options = tableBodyArr[i].querySelectorAll('.volume-input')
//       options.forEach(function (elem) {
//         optionVal.push(elem.value)
//       })
//     }

//     const uniqueArr = optionVal.reduce(function (acc, val) {
//       if (!acc.includes(val)) {
//         acc.push(val)
//       }
//       return acc
//     }, [])

//     for (let k = 0; k < uniqueArr.length; k++) {
//       const uniqueRows = tableBodyArr[i].querySelectorAll(
//         '[volume-option="' + uniqueArr[k] + '"]'
//       ) // array with chosen rows
//       const productsArr = []
//       uniqueRows.forEach(function (item) {
//         const productObj = {
//           invoiceId: item.querySelector('[id-input="id-input"]').value,
//           barcodeId: item.querySelector('[barcode-input="barcode-input"]')
//             .value, // barcode-input="barcode-input"
//           costPriceOne: item.querySelector('[val-1-id="costPriceOne"]')
//             .textContent,
//           costPriceTwo: item.querySelector('[val-2-id="costPriceTwo"]')
//             .textContent,
//           additionalPercent: item.querySelector('[percent-val="percentVal"]')
//             .textContent,
//           wholesalePrice: item.querySelector(
//             '[wholesale-price="wholesale-price"]'
//           ).value,
//           retailPrice: item.querySelector('[retail-price="retail-price"]')
//             .value,

//           customer: item.querySelector('[invoice-number="invoice-number"]')
//             .textContent,
//           productName: item.querySelector('[product-name="product-name"]')
//             .textContent,
//           qty: item.querySelector('[cost-price="chosen-price"]').textContent,
//           unitCost: item.querySelector('[unit-price="unit-price"]').textContent,
//           totalCost: item.querySelector('[sum-amount="sum-amount"]')
//             .textContent,
//         }
//         productsArr.push(productObj)
//       })
//       const groupObj = {
//         id: uniqueArr[k],
//         idValue: tableBodyArr[i].querySelector('#productVolume-' + uniqueArr[k])
//           ? tableBodyArr[i].querySelector('#productVolume-' + uniqueArr[k])
//               .value
//           : '',
//         uniqueProducts: productsArr, // IMPORTANT
//       }
//       products.push(groupObj)
//     }

//     let jsonData = {
//       customsUzs: tableBodyArr[i].querySelector('[uzs-id="uzs-id"]').value,
//       customsUsd:
//         tableBodyArr[i].querySelector('[usd-id="usd-id"]').textContent,
//       transport: tableBodyArr[i].querySelector('[transport-id="transport-id"]')
//         .value,
//       expense: tableBodyArr[i].querySelector('[expense-id="expense-id"]').value,
//       transportation: tableBodyArr[i].querySelector(
//         '[transportation-id="transportation-id"]'
//       ).value,
//       transfer: tableBodyArr[i].querySelector('[transfer-id="transfer-id"]')
//         .value,
//       totalPrice: tableBodyArr[i].querySelector('[total-price="total-price"]')
//         .textContent,
//       totalProductVolume: tableBodyArr[i].querySelector(
//         '[product-vol-total="product-vol-total"]'
//       ).textContent,
//       products,
//       //        barCodeArr: barCodeArr
//     }

//     const tableRows = tableBodyArr[i].querySelectorAll('.table-row-2')
//     const dataArray = []
//     for (let i = 0; i < tableRows.length; i++) {
//       if (productOwnId.length > 0) {
//         productId = productOwnId[i]
//       } else {
//         productId = null
//       }
//       const obj = {
//         itemId: {
//           id: tableRows[i].querySelector('[id-input="id-input"]').value
//             ? +tableRows[i].querySelector('[id-input="id-input"]').value
//             : 0,
//         },
//         wholesalePrice: tableRows[i].querySelector(
//           '[wholesale-price="wholesale-price"]'
//         ).value
//           ? +tableRows[i].querySelector('[wholesale-price="wholesale-price"]')
//               .value
//           : 0,
//         retailPrice: tableRows[i].querySelector('[retail-price="retail-price"]')
//           .value
//           ? +tableRows[i].querySelector('[retail-price="retail-price"]').value
//           : 0,
//         costPrice: tableRows[i].querySelector('[val-1-id="costPriceOne"]')
//           .textContent
//           ? +tableRows[i].querySelector('[val-1-id="costPriceOne"]').textContent
//           : 0,
//         id: productId,
//       }
//       dataArray.push(obj)
//     }
//     jsonData = JSON.stringify(jsonData)
//     let customsId
//     if (uniqueProductIdArr.length === 0) {
//       customsId = null
//     } else {
//       customsId = uniqueProductIdArr[i]
//     }
//     const backData = {
//       groupId: tableBodyArr[i].querySelector('#optionInput')
//         ? tableBodyArr[i].querySelector('#optionInput').value
//         : groupIdArr[i],
//       id: customsId,
//       invoiceCustomsItems: dataArray,
//       jsonValues: jsonData,
//     }
//     dataArr.push(backData)
//   }
//   const data = { result: dataArr }
//   const postData = JSON.stringify(data)
//   l2(data, 'data')

//   $.ajax({
//     url: 'createInvoiceCostums.htm',
//     type: 'POST',
//     cache: false,
//     dataType: 'json',
//     data: postData,
//     async: true,
//     contentType: 'application/json; charset=utf-8',
//     success: function (response) {},
//     error: function (_error) {},
//   })

//   if (addResponseRow === false && addNewTableBody === false) {
//     addResponseRow = true
//     addNewTableBody = true
//   }

//   $('#currency-converter').attr('disabled', 'disabled')
//   $('#data-btn').css('display', 'none')
//   $('#edit-btn').css('display', 'block')

//   $('#edit-btn').on('click', function () {
//     $('#edit-btn').css('display', 'none')
//     $('#currency-converter').removeAttr('disabled')
//     inputs.removeAttr('disabled')
//   })
// }
