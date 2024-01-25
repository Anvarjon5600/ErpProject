/* eslint-disable no-unused-vars */
/* eslint-disable no-import-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable dot-notation */
/* eslint-disable no-unneeded-ternary */
// import { $, jQuery } from 'jquery'

import {
  confirmDialog,
  notificationMessage,
  openObjectUcustomTable,
  removeDisabled,
  UBackAjaxLoad,
  getHeaderElementsValues,
  validateHederElement,
  pickerOpts,
} from './customTable'

const $ = require('jquery')
const jQuery = require('jquery')
export function openItemTable(paramsCommon) {
  // let userPermission =s
  //   '<s:property escapeJavaScript="true" escapeHtml="false" value="userPermission"/>'
  // userPermission = JSON.parse(userPermission)
  const edit = paramsCommon.edit

  const uCustomOrderTable = paramsCommon.uCustomOrderTable
  const invoiceItemColumns = paramsCommon.invoiceItemColumns
  let invoice = paramsCommon.invoice
  const orderHeaderElements = paramsCommon.orderHeaderElements
  const transactionsColumns = paramsCommon.transactionsColumns
  const tabName = paramsCommon.tabName
  const canPay = paramsCommon.canPay
  const canMakeBill = paramsCommon.canMakeBill
  const invoiceHeaderAccess = paramsCommon.invoiceHeaderAccess
  const printPreviewAccess = paramsCommon.printPreviewAccess
  const canConfirmInvoiceForMakeBill = paramsCommon.canConfirmInvoiceForMakeBill
  const branchInvoiceConfirmStatus = paramsCommon.branchInvoiceConfirmStatus
  const allCompaniesAccessForReserv = paramsCommon.allCompaniesAccessForReserv
  const lockUnlockInvoice = paramsCommon.lockUnlockInvoice
  let changeInvoiceCompanyAccess = paramsCommon.changeInvoiceCompanyAccess
  const prepareCreateEditUrl = paramsCommon.prepareCreateEditUrl
  const prepareUrl = paramsCommon.prepareUrl
  const backUrl = paramsCommon.backUrl
  const forSalePupop = paramsCommon.forSalePupop
  const openHeaderTableFunction = paramsCommon.openHeaderTable
  const currencyRateVal =
    // invoice.currencyRate === undefined ? 1 : invoice.currencyRate
    (invoice.currencyRate = 1)
  const branchSettingsProductBarcodeParam =
    paramsCommon.branchSettingsProductBarcodeParam
  const invoiceItemsEditable = paramsCommon.invoiceItemsEditable
  const invoicePaymentLimit =
    paramsCommon.invoicePaymentLimit != null
      ? paramsCommon.invoicePaymentLimit
      : false

  // let totalPack = 1;
  paramsCommon.numberFormatScale = '<s:property value="numberFormatScale"/>'

  // paramsCommon.openPopup = <s:property value="openPopup" />
  let objectId = invoice.id === undefined ? null : invoice.id

  const params = {
    saveActionUrl: prepareCreateEditUrl,
    prepareUrl,
    headerTitle: 'invoiceItem',
    tabName,
    parent_div: document.querySelector('.invoiceItemDiv'),
    div_height: 500,
    columns: invoiceItemColumns,
    values: invoice.invoiceItems,
    editable: edit,
    objectListName: null,
    responseJsonObjName: null,
    parentId: objectId,
    forSalePupop,
    currencyRate: currencyRateVal,
    customTableContentFooterShow: true,
    numberFormatScale: paramsCommon.numberFormatScale,
    openPopup: paramsCommon.openPopup,
    saleInvoiceEntryAccess: paramsCommon.saleInvoiceEntryAccess,
    printPreviewAccess: paramsCommon.printPreviewAccess,
    canConfirmInvoiceForMakeBill: paramsCommon.canConfirmInvoiceForMakeBill,
    branchInvoiceConfirmStatus: paramsCommon.branchInvoiceConfirmStatus,
    allCompaniesAccessForReserv: paramsCommon.allCompaniesAccessForReserv,
    lockUnlockInvoice: paramsCommon.lockUnlockInvoice,
    changeInvoiceCompanyAccess: paramsCommon.changeInvoiceCompanyAccess,
    invoiceItemsEditable: paramsCommon.invoiceItemsEditable,
    messages: {
      save: 'save',
      edit: 'allEdit',
      columnSettings: 'columnSettings',
      discard: 'discard',
      invalidFields: 'invalidFields',
    },
  }

  uCustomOrderTable.setItemRowOnChangeEvents = function (tabName, row, value) {
    if (tabName === 'inputToServiceInvoiceItemTable') {
      const selectId = uCustomOrderTable.salesClientCompany.data().val
      row.batchStageDetailService.data('dparam', "'companyId':" + selectId)
      row.batchStageDetailService.attr('dparam', "'companyId':" + selectId)
    } else if (tabName === 'invoiceItemTable' && row.sewModel !== undefined) {
      row.sewModel.data('dparam', "'planningTypeId':4")
    }

    const onChange = function (obj, tabName, referenceParent, referenceChild) {
      const selectId = $(obj).data().val
      const index = $(obj).data().index
      let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
      itemRow = itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
      const item = itemRow[referenceChild]
      item.data('dparam', "\\'" + referenceParent + "\\':" + selectId)
      item.data('val', null)
      item.children('input').val(null)
      item.children('select').find('option:selected').val(null)
      return true
    }
    const cleanSelectedDiv = function ($this, tabName, names) {
      const index = $($this).data().index
      let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
      itemRow = itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
      $.each(names, function (index, name) {
        const obj = itemRow[name]
        obj.data('val', null)
        obj.children('input').val(null)
      })
    }
    $.each(row, function (id, val) {
      if (
        id === 'cashbox' &&
        (tabName === 'paymentDetailsTable' ||
          tabName === 'paymentExtraDetailsTable')
      ) {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            cleanSelectedDiv(this, tabName, ['bankBranchAccount'])
          })
      } else if (
        id === 'bankBranchAccount' &&
        (tabName === 'paymentDetailsTable' ||
          tabName === 'paymentExtraDetailsTable')
      ) {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            cleanSelectedDiv(this, tabName, ['cashbox'])
          })
      } else if (id === 'date' && tabName === 'paymentDetailsTable') {
        val.off('change').on('change', function (e) {
          const obj = $(e.target)
          const thisDate = obj.val()
          const itemRows = uCustomOrderTable.params[tabName].itemRows
          $.each(itemRows, function (id, itemRow) {
            const payDate = itemRow.date
            payDate.val(thisDate)
          })
        })
      } else if (id === 'sewModel' && tabName === 'invoiceItemTable') {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            onChange(this, tabName, 'sewModelId', 'sewModelVariantsSize')

            const index = $(this).data().index
            const selectId = $(this).data().val

            if (selectId != null && selectId > 0) {
              const data = '{"id":' + selectId + '}'
              $.ajax({
                url: 'findSewModelData.htm',
                type: 'POST',
                data,
                cache: false,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (response) {
                  response = response.product

                  const item =
                    uCustomOrderTable.params[tabName].itemRows[index].item
                  item.data('val', response.id)
                  item.children('title').val(response.text)
                  item.children('dtext').val(response.text)
                  item.children('input').val(response.text)
                  item
                    .children('select')
                    .find('option:selected')
                    .val(response.id)
                  const prSelect = item.children('select')
                  prSelect.append(
                    $('<option/>')
                      .attr('value', response.id)
                      .text(response.text)
                  )
                  item.append(prSelect)
                },
                error: function (response) {},
              })
            }
          })
      } else if (
        id === 'sewModelVariantsSize' &&
        tabName === 'invoiceItemTable'
      ) {
        console.log('invoiceItemTable')
      } else if (
        id === 'itemBarcodeSticker' &&
        tabName === 'invoiceItemTable'
      ) {
        val.off('click').on('click', function () {
          const index = $(this).data().index
          const itemId =
            uCustomOrderTable.params[tabName].itemRows[index].id.data().val
          if (itemId == null) return
          const form = $(
            "<form method='POST' target='_blank' style='display: none;' action='purchaseItemSticker.htm'/>"
          )
          const plan = $("<input name ='barcodeId' type='hidden'>").val(itemId)
          form.append(plan)
          $('body').append(form)
          form.submit()
          form.remove()
        })
      } else if (id === 'qualityControl') {
        val.off('click').on('click', function () {
          const index = $(this).data().index
          const itemId =
            uCustomOrderTable.params[tabName].itemRows[index].id.data().val
          const form = $(
            "<form method='POST' target='_blank' action='openControlPage.htm'/>"
          )
          const qualityControlObj = $(
            "<input name ='invoice_item_id' type='hidden'>"
          ).val(itemId)
          form.append(qualityControlObj)
          $('body').append(form)
          form.submit()
          form.remove()
        })
      } else if (id === 'reservedBatchNumber') {
        let msg = 'clickToReservForBatch'
        const obj = $(this)
        if (obj.html().length === 0) {
          val.html(msg)
        }

        val.off('click').on('click', function () {
          if (obj.html() != null && obj.html().length > 0) {
            msg = 'areYouSureToRemoveReserv'
          } else {
            msg = '<areYouSureToReserv'
          }
          const index = obj.data().index
          const itemId =
            uCustomOrderTable.params[tabName].itemRows[index].id.data().val
          if (itemId == null) return
          const data = '{' + '"id":' + itemId + ',' + '"1":' + 1 + '' + '}'

          confirmDialog(msg, function () {
            //  loaderIconAnimate();
            $.ajax({
              url: 'reservBatchNumberToPurchase.htm',
              type: 'POST',
              data,
              cache: false,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (response) {
                const batchNumber =
                  response.batchNumber != null &&
                  response.batchNumber !== 'undefined'
                    ? response.batchNumber
                    : ''
                const msg1 = 'clickToReservForBatch'
                obj.html(
                  batchNumber != null && batchNumber.length > 0
                    ? batchNumber
                    : msg1
                )
                notificationMessage(
                  batchNumber + '     ' + response.errorMessageForUi
                )
              },
              error: function (response) {
                notificationMessage(response)
              },
            })
          })
        })
      } else if (id === 'packaging') {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            console.log('*******************************************')

            const selectId = $(this).data().val
            if (selectId == null) return
            const index = $(this).data().index
            let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
            itemRow =
              itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
            // let item = itemRow['price4'];
            let totalPack = 1
            console.log(selectId)
            const data = '{"id":' + selectId + '}'
            $.ajax({
              url: 'findProductPackaginSum.htm',
              type: 'POST',
              data,
              cache: false,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (totalSumOpPack) {
                totalPack = totalSumOpPack
                itemRow.packagingSum.html(totalSumOpPack)
                console.log('Pack***************************')
                const brutto = itemRow.kgBrutQtyId.data().val
                const netto = itemRow.kgQtyId.data().val
                if (brutto != null && netto != null) {
                  // const bruttoVal = itemRow[brutto].val();
                  const nettoVal = itemRow[netto].val()
                  const packagingSum = itemRow.packagingSum.html()
                  const packs = itemRow.packs.val()
                  //                                if(bruttoVal!=null && packs!= null && packagingSum!= null){
                  //                                    itemRow[netto].val(parseFloat(parseFloat(bruttoVal)-parseFloat( packs*packagingSum)));
                  //                                }
                  if (
                    nettoVal != null &&
                    packs != null &&
                    packagingSum != null &&
                    packagingSum !== ''
                  ) {
                    itemRow[brutto].val(
                      parseFloat(
                        parseFloat(nettoVal) + parseFloat(packs * packagingSum)
                      )
                    )
                  }
                }
              },
              error: function (response) {
                notificationMessage('You Can not get product price4.')
              },
            })
            return true
          })
      } else if (
        id === 'batchStageDetailEntry' &&
        tabName === 'outputToServiceInvoiceItemTable'
      ) {
        val.off('click').on('click', function () {
          const obj = $(this)
          const index = obj.data().index
          const params = uCustomOrderTable.params[tabName]

          const detailId =
            uCustomOrderTable.params[tabName].itemRows[
              index
            ].batchStageDetailService.data().val
          const itemId =
            uCustomOrderTable.params[tabName].itemRows[index].id.data().val
          if (itemId == null) return
          confirmDialog('areYouSure', function () {
            //  loaderIconAnimate();
            const data =
              '{' +
              '"fileName":"entry",' +
              '"id":' +
              detailId +
              ',' +
              '"itemId":' +
              itemId +
              '' +
              '}'
            $.ajax({
              url: 'entryExitStartBatchStageDetailItemUrl.htm',
              type: 'POST',
              data,
              cache: false,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (id) {
                if (id != null) {
                  let msgT = ''
                  if (id === 0) {
                    obj.html(
                      params.values[index].batchStageDetailEntry === 'START'
                        ? 'UNDO_START'
                        : 'START'
                    )
                    params.values[index].batchStageDetailEntry =
                      params.values[index].batchStageDetailEntry === 'START'
                        ? 'UNDO_START'
                        : 'START'
                    params.values[index].status =
                      params.values[index].status === 'START' ? null : 'START'
                    params.values[index].disableRow =
                      !params.values[index].disableRow
                    params.editable = false
                    params.discardButton.css('display', 'none')
                    params.saveBtn.html('allEdit')
                    params.saveBtn.attr('editSave', true)
                    params.discardButton.css('display', 'none')
                    uCustomOrderTable.refreshTable(params)
                  } else if (id === 1) {
                    msgT = 'batchStageDetailItem checkPreviousStageEndStatus'
                    notificationMessage(msgT)
                  } else if (id === 3) {
                    msgT = '<batchStageDetailItem allReadyFinished'
                    notificationMessage(msgT)
                  }
                }
              },
              error: function (response) {
                notificationMessage('You Can not Started Item.')
              },
            })
          })
          // l(itemId)
        })
      } else if (
        id === 'batchStageDetailExit' &&
        tabName === 'inputToServiceInvoiceItemTable'
      ) {
        val.off('click').on('click', function () {
          const obj = $(this)
          const index = obj.data().index
          const params = uCustomOrderTable.params[tabName]

          const detailId =
            uCustomOrderTable.params[tabName].itemRows[
              index
            ].batchStageDetailService.data().val
          const itemId =
            uCustomOrderTable.params[tabName].itemRows[index].id.data().val
          if (itemId == null) return
          confirmDialog('areYouSure', function () {
            //  loaderIconAnimate();
            const data =
              '{' +
              '"fileName":"exit",' +
              '"id":' +
              detailId +
              ',' +
              '"itemId":' +
              itemId +
              '' +
              '}'
            $.ajax({
              url: 'entryExitStartBatchStageDetailItemUrl.htm',
              type: 'POST',
              data,
              cache: false,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (id) {
                let msgT = ''
                if (id === 0) {
                  obj.html(
                    params.values[index].batchStageDetailExit === 'START'
                      ? 'UNDO_START'
                      : 'START'
                  )
                  params.values[index].batchStageDetailExit =
                    params.values[index].batchStageDetailExit === 'START'
                      ? 'UNDO_START'
                      : 'START'
                  params.values[index].status =
                    params.values[index].status === 'START' ? null : 'START'
                  params.values[index].disableRow =
                    !params.values[index].disableRow
                  params.editable = false
                  params.discardButton.css('display', 'none')
                  params.saveBtn.html('allEdit')
                  params.saveBtn.attr('editSave', true)
                  params.discardButton.css('display', 'none')
                  uCustomOrderTable.refreshTable(params)
                } else if (id === 1) {
                  msgT = 'batchStageDetailItem notStarted'
                  notificationMessage(msgT)
                } else if (id === 2) {
                  msgT = 'batchStageDetailItem nextStage allReadyStarted'
                  notificationMessage(msgT)
                }
              },
              error: function (response) {
                notificationMessage('You Can not Started Item.')
              },
            })
          })
          // l(itemId)
        })
      } else if (
        id === 'qty' ||
        id === 'unitPrice' ||
        id === 'discount' ||
        id === 'vat' ||
        id === 'vat_amt' ||
        id === 'discountFixed' ||
        id === 'cashPrice'
      ) {
        val.off('keyup').on('keyup', function (e) {
          // const priceAccess = <s:property value="priceAccess"/>;
          const priceAccess = true
          const index = $(this).data().index
          let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
          itemRow =
            itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
          if (priceAccess) {
            let brutto = null
            let netto = null

            if (itemRow.kgBrutQtyId != null) {
              brutto = itemRow.kgBrutQtyId.data().val
            }
            if (itemRow.kgQtyId != null) {
              netto = itemRow.kgQtyId.data().val
            }

            let quantity = itemRow.qty.val()
            if (netto != null) {
              quantity = itemRow[netto].val()
            }
            //                            const quantity3 = itemRow.qty3.val();
            //                            const gramm = itemRow.gramm.val();
            //                            if (quantity3 == '' && quantity != '' && gramm != '') {
            //                                itemRow.qty3.val(parseFloat(gramm * quantity));
            //                            }
            if (
              itemRow.productionBatchStageDetail != null &&
              invoice.orderProductionType.id === 2
            ) {
              quantity = itemRow.qty2.val()
              if (brutto != null) {
                quantity = itemRow[brutto].val()
              }
            }
            let unitPriceVal = itemRow.unitPrice.val()
            let cashPriceVal = itemRow.cashPrice.val()
            let discountVal = itemRow.discount.val()
            let discountFixedVal = itemRow.discountFixed.val()
            let vat = itemRow.vat.val()
            let vatAmt = itemRow.vatAmount.val()
            if (cashPriceVal.length === 0) cashPriceVal = 0
            if (unitPriceVal.length === 0) unitPriceVal = 0
            if (quantity.length === 0) quantity = 0
            if (discountVal.length === 0) discountVal = 0
            if (discountFixedVal.length === 0) discountFixedVal = 0
            if (vat.length === 0) vat = 0
            if (vatAmt.length === 0) vatAmt = 0

            const discountAmount =
              parseFloat(discountFixedVal * quantity) +
              parseFloat(
                ((unitPriceVal + vatAmt) * quantity * discountVal) / 100
              )
            const ammount =
              (parseFloat(unitPriceVal) + parseFloat(cashPriceVal)) * quantity
            const ammountwvat = unitPriceVal * quantity

            itemRow.ammount.html(ammount - discountAmount)
            itemRow.discountAmount.html(discountAmount)
            if (vat.length !== 0) {
              const vatAmt = (unitPriceVal * quantity * vat) / 100
              const ammount =
                (parseFloat(unitPriceVal) + parseFloat(cashPriceVal)) *
                  quantity +
                parseFloat(vatAmt)
              itemRow.ammount.html(ammount - discountAmount)
              itemRow.vatAmount.html(vatAmt)
              itemRow.ammountwvat.html(ammountwvat)
            }

            let quantityQty = itemRow.qty.val()

            if (quantityQty.length === 0) {
              quantityQty = 0
            }

            const kef = itemRow.qtyOfOne.data().val
            if (kef !== 0 && kef != null && kef !== undefined) {
              itemRow.qty5.val(Math.round((quantityQty / kef) * 100) / 100)
            }
          }

          const brutto = itemRow.kgBrutQtyId.data().val
          const netto = itemRow.kgQtyId.data().val
          if (brutto != null && netto != null) {
            const bruttoVal = itemRow[brutto].val()
            const nettoVal = itemRow[netto].val()

            if (id === 'qty') {
              if (id === netto) {
                const packs = itemRow.packs.val()
                const packagingSum = itemRow.packagingSum.html()
                if (
                  nettoVal != null &&
                  packs != null &&
                  packagingSum != null &&
                  packagingSum !== ''
                ) {
                  itemRow[brutto].val(
                    parseFloat(
                      parseFloat(nettoVal) + parseFloat(packs * packagingSum)
                    )
                  )
                }
              }
              if (id === brutto) {
                const packs = itemRow.packs.val()
                const packagingSum = itemRow.packagingSum.html()

                if (
                  bruttoVal != null &&
                  packs != null &&
                  packagingSum != null &&
                  packagingSum !== ''
                ) {
                  itemRow[netto].val(
                    parseFloat(
                      parseFloat(bruttoVal) - parseFloat(packs * packagingSum)
                    )
                  )
                }
              }
            }
          }
        })
      } else if (id === 'packs') {
        val.off('keyup').on('keyup', function (e) {
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.params[tabName].itemRows[index]

          const brutto = itemRow.kgBrutQtyId.data().val
          const netto = itemRow.kgQtyId.data().val
          if (brutto != null && netto != null) {
            //  const bruttoVal = itemRow[brutto].val();
            const nettoVal = itemRow[netto].val()
            const packagingSum = itemRow.packagingSum.html()
            const packs = itemRow.packs.val()
            if (
              nettoVal != null &&
              packs != null &&
              packagingSum != null &&
              packagingSum !== ''
            ) {
              itemRow[brutto].val(
                parseFloat(
                  parseFloat(nettoVal) + parseFloat(packs * packagingSum)
                )
              )
            }
          }
        })
      } else if (id === 'qty2' || id === 'qty3' || id === 'qty4') {
        val.off('keyup').on('keyup', function (e) {
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.params[tabName].itemRows[index]
          console.log('qyt2brutto = ' + itemRow.kgBrutQtyId.data().val)
          console.log('qyt2nett0 = ' + itemRow.kgQtyId.data().val)
          const brutto = itemRow.kgBrutQtyId.data().val
          const netto = itemRow.kgQtyId.data().val
          if (brutto != null && netto != null) {
            const bruttoVal = itemRow[brutto].val()
            const nettoVal = itemRow[netto].val()
            const packagingSum = itemRow.packagingSum.html()
            const packs = itemRow.packs.val()

            if (
              id === brutto &&
              bruttoVal != null &&
              packs != null &&
              packagingSum != null &&
              packagingSum !== ''
            ) {
              itemRow[netto].val(parseFloat(bruttoVal - packs * packagingSum))
            } else if (
              id === netto &&
              nettoVal != null &&
              packs != null &&
              packagingSum != null &&
              packagingSum !== ''
            ) {
              itemRow[brutto].val(
                parseFloat(
                  parseFloat(nettoVal) + parseFloat(packs * packagingSum)
                )
              )
            }
          }
        })
      } else if (id === 'qty5' && tabName === 'invoiceItemTable') {
        val.off('keyup').on('keyup', function (e) {
          const index = $(this).data().index
          let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
          itemRow =
            itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
          const quantity5 = itemRow.qty5.val()
          const kef = itemRow.qtyOfOne.data().val
          if (kef !== 0) itemRow.qty.val(quantity5 * kef)
        })
      } else if (id === 'copyItem' && tabName === 'invoiceItemTable') {
        val.off('click').on('click', function () {
          const index = $(this).data().index
          const object = uCustomOrderTable.params[tabName]

          const itemId = object.itemRows[index].id.data().val
          if (itemId == null) return

          // const itemRow2 = object.itemRows[index];
          const addAnRowElement = object.customPopupAddAnRowElement2
          const itemRow = {}
          const dataIndex = ++object.indexU
          const tr = $('<tr/>')
          tr.append(
            '<td style="width:25px!important; white-space: nowrap">' +
              (dataIndex + 1) +
              '</td>'
          )
          $.each(object.columns, function (index, column) {
            let name = column.name
            const type = column.type
            //  const headerText = column.headerText;
            const dwidth = column.dwidth
            const required = column.required
            const resultType = column.resultType
            const durl = column.durl
            const refColName = column.refColName
            const param = column.param
            const showUI = column.showUI
            //  const editableElement = column.editableElement;
            //  const oldElemnt = itemRow2[name];
            let id = null
            let text = null
            if (value != null && value[column.name] != null) {
              if (
                type === 'list' ||
                type === 'file_image' ||
                (type === 'label' && resultType === 'object')
              ) {
                id = value[column.name].id
                text = value[column.name].text
              } else {
                text = value[column.name]
                id = text
              }
            }
            if (typeof pickerOpts === 'undefined') {
              pickerOpts = {
                dateFormat: 'dd/mm/yy',
                onSelect: function (val) {
                  const d = new Date() // for now
                  val =
                    val +
                    ' ' +
                    d.getHours() +
                    ':' +
                    d.getMinutes() +
                    ':' +
                    d.getSeconds()
                  $(this).val(val)
                },
              }
            }
            let element
            if (type === 'hidden' && param != null && param === 'date') {
              element = $('<input type="hidden"/>')
              element.customDateSetVal(text)
            } else if (type === 'hidden') {
              element = $('<input type="hidden"/>').data('val', text)
            } else if (type === 'label') {
              element = $('<label/>')
              element.data({ val: id, text })
              element.html(text)
            } else if (type === 'float') {
              element = $('<input type="text"/>')
              element.floatNumber()
              element.val(text)
            } else if (type === 'integer') {
              element = $('<input type="text"/>')
              element.intNumber()
              element.val(text)
            } else if (type === 'string') {
              element = $('<input type="text"/>')
              element.val(text)
            } else if (type === 'button') {
              let text1, text2
              name = 'openDetails'
                ? ((text1 = column.text), (text2 = column.noText))
                : ((text1 = text), (text2 = '-'))
              text2 = column.noText != null ? column.noText : '-'
              element =
                value != null
                  ? $('<button>' + text1 + '</button>')
                  : $('<label> ' + text2 + '</label>')
              element.addClass(param)
            } else if (type === 'checkbox') {
              element = $('<input type="checkbox" />')
              element.attr('checked', text)
            } else if (type === 'date') {
              element = $('<input type="text"/>').datepicker(pickerOpts)
              element.customDateSetVal(text)
            } else if (type === 'list') {
              element = $('<div/>')
              element.data({ durl, val: id, text: id })
              element.attr('title', text)
              element.attr('durltable', '')
              element.attr('dtext', text)
              element.attr('dwidth', dwidth)
              element.attr('ddisabled', param)
              const select = $('<select/>')
              element.append(select)
              select.data('index', dataIndex)
              select.data('cname', tabName + '_' + name)
              const refVal =
                value != null && refColName != null && value[refColName] != null
                  ? value[refColName].id
                  : null
              if (refVal != null) {
                element.data('dparam', "\\'" + refColName + "Id\\':" + refVal)
              }
              select.css('display', 'none')
              const input = $('<input type="text" class="custom_widget_list"/>')
              input.attr('required', required)
              input.css('width', dwidth - 25)
              input.val(text)
              element.append(input)
              element.append('<i class="icon-chevron-down custom_down_click"/>')
            } else if (type === 'file_image') {
              if (text == null) {
                text = 'img/no_image.gif'
              }
              element = $('<img src="' + text + '"/>')
              element.css('height', 70)
              element.data({ val: id, text: id })
            }
            element.css('width', dwidth)
            element.attr('required', required)
            element.attr('cname', tabName + '_' + name)
            element.data('cname', tabName + '_' + name)
            element.attr('index', dataIndex)
            element.data('index', dataIndex)
            itemRow[name] = element
            const td = $('<td/>')

            if (name === 'id') {
              element.html('')
              element.data().val = null
            }
            if (name === 'copyItem') {
              element.html('-')
              element.data().val = null
            }
            if (showUI === true) {
              if (type === 'label' && resultType === 'object') element = text
              td.append(element)
              tr.append(td)
            }
          })
          uCustomOrderTable.setItemRowOnChangeEvents(tabName, itemRow, value)

          tr.append(
            '<td> <a class="remove_item" onclick="deleteRowU(\'' +
              tabName +
              "',this, " +
              dataIndex +
              ')"></a></td>'
          )
          tr.data('tabName', tabName)
          tr.data('rowIndex', dataIndex)
          $(addAnRowElement).parent('td').parent('tr').before(tr)
          const divElem = $(addAnRowElement)
            .parent('td')
            .parent('tr')
            .parent('tbody')
            .parent('table')
            .parent('div.fht-tbody')
          divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)
          object.itemRows[dataIndex] = itemRow
        })
      } else if (id === 'item' && tabName === 'invoiceItemTable') {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            const selectId = $(this).data().val
            if (selectId == null) return
            const index = $(this).data().index
            let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
            itemRow =
              itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
            const item = itemRow['price4']
            const data = '{"itemId":' + selectId + '}'
            $.ajax({
              url: 'findProductPrice4Url.htm',
              type: 'POST',
              data,
              cache: false,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (selectedProduct) {
                itemRow.qtyOfOne.data({ val: selectedProduct.qtyOfOne })
                const quantity5 = itemRow.qty5.val()
                if (selectedProduct.qtyOfOne !== 0)
                  itemRow.qty.val(quantity5 * selectedProduct.qtyOfOne)
                item.val(selectedProduct.price4)

                itemRow.kgQtyId.data({ val: selectedProduct.kgQtyId })
                itemRow.kgBrutQtyId.data({ val: selectedProduct.kgBrutQtyId })
                //
                //
                const brutto = itemRow.kgBrutQtyId.data().val
                const netto = itemRow.kgQtyId.data().val
                if (brutto != null && netto != null) {
                  const bruttoVal = itemRow[brutto].val()
                  const nettoVal = itemRow[netto].val()
                  const packagingSum = itemRow.packagingSum.html()

                  const packs = itemRow.packs.val()
                  if (
                    bruttoVal != null &&
                    packs != null &&
                    packagingSum != null &&
                    packagingSum !== ''
                  ) {
                    itemRow[netto].val(
                      parseFloat(bruttoVal - packs * packagingSum)
                    )
                  }
                  if (
                    nettoVal != null &&
                    packs != null &&
                    packagingSum != null &&
                    packagingSum !== ''
                  ) {
                    itemRow[brutto].val(
                      parseFloat(
                        parseFloat(nettoVal) + parseFloat(packs * packagingSum)
                      )
                    )
                  }
                }
              },
              error: function (response) {
                notificationMessage('You Can not get product price4.')
              },
            })
            return true
          })
      } else if (id === 'design') {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            onChange(this, tabName, 'designId', 'designVariant')
          })
      } else if (id === 'color') {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            onChange(this, tabName, 'colorId', 'colorVariant')
          })
      } else if (
        id === 'productionOrder' &&
        tabName === 'outpuToPrOrderItemTable'
      ) {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            if (row.kroy) {
              onChange(this, tabName, 'productionOrderId', 'kroy')
            }
            if (row.planning) {
              onChange(this, tabName, 'productionOrderId', 'planning')
            }
          })
      } else if (
        id === 'batchStageDetailService' &&
        (tabName === 'outputToServiceInvoiceItemTable' ||
          tabName === 'inputToServiceInvoiceItemTable')
      ) {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            const selectId = $(this).data().val
            if (selectId == null) return

            const index = $(this).data().index
            let itemRow = uCustomOrderTable.params[tabName].itemRows[index]
            itemRow =
              itemRow != null ? itemRow : uCustomOrderTable.customPopupItemRow
            const item = itemRow.item
            const qty = itemRow.qty
            const qty2 = itemRow.qty2

            const data =
              '{' +
              "'id': " +
              selectId +
              ',' +
              "'tabName': '" +
              tabName +
              "'" +
              '}'
            $.ajax({
              url: 'findBatchStageDetailItem.htm',
              type: 'POST',
              cache: false,
              data,
              contentType: 'application/json; charset=utf-8',
              dataType: 'json',
              success: function (batchDetailItem) {
                if (tabName === 'outputToServiceInvoiceItemTable')
                  qty.html(batchDetailItem.entry_qty)
                else {
                  qty.val(batchDetailItem.entry_qty)
                  qty2.val(batchDetailItem.entry_qty)
                  qty2.data().val = batchDetailItem.entry_qty
                }

                qty.data().val = batchDetailItem.entry_qty
                item.data('val', batchDetailItem.product_id)
                item.children('input').val(batchDetailItem.product_name)
              },
              error: function (jqXHR, exception) {
                notificationMessage('You have error to get batchDetailItem.')
              },
            })
          })
      }
    })
  }

  let totalQtyVal = 0
  uCustomOrderTable.setItemRowOnChangeEventsForSalePopup = function (
    tabName,
    row,
    value
  ) {
    const onChangeForSalePopup = function (
      obj,
      tabName,
      referenceParent,
      referenceChild
    ) {
      const selectId = $(obj).data().val
      const index = $(obj).data().index
      let itemRow = uCustomOrderTable.salePopupItemRows[index]
      if (uCustomOrderTable.salePopupItemRows.length === 0)
        itemRow = uCustomOrderTable.params[tabName].itemRows[index]
      const item = itemRow[referenceChild]
      item.data('dparam', "\\'" + referenceParent + "\\':" + selectId)
      item.data('val', null)
      item.children('input').val(null)
      item.children('select').find('option:selected').val(null)
      return true
    }
    totalQtyVal = 0
    $.each(row, function (id, val) {
      $('.qty_aaa').on('input', function () {
        if ($(this).val()) {
          $('.total-qty-value').val($(this).val())
        } else {
          $('.total-qty-value').val(0)
        }
      })

      if (id === 'realCount') {
        val.on('click', function () {
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.salePopupItemRows[index]
          const qtyObj = itemRow.qty
          if ($(this).text() !== 0) {
            qtyObj.val($(this).text())
            qtyObj.addClass('customBackground')
            $(this).text(0)
          } else {
            $(this).text(qtyObj.val())
            qtyObj.val('')
            qtyObj.removeClass('customBackground')
          }

          totalQtyVal = 0
          $('.totalInput').each(function (index, element) {
            if (element.value === '') {
              totalQtyVal = totalQtyVal + 0
            } else {
              totalQtyVal = totalQtyVal + parseFloat(element.value)
            }
          })
          $('.total-qty-value').each(function (id, el) {
            el.value = parseFloat(totalQtyVal).toFixed(2)
          })
        })
      } else if (id === 'qty') {
        val[0].classList.add('totalInput')
        val.off('keyup').on('keyup', function (e) {
          if (uCustomOrderTable.salePopupItemRows.length === 0) return
          let quantity = $(this).val()
          if (quantity.length === 0) quantity = 0
          quantity = parseFloat(quantity)
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.salePopupItemRows[index]
          if (itemRow == null) return
          const realCountObj = itemRow.realCount
          const realCount = itemRow.realCount.data().val
          if (realCount < quantity) {
            quantity = realCount
            $(this).val(quantity)
            quantity = 0
          } else {
            quantity = realCount - quantity
            $(this).addClass('customBackground')
          }
          if (!$(this).val()) {
            $(this).removeClass('customBackground')
          }
          realCountObj.html(quantity)
          const gramm = itemRow.gramm.val()
          const lastqty = itemRow.qty.val()
          if (lastqty !== '' && gramm !== '') {
            // const realCountQuantity = realCount - quantity;
            itemRow.qty3.val(parseFloat(gramm * lastqty))
          }
          if (itemRow.kgQtyId != null && itemRow.kgBrutQtyId != null) {
            const netto = itemRow.kgQtyId.data().val
            const brutto = itemRow.kgBrutQtyId.data().val
            const packagingSum = itemRow.packagingSum.html()
            const packs = itemRow.packs.val()
            if (id === netto && packagingSum != null && packagingSum !== '') {
              const qty = itemRow[netto].val()
              itemRow[brutto].val(
                parseFloat(parseFloat(qty) + parseFloat(packagingSum * packs))
              )
            }
            if (id === brutto && packagingSum != null && packagingSum !== '') {
              const qty = itemRow[brutto].val()
              itemRow[netto].val(
                parseFloat(parseFloat(qty) - parseFloat(packagingSum * packs))
              )
            }
          }

          if ($(this).val() > 0 && e.which === 13) {
            uCustomOrderTable.acceptSalePopupBtnGlobal.click()
          }
          totalQtyVal = 0
          $('.totalInput').each(function (index, element) {
            if (element.value === '') {
              totalQtyVal = totalQtyVal + 0
            } else {
              totalQtyVal = totalQtyVal + parseFloat(element.value)
            }
          })
          $('.total-qty-value').each(function (id, el) {
            el.value = parseFloat(totalQtyVal).toFixed(2)
          })
        })
      } else if (
        (id === 'unitPrice' || id === 'cashPrice') &&
        tabName === 'saleInvoiceItemTable'
      ) {
        val.off('keyup').on('keyup', function (e) {
          if (uCustomOrderTable.salePopupItemRows.length === 0) return
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.salePopupItemRows[index]
          let unitPrice = itemRow.unitPrice.val()
          if (unitPrice.length === 0) unitPrice = 0
          unitPrice = parseFloat(unitPrice)

          let cashPrice = itemRow.cashPrice.val()
          if (cashPrice.length === 0) cashPrice = 0

          //                    ***************************
          const sizeId = itemRow.sewModelVariantsSize.data().val
          const colorId = itemRow.color.data().val
          const colorVarId = itemRow.colorVariant.data().val
          const designId = itemRow.design.data().val
          const designVarId = itemRow.designVariant.data().val
          const batchNum = itemRow.batch.val()
          const batchYear = itemRow.batchYear.val()
          $.each(uCustomOrderTable.salePopupItemRows, function (id, r) {
            if (
              sizeId === r.sewModelVariantsSize.data().val &&
              colorId === r.color.data().val &&
              colorVarId === r.colorVariant.data().val &&
              designId === r.design.data().val &&
              designVarId === r.designVariant.data().val &&
              batchNum === r.batch.val() &&
              batchYear === r.batchYear.val()
            )
              r.unitPrice.val(unitPrice)
          })
        })
      } else if (
        id === 'productionOrder' &&
        tabName === 'outpuToPrOrderItemTable'
      ) {
        val
          .children('select')
          .off('change')
          .on('change', function () {
            if (row.kroy) {
              onChangeForSalePopup(this, tabName, 'productionOrderId', 'kroy')
            }
            if (row.planning) {
              onChangeForSalePopup(
                this,
                tabName,
                'productionOrderId',
                'planning'
              )
            }
          })
      } else if (id === 'qty2') {
        val.off('keyup').on('keyup', function (e) {
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.salePopupItemRows[index]
          if (itemRow == null) return
          if (itemRow.kgQtyId != null && itemRow.kgBrutQtyId != null) {
            const netto = itemRow.kgQtyId.data().val
            const brutto = itemRow.kgBrutQtyId.data().val
            const packagingSum = itemRow.packagingSum.html()
            const packs = itemRow.packs.val()
            const quantity = $(this).val()
            if (id === netto && packagingSum != null && packagingSum !== '') {
              itemRow[brutto].val(
                parseFloat(
                  parseFloat(quantity) + parseFloat(packagingSum * packs)
                )
              )
            }
            if (id === brutto && packagingSum != null && packagingSum !== '') {
              itemRow[netto].val(
                parseFloat(
                  parseFloat(quantity) - parseFloat(packagingSum * packs)
                )
              )
            }
          }
        })
      } else if (id === 'packs') {
        val.off('keyup').on('keyup', function (e) {
          console.log('packs')
          const index = $(this).data().index
          const itemRow = uCustomOrderTable.salePopupItemRows[index]
          if (itemRow == null) return
          if (itemRow.kgQtyId != null && itemRow.kgBrutQtyId != null) {
            const netto = itemRow.kgQtyId.data().val()
            const brutto = itemRow.kgBrutQtyId.data().val()
            const packagingSum = itemRow.packagingSum.html()
            const packs = $(this).val()
            console.log(
              'brutto = ' +
                brutto +
                ' netto = ' +
                netto +
                ' packs = ' +
                packs +
                ' packagingSum = ' +
                packagingSum
            )
            if (packagingSum != null && packagingSum !== '') {
              itemRow[brutto].val(
                parseFloat(
                  parseFloat(itemRow[netto].val()) +
                    parseFloat(packagingSum * packs)
                )
              )
            }
            if (
              brutto != null &&
              itemRow[brutto].val() != null &&
              itemRow[brutto].val().length > 0
            ) {
              itemRow[netto].val(
                parseFloat(
                  parseFloat(itemRow[brutto].val()) -
                    parseFloat(packagingSum * packs)
                )
              )
            }
          }
        })
      }
    })
  }

  uCustomOrderTable.initU(params)

  const saveBtn = uCustomOrderTable.params[tabName].saveBtn
  edit ? saveBtn.html('save') : saveBtn.html('allEdit')
  saveBtn.attr('editSave', !edit)
  const customTableHeader = uCustomOrderTable.params[tabName].customTableHeader
  //   const priceAccess = <s:property value="priceAccess"/>;
  const priceAccess = true
  //   const changeUsedItemsPriceAccess = <s:property value="changeUsedItemsPriceAccess"/>;
  const changeUsedItemsPriceAccess = true
  if (priceAccess)
    setTotalFoterInvoice(
      uCustomOrderTable.params[tabName].customTableContentFooter,
      invoice
    )

  const makeBill = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(makeBill)"/>')
  const confirmInvoiceForMakeBill = $(
    '<button class="btn btn-success customTableHeaderSaveButtonPrint" />'
  ).html('<s:text name="getText(confirmInvoiceForMakeBill)"/>')
  const printPreview = $(
    '<button class="btn btn-success customTableHeaderSaveButtonPrint" />'
  ).html('<s:text name="getText(printPreview)"/>')
  const sendSMS = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(sendSMS)"/>')
  const deleteBtn = $(
    '<button class="btn btn-danger customTableHeaderDeleteButton"><i class="icon-trash icon-white"></i> <s:text name="getText(allDelete)"/>' +
      '</button>'
  )
  const copyToInternalBtn = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(copyToInternal)"/>')
  const copyToExternalBtn = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(copyToExternal)"/>')
  const printFullPurchaseItemBarcode = $(
    '<button class="btn btn-success customTableHeaderSaveButton"/>'
  ).html('<s:text name="getText(printBarcode)"/>')
  const printFullPurchaseItemAllBarcode = $(
    '<button class="btn btn-success customTableHeaderSaveButton"/>'
  ).html('<s:text name="getText(printBarcodeAll)"/>')
  const calculateGramm1 = $(
    '<button class="btn btn-success customTableHeaderSaveButton"/>'
  ).html('<s:text name="getText(calculateGramm)"/> 1')
  const calculateGramm2 = $(
    '<button class="btn btn-success customTableHeaderSaveButton"/>'
  ).html('<s:text name="getText(calculateGramm)"/> 2')
  const checkRealCount = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(CheckRealQty)"/>')
  const calculateQty4 = $(
    '<button class="btn btn-success customTableHeaderSaveButton" />'
  ).html('<s:text name="getText(CalculateQty4)"/>')
  const changeUsedItemsPrice = $(
    '<button class="btn btn-success customTableHeaderSaveButtonPrintRed" />'
  ).html('<s:text name="getText(changeUsedItemsPriceAccess)"/>')
  const changeInvoiceCompanyBtn = $(
    '<button class="btn btn-success customTableHeaderSaveButtonPrintRed" />'
  ).html('<s:text name="getText(changeInvoiceCompany)"/>')
  let itemBarcodeList = '0'

  if (
    invoice.statusType === 'SALEINVOICE' ||
    invoice.statusType === 'PURCHASEINVOICE' ||
    invoice.statusType === 'SALESRETURN' ||
    invoice.statusType === 'INPUTRETURN' ||
    invoice.statusType === 'OUTPUT_TO_PRODUCTION_COMPANY_RETURN' ||
    invoice.statusType === 'INPUT_FROM_PRODUCTION_COMPANY' ||
    invoice.statusType === 'INPUT_TO_SERVICE_INVOICE' ||
    invoice.statusType === 'OUTPUT_TO_PRODUCTION_COMPANY'
  ) {
    if (
      !branchInvoiceConfirmStatus &&
      (invoice.invoiceConfirmStatus === '' ||
        invoice.invoiceConfirmStatus === 'null' ||
        invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE') &&
      canConfirmInvoiceForMakeBill != null &&
      canConfirmInvoiceForMakeBill
    ) {
      customTableHeader.append(confirmInvoiceForMakeBill)
    }
  }
  if (
    ((branchInvoiceConfirmStatus ||
      invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE' ||
      invoice.invoiceBillStatus === 'BILLED') &&
      canMakeBill != null &&
      canMakeBill === true) ||
    (branchInvoiceConfirmStatus &&
      invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE' &&
      canMakeBill != null &&
      canMakeBill === true &&
      lockUnlockInvoice &&
      invoice.lockedStatus)
  ) {
    customTableHeader.append(makeBill)
  }
  //
  if (
    invoice.statusType === 'SALEINVOICE' ||
    invoice.statusType === 'PURCHASEINVOICE' ||
    invoice.statusType === 'SALESRETURN' ||
    invoice.statusType === 'INPUTRETURN' ||
    invoice.statusType === 'OUTPUT_TO_PRODUCTION_COMPANY_RETURN' ||
    invoice.statusType === 'INPUT_FROM_PRODUCTION_COMPANY' ||
    invoice.statusType === 'INPUT_TO_SERVICE_INVOICE' ||
    invoice.statusType === 'OUTPUT_TO_PRODUCTION_COMPANY'
  ) {
    if (
      printPreviewAccess != null &&
      printPreviewAccess.toString() === 'true'
    ) {
      customTableHeader.append(printPreview)
    } else if (
      invoice.invoiceBillStatus === 'BILLED' ||
      (invoice.statusType === 'OUTPUT_TO_PRODUCTION_COMPANY' &&
        invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE')
    ) {
      customTableHeader.append(printPreview)
    } else {
      printPreview.remove()
    }
  } else {
    customTableHeader.append(printPreview)
  }

  if (
    invoice.statusType === 'PURCHASE_SERVICE' ||
    invoice.statusType === 'SALE_SERVICE'
  ) {
    if (invoice.invoiceBillStatus === 'BILLED') {
      customTableHeader.append(printPreview)
    } else {
      printPreview.remove()
    }
  }

  // if (userPermission.delete) customTableHeader.append(deleteBtn)
  customTableHeader.append(deleteBtn)

  if (
    $.inArray(invoice.statusType, [
      'SALEINVOICE',
      'MARKET_SALES',
      'EXPENSE_INVOICE',
      'OUTPUT_TO_PRODUCTION_COMPANY',
    ]) !== -1
  )
    customTableHeader.append(checkRealCount)

  if ($.inArray(invoice.statusType, ['SALEINVOICE', 'EXPENSE_INVOICE']) !== -1)
    customTableHeader.append(calculateQty4)

  if (
    $.inArray(invoice.statusType, [
      'SALEINVOICE',
      'MARKET_SALES',
      'INTERNAL',
      'VIABRANCH',
      'OUTPUT_TO_PRODUCTION_COMPANY',
    ]) !== -1
  ) {
    customTableHeader.append('<span class="customInput80hide"> qty:</span>')
    const qty = $('<input type="text" class="customInput80">')
    qty.floatNumber()
    customTableHeader.append(qty)
    if (paramsCommon.qty != null && paramsCommon.qty !== undefined) {
      qty.val(paramsCommon.qty)
    }
    customTableHeader.append(
      '<span class="customInput80hide"> productBarcode:</span>'
    )
    const barcode = $(
      '<input type="text" class="customInput80 customInput80hide">'
    )
    customTableHeader.append(barcode)
    barcode.off('keyup').on('keyup', function (event) {
      if ($(this).val().length > 0 && event.which === 13) {
        findFifoSaldoItems('productBarcode', $(this).val())
        $(this).val('')
      }
    })

    customTableHeader.append('stillage:')
    const stillage = $(
      '<input type="text" class="customInput80 customInput80hide">'
    )
    customTableHeader.append(stillage)
    stillage.off('keyup').on('keyup', function (event) {
      if ($(this).val().length > 0 && event.which === 13) {
        itemBarcode.focus()
      }
    })
    customTableHeader.append('itemBarcode:')
    const itemBarcode = $('<input type="text" class="customInput80 intNumber">')
    customTableHeader.append(itemBarcode)

    itemBarcode.off('keyup').on('keyup', function (event) {
      let itemBStr = $(this).val()
      if (
        itemBStr.length > 0 &&
        event.which === 13 &&
        saveBtn.attr('editSave') !== 'true'
      ) {
        itemBStr = '#' + itemBStr + '#'
        if (
          paramsCommon.autoAddQtyItembarcode !== undefined &&
          paramsCommon.autoAddQtyItembarcode != null
        ) {
          if (paramsCommon.autoAddQtyItembarcode) {
            if (
              itemBarcodeList === '0' ||
              itemBarcodeList.split(itemBStr).length !== 0
            ) {
              itemBarcodeList += itemBStr
              findFifoSaldoItems('itemBarcode', $(this).val())
            }
          } else if (
            itemBarcodeList === '0' ||
            itemBarcodeList.split(itemBStr).length === 1
          ) {
            itemBarcodeList += itemBStr
            findFifoSaldoItems('itemBarcode', $(this).val())
          }
          // eslint-disable-next-line no-constant-condition
        } else if (true) {
          itemBarcodeList += itemBStr
          findFifoSaldoItems('itemBarcode', $(this).val())
        }
        $(this).val('')
      }
    })

    customTableHeader.append(' ebarcode:')
    const externalItemBarcode = $('<input type="text" class="customInput80">')
    externalItemBarcode.off('keyup').on('keyup', function (event) {
      if ($(this).val().length > 0 && event.which === 13) {
        findFifoSaldoItems('ebarcode', $(this).val())
        $(this).val('')
      }
    })
    customTableHeader.append(externalItemBarcode)

    function findFifoSaldoItems(name, value) {
      const warehouseId = uCustomOrderTable.warehouse.data().val
      let orderProductionTypeId =
        uCustomOrderTable.orderProductionType.data().val
      const returnCompanyId =
        uCustomOrderTable.returnCompany != null
          ? uCustomOrderTable.returnCompany.data().val
          : null
      const returnEmployeeId =
        uCustomOrderTable.returnEmployee != null
          ? uCustomOrderTable.returnEmployee.data().val
          : null
      orderProductionTypeId =
        orderProductionTypeId != null ? orderProductionTypeId : null
      const qtyV = qty.val().length > 0 ? qty.val() : null
      const stillageV = stillage.val().length > 0 ? stillage.val() : null
      const filterLookUpProdoct =
        "{'tabName':'" +
        tabName +
        "', 'invoiceId':" +
        objectId +
        ",'warehouseId':" +
        warehouseId +
        ",'orderProductionTypeId':" +
        orderProductionTypeId +
        ",'companyId':" +
        returnCompanyId +
        ",'employeeId':" +
        returnEmployeeId +
        ",'" +
        name +
        "':'" +
        value +
        "','qty':" +
        qtyV +
        ",'stillageSale':'" +
        stillageV +
        "', 'fromCalcTableHeader':true}"
      //  loaderIconAnimate();
      $.ajax({
        url: 'findInvoiceItemListUrl.htm',
        type: 'POST',
        cache: false,
        data: filterLookUpProdoct,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
          const list = JSON.parse(response)

          let sumRealCount = 0.0
          $.each(list, function (i, itemRow) {
            sumRealCount += itemRow.realCount
          })
          const maxQty = sumRealCount.toFixed(2)

          const col = uCustomOrderTable.params[tabName].columns
          const result = uCustomOrderTable.createTable2(tabName, col, list)
          uCustomOrderTable.salePopupItemRows = result.itemRows
          if (
            $.inArray(tabName, [
              'saleInvoiceItemTable',
              'expenseInvoiceItemTable',
              'outputToProductionCompanyItemTable',
            ]) !== -1
          ) {
            const saleCalcTableRows = uCustomOrderTable.params[tabName].itemRows
            const itemRowsNew = []
            let ab1Index = 0
            $.each(result.itemRows, function (indexId, pupopRow) {
              const pupopEntryRefId = pupopRow.entryRef.data().val
              const qtyPupop1 = pupopRow.qty.val()
              let grammPopup1 = pupopRow.gramm.val()
              if (grammPopup1 === '' || grammPopup1 == null) grammPopup1 = 0

              pupopRow.qty3.val(
                parseFloat(
                  parseFloat(qtyPupop1) * parseFloat(grammPopup1)
                ).toFixed(6)
              )
              $.each(saleCalcTableRows, function (idR, saleRow) {
                if (saleRow != null) {
                  const entryRefId = saleRow.entryRef.data().val
                  const qty2 = saleRow.qty.val()
                  if (pupopEntryRefId === entryRefId && pupopRow != null) {
                    saleRow.qty.val(
                      parseFloat(
                        parseFloat(qtyPupop1) + parseFloat(qty2)
                      ).toFixed(6)
                    )
                    saleRow.qty.addClass('customBackground')
                    pupopRow = null
                  }
                }
              })
              if (pupopRow != null) itemRowsNew[ab1Index++] = pupopRow
            })
            uCustomOrderTable.salePopupItemRows = itemRowsNew
          }
          uCustomOrderTable.customPopupAcceptClick2(
            uCustomOrderTable.params[tabName].customPopupAddAnRowElement2,
            tabName,
            uCustomOrderTable.salePopupItemRows,
            true
          )
          if (maxQty < parseFloat(qty.val()).toFixed(6))
            notificationMessage(
              'you' + ' ' + 'have' + ' ' + 'only' + ': ' + maxQty
            )
          else
            notificationMessage(
              'success' +
                ' ' +
                'completed' +
                ' ' +
                'you' +
                ' ' +
                'have' +
                ' ' +
                'only' +
                ': ' +
                maxQty
            )
        },
        error: function () {
          notificationMessage('You have an Error.')
        },
      })
    }
  }
  if (objectId != null && invoice.statusType === 'PURCHASEINVOICE') {
    customTableHeader.append(copyToInternalBtn)
    customTableHeader.append(copyToExternalBtn)
    customTableHeader.append(printFullPurchaseItemBarcode)
    customTableHeader.append(sendSMS)
    customTableHeader.append(calculateGramm1)
    customTableHeader.append(calculateGramm2)
    customTableHeader.append(printFullPurchaseItemAllBarcode)
    if (changeUsedItemsPriceAccess) {
      customTableHeader.append(changeUsedItemsPrice)
    }
  }

  printFullPurchaseItemBarcode.off('click').on('click', function () {
    const allBarcode = false
    itemBarcodeLogic(allBarcode)
  })

  printFullPurchaseItemAllBarcode.off('click').on('click', function () {
    const allBarcode = true
    itemBarcodeLogic(allBarcode)
  })

  function itemBarcodeLogic(allBarcode) {
    if (objectId == null) return
    let column
    let objectItemId
    let purchaseItemIds = '-1'
    let firstTime = true
    const $rows = $('.tabNameinvoiceItemTable ')
      .children('table')
      .children('tbody')
      .children('tr:visible')
    $rows.each(function (i, row) {
      if (firstTime) {
        firstTime = false
        $(row)
          .find('td')
          .each(function (j, td) {
            const objClass = $(td).hasClass('objectId')
            if (objClass) {
              column = j
              return false
            }
          })
      }
      objectItemId = $(row).find('td').eq(column).text().replace(/\s/g, '')
      purchaseItemIds += ',' + objectItemId
    })
    const form = $(
      "<form method='POST' target='_blank' action='purchaseItemSticker.htm'/>"
    )
    const id = $("<input name ='id' type='hidden'>").val(objectId)
    const allBarcodeHidden = $("<input name ='allBarcode' type='hidden'>").val(
      allBarcode
    )
    const purchaseItemId = $(
      "<input name ='purchaseItemIds' type='hidden'>"
    ).val(purchaseItemIds)
    form.append(id)
    form.append(allBarcodeHidden)
    form.append(purchaseItemId)
    $('body').append(form)
    form.submit()
    form.remove()
  }

  calculateGramm1.off('click').on('click', function () {
    if (saveBtn.attr('editSave') !== 'true')
      confirmDialog('areYouSure', function () {
        const itemRows = uCustomOrderTable.params[tabName].itemRows
        $.each(itemRows, function (id, itemRow) {
          const qty = itemRow.qty.val().length > 0 ? itemRow.qty.val() : 0
          const qty4 = itemRow.qty4.val().length > 0 ? itemRow.qty4.val() : 0
          itemRow.gramm.val(
            qty4 !== 0 ? parseFloat((qty / qty4) * 1000).toFixed(3) : 0
          )
        })
      })
  })

  calculateGramm2.off('click').on('click', function () {
    if (saveBtn.attr('editSave') !== 'true')
      confirmDialog('areYouSure', function () {
        const itemRows = uCustomOrderTable.params[tabName].itemRows
        $.each(itemRows, function (id, itemRow) {
          const qty = itemRow.qty.val().length > 0 ? itemRow.qty.val() : 0
          const qty4 = itemRow.qty4.val().length > 0 ? itemRow.qty4.val() : 0
          itemRow.gramm.val(
            qty !== 0 ? parseFloat((qty4 / qty) * 1000).toFixed(3) : 0
          )
        })
      })
  })

  calculateQty4.off('click').on('click', function () {
    if (saveBtn.attr('editSave') !== 'true')
      confirmDialog('areYouSure', function () {
        const itemRows = uCustomOrderTable.params[tabName].itemRows
        $.each(itemRows, function (id, itemRow) {
          const qty = itemRow.qty.val().length > 0 ? itemRow.qty.val() : 0
          const gramm = itemRow.gramm.val().length > 0 ? itemRow.gramm.val() : 0
          itemRow.qty4.val(gramm !== 0 ? parseFloat(qty * gramm).toFixed(3) : 0)
        })
      })
  })

  checkRealCount.off('click').on('click', function () {
    if (saveBtn.attr('editSave') !== 'true')
      confirmDialog('areYouSure', function () {
        checkRealCountFunc(uCustomOrderTable, tabName)
      })
  })

  changeUsedItemsPrice.off('click').on('click', function () {
    //            if (saveBtn.attr('editSave') != "true")
    confirmDialog('areYouSure', function () {
      let idsItems = ''
      $('.custom_content_div>table>tbody>tr')
        .not('.filtered')
        .each(function () {
          const id = $(this).find('.objectId')
          if (id !== undefined)
            idsItems += $(this).find('.objectId').html() + ','
        })
      // loaderIconAnimate();
      const data = '{"idsItems":"' + idsItems + '"}'
      $.ajax({
        url: 'changeUsedInvoiceItems.htm',
        type: 'POST',
        data,
        cache: false,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function () {
          openObjectUcustomTable(this, objectId, prepareUrl)
        },
        error: function (response) {
          removeDisabled(deleteBtn)
          notificationMessage('You Can not change an Invoice.')
        },
      })
    })
  })

  printPreview.off('click').on('click', function () {
    if (objectId == null) return
    const form = $(
      "<form method='POST' target='_blank' action='invoicesPrintPreviewUrl.htm'/>"
    )
    const id = $("<input name ='id' type='hidden'>").val(objectId)
    form.append(id)
    $('body').append(form)
    form.submit()
    form.remove()
  })

  sendSMS.off('click').on('click', function () {
    if (objectId == null) return
    const form = $(
      "<form method='POST' target='_blank' action='prepareMessage.htm'/>"
    )
    const id = $("<input name ='invoiceId' type='hidden'>").val(objectId)
    form.append(id)
    $('body').append(form)
    form.submit()
    form.remove()
  })

  if (
    invoice.disableInvoice != null &&
    invoice.statusType === 'EXPENSE_INVOICE'
  ) {
    deleteBtn.remove()
  } else if (
    invoice.invoiceTimeOut.length !== 0 ||
    invoice.disableInvoice != null ||
    invoice.fromSewModel != null ||
    invoice.fromSimpleProduction != null
  ) {
    if (!invoiceHeaderAccess) {
      saveBtn.remove()
    }

    if (lockUnlockInvoice != null && lockUnlockInvoice === false) {
      makeBill.remove()
    }
    deleteBtn.remove()
    checkRealCount.remove()
  } else if (invoice.transactionsList.length !== 0) {
    if (!invoiceHeaderAccess) {
      saveBtn.remove()
    }
    deleteBtn.remove()
  }

  //        l("invoice.invoiceConfirmStatus CONFIRMEDINVOICE" + invoice.invoiceConfirmStatus == 'CONFIRMEDINVOICE');
  if (invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE') {
    //        l("invoiceConfirmStatus " + invoice.invoiceConfirmStatus );
    if (!invoiceHeaderAccess) {
      saveBtn.remove()
    }
    deleteBtn.remove()
    confirmInvoiceForMakeBill.html('cancel confirmInvoiceForMakeBill')
  }
  if (invoice.invoiceBillStatus === 'BILLED') {
    if (!invoiceHeaderAccess) {
      saveBtn.remove()
    }

    deleteBtn.remove()
    confirmInvoiceForMakeBill.remove()
    makeBill.html('unBill')
  }
  // if (!userPermission.create && !userPermission.edit) {
  if (!invoiceHeaderAccess) {
    saveBtn.remove()
  }
  // }

  confirmInvoiceForMakeBill.off('click').on('click', function () {
    if (objectId == null) return
    confirmInvoiceForMakeBill.attr('disabled', 'disabled')
    // loaderIconAnimate();
    const data = "{'id': " + objectId + ' }'
    $.ajax({
      url: 'confirmInvoiceForMakeBillUrl.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (id) {
        if (id == null) {
          openObjectUcustomTable(this, objectId, prepareUrl)
          notificationMessage('Successfully confirmed an Invoice.')
        } else if (id === -1) {
          removeDisabled(confirmInvoiceForMakeBill)
          notificationMessage(
            'WARNING!!!',
            'Can not confirmed. Your session expired.'
          )
        } else {
          removeDisabled(confirmInvoiceForMakeBill)
          notificationMessage('You Can not Confirm an Invoice.')
        }
      },
      error: function (jqXHR, exception) {
        const msg =
          exception === 'parsererror'
            ? 'Your session expired.'
            : 'You Can not Confirm an Invoice.'
        removeDisabled(confirmInvoiceForMakeBill)
        notificationMessage(msg)
      },
    })
  })

  makeBill.off('click').on('click', function () {
    if (objectId == null) return
    makeBill.attr('disabled', 'disabled')
    // loaderIconAnimate();
    const data = "{'id': " + objectId + ' }'
    $.ajax({
      url: 'makeBillInvoiceUrl.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (id) {
        if (id == null) {
          openObjectUcustomTable(this, objectId, prepareUrl)
          notificationMessage('Successfully updated an Invoice.')
        } else if (id === -1) {
          removeDisabled(makeBill)
          notificationMessage(
            'WARNING!!!',
            "Can't Make Bill. Your session expired."
          )
        } else {
          removeDisabled(makeBill)
          notificationMessage('You Can not Make Bill an Invoice.')
        }
      },
      error: function (jqXHR, exception) {
        const msg =
          exception === 'parsererror'
            ? 'Your session expired.'
            : 'You Can not Make Bill an Invoice.'
        removeDisabled(makeBill)
        notificationMessage(msg)
      },
    })
  })

  changeInvoiceCompanyBtn.off('click').on('click', function () {
    confirmDialog(null, function () {
      let companyVal = ''

      const company = $('div[dname=clientCompany]')
      if (
        company != null &&
        company.data() != null &&
        company.data().val != null
      ) {
        companyVal = '"company":{"id":' + company.data().val + '}'
      }
      if (companyVal.length === 0) {
        notificationMessage('pleaseSelectCompany')
        return
      }

      let paymentTypeVal = ''
      const paymentType = $('div[dname=paymentType]')
      if (
        paymentType != null &&
        paymentType.data() != null &&
        paymentType.data().val != null
      ) {
        paymentTypeVal = '"paymentType":{"id":' + paymentType.data().val + '}'
      }

      if (paymentTypeVal.length === 0) {
        notificationMessage('pleaseSelectPaymentType')
        return
      }

      const data =
        '{' +
        '"invoice":{' +
        '"id":' +
        objectId +
        ', ' +
        companyVal +
        ', ' +
        paymentTypeVal +
        '}}'

      // loaderIconAnimate();

      $.ajax({
        url: 'changeUsedInvoiceCompany.htm',
        type: 'POST',
        cache: false,
        data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        traditional: true,
        success: function (invoiceJson) {
          if (invoiceJson === 'sessionExpired') {
            notificationMessage(
              'WARNING!!!',
              "Can't change Company. Your session expired."
            )
            return
          } else if (invoiceJson == null) {
            notificationMessage('You Can not change Company.')
            return
          }
          openObjectUcustomTable(this, objectId, prepareUrl)
        },
      })
    })
  })

  saveBtn.off('click').on('click', function () {
    saveBtn.attr('disabled', 'disabled')
    itemBarcodeList = '0'
    const editSave = saveBtn.attr('editSave')
    if (editSave === 'true') {
      openHeaderTableFunction(true, orderHeaderElements, invoice)
      const params = uCustomOrderTable.params[tabName]
      params.editable = true
      saveBtn.html('save')
      saveBtn.attr('editSave', false)
      const discardButton = uCustomOrderTable.params[tabName].discardButton
      discardButton.css('display', '')

      if (
        invoiceHeaderAccess &&
        (invoice.invoiceBillStatus === 'BILLED' ||
          (invoice.invoiceConfirmStatus !== '' &&
            invoice.invoiceConfirmStatus !== 'null' &&
            invoice.invoiceConfirmStatus === 'CONFIRMEDINVOICE'))
      ) {
        let count = 0
        $.each(params.values, function () {
          params.values[count].disableRow = true
          count++
        })

        uCustomOrderTable.refreshTable(params)

        uCustomOrderTable.addAnItem.remove()
      } else {
        uCustomOrderTable.refreshTable(params)
      }

      removeDisabled(saveBtn)
      $(
        'button[cname=outputToServiceInvoiceItemTable_batchStageDetailEntry]'
      ).prop('disabled', true)
      $(
        'button[cname=inputToServiceInvoiceItemTable_batchStageDetailExit]'
      ).prop('disabled', true)
      return
    }
    const items = uCustomOrderTable.getTableValues(tabName)
    if (
      items == null ||
      (validateHederElement(orderHeaderElements) !== 0 && objectId == null)
    ) {
      removeDisabled(saveBtn)
      return
    }
    let headerValues = getHeaderElementsValues(orderHeaderElements)
    if (objectId != null) headerValues = ''
    let companyCurrencyRate = '"companyCurrencyRate":1,'
    let companyRefCurrencyRate = '"companyRefCurrencyRate":1,'
    let currencyRate =
      invoice.currencyRate != null
        ? '"currencyRate":' + invoice.currencyRate + ','
        : '"currencyRate":1,'
    let driverName =
      invoice.driverName != null
        ? '"driverName":"' + invoice.driverName + '",'
        : '"driverName":"",'
    let invoiceNominal = '"invoiceNominal":1,'
    let currencyId = ''
    let calcTypeId = ''
    let paymentTypeId = ''
    let orderVal = ''
    let notes = ''
    let resellerVal = ''
    let invoiceNumber = ''
    let sequenceNumber = ''

    if (
      orderHeaderElements['companyCurrencyRate'] != null &&
      orderHeaderElements['companyCurrencyRate'].val().length > 0
    )
      companyCurrencyRate =
        '"companyCurrencyRate":"' +
        orderHeaderElements['companyCurrencyRate'].val() +
        '",'

    if (
      orderHeaderElements['companyRefCurrencyRate'] != null &&
      orderHeaderElements['companyRefCurrencyRate'].val().length > 0
    )
      companyRefCurrencyRate =
        '"companyRefCurrencyRate":"' +
        orderHeaderElements['companyRefCurrencyRate'].val() +
        '",'

    if (
      orderHeaderElements['currencyRate'] != null &&
      orderHeaderElements['currencyRate'].val().length > 0
    )
      currencyRate =
        '"currencyRate":"' + orderHeaderElements['currencyRate'].val() + '",'

    if (
      orderHeaderElements['driverName'] != null &&
      orderHeaderElements['driverName'].val().length > 0
    )
      driverName =
        '"driverName":"' + orderHeaderElements['driverName'].val() + '",'

    if (
      orderHeaderElements['invoiceNominal'] != null &&
      orderHeaderElements['invoiceNominal'].val().length > 0
    )
      invoiceNominal =
        '"invoiceNominal":"' +
        orderHeaderElements['invoiceNominal'].val() +
        '",'
    if (
      orderHeaderElements['notes'] != null &&
      orderHeaderElements['notes'].val().length > 0
    )
      notes = '"notes":"' + orderHeaderElements['notes'].val() + '",'

    if (
      orderHeaderElements['invoiceNumber'] != null &&
      orderHeaderElements['invoiceNumber'].val().length > 0
    )
      invoiceNumber =
        '"invoiceNumber":"' + orderHeaderElements['invoiceNumber'].val() + '",'

    if (
      orderHeaderElements['sequenceNumber'] != null &&
      orderHeaderElements['sequenceNumber'].val().length > 0
    )
      sequenceNumber =
        '"sequenceNumber":"' +
        orderHeaderElements['sequenceNumber'].val() +
        '",'

    const currency = $('div[dname=currencyId]')
    if (
      currency != null &&
      currency.data() != null &&
      currency.data().val != null
    )
      currencyId = '"currency":{"id":' + currency.data().val + '},'
    const calcType = $('div[dname=calc_typeId]')
    if (
      calcType != null &&
      calcType.data() != null &&
      calcType.data().val != null
    )
      calcTypeId = '"calc_type":' + calcType.data().val + ','

    const paymentType = $('div[dname=paymentTypeId]')
    if (
      paymentType != null &&
      paymentType.data() != null &&
      paymentType.data().val != null
    )
      paymentTypeId = '"paymentType":{"id":' + paymentType.data().val + '},'

    const order = $('div[dname=order]')
    if (order != null && order.data() != null && order.data().val != null)
      orderVal = '"order":{"id":' + order.data().val + '},'

    const reseller = $('div[dname=reseller]')

    let resellerPercentVal = 5
    if (
      orderHeaderElements['resellerPercent'] != null &&
      orderHeaderElements['resellerPercent'].val().length > 0
    )
      resellerPercentVal = orderHeaderElements['resellerPercent'].val()
    if (
      reseller != null &&
      reseller.data() != null &&
      reseller.data().val != null
    )
      resellerVal =
        '"reseller":{"id":' +
        reseller.data().val +
        '},"resellerPercent":' +
        resellerPercentVal +
        ','

    const data =
      '{' +
      '"invoice":{' +
      '"id":' +
      objectId +
      ', ' +
      companyCurrencyRate +
      companyRefCurrencyRate +
      currencyRate +
      driverName +
      invoiceNominal +
      headerValues +
      currencyId +
      calcTypeId +
      paymentTypeId +
      notes +
      invoiceNumber +
      sequenceNumber +
      orderVal +
      resellerVal +
      '"invoiceItems":' +
      items +
      '}}'

    // loaderIconAnimate();
    //            console.log("data: " + data);
    //            l(data);
    $.ajax({
      url: prepareCreateEditUrl + '.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',

      traditional: true,
      success: function (invoiceJson) {
        if (invoiceJson === 'sessionExpired') {
          removeDisabled(saveBtn)
          notificationMessage('WARNING!!!', "Can't Save. Your session expired.")
          return
        } else if (invoiceJson == null) {
          removeDisabled(saveBtn)
          notificationMessage('You Can not Save an Invoice.')
          checkRealCountFunc(uCustomOrderTable, tabName)
          return
        }
        $('.acceptTr').remove()
        invoice = JSON.parse(invoiceJson)
        objectId = invoice.id
        openHeaderTableFunction(false, orderHeaderElements, invoice)
        if (canPay != null && canPay === true) {
          openPaymentDetailsTable(
            uCustomOrderTable,
            transactionsColumns,
            invoice,
            paramsCommon
          )
          if (
            invoice.statusType === 'PURCHASEINVOICE' ||
            invoice.statusType === 'SALEINVOICE'
          ) {
            openExtraPaymentDetailsTable(
              uCustomOrderTable,
              transactionsColumns,
              invoice,
              paramsCommon
            )
          }
        }

        const params = uCustomOrderTable.params[tabName]
        params.editable = false
        params.discardButton.css('display', 'none')
        params.saveBtn.html('allEdit')
        params.saveBtn.attr('editSave', true)
        params.columns = invoiceItemColumns
        params.values = invoice.invoiceItems
        removeDisabled(params.saveBtn)
        if (priceAccess)
          setTotalFoterInvoice(params.customTableContentFooter, invoice)
        uCustomOrderTable.refreshTable(params)
        notificationMessage('Successfully save an Invoice.')
        window.history.pushState(
          '',
          '',
          prepareUrl + '.htm?id=' + objectId + '&page_current=1&page_size=25'
        )
      },
      error: function (jqXHR, exception) {
        const msg =
          exception === 'parsererror'
            ? 'Your session expired.'
            : 'You Can not Save an Invoice.'
        removeDisabled(saveBtn)
        notificationMessage(msg)
        checkRealCountFunc(uCustomOrderTable, tabName)
      },
    })
  })
  deleteBtn.off('click').on('click', function () {
    if (objectId != null)
      confirmDialog(null, function () {
        // loaderIconAnimate();
        const data = '{"id":' + objectId + '}'
        $.ajax({
          url: 'prepareDeleteInvoiceUrl.htm',
          type: 'POST',
          data,
          cache: false,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (id) {
            if (id == null) {
              //   <%request.getSession().setAttribute("data","NotAjaxLoad");%>
              UBackAjaxLoad(backUrl, '1')
            } else {
              removeDisabled(deleteBtn)
              notificationMessage('You Can not delete an Invoice.')
            }
          },
          error: function (response) {
            removeDisabled(deleteBtn)
            notificationMessage('You Can not delete an Invoice.')
          },
        })
      })
  })

  copyToInternalBtn.off('click').on('click', function () {
    if (objectId != null)
      confirmDialog('<areYouSure', function () {
        const form = $(
          "<form method='POST' target='_blank' style='display: none;' action='prepareInternalInvoiceNew.htm'/>"
        )
        const id = $("<input name ='id' type='hidden'>").val(objectId)
        const internalStatus = $(
          "<input name ='internalStatus' type='hidden'>"
        ).val(true)
        const copyPurchaseToInternalExternal = $(
          "<input name ='copyPurchaseToInternalExternal' type='hidden'>"
        ).val(true)
        form.append(id)
        form.append(internalStatus)
        form.append(copyPurchaseToInternalExternal)
        $('body').append(form)
        form.submit()
        form.remove()
      })
  })

  copyToExternalBtn.off('click').on('click', function () {
    if (objectId != null)
      confirmDialog('Are you sure to continue', function () {
        const form = $(
          "<form method='POST' target='_blank' style='display: none;' action='prepareInternalInvoiceNew.htm'/>"
        )
        const id = $("<input name ='id' type='hidden'>").val(objectId)
        const internalStatus = $(
          "<input name ='internalStatus' type='hidden'>"
        ).val(false)
        const copyPurchaseToInternalExternal = $(
          "<input name ='copyPurchaseToInternalExternal' type='hidden'>"
        ).val(true)
        form.append(id)
        form.append(internalStatus)
        form.append(copyPurchaseToInternalExternal)
        $('body').append(form)
        form.submit()
        form.remove()
      })
  })
  if (canPay != null && canPay === true && objectId != null) {
    openPaymentDetailsTable(
      uCustomOrderTable,
      transactionsColumns,
      invoice,
      paramsCommon
    )
    openExtraPaymentDetailsTable(
      uCustomOrderTable,
      transactionsColumns,
      invoice,
      paramsCommon
    )
  }

  if (priceAccess) {
    const labelHolder = 'changePrice'
    const priceNew = $(
      '<input type="text" class="customInput100 floatNumber" placeholder="' +
        labelHolder +
        '">'
    )
    customTableHeader.append(' ')
    customTableHeader.append(priceNew)
    priceNew.off('keyup').on('keyup', function (event) {
      const priceNewStr = $(this).val()
      if (priceNewStr.length > 0 && event.which === 13) {
        confirmDialog('areYouSure', function () {
          let idsItems = ''
          $('.custom_content_div>table>tbody>tr')
            .not('.filtered')
            .each(function () {
              const id = $(this).find('.objectId')
              if (id !== undefined)
                idsItems += $(this).find('.objectId').html() + ','
            })
          // loaderIconAnimate();
          const data =
            '{"idsItems":"' +
            idsItems +
            '","unitPrice":' +
            priceNewStr +
            ',"statusType":"' +
            invoice.statusType +
            '"}'
          $.ajax({
            url: 'changePriceInvoiceUrl.htm',
            type: 'POST',
            data,
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
              window.location.reload(true)
            },
            error: function (response) {
              removeDisabled(deleteBtn)
              notificationMessage('You Can not change Prices.')
            },
          })
        })
      }
    })
    const labelHolderVat = 'changeVat'
    const changeVat = $(
      '<input type="text" class="customInput100 floatNumber" placeholder="' +
        labelHolderVat +
        '">'
    )
    customTableHeader.append(' ')
    customTableHeader.append(changeVat)
    changeVat.off('keyup').on('keyup', function (event) {
      const changeVatStr = $(this).val()
      if (changeVatStr.length > 0 && event.which === 13) {
        confirmDialog('areYouSure', function () {
          let idsItemsVat = ''
          $('.custom_content_div>table>tbody>tr')
            .not('.filtered')
            .each(function () {
              const id = $(this).find('.objectId')
              if (id !== undefined)
                idsItemsVat += $(this).find('.objectId').html() + ','
            })
          // loaderIconAnimate();
          const data =
            '{"idsItems":"' +
            idsItemsVat +
            '","vat":' +
            changeVatStr +
            ',"statusType":"' +
            invoice.statusType +
            '"}'
          $.ajax({
            url: 'changeVatInvoiceUrl.htm',
            type: 'POST',
            data,
            cache: false,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (response) {
              window.location.reload(true)
            },
            error: function (response) {
              removeDisabled(deleteBtn)
              notificationMessage('You Can not change Vat.')
            },
          })
        })
      }
    })
  }

  if (objectId != null && invoice.statusType === 'PURCHASEINVOICE') {
    const labelHolderBarCode = 'barcode'
    const barCodeNew = $(
      '<input type="text" class="customInput100" placeholder="' +
        labelHolderBarCode +
        '">'
    )
    customTableHeader.append(' ')
    customTableHeader.append(barCodeNew)

    barCodeNew.off('keyup').on('keyup', function (event) {
      const data = $(this).val()
      const editParam = $(
        '.custom_table_header>.customTableHeaderSaveButton'
      ).attr('editsave')

      if (
        data.length < 0 ||
        event.which !== 13 ||
        data.split('*').length < 2 ||
        editParam === 'true'
      )
        return

      const dataNew = '{"productBarcode":"' + data + '","id":' + objectId + '}'
      $(this).val('')
      // loaderIconAnimate();
      $.ajax({
        url: 'findItemByBarcode.htm',
        type: 'POST',
        cache: false,
        data: dataNew,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (invoiceItemListJson) {
          if (invoiceItemListJson === 'productException')
            notificationMessage('Has not been find product by barcode!')
          if (invoiceItemListJson === 'colorException')
            notificationMessage('Has not been find color by transfer code!')

          const list1 = JSON.parse(invoiceItemListJson)

          const col = uCustomOrderTable.params[tabName].columns
          const result = uCustomOrderTable.createTable2(tabName, col, list1)
          uCustomOrderTable.salePopupItemRows = result.itemRows
          const itemRowsNew = []
          let ab1Index = 0
          const oldTableRows = uCustomOrderTable.params[tabName].itemRows
          $.each(result.itemRows, function (indexId, newItem) {
            const newItemId = newItem.item.data().val
            const newItemColorId = newItem.color.data().val
            const newItemQty = newItem.qty.val()

            $.each(oldTableRows, function (idR, saleRow) {
              if (saleRow != null) {
                const itemId = saleRow.item.data().val
                const itemColorId = saleRow.color.data().val
                const itemQty = saleRow.qty.val()
                if (
                  newItemId === itemId &&
                  newItemColorId === itemColorId &&
                  newItem != null
                ) {
                  saleRow.qty.val(
                    parseFloat(
                      parseFloat(newItemQty) + parseFloat(itemQty)
                    ).toFixed(6)
                  )
                  saleRow.qty.addClass('customBackground')
                  newItem = null
                }
              }
            })
            if (newItem != null) itemRowsNew[ab1Index++] = newItem
          })
          uCustomOrderTable.salePopupItemRows = itemRowsNew
          createTablePurchaseProductBarcode(uCustomOrderTable, tabName)

          $('#loading2').remove()
          $('#loadingAX').remove()
        },
        error: function (invoiceItemListJson) {
          notificationMessage('You have an Error.')
        },
      })

      const createTablePurchaseProductBarcode = function (aa, tabName) {
        const a = uCustomOrderTable.params[tabName].customPopupAddAnRowElement2
        const columns = aa.params[tabName].columns
        const itemRows = uCustomOrderTable.salePopupItemRows
        $.each(itemRows, function (j, itemRow) {
          if (itemRow != null) {
            const tr = $('<tr/>')
            tr.append(
              '<td style="width:25px; white-space: nowrap">' +
                (++aa.params[tabName].indexU + 1) +
                '</td>'
            )
            $.each(columns, function (ind, column) {
              const td = $('<td/>')
              const type = column.type
              const name = column.name
              const showUI = column.showUI
              const editableElement = column.editableElement
              const resultType = column.resultType
              let obj = itemRow[name]

              if (showUI === true) {
                let val = ''
                if (type === 'label') {
                  val = obj.data().val
                  if (resultType === 'object') {
                    val = obj.data().text
                  }
                  if (name === 'realCount' || name === 'requiredQty') {
                    val = obj
                  } else if (
                    val != null &&
                    val !== 0 &&
                    name !== 'unitMeasurement' &&
                    name !== 'measurement2'
                  ) {
                    obj = val
                  }
                } else if (
                  $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1
                ) {
                  val = obj.val()
                } else if (type === 'checkbox') {
                  val = obj.is(':checked') ? true : false
                } else if (type === 'list') {
                  val = obj.children('input').val()
                  obj
                    .children('select')
                    .data('index', aa.params[tabName].indexU)
                } else if ($.inArray(type, ['file_image']) !== -1) {
                  val = obj
                }
                if (name === 'id' || name === 'realCount') val = ''

                if (editableElement === false) {
                  td.html(val)
                } else {
                  obj.data('index', aa.params[tabName].indexU)
                  td.append(obj)
                }
                tr.append(td)
              }
            })
            uCustomOrderTable.setItemRowOnChangeEvents(
              tabName,
              itemRow,
              columns
            )
            tr.append(
              '<td> <a class="remove_item" onclick="deleteRowU(\'' +
                tabName +
                "',this, " +
                aa.params[tabName].indexU +
                ')"></a></td>'
            )
            tr.data('tabName', tabName)
            tr.data('rowIndex', aa.params[tabName].indexU)
            $(a).parent('td').parent('tr').before(tr)
            const divElem = $(a)
              .parent('td')
              .parent('tr')
              .parent('tbody')
              .parent('table')
              .parent('div.fht-tbody')
            divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)
            aa.params[tabName].itemRows[aa.params[tabName].indexU] = itemRow
          }
        })
      }
    })
    const labelHolderExtBarCode = 'ebarcode'
    const extBarCode = $(
      '<input type="text" class="customInput100" placeholder="' +
        labelHolderExtBarCode +
        '">'
    )
    customTableHeader.append(' ')
    customTableHeader.append(extBarCode)

    extBarCode.off('keyup').on('keyup', function (event) {
      const data = $(this).val()
      const editParam = $(
        '.custom_table_header>.customTableHeaderSaveButton'
      ).attr('editsave')

      if (data.length < 0 || event.which !== 13 || editParam === 'true') return

      const eProductId = $('.eProductId')
      const eProductVal = eProductId.val()

      const dataNew =
        '{"ebarcode":"' +
        data +
        '","productId":' +
        eProductVal +
        ',"id":' +
        objectId +
        '}'
      extBarCode.val('')
      // loaderIconAnimate();
      $.ajax({
        url: 'findItemByBarcode.htm',
        type: 'POST',
        cache: false,
        data: dataNew,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (invoiceItemListJson) {
          if (invoiceItemListJson === 'productException')
            notificationMessage('Has not been find product by barcode!')
          if (invoiceItemListJson === 'colorException')
            notificationMessage('Has not been find color by transfer code!')

          const list1 = JSON.parse(invoiceItemListJson)

          const col = uCustomOrderTable.params[tabName].columns
          const result = uCustomOrderTable.createTable2(tabName, col, list1)
          uCustomOrderTable.salePopupItemRows = result.itemRows
          const itemRowsNew = []
          let ab1Index = 0
          const oldTableRows = uCustomOrderTable.params[tabName].itemRows
          $.each(result.itemRows, function (indexId, newItem) {
            const newItemId = newItem.item.data().val
            const newItemColorId = newItem.color.data().val
            const newItemSizeId = newItem.sewModelVariantsSize.data().val
            const newItemSewModelId = newItem.sewModel.data().val
            const newItemQty = newItem.qty.val()
            const newEBarcode = newItem.ebarcode.val()

            $.each(oldTableRows, function (idR, saleRow) {
              if (saleRow != null) {
                const itemId = saleRow.item.data().val
                const itemColorId = saleRow.color.data().val
                const itemSizeId = saleRow.sewModelVariantsSize.data().val
                const itemSewModelId = saleRow.sewModel.data().val
                const itemQty = saleRow.qty.val()
                const eBarcode = saleRow.ebarcode.val()
                if (
                  newEBarcode === eBarcode &&
                  newItemId === itemId &&
                  newItemColorId === itemColorId &&
                  newItemSizeId === itemSizeId &&
                  newItemSewModelId === itemSewModelId &&
                  newItem != null
                ) {
                  saleRow.qty.val(
                    parseFloat(
                      parseFloat(newItemQty) + parseFloat(itemQty)
                    ).toFixed(6)
                  )
                  saleRow.qty.addClass('customBackground')
                  newItem = null
                }
              }
            })
            if (newItem != null) itemRowsNew[ab1Index++] = newItem
          })
          uCustomOrderTable.salePopupItemRows = itemRowsNew
          createTablePurchaseProductBarcode(uCustomOrderTable, tabName)

          $('#loading2').remove()
          $('#loadingAX').remove()
        },
        error: function (invoiceItemListJson) {
          notificationMessage('You have an Error.')
        },
      })

      const createTablePurchaseProductBarcode = function (aa, tabName) {
        const a = uCustomOrderTable.params[tabName].customPopupAddAnRowElement2
        const columns = aa.params[tabName].columns
        const itemRows = uCustomOrderTable.salePopupItemRows
        $.each(itemRows, function (j, itemRow) {
          if (itemRow != null) {
            const tr = $('<tr/>')
            tr.append(
              '<td style="width:25px; white-space: nowrap">' +
                (++aa.params[tabName].indexU + 1) +
                '</td>'
            )
            $.each(columns, function (ind, column) {
              const td = $('<td/>')
              const type = column.type
              const name = column.name
              const showUI = column.showUI
              const editableElement = column.editableElement
              const resultType = column.resultType
              let obj = itemRow[name]

              if (showUI === true) {
                let val = ''
                if (type === 'label') {
                  val = obj.data().val
                  if (resultType === 'object') {
                    val = obj.data().text
                  }
                  if (name === 'realCount' || name === 'requiredQty') {
                    val = obj
                  } else if (
                    val != null &&
                    val !== 0 &&
                    name !== 'unitMeasurement' &&
                    name !== 'measurement2'
                  ) {
                    obj = val
                  }
                } else if (
                  $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1
                ) {
                  val = obj.val()
                } else if (type === 'checkbox') {
                  val = obj.is(':checked') ? true : false
                } else if (type === 'list') {
                  val = obj.children('input').val()
                  obj
                    .children('select')
                    .data('index', aa.params[tabName].indexU)
                } else if ($.inArray(type, ['file_image']) !== -1) {
                  val = obj
                }
                if (name === 'id' || name === 'realCount') val = ''

                if (editableElement === false) {
                  td.html(val)
                } else {
                  obj.data('index', aa.params[tabName].indexU)
                  td.append(obj)
                }
                tr.append(td)
              }
            })
            uCustomOrderTable.setItemRowOnChangeEvents(
              tabName,
              itemRow,
              columns
            )
            tr.append(
              '<td> <a class="remove_item" onclick="deleteRowU(\'' +
                tabName +
                "',this, " +
                aa.params[tabName].indexU +
                ')"></a></td>'
            )
            tr.data('tabName', tabName)
            tr.data('rowIndex', aa.params[tabName].indexU)
            $(a).parent('td').parent('tr').before(tr)
            const divElem = $(a)
              .parent('td')
              .parent('tr')
              .parent('tbody')
              .parent('table')
              .parent('div.fht-tbody')
            divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)
            aa.params[tabName].itemRows[aa.params[tabName].indexU] = itemRow
          }
        })
      }
    })

    customTableHeader.append(' product:')
    const eProduct = $(
      '<div durl=searchProductList dname=eProductId dwidth=190 dwidth-ul="280"></div>'
    )
    customTableHeader.append(eProduct)
  }

  if (
    objectId == null &&
    (tabName === 'inputToServiceInvoiceItemTable' ||
      tabName === 'expenseInvoiceItemTable')
  )
    saveBtn.click()
  changeInvoiceCompanyAccess =
    changeInvoiceCompanyAccess != null ? changeInvoiceCompanyAccess : false
  if (
    changeInvoiceCompanyAccess != null &&
    changeInvoiceCompanyAccess.toString() === 'true'
  ) {
    const clientCompanyUpDiv = $(
      '<div dname="clientCompany" durl="findAllCompanyForInvoice" dwidth-ul="220" style="padding-right: 10px;"></div>'
    )
    const clientCompanyUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    clientCompanyUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    clientCompanyUpDiv.append(clientCompanyUpDivSelect)
    clientCompanyUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )
    clientCompanyUpDiv.data('dparam', "'allCompanies':true")
    clientCompanyUpDiv.attr('dparam', "'allCompanies':true")

    const paymentTypeUpDiv = $(
      '<div dname="paymentType" durl="findAllPaymentType" dwidth-ul="220" style="padding-right: 10px;"></div>'
    )
    const paymentTypeUpDivSelect = $('<select style="display: none;"></select>')
    paymentTypeUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    paymentTypeUpDiv.append(paymentTypeUpDivSelect)
    paymentTypeUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    customTableHeader.append(clientCompanyUpDiv)
    customTableHeader.append(paymentTypeUpDiv)
    customTableHeader.append(changeInvoiceCompanyBtn)
  }

  const editSave = saveBtn.attr('editSave')
  if (
    objectId != null &&
    invoice.statusType === 'PURCHASEINVOICE' &&
    editSave === 'true' &&
    invoice.invoiceBillStatus !== 'BILLED'
  ) {
    customTableHeader.append('<br>')
    const labelForDevice = ' forQrCode'
    const btnDevice = $(
      '<a href="preparePurchaseInvoiceNewForDevice.htm?id=<s:property value="id"/>" class="btn btn-success customTableHeaderSaveButtonPrintRed">' +
        labelForDevice +
        '<a/>'
    )
    customTableHeader.append(btnDevice)
  }
  if (
    objectId != null &&
    invoice.statusType === 'SALEINVOICE' &&
    editSave === 'true' &&
    invoice.invoiceBillStatus !== 'BILLED'
  ) {
    customTableHeader.append('<br>')
    const labelForDevice = ' forDevice'
    const btnDevice = $(
      '<a href="prepareSaleInvoiceNew.htm?invoiceId=<s:property value="id"/>&anyParam=simple" class="btn btn-success customTableHeaderSaveButtonPrintRed">' +
        labelForDevice +
        '<a/>'
    )
    customTableHeader.append(btnDevice)
  }
}

function checkRealCountFunc(uCustomOrderTable, tabName) {
  let itemListData = ' '
  const itemRows = uCustomOrderTable.params[tabName].itemRows
  $.each(itemRows, function (itemRowIndex, itemRow) {
    const entryRefId = itemRow.entryRef.data().val
    const objQty = itemRow.qty
    objQty.css('border-color', '')
    let qty = objQty.val()
    const oldQty = objQty.data().val != null ? objQty.data().val : 0
    const itemId = itemRow.id.data().val
    if (itemId != null) {
      qty -= oldQty
    }
    qty = parseFloat(qty).toFixed(8)
    itemListData +=
      "'" + entryRefId + "':'" + qty + '=' + oldQty + '=' + itemRowIndex + "',"
  })
  const data =
    "{'checkRealCountList': { " +
    itemListData.substr(0, itemListData.length - 1) +
    '} }'
  $.ajax({
    url: 'checkRealCountUrl.htm',
    type: 'POST',
    cache: false,
    data,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (checkRealCount) {
      if (jQuery.isEmptyObject(checkRealCount)) {
        notificationMessage('SUCCESS!')
      } else {
        $.each(checkRealCount, function (objIn, obj) {
          const oldQty = obj.split('=')[1]
          const index = obj.split('=')[2]
          let realQty = obj.split('=')[0]
          realQty = parseFloat(
            parseFloat(realQty) + parseFloat(oldQty)
          ).toFixed(8)
          const objQty = itemRows[index].qty
          objQty.css('border-color', 'red')
          objQty.attr('title', 'Max=' + realQty)
        })
        notificationMessage('youHaveNotEnoughItem : qty ')
      }
    },
    error: function (jqXHR, exception) {},
  })
}

function setTotalFoterInvoice(footer, invoice) {
  const invoiceStatusType = invoice.statusType
  let customerSupplier = 'company_amount :'
  const amoutStr = ' amount:'
  if (
    invoiceStatusType === 'PURCHASEINVOICE' ||
    invoiceStatusType === 'INPUTRETURN'
  ) {
    customerSupplier = 'supplier' + amoutStr
  } else if (
    invoiceStatusType === 'SALEINVOICE' ||
    invoiceStatusType === 'SALESRETURN'
  ) {
    customerSupplier = 'customer' + amoutStr
  }

  footer.html(
    '' +
      '           <table style="width: 100%; font-family: inherit; background-color: gainsboro">' +
      '              <tr>' +
      '                <td align="right">' +
      'netAmount: ' +
      invoice.currencySymbol +
      '</td>' +
      '                <td align="right" width="130">' +
      invoice.subtotal +
      '</td>' +
      '              </tr>' +
      '              <tr>' +
      '                <td align="right">' +
      'total discount: ' +
      invoice.currencySymbol +
      '</td>' +
      '                <td align="right">' +
      invoice.totalDiscount +
      '</td>' +
      '              </tr>' +
      '              <tr>' +
      '                <td align="right">' +
      '<s:text name="getText(title.discountCard.sub)"/>: ' +
      invoice.currencySymbol +
      '</td>' +
      '                <td align="right">' +
      invoice.discountCardAmount +
      '</td>' +
      '              </tr>' +
      '              <tr>' +
      '                <td align="right">' +
      '<s:text name="getText(total)"/>: ' +
      invoice.currencySymbol +
      '</td>' +
      '                <td align="right">' +
      invoice.total +
      '</td>' +
      '              </tr>' +
      '              <tr>' +
      '                <td align="right">' +
      '<s:text name="getText(currency_amount)"/>: ' +
      invoice.systemCurrencySymbol +
      '</td>' +
      '                <td align="right">' +
      invoice.currencyTotal +
      '</td>' +
      '              </tr>' +
      '              <tr>' +
      '                <td align="right">' +
      customerSupplier +
      invoice.supplierCurSymbol +
      '</td>' +
      '                <td align="right">' +
      invoice.companyTotal +
      '</td>' +
      '              </tr>' +
      '           </table>'
  )
}

function openPaymentDetailsTable(
  uCustomOrderTable,
  transactionsColumns,
  invoice,
  paramsCommon
) {
  const transactionsListJson = invoice.transactionsList
  const orderItems =
    invoice.orderItems === undefined ? null : invoice.orderItems
  const objectId = invoice.id === undefined ? null : invoice.id
  const saveUrl =
    paramsCommon.savePayUrl == null ? 'payUnPayUrl' : paramsCommon.savePayUrl
  const statusLeasing =
    paramsCommon.statusLeasing == null ? false : paramsCommon.statusLeasing
  const invoicePaymentLimit =
    paramsCommon.invoicePaymentLimit == null
      ? false
      : paramsCommon.invoicePaymentLimit
  let statusFromCredit = false
  let data = {}
  if (orderItems != null && orderItems.length > 0) {
    if (
      orderItems[0].invoice_status !== undefined &&
      orderItems[0].invoice_status === 'CREDIT'
    ) {
      statusFromCredit = true
    }
  }
  const params = {
    saveActionUrl: saveUrl,
    headerTitle: '<s:text name="getText(paymentDetails)"/>',
    tabName: 'paymentDetailsTable',
    parent_div: $('.paymentDetailsDiv'),
    div_height: 400,
    columns: transactionsColumns,
    values: transactionsListJson,
    editable: false,
    objectListName: 'transactionsList',
    responseJsonObjName: 'transactionsListJson',
    numberFormatScale: 2,
    // openPopup:<s:property value="openPopup"/>,
    openPopup: true,
    parentId: objectId,
  }
  uCustomOrderTable.initU(params)
  // eslint-disable-next-line dot-notation
  const paymentObj = uCustomOrderTable.params['paymentDetailsTable']
  paymentObj.columnConfig.remove()
  const payBtn = paymentObj.saveBtn
  if (invoice.invoiceTimeOut != null && invoice.invoiceTimeOut.length !== 0) {
    payBtn.remove()
  }
  transactionsListJson.length === 0
    ? payBtn.html('<s:text name="getText(allEdit)"/>')
    : payBtn.html('<s:text name="getText(undoPayment)"/>')
  if (
    transactionsListJson.length > 0 &&
    statusLeasing === true &&
    (invoice.oderPaymentStatus === 'UNPAID' ||
      invoice.oderPaymentStatus === 'CREDIT')
  ) {
    payBtn.html('<s:text name="getText(allEdit)"/>')
  }

  if (
    (transactionsListJson.length > 0 &&
      statusFromCredit === true &&
      invoice.oderPaymentStatus === 'PAID') ||
    invoice.oderPaymentStatus === 'CREDIT_PAID'
  ) {
    payBtn.css('display', 'none')
  }

  payBtn.attr('editSave', true)
  payBtn.off('click').on('click', function () {
    const editSave = payBtn.attr('editSave')
    if (
      editSave === 'true' &&
      (transactionsListJson.length === 0 ||
        (statusLeasing === true &&
          (invoice.oderPaymentStatus === 'UNPAID' ||
            invoice.oderPaymentStatus === 'CREDIT')))
    ) {
      payBtn.html('<s:text name="getText(payment)"/>')
      const params = paymentObj
      params.editable = true
      const discardButton = paymentObj.discardButton
      discardButton.css('display', '')
      uCustomOrderTable.refreshTable(params)
      payBtn.attr('editSave', false)
      return
    }

    if (
      transactionsListJson.length === 0 ||
      (statusLeasing === true &&
        (invoice.oderPaymentStatus === 'UNPAID' ||
          invoice.oderPaymentStatus === 'CREDIT'))
    ) {
      const items = uCustomOrderTable.getTableValues('paymentDetailsTable')
      if (items == null) return
      data = '{"id":' + objectId + ', "transactionsList":' + items + '}'
      let totalAmount = 0
      // eslint-disable-next-line dot-notation
      $.each(
        uCustomOrderTable.params['paymentDetailsTable'].itemRows,
        function (id, itemRow) {
          if (itemRow != null)
            totalAmount += parseFloat(itemRow.amount.val().split(' ').join(''))
        }
      )

      if (invoicePaymentLimit) {
        if (
          parseFloat(invoice.total.split(' ').join('')) !==
            parseFloat(totalAmount) ||
          parseFloat(totalAmount) === 0
        ) {
          if (statusLeasing === true) {
            if (
              parseFloat(totalAmount) === 0 ||
              parseFloat(totalAmount) >
                parseFloat(invoice.total.split(' ').join(''))
            ) {
              notificationMessage(
                '<s:text name="getText(pleaseCheckAmounts)"/>'
              )
              return
            }
          } else {
            notificationMessage('<s:text name="getText(pleaseCheckAmounts)"/>')
            return
          }
        }
      }
    } else data = '{"id":' + objectId + '}'
    payBtn.attr('disabled', 'disabled')
    // loaderIconAnimate();
    $.ajax({
      url: saveUrl + '.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      traditional: true,
      success: function (id) {
        if (id == null) {
          openObjectUcustomTable(this, objectId, paramsCommon.prepareUrl)
          notificationMessage('Successfully Pay an Invoice.')
        } else if (id === -1) {
          removeDisabled(payBtn)
          notificationMessage('WARNING!!!', "Can't Pay. Your session expired.")
        } else {
          removeDisabled(payBtn)
          notificationMessage('You Can not Pay an Invoice.')
        }
      },
      error: function () {
        removeDisabled(payBtn)
        notificationMessage('You Can not Pay an Invoice.')
      },
    })
  })
}

function openExtraPaymentDetailsTable(
  uCustomOrderTable,
  transactionsColumns,
  invoice,
  paramsCommon
) {
  const transactionsExtraListJson = invoice.transactionsExtraList
  const orderItems =
    invoice.orderItems === undefined ? null : invoice.orderItems
  const objectId = invoice.id === undefined ? null : invoice.id
  const saveUrl = 'extraPayUnPay'
  // const statusLeasing = paramsCommon.statusLeasing == null ? false : paramsCommon.statusLeasing;
  let statusFromCredit = false
  if (orderItems != null && orderItems.length > 0) {
    if (
      orderItems[0].invoice_status !== undefined &&
      orderItems[0].invoice_status === 'CREDIT'
    ) {
      statusFromCredit = true
      console.log(statusFromCredit)
    }
  }
  const params = {
    saveActionUrl: saveUrl,
    headerTitle: '<s:text name="getText(extraPaymentDetails)"/>',
    tabName: 'paymentExtraDetailsTable',
    parent_div: $('.paymentExtraDetailsDiv'),
    div_height: 400,
    columns: transactionsColumns,
    values: transactionsExtraListJson,
    editable: false,
    objectListName: 'transactionsExtraList',
    responseJsonObjName: 'transactionsExtraListJson',
    numberFormatScale: 2,
    // openPopup:<s:property value="openPopup"/>,
    openPopup: true,
    parentId: objectId,
  }
  uCustomOrderTable.initU(params)
  // eslint-disable-next-line dot-notation
  const paymentObj = uCustomOrderTable.params['paymentExtraDetailsTable']
  paymentObj.columnConfig.remove()
  const payBtn = paymentObj.saveBtn
  if (invoice.invoiceTimeOut != null && invoice.invoiceTimeOut.length !== 0) {
    payBtn.remove()
  }
  payBtn.html('<s:text name="getText(allEdit)"/>')
  payBtn.attr('editSave', true)
  payBtn.off('click').on('click', function () {
    const editSave = payBtn.attr('editSave')
    if (editSave === 'true') {
      payBtn.html('<s:text name="getText(payment)"/>')
      const params = paymentObj
      params.editable = true
      const discardButton = paymentObj.discardButton
      discardButton.css('display', '')
      uCustomOrderTable.refreshTable(params)
      payBtn.attr('editSave', false)
      return
    }
    let data = {}
    const items = uCustomOrderTable.getTableValues('paymentExtraDetailsTable')
    if (items == null) return
    data = '{"id":' + objectId + ', "transactionsExtraList":' + items + '}'
    let totalAmount = 0
    // eslint-disable-next-line dot-notation
    $.each(
      uCustomOrderTable.params['paymentExtraDetailsTable'].itemRows,
      function (id, itemRow) {
        if (itemRow != null)
          totalAmount += parseFloat(itemRow.amount.val().split(' ').join(''))
      }
    )
    if (parseFloat(totalAmount) === 0) {
      notificationMessage('<s:text name="getText(pleaseCheckAmounts)"/>')
      return
    }

    payBtn.attr('disabled', 'disabled')
    // loaderIconAnimate();
    $.ajax({
      url: saveUrl + '.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      traditional: true,
      success: function (id) {
        if (id == null) {
          openObjectUcustomTable(this, objectId, paramsCommon.prepareUrl)
          notificationMessage('Successfully Pay an Invoice.')
        } else if (id === -1) {
          removeDisabled(payBtn)
          notificationMessage('WARNING!!!', "Can't Pay. Your session expired.")
        } else {
          removeDisabled(payBtn)
          notificationMessage('You Can not Pay an Invoice.')
        }
      },
      error: function () {
        removeDisabled(payBtn)
        notificationMessage('You Can not Pay an Invoice.')
      },
    })
  })
}
