/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-self-assign */
/* eslint-disable dot-notation */
const $ = require('jquery')
const jQuery = require('jquery')
let limitData = ''

export function confirmDialog(title, yesCallback) {
  const message = $('.confirmDialogDiv')
  const $title = message.children('div').children('p')
  const youWantDeleteMessage = $('youWantDeleteMessage').html()
  title = title != null ? title : youWantDeleteMessage
  $title.html(title)
  const confirmBackend = $('<div class="confirmDialogBackend"></div>')
  const x = $(window).width() / 2 - 90
  const y = $(window).height() / 2 - 130
  message.css('top', y).css('left', x).css('display', 'block')
  $('body').append(confirmBackend)
  $('.btnYes').focus()
  $(document)
    .off('click', '.btnYes')
    .on('click', '.btnYes', function (event) {
      closeDialogDiv()
      yesCallback()
    })
  $(document)
    .off('click', '.btnNo')
    .on('click', '.btnNo', function (event) {
      closeDialogDiv()
    })
  $('.closeMessage').click(function () {
    closeDialogDiv()
  })
  function closeDialogDiv() {
    confirmBackend.remove()
    message.css('display', 'none')
  }

  confirmBackend.off('click').on('click', function () {
    closeDialogDiv()
  })

  message.off('keydown').on('keydown', function (event) {
    const nKeyCode = event.keyCode || event.which
    if (nKeyCode === 27) closeDialogDiv()
  })
}

export function notificationMessage(header, msg) {
  //  loaderIconAnimateRemove();
  const messageDiv = $('<div class="notificationMessage"></div>')
  $('body').append(messageDiv)
  const closeBtn = $('<a class="closeMessage">×</a>')
  closeBtn.off('click').on('click', function (event) {
    event.preventDefault()
    messageDiv.remove()
  })
  messageDiv.append(closeBtn)
  messageDiv.append(
    '<h1>' + header + '</h1><ul><b>' + (msg != null ? msg : '') + '</b></ul>'
  )
  messageDiv.css('top', '60px').css('left', $(window).width() - 360 + 'px')
  messageDiv.delay(10).fadeIn('slow', function () {
    messageDiv.delay(1500).fadeOut('slow', function () {
      messageDiv.remove()
    })
  })
}

export function openObjectUcustomTable(elem, id, urlAddrs, params) {
  // loaderIconAnimate();
  $(elem).attr('disabled', 'disabled')
  let url = ''
  let url2 = ''
  let delta = ''
  if (id != null) delta = 'id=' + id + '&'
  // if(!elem.dataset.num || (elem.dataset.num && elem.dataset.num!=2)) {
  url = urlAddrs + '.htm?' + delta + 'page_current=1&page_size=25'
  url2 = urlAddrs + 'AjaxLoad.htm?' + delta + 'page_current=1&page_size=25'
  // }else{
  //    url = urlAddrs + '.htm';
  //    url2 = urlAddrs + 'AjaxLoad.htm';
  // }
  $(this).attr('disabled', 'disabled')
  // const forCharisma = '{"ajaxType":"ajaxLoad"}';
  // requestNullAjax(forCharisma);
  url2 += params != null ? '&' + params : ''
  url += params != null ? '&' + params : ''
  jQuery('#content').load(url2, function (msg) {
    window.history.pushState('', '', url)
    // loaderIconAnimateRemove();
  })
}

export function removeDisabled(obj) {
  obj.removeAttr('disabled')
}

export function UBackAjaxLoad(page, pageCurrent) {
  const url = page + '.htm'
  const page1 = page + 'AjaxLoad.htm?' + pageCurrent
  // const forCharisma = '{"ajaxType":"ajaxLoad"}';
  // requestNullAjax(forCharisma);
  window.history.pushState('', '', url)
  jQuery('#content').load(page1, function (msg) {
    $('#loading2').remove()
    $('#loading').remove()
    // const forCharisma = '{"ajaxType":"NotAjaxLoad"}';
    // requestNullAjax(forCharisma);
    // loaderIconAnimateRemove();
  })
  return false
}

export function chooseElementDialog(title, jsonElement, yesCallback) {
  const message = $('.chooseDialogDiv')

  const $title = message.children('div').children('p')
  $title.css('font-weight', 'bold')

  // var youWantDeleteMessage = $('youWantDeleteMessage').html();

  const content = message.children('div').children('.chooseDialogDivContent')
  let table =
    '<table class="fancyTableSearch customTableForStyle tablesorter tablesorter-default hasFilters hasStickyHeaders"><body>'

  for (let item = 0; item < jsonElement.length; item++) {
    table += '<tr>'
    if (item !== 0) table += '<td>' + item + '</td>'
    else table += '<td></td>'
    for (let i = 0; i < jsonElement[item].length; i++)
      table += '<td>' + jsonElement[item][i] + '</td>'
    table += '</tr>'
  }
  table += '</body></table>'
  content.html(table)

  $title.html(title)
  const confirmBackend = $('<div class="confirmDialogBackend"></div>')
  const x = $(window).width() / 2 - 90
  const y = $(window).height() / 2 - 130
  message
    .css('top', y)
    .css('left', x)
    .css('display', 'block')
    .css('min-height', '200px')
  $('body').append(confirmBackend)
  $('.btnYes').focus()
  $(document)
    .off('click', '.btnYes')
    .on('click', '.btnYes', function (event) {
      closeDialogDiv()
      yesCallback(
        content.children('table').children('tbody').children('.selectedTr')
      )
    })
  $(document)
    .off('click', '.btnNo')
    .on('click', '.btnNo', function (event) {
      closeDialogDiv()
    })
  $('.closeMessage').click(function () {
    closeDialogDiv()
  })
  function closeDialogDiv() {
    confirmBackend.remove()
    message.css('display', 'none')
  }

  confirmBackend.off('click').on('click', function () {
    closeDialogDiv()
  })

  message.off('keydown').on('keydown', function (event) {
    const nKeyCode = event.keyCode || event.which
    if (nKeyCode === 27) closeDialogDiv()
  })
}

// $.fn.floatNumber = function () {
//   this.on('keypress', function (evt) {
//     let maxValue = $(evt.target).data().maxValue
//     const theEvent = evt || window.event
//     let key = theEvent.keyCode || theEvent.which
//     const x = key
//     key = String.fromCharCode(key)
//     const textVal = $(this).val()
//     // eslint-disable-next-line unicorn/prefer-includes
//     if (x === 46 && textVal.indexOf('.') > -1) {
//       theEvent.preventDefault()
//     }
//     const regex = /[0-9]|\./
//     if (!regex.test(key) && x !== 8 && x !== 37 && x !== 39 && x !== 9) {
//       theEvent.returnValue = false
//       if (theEvent.preventDefault) theEvent.preventDefault()
//     }
//     const inputVal =
//       parseFloat(textVal + (regex.test(key) ? theEvent.key : '')) + ''
//     maxValue = parseFloat(maxValue)
//     if (maxValue != null && inputVal > maxValue) {
//       $(this).val(inputVal.substring(0, inputVal.length - 1))
//       theEvent.returnValue = false
//       if (theEvent.preventDefault) theEvent.preventDefault()
//     }
//   })
// }

// $.fn.intNumber = function () {
//   this.on('keypress', function (evt) {
//     const theEvent = evt || window.event
//     let key = theEvent.keyCode || theEvent.which
//     const x = key
//     key = String.fromCharCode(key)
//     const textVal = $(this).val()
//     // eslint-disable-next-line unicorn/prefer-includes
//     if (x === 46 && textVal.indexOf('.') > -1) {
//       theEvent.preventDefault()
//     }
//     const regex = /[0-9]|\./
//     if (
//       ((!regex.test(key) && x !== 8 && x !== 37 && x !== 39) || x === 46) &&
//       x !== 9
//     ) {
//       theEvent.returnValue = false
//       if (theEvent.preventDefault) theEvent.preventDefault()
//     }
//   })
// }

// $.fn.isDateValid = function () {
//   let result = true
//   const value = $(this).val()
//   if (value.length !== 0) {
//     const arry0 = value.split('/')
//     const v2 = arry0[1] + '/' + arry0[0] + '/' + arry0[2]
//     const parsedDate = new Date(v2)
//     if (isNaN(parsedDate)) {
//       result = false
//     }
//   }
//   return result
// }

// $.fn.customDateGetVal = function () {
//   let result = ''
//   if ($(this).val().length !== 0) {
//     const arry = $(this).val().split(' ')
//     const arry0 = arry[0].split('/')
//     if (arry[1] != null && arry[1].trim().length !== 0) {
//       const aa = arry[1].split(':')
//       const arr2 =
//         (aa[0].length === 1 ? '0' + aa[0] : aa[0]) +
//         ':' +
//         (aa[1].length === 1 ? '0' + aa[1] : aa[1]) +
//         ':' +
//         (aa[2].length === 1 ? '0' + aa[2] : aa[2])
//       arry[1] = arr2
//     } else arry[1] = '00:00:00'
//     result =
//       arry0[2] +
//       '-' +
//       (arry0[1].length === 1 ? '0' + arry0[1] : arry0[1]) +
//       '-' +
//       (arry0[0].length === 1 ? '0' + arry0[0] : arry0[0]) +
//       'T' +
//       arry[1]
//   }
//   return result
// }

// $.fn.customDateSetVal = function (dateStr) {
//   let result = ''
//   if (dateStr != null) {
//     const date = new Date(dateStr)
//     result =
//       $.datepicker.formatDate('dd/mm/yy', date) +
//       ' ' +
//       date.getHours() +
//       ':' +
//       date.getMinutes() +
//       ':' +
//       date.getSeconds()
//     $(this).val(result)
//   } else {
//     $(this).val(null)
//   }
//   return result
// }

// eslint-disable-next-line import/no-mutable-exports
export let pickerOpts = {
  dateFormat: 'dd/mm/yy',
  onSelect: function (val) {
    const d = new Date()
    val = val + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    $(this).val(val)
  },
}

export function getHeaderElements(headerColumnNames) {
  pickerOpts = {
    dateFormat: 'dd/mm/yy',
    onSelect: function (val) {
      const d = new Date()
      val =
        val + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      $(this).val(val)
    },
  }

  const result = {}
  const headerElements = {}

  const input = document.createElement('input')
  input.type = 'text'
  input.style.css = `
  width: 220px,
  `

  headerElements['date'] = input

  headerElements['orderNoSequenceValue'] = input
  headerElements['dueDate'] = input
  headerElements['sellDate'] = input
  headerElements['years'] = input
  headerElements['company'] = input

  headerElements['person'] = input

  headerElements['orderNumber'] = input
  headerElements['orderNumberPo'] = input
  headerElements['supplier'] = input
  headerElements['supplierCurSymbol'] = input

  headerElements['companyCurrencyRate'] = input
  headerElements['supplierRefCurSymbol'] = input
  headerElements['companyRefCurrencyRate'] = input
  headerElements['driverName'] = input

  headerElements['branch'] = input

  headerElements['companyGroup'] = input
  headerElements['department'] = input
  headerElements['warehouse'] = input
  headerElements['orderProductionType'] = input
  headerElements['paymentType'] = input

  headerElements['calc_type'] = input

  headerElements['order'] = input

  headerElements['plateNumber'] = input
  headerElements['salesManager'] = input
  headerElements['discountCard'] = input
  headerElements['car'] = input

  headerElements['currency'] = input
  headerElements['currencySymbol'] = input
  headerElements['currencyRate'] = input

  headerElements['systemNumber'] = input

  headerElements['invoiceBillStatus'] = input

  headerElements['invoiceStatus'] = input
  headerElements['invoiceNo'] = input

  headerElements['notes'] = input
  headerElements['clientOrder'] = input
  headerElements['shiftDayInterval'] = input

  headerElements['name'] = input

  headerElements['postType'] = input
  headerElements['postDeliveryType'] = input

  headerElements['internalType'] = input
  headerElements['externalType'] = input

  headerElements['invoiceNominal'] = input

  headerElements['reseller'] = input

  headerElements['resellerPercent'] = input

  headerElements['invoiceNumber'] = input
  headerElements['sequenceNumber'] = input

  const data = {
    // headerElements['date'] = input
    // headerElements['date'].datepicker(pickerOpts)
    // headerElements['orderNoSequenceValue'] = input
    // headerElements['dueDate'] = $(
    //   '<input date required style="width: 223px;"type="text">'
    // )
    // headerElements['dueDate'].datepicker(pickerOpts)
    // headerElements['sellDate'] = $(
    //   '<input date required style="width: 223px;"type="text">'
    // )
    // headerElements['sellDate'].datepicker(pickerOpts)
    // headerElements['years'] = $('<label style="width: 120px;"/>')
    // headerElements['company'] = $(
    //   '<div required list dname=companyId dwidth="230"></div>'
    // ).data({
    //   durl: 'findAllCompanyForInvoice',
    //   dparam: "\\'branchcompany\\':false",
    // })
    // headerElements['person'] = $(
    //   '<div required list dname=employeeId dwidth="230"></div>'
    // ).data({ durl: 'findAllEmployeeLookUp' })
    // headerElements['orderNumber'] = $('<label style="width: 120px;">')
    // headerElements['orderNumberPo'] = $(
    //   '<input style="width: 160px;"type="text">'
    // )
    // headerElements['supplier'] = $(
    //   '<div required list dname=supplierId dwidth="230"></div>'
    // ).data({
    //   durl: 'findAllCompanyForInvoice',
    //   dparam: "\\'branchcompany\\':true",
    // })
    // headerElements['supplierCurSymbol'] = $(
    //   '<label name="supplierCurSymbol" style="width: 120px;"/>'
    // )
    // headerElements['companyCurrencyRate'] = $(
    //   '<input name="companyCurrencyRate" number required  style="width: 120px;"type="text">'
    // )
    // headerElements['supplierRefCurSymbol'] = $(
    //   '<label name="supplierRefCurSymbol" style="width: 120px;"/>'
    // )
    // headerElements['companyRefCurrencyRate'] = $(
    //   '<input name="companyRefCurrencyRate" number required  style="width: 120px;"type="text">'
    // )
    // headerElements['companyCurrencyRate'].floatNumber()
    // headerElements['companyRefCurrencyRate'].floatNumber()
    // headerElements['driverName'] = $(
    //   '<input name="driverName"  style="width: 120px;"type="text">'
    // )
    // headerElements['branch'] = $(
    //   '<div required list dname=branchId dwidth="230"></div>'
    // ).data({ durl: 'findAllCompanyLogic', dparam: "\\'branchcompany\\':true" })
    // headerElements['companyGroup'] = $(
    //   '<div list dname=companyGroupId dwidth="230"></div>'
    // ).data('durl', 'findAllCompanyGroups')
    // headerElements['department'] = $(
    //   '<div required list dname=departmentId dwidth="230"></div>'
    // ).data('durl', 'findAllDepartmentLogic')
    // headerElements['warehouse'] = $(
    //   '<div required list dname=warehouseId dwidth="230"></div>'
    // ).data('durl', 'findAllWarehouseLogic')
    // headerElements['orderProductionType'] = $(
    //   '<div required list dname=orderProductionTypeId dwidth="230"></div>'
    // ).data('durl', 'findAllOrderProductionType')
    // headerElements['paymentType'] = $(
    //   '<div required list dname=paymentTypeId dwidth="230"></div>'
    // ).data('durl', 'findAllPaymentType')
    // headerElements['calc_type'] = $(
    //   '<div required list noObject dname=calc_typeId dwidth="230"></divrequired>'
    // ).data('durl', 'findAllInvoiceCalc_type')
    // headerElements['order'] = $('<div list dname=order dwidth="230"></div>').data(
    //   'durl',
    //   'findAllContracts'
    // )
    // headerElements['plateNumber'] = $(
    //   '<div list dname=plateId dwidth="230"></div>'
    // ).data('durl', 'findAllPlateNumber')
    // headerElements['salesManager'] = $(
    //   '<div list dname=salesManagerId dwidth="230"></div>'
    // ).data('durl', 'findAllEmployee')
    // headerElements['discountCard'] = $(
    //   '<div list dname=discountCardId dwidth="230"></div>'
    // ).data('durl', 'findAllDiscountCard')
    // headerElements['car'] = $('<div list dname=carId dwidth="230"></div>').data(
    //   'durl',
    //   'findAllCar'
    // )
    // headerElements['currency'] = $(
    //   '<div required list dname=currencyId dwidth="230"></div>'
    // ).data('durl', 'findAllCurrency')
    // headerElements['currencySymbol'] = $('<label style="width: 120px;"/>')
    // headerElements['currencyRate'] = $(
    //   '<input number required style="width: 120px;"type="text">'
    // )
    // headerElements['currencyRate'].floatNumber()
    // headerElements['systemNumber'] = $(
    //   '<input number style="width: 60px;"type="text">'
    // )
    // headerElements['systemNumber'].floatNumber()
    // headerElements['invoiceBillStatus'] = $(
    //   '<input number style="width: 60px;"type="text">'
    // )
    // headerElements['invoiceBillStatus'].floatNumber()
    // headerElements['invoiceStatus'] = $(
    //   '<input number style="width: 60px;"type="text">'
    // )
    // headerElements['invoiceStatus'].floatNumber()
    // headerElements['invoiceNo'] = $(
    //   '<input number style="width: 60px;"type="text">'
    // )
    // headerElements['invoiceNo'].floatNumber()
    // headerElements['notes'] = $('<input style="width: 160px;"type="text">')
    // headerElements['clientOrder'] = $('<input style="width: 160px;" type="text">')
    // headerElements['shiftDayInterval'] = $(
    //   '<input required style="width: 60px;"type="text">'
    // )
    // headerElements['shiftDayInterval'].intNumber()
    // headerElements['name'] = $(
    //   '<input required style="width: 220px;"type="text">'
    // )
    // headerElements['postType'] = $(
    //   '<div list dname="postType" dwidth="230"></div>'
    // ).data('durl', 'findAllPostType')
    // headerElements['postDeliveryType'] = $(
    //   '<div list dname="postDeliveryType" dwidth="230"></div>'
    // ).data('durl', 'findAllPostDeliveryType')
    // headerElements['internalType'] = $(
    //   '<input name="internalOrExternal" type="radio" value="true" id="internalType">'
    // )
    // headerElements['externalType'] = $(
    //   '<input name="internalOrExternal" type="radio" value="false" id="externalType">'
    // )
    // headerElements['invoiceNominal'] = $(
    //   '<input number required style="width: 120px;"type="text">'
    // )
    // headerElements['invoiceNominal'].floatNumber()
    // headerElements['reseller'] = $(
    //   '<div list dname=reseller dwidth="230"></div>'
    // ).data('durl', 'findAllCompanyForInvoice')
    // headerElements['resellerPercent'] = $(
    //   '<input number required style="width: 120px;"type="text">'
    // )
    // headerElements['resellerPercent'].floatNumber()
    // headerElements['invoiceNumber'] = $(
    //   '<input style="width: 160px;"type="text">'
    // )
    // headerElements['sequenceNumber'] = $(
    //   '<input style="width: 160px;"type="text">'
    // )
  }

  // $.each(headerColumnNames, function (key, value) {
  //   result[value] = headerElements[value]
  // })

  headerColumnNames.forEach((value) => {
    result[value] = headerElements[value]
  })

  return result
}

export function validateHederElement(headerElements) {
  let error = 0
  $.each(headerElements, function (key, element) {
    if (element != null) {
      let elm = element
      let value = element.val().length !== 0 ? element.val() : null
      if (element.attr('list') != null) {
        elm = element.children('input')
        value = element.data().val
      }
      elm.css('border-color', '')
      if (
        element.attr('number') !== undefined &&
        value != null &&
        isNaN(Number(value))
      ) {
        elm.css('border-color', 'red')
        error++
      } else if (
        element.attr('date') !== undefined &&
        value != null &&
        !elm.isDateValid()
      ) {
        elm.css('border-color', 'red')
        error++
      }
      if (elm.attr('required') !== undefined && value === null) {
        elm.css('border-color', 'red')
        error++
      }
      if (
        (key === 'companyCurrencyRate' || key === 'currencyRate') &&
        value === 0.0
      ) {
        elm.css('border-color', 'red')
        error++
      }
    }
  })
  return error
}

export function getHeaderElementsValues(headerElements) {
  let result = ''
  $.each(headerElements, function (key, element) {
    if (element != null) {
      let value = element.val()
      if (element.attr('noObject') != null) {
        value = element.data().val
        if (value != null) result += '"' + key + '":"' + value + '",'
      } else if (element.attr('list') != null) {
        const elm = element.children('input').val()
        value = element.data().val
        if ((key === 'plateNumber' || key === 'car') && value === undefined) {
          if (key === 'plateNumber') {
            key = 'plateNumberStr'
          } else if (key === 'car') {
            key = 'carStr'
          }
          // eslint-disable-next-line no-unused-expressions
          elm !== '' && elm !== undefined
            ? (result += '"' + key + '":"' + elm + '",')
            : ''
        } else {
          // eslint-disable-next-line no-unused-expressions
          value != null ? (result += '"' + key + '":{"id":' + value + '},') : ''
        }
      } else if (element.attr('date') != null) {
        result += '"' + key + '":"' + element.customDateGetVal() + '",'
      } else if (element[0].nodeName !== 'LABEL') {
        result += '"' + key + '":"' + value + '",'
      }
    }
  })
  return result
}

export function getCurrencyRate(
  settingsRateType,
  currencyId,
  branchCompanyId,
  employeeId,
  dateVal
) {
  dateVal = dateVal != null ? dateVal : $('input[name=date]').val()
  const data =
    '{"settingsRateType":"' +
    settingsRateType +
    '","currencyId":' +
    currencyId +
    ',"branchCompanyId":' +
    branchCompanyId +
    ',"employeeId":' +
    employeeId +
    ', "dateFrom":"' +
    dateVal +
    '"}'
  let result = null
  $.ajax({
    url: 'getCurrentCurrencyRate.htm',
    async: false,
    type: 'POST',
    data,
    cache: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (paramsObject) {
      result = paramsObject
    },
    error: function (response) {
      alert('ERROR!!!')
    },
  })
  return result
}

export function getResellersPercent(resellerId) {
  let result = null
  const data = '{"id":' + resellerId + '}'
  $.ajax({
    url: 'getResellersPercent.htm',
    async: false,
    type: 'POST',
    data,
    cache: false,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (paramsObject) {
      result = paramsObject
    },
    error: function (response) {
      alert('ERROR!!!')
    },
  })
  return result
}

export const UCustomTable1 = function () {
  const disableBackendDiv = '<div class="disableBackendDiv"></div>'
  const customAddItemPopupDiv =
    '' +
    '<div class="customTableAddItePupop">' +
    '    <table style="width: 100%;background-color: #CFCFD0;border-radius: 3px;" cellpadding="2">' +
    '        <tr>' +
    '            <td><h3 class="modal-title" style="float:left;"> CreateOrderLines </h3></td>' +
    '            <td>' +
    '                <div style="float:right;">' +
    '                <button class="btn customPopupAcceptClickClass" style="margin-right: 5px;" type="button" onclick="customPopupAcceptClick(\'$tabName\')"> Accept </button>' +
    '                <button class="btn" type="button" onclick="$(\'.customTableAddItePupop\').remove(); $(\'.disableBackendDiv\').remove();"> Close </button>' +
    '                </div>' +
    '            </td>' +
    '        </tr>' +
    '    </table>' +
    '    <div class="customTableAddItePupop2">' +
    '        <table cellspacing="0" cellpadding="1" border="0" style="float: left;">' +
    '            <tbody class="customPupopTbody"></tbody>' +
    '        </table>' +
    '        <table cellspacing="0" cellpadding="1" border="0" style="float: left;">' +
    '            <tbody class="customPupopTbody2"></tbody>' +
    '        </table>' +
    '    </div>' +
    '</div>'
  pickerOpts = {
    dateFormat: 'dd/mm/yy',
    onSelect: function (val) {
      const d = new Date()
      val =
        val + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      $(this).val(val)
      $(this).trigger('onchange')
      $(this).trigger('change')
    },
  }
  const $self = this
  let customPopupAddAnRowElement
  let columnConfigTableName
  $self.customPopupItemRow = {}
  $self.setItemRowOnChangeEvents = function () {}
  $self.setItemRowOnChangeEventsForSalePopup = function () {}
  $self.params = {}
  $self.messages = {}
  $self.initU = function (param, refreshUi) {
    $self.params[param.tabName] = {
      saveActionUrl: param.saveActionUrl,
      prepareUrl: param.prepareUrl,
      headerTitle: param.headerTitle,
      tabName: param.tabName,
      parent_div: param.parent_div,
      columns: param.columns,
      values: param.values,
      editable: param.editable,
      objectListName: param.objectListName,
      responseJsonObjName: param.responseJsonObjName,
      itemRows: [],
      parentId: param.parentId,
      sortable: param.sortable,
      saveBtn: param.saveBtn,
      makeBillBtn: param.makeBillBtn,
      discardButton: param.discardButton,
      div_height: param.div_height,
      customTableHeader: param.customTableHeader,
      customTableContentFooter: param.customTableContentFooter,
      customTableContentFooterShow: param.customTableContentFooterShow,
      numberFormatScale: param.numberFormatScale,
      forSalePupop: param.forSalePupop,
      openPopup: param.openPopup,
      allCompaniesAccessForReserv: param.allCompaniesAccessForReserv,
      saleInvoiceEntryAccess: param.saleInvoiceEntryAccess,
    }
    if (param.messages != null) $self.messages = param.messages

    $self.params[param.tabName].indexU = -1

    const columnConfigPanel =
      '' +
      '<div class="modal fade ' +
      param.tabName +
      '" tabindex="-1" style="display: none;">' +
      '    <div class="modal-dialog">' +
      '        <div class="modal-content">' +
      '            <div class="modal-header" style="padding: 0px 10px!important;">' +
      '                <button type="button" class="close" data-dismiss="modal">×</button>' +
      '                <h3>' +
      param.tabName +
      '</h3>' +
      '            </div>' +
      '            <div class="modal-footer" style="padding: 0px 10px!important;">' +
      '                <a href="#" class="btn btn-default" data-dismiss="modal">Close</a>' +
      '                <button  class="btn btn-primary saveColumnConfig" onclick="saveColumnConfig();">Save</button>' +
      '            </div>' +
      '            <div class="modal-body" style="margin-bottom: 5px;padding: 0px 10px!important;"></div>' +
      '        </div>' +
      '    </div>' +
      '</div>'

    const columnConfig = $(
      '<button class="btn btn-success customTableHeaderConfigButton" ' +
        'onclick="showColumnConfig(\'' +
        param.tabName +
        '\')">' +
        '<table cellspacing="2"> ' +
        '   <tbody>' +
        '       <tr> ' +
        '           <td><img src="img/preferences_system.png" style="width: 16px; height: 16px;"></td> ' +
        '           <td align="middle">' +
        $self.messages.columnSettings +
        '</td>' +
        '       </tr>' +
        '   </tbody>' +
        '</table>' +
        '</button>'
    )
    const panel = $('<table cellpadding="0" class="custom_table_panel"/>')
    const tr11 =
      '' +
      '<tr>' +
      '<td>' +
      '   <a href="#" class="open_close_custom_table">' +
      '       <table style="color: rgb(0, 0, 0); font-weight: bold;">' +
      '           <tr>' +
      '               <td align="center" style="width: 16px;">' +
      '                   <i id="custom_table_down_up_icon" class="custom_table_down_icon"></i></td>' +
      '               <td>' +
      param.headerTitle +
      (param.parentId != null
        ? ".<span style='color:#9c0000'>  Parent id = " + param.parentId
        : '</span>') +
      '</td>' +
      '           </tr>' +
      '       </table>' +
      '   </a>' +
      '</td>'
    // eslint-disable-next-line no-unused-expressions
    ;('</tr>')
    panel.html(tr11)
    const tab2 = $('<table style="width: 100%;" cellpadding="0"/>')
    let customTableHeader = $(
      '<td style="background-color: #DFE8F6;" class="custom_table_header"/>'
    )
    let customTableContentFooter = $(
      '<td class="custom_table_content_footer">&nbsp;</td>'
    )
    if (refreshUi === true) {
      customTableHeader = param.customTableHeader
      customTableContentFooter = param.customTableContentFooter
    } else {
      const saveButton = $(
        '<button class="btn btn-success customTableHeaderSaveButton"/>'
      ).data('tabName', param.tabName)
      const discardButton = $(
        '<button class="btn" style="height: 26px;color:red; font-weight: bold;"/>'
      )
        .data('tabName', param.tabName)
        .css('display', 'none')
      saveButton.html($self.messages.edit)
      discardButton.html($self.messages.discard)
      $self.saveCustomTableValue(saveButton)
      $self.clickDiscardButton(discardButton)

      customTableHeader.append(columnConfig)
      customTableHeader.append(saveButton)
      customTableHeader.append(discardButton)
      customTableHeader.append(columnConfigPanel)

      $self.params[param.tabName].columnConfig = columnConfig
      $self.params[param.tabName].saveBtn = saveButton
      $self.params[param.tabName].discardButton = discardButton
      $self.params[param.tabName].customTableHeader = customTableHeader
      $self.params[param.tabName].customTableContentFooter =
        customTableContentFooter
    }

    tab2.append($('<tr/>').append(customTableHeader))
    const table = $self.createTable(param)
    $self.custom_content_div = $(
      '<div class="custom_content_div tabName' + param.tabName + '"/>'
    )
    $self.custom_content_div.css('height', param.div_height)
    $self.custom_content_div.append(table)
    limitData = param

    $self.params[param.tabName].customTableContent = $(
      '<td class="custom_table_content"/>'
    )
    $self.params[param.tabName].customTableContent.append(
      $self.custom_content_div
    )
    tab2.append(
      $('<tr/>').append($self.params[param.tabName].customTableContent)
    )
    if (param.customTableContentFooterShow != null)
      tab2.append($('<tr/>').append(customTableContentFooter))

    const tr22 = $('<tr class="custom_table_content" opened/>')
    tr22.append($('<td/>').append(tab2))
    panel.append(tr22)
    param.parent_div.append(panel)
    $('.open_close_custom_table')
      .off('click')
      .on('click', function (e) {
        e.preventDefault()
        const obj = $(this)
          .parents('table.custom_table_panel tbody')
          .children('tr.custom_table_content')
        const obj2 = $(this)
          .children('table')
          .children('tbody')
          .children('tr')
          .children('td')
          .children('i')
        if (obj.attr('opened') != null) {
          obj.removeAttr('opened')
          obj2.removeAttr('class')
          obj2.attr('class', 'custom_table_up_icon')
        } else {
          obj.attr('opened', '')
          obj2.removeAttr('class')
          obj2.attr('class', 'custom_table_down_icon')
        }
        obj.toggle('slow')
      })
    jQuery('.custom_content_div').css('width', $('.main_content').width())
    if (param.editable) {
      const result = $self.getColCountAndWidth(param.columns)
      $self.setFixHeaderNoSorting(table)
      const divHead = $('div.tabName' + param.tabName).children(
        'div.fht-default'
      )
      if ($self.params[param.tabName].itemRows.length === 0) {
        $('div.' + param.tabName).css('margin-bottom', '-21px!important;')
        divHead.children('div.fht-thead').remove()
        divHead.children('div.fht-tbody').children('table').css('margin-top', 0)
      }
      divHead
        .children('div.fht-thead')
        .children('table.customTableForStyle')
        .css('width', result.tableWidth + 350)
      divHead
        .children('div.fht-tbody')
        .children('table.customTableForStyle')
        .css('width', result.tableWidth + 350)
    } else {
      const result = $self.getColCountAndWidth(param.columns)
      table.css('max-width', result.tableWidth + 100)
      table.css('width', result.tableWidth + 100)
      $self.setFixHeader(param.tabName, table)
      $('.setIntegerNumberFormat').number(true, 0, '.', ' ')
      $('.' + param.tabName + 'setFloatNumberFormat').number(
        true,
        param.numberFormatScale,
        '.',
        ' '
      )
    }
    $self.custom_content_div
      .children('div.fht-table-wrapper')
      .addClass('fht-table-wrapper2')
    $self.custom_content_div
      .children('div.fht-table-wrapper')
      .removeClass('fht-table-wrapper')

    if (param.sortable != null && param.sortable === true) {
      $('div.fht-tbody table tbody').sortable({
        items: 'tr:not(tbody tr:last)',
        stop: function (event, tr) {
          const tabName = tr.item.data().tabName
          const itemRows = $self.params[tabName].itemRows
          const itemRowsNew = []
          $.each($('div.fht-tbody table tbody tr'), function (indx, elem) {
            const index = $(elem).data().rowIndex
            if (index != null) {
              itemRowsNew[indx] = itemRows[index]
              $(elem).data('rowIndex', indx)
            }
          })
          $self.params[tabName].itemRows = itemRowsNew
        },
      })
    }

    $self.removeLoading()
  }

  $self.clickDiscardButton = function (obj) {
    $(obj)
      .off('click')
      .on('click', function () {
        const tabName = $(this).data().tabName
        const params = $self.params[tabName]
        params.editable = false
        params.saveBtn.attr('editSave', true)
        params.saveBtn.html($self.messages.edit)
        params.discardButton.css('display', 'none')
        $self.refreshTable(params)
        return 'Discard Button Clicked!!!'
      })
  }

  $self.refreshTable = function (param) {
    $self.initU(param, true)
    return 'TABLE REFRESHED!!!'
  }

  const showColumnConfig = function (uiName) {
    columnConfigTableName = uiName
    const URL = 'columnsConfigU.htm' + '?actionUrl=' + uiName
    $.ajax({
      url: URL,
      type: 'POST',
      cache: false,
      success: function (data) {
        $('div.modal-body').html('')
        $(
          '.' + uiName + ' div.modal-dialog div.modal-content div.modal-body'
        ).html(data)
        $('.' + uiName).modal('show')
      },
    })
  }

  $self.deleteItemFromDatabse = function (tabName, deleteId, elem, index) {
    // loaderIconAnimate();
    const data = '{"deleteItemId":' + deleteId + '}'
    const params = $self.params[tabName]
    $.ajax({
      url: $self.params[tabName].saveActionUrl + '.htm',
      type: 'POST',
      data,
      cache: false,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (object) {
        if (object === null) {
          params.itemRows[index] = null
          jQuery(elem).parent('td').parent('tr').remove()
          params.discardButton.css('display', 'none')
          // loaderIconAnimateRemove();
          notificationMessage('Successfully delete an item.')
        } else {
          // l(" object.deleteItemId " + object.deleteItemId)
          // eslint-disable-next-line no-lonely-if
          if (
            object.deleteItemId != null &&
            object.deleteItemId !== 1 &&
            object.deleteItemId !== 2
          ) {
            notificationMessage('Can not delete an item.')
          } else {
            params.itemRows[index] = null
            jQuery(elem).parent('td').parent('tr').remove()
            params.discardButton.css('display', 'none')
            if (object.deleteItemId === null || object.deleteItemId === 1) {
              // loaderIconAnimateRemove();
              notificationMessage('Successfully delete an item.')
            } else if (object.deleteItemId === 2) {
              refreshOpenObjectUI(
                window.location.pathname,
                window.location.search
              )
            }
          }
        }
        $self.removeLoading()
      },
      error: function (response) {
        notificationMessage('Can not delete an item.')
      },
    })
  }

  $self.saveCustomTableValue = function (obj) {
    $(obj)
      .off('click')
      .on('click', function () {
        const tabName = $(this).data().tabName
        const params = $self.params[tabName]
        const saveBtn = params.saveBtn
        const objectListName = params.objectListName
        const responseJsonObjName = params.responseJsonObjName
        if (params.editable === false) {
          params.discardButton.css('display', '')
          params.editable = true
          params.saveBtn.html($self.messages.save)
          $self.refreshTable(params)
          return
        }
        const items = $self.getTableValues(tabName)
        if (items === null) {
          return
        }
        const data =
          '{' +
          '"id":' +
          params.parentId +
          ',' +
          '"' +
          objectListName +
          '":' +
          items +
          '}'
        saveBtn.attr('disabled', 'disabled')
        // loaderIconAnimate();
        $.ajax({
          url: params.saveActionUrl + '.htm',
          type: 'POST',
          data,
          cache: false,
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (response) {
            saveBtn.removeAttr('disabled')
            let dataList = response[responseJsonObjName]
            dataList = JSON.parse(dataList)
            params.discardButton.css('display', 'none')
            params.values = dataList
            params.editable = false
            params.saveBtn.html($self.messages.edit)
            $self.refreshTable(params)
            // loaderIconAnimateRemove();
            if (tabName === 'warpTable' || tabName === 'weftTable') {
              window.location.reload()
            }
          },
          error: function () {
            if (tabName === 'warpTable' || tabName === 'weftTable') {
              window.location.reload()
            }
            saveBtn.removeAttr('disabled')
            notificationMessage('You can not save.')
          },
        })
      })
  }

  // eslint-disable-next-line no-unused-vars
  function saveColumnConfig() {
    let leftDiv = ''
    let idz = ''
    let columnWidth = ''
    const orderProductionTypeId = $('#orderProductionTypeId').val()
    const productProductionTypeId = $('#productProductionTypeId').val()
    jQuery('#leftDiv')
      .children('.ulclass')
      .each(function (i) {
        const obj = $(this).children('.sortablehover').children('.lab')
        idz = obj.attr('id')
        columnWidth = obj.children('input[name=column_width]').val()
        // l(column_width)
        idz += '=' + columnWidth
        leftDiv = leftDiv + idz + ','
      })
    leftDiv = leftDiv.substring(0, leftDiv.length - 1)
    const data =
      '{' +
      '"actionUrl":"' +
      columnConfigTableName +
      '",' +
      '"userColumns":"' +
      leftDiv +
      '",' +
      '"defaultInvoiceColumns":"orderProductionTypeId=' +
      orderProductionTypeId +
      ',productProductionTypeId=' +
      productProductionTypeId +
      '",' +
      '"autoHeightItem":' +
      $("input:checkbox[class='autoHeightClass']").is(':checked') +
      ',' +
      '"openPopupItem":' +
      $("input:checkbox[class='openPopupClass']").is(':checked') +
      ',' +
      '"autoEditOpenItem":' +
      $("input:checkbox[class='autoEditOpenClass']").is(':checked') +
      '}'
    $.ajax({
      url: 'saveColumnConfigU.htm',
      type: 'POST',
      cache: false,
      data,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      traditional: true,
      success: function (response) {
        window.location.reload()
      },
      error: function () {
        notificationMessage('Can not save.')
      },
    })
  }

  $self.setFixHeaderNoSorting = function (table) {
    $self.custom_content_div.removeClass('scrollCutomTable')
    table.addClass('fancyTable customTableForStyle')
    console.log(table.fixedHeaderTable, table)
    table.fixedHeaderTable({
      footer: false,
      cloneHeadToFoot: true,
      autoShow: false,
    })
    table.fixedHeaderTable('show', 0)
    $('.lyingRow').remove()
  }

  $self.setFixHeader = function (tabName, table) {
    $self.custom_content_div.addClass('scrollCutomTable')
    table.addClass('fancyTableSearch customTableForStyle')
    table
      .tablesorter({
        widthFixed: true,
        headerTemplate: '{content} {icon}',
        widgets: ['zebra', 'stickyHeaders', 'filter'],
        widgetOptions: {
          stickyHeaders_attachTo: $self.custom_content_div,
        },
      })
      .bind('filterEnd', function () {
        const $rows = table.children('tbody').children('tr:visible')
        $('#countCourseRow').html('')
        $('#countCourseRow').html('<b>Found :</b> ' + $rows.length)
        let elemVal = 0
        let firstTime = true
        const totalSummElemVal = []
        const numerElem = []
        let numerElemIndex = 0
        $rows.each(function (i, row) {
          if (firstTime) {
            firstTime = false
            $(row)
              .find('td')
              .each(function (j, td) {
                const objAttr = td.hasAttribute('sum_column')
                if (objAttr) {
                  numerElem[numerElemIndex] = j
                  totalSummElemVal[numerElemIndex++] = 0
                }
              })
          }
          $.each(numerElem, function (key, column) {
            elemVal = parseFloat(
              $(row).find('td').eq(column).text().replace(/\s/g, '')
            )
            elemVal = isNaN(elemVal) ? 0 : elemVal
            totalSummElemVal[key] += elemVal
          })
        })

        const tfootTds = $('tfoot[tabname="' + tabName + '"] tr').find('td')
        tfootTds.each(function (i, td) {
          if (i !== 0) $(td).html('')
        })
        const footClass = tabName + 'setFloatNumberFormatTotalSum'
        $.each(numerElem, function (key, column) {
          const td = tfootTds.eq(column)
          td.attr('class', footClass)
          td.html(totalSummElemVal[key])
        })

        $('.setIntegerNumberFormatTotalSum').number(true, 0, '.', ' ')
        $('.' + footClass).number(
          true,
          $self.params[tabName].numberFormatScale,
          '.',
          ' '
        )
      })
  }

  $self.removeLoading = function () {
    // loaderIconAnimateRemove();
  }

  $self.setTableValues = function (tabName, values) {
    $.each(values, function (index, value) {
      $self.params[tabName].itemRows[index] = $self.appendItemRows(
        tabName,
        value
      )
    })
    return $self.params[tabName].itemRows
  }

  $self.addAnItemClick = function (obj) {
    obj.off('click').on('click', function () {
      const tabName = $(this).data().tabName
      $self.appendItemRows(tabName, null, obj)

      setLimitToInput('.input__class')
    })
  }

  $self.returnNewRows = function (tabName, values) {
    const itemRows = []
    let id = $self.params[tabName].indexU
    $.each(values, function (index, value) {
      itemRows[++id] = $self.appendItemRows(tabName, value)
      $self.params[tabName].itemRows[id] = itemRows[id]
    })
    return itemRows
  }

  $self.appendItemRows = function (tabName, value, thisElement) {
    // here
    customPopupAddAnRowElement = thisElement
    const itemRow = {}
    const dataIndex = ++$self.params[tabName].indexU
    let itemID = null

    $.each($self.params[tabName].columns, function (index, column) {
      // console.log(column, 'column');
      const name = column.name
      const type = column.type // todo type in {hidden, label, button, string, integer, float, list, checkbox, date}
      const headerText = column.headerText
      const dwidth = column.dwidth // todo dwidth is must be int number
      const required = column.required // todo required in{true,false}
      const resultType = column.resultType // todo resultType in{object,null}
      const durl = column.durl
      let refColName = column.refColName
      const param = column.param
      // const showUI = column.showUI; // todo resultType in{true,false}
      // const editableElement = column.editableElement;

      let id = null
      const _default = column.default
      let text = null
      let objParam = null
      if (value != null && value[name] != null) {
        if (
          type === 'list' ||
          type === 'file_image' ||
          (type === 'label' && resultType === 'object')
        ) {
          id = value[name].id
          objParam = value[name].obj_param
          text = value[name].text
          if (id === null && type === 'list' && _default != null) {
            id = _default.id
            text = _default.text
          }
        } else {
          text = value[name]
          id = text
        }
      } else if (column.default != null && value === null) {
        id = column.default.id
        text = column.default.text
      }

      if (headerText === 'Item Id') {
        itemID = id
      }

      let element
      if (type === 'hidden' && param != null && param === 'date') {
        element = $('<input type="hidden"/>')
        element.customDateSetVal(text)
      } else if (type === 'hidden') {
        element = $('<input type="hidden"/>').data('val', text)
      } else if (type === 'label') {
        element = $('<label/>')
        // eslint-disable-next-line object-shorthand
        element.data({ val: id, text: text })
        element.html(text)
      } else if (type === 'float') {
        element = $(
          '<input type="text" class="input__class" limit="' +
            limitData.numberFormatScale +
            '"/>'
        )
        element.attr('data-num')
        element.floatNumber()
        element.data({ val: text })
        element.val(text)
      } else if (type === 'intNumber') {
        element = $(
          '<input type="number" class="input__class" limit="' +
            limitData.numberFormatScale +
            '"/>'
        )
        element.attr('data-num')
        element.floatNumber()
        element.data({ val: text })
        element.val(text)
      } else if (type === 'integer') {
        element = $('<input type="text"/>')
        element.intNumber()
        element.val(text)
        // element.numberField({ints: 6, floats: 4, separator: "."});
      } else if (type === 'string') {
        element = $('<input type="text"/>')
        element.val(text)
      } else if (type === 'button') {
        let text1, text2
        if (tabName === 'designAndProduct') {
          element = $('<button>' + name + '</button>')
        } else {
          if (name === 'openDetails') {
            text1 = column.text
            text2 = column.noText
          } else if (name === 'openRecipe') {
            text1 = column.text
            text2 = column.noText
          } else {
            text1 = text
            text2 = column.noText != null ? column.noText : '-'
          }
          element =
            value != null
              ? $('<button>' + text1 + '</button>')
              : $('<label> ' + text2 + '</label>')
        }

        element.addClass(param)
      } else if (type === 'checkbox') {
        element = $('<input type="checkbox" />')
        element.attr('checked', text)
      } else if (type === 'date') {
        element = $('<input type="text"/>').datepicker(pickerOpts)
        element.customDateSetVal(text)
      } else if (type === 'list') {
        element = $('<div/>')
        // eslint-disable-next-line object-shorthand
        element.data({ durl: durl, val: id, obj_param: objParam, text: id })
        element.attr('title', text)
        element.attr('durltable', '')
        element.attr('dtext', text)
        element.attr('dwidth', dwidth)
        element.attr('ddisabled', param)
        const select = $('<select/>')
        element.append(select)
        if (durl === 'searchProductList2') {
          element.attr('selector-div', 'selector')
          select.attr('product-select', 'product')
        } else if (durl === 'findAllColorVariant') {
          select.off('change').on('change', function (event) {
            if (event.target.value) {
              let fullData = element.attr('full_custom_data')
              fullData = JSON.parse(fullData)
              const parentEl = element.parent()
              const prevSibling = parentEl.prev()
              const nextSibling = parentEl.next()
              const colorDiv = prevSibling.children('div')
              colorDiv
                .children('input')
                .val(fullData.color_name.replace('//', ''))
              colorDiv.data({
                val: fullData.color_id,
                text: fullData.color_id,
                text_val: fullData.color_name.replace('//', ''),
              })
              nextSibling.children('label').data({
                val: fullData.pantonecode,
                text: fullData.pantonecode,
              })
              nextSibling.children('label').html(fullData.pantonecode)
            }
          })
        } else if (durl === 'findAllColor') {
          select.attr('onchange', 'selectColor(this,event)')
        }
        select.data('index', dataIndex)
        select.data('cname', tabName + '_' + name)
        const refVal =
          value != null && refColName != null && value[refColName] != null
            ? value[refColName].id
            : null
        if (refVal != null) {
          element.data('dparam', "\\'" + refColName + "Id\\':" + refVal)
        }

        if (tabName === 'designAndProduct') {
          refColName = 'designAndProduct'
          element.data('dparam', "\\'" + refColName + "Id\\':" + itemID)
        }
        select.css('display', 'none')
        const input = $('<input type="text" class="custom_widget_list"/>')
        input.attr('required', required)
        input.css('width', dwidth - 25)
        input.val(text)
        element.append(input)
        element.append(
          '<i class="icon-chevron-down icon_list custom_down_click"/>'
        )
      } else if (type === 'file_image') {
        if (text === null) {
          text = 'img/no_image.gif'
          // dwidth = 85;
        }
        element = $('<img src="' + text + '"/>')
        element.css('height', 70)
        element.data({ val: id, text: id })
      } else if (type === 'file') {
        element = $('<div/>')
        element.append('<input type="file" style="height: 25px;"/>')
        element.css('height', 30)
        const div = $('<div class="imgTest"/>')
        div.append('<ul class="fileList"/>')
        // console.log(text);
        if (text !== '' && text != null) {
          const data = JSON.parse(text)
          const images = data.images
          data.images = images
          for (let i = 0; i < images.length; i++) {
            const newImage = document.createElement('img')
            newImage.src = images[i].image
            newImage.style.width = '50px'
            newImage.style.height = '50px'
            div
              .append(newImage.outerHTML)
              .append('<input type="button" value="X" img-id=' + i + '>')
          }
        }
        element.append(div)
      }
      if (
        $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1 &&
        value === null
      ) {
        let defId
        let defText
        if (column.default != null) {
          // eslint-disable-next-line no-unused-vars
          defId = column.default.id
          defText = column.default.text
        }
        if (type === 'date') {
          element.customDateSetVal(defText)
        } else {
          element.val(defText)
        }
      }

      if (name === 'stillage') {
        element.attr('class', 'stillage-input')
        if (value !== null) {
          element.val(value.stillage)
        }
      }

      element.css('width', dwidth)
      element.attr('required', required)
      element.attr('cname', tabName + '_' + name)
      element.data('cname', tabName + '_' + name)
      element.attr('index', dataIndex)
      element.data('index', dataIndex)
      itemRow[name] = element
      itemRow['disable' + name] = value != null ? value['disable' + name] : null
    })
    $self.setItemRowOnChangeEvents(tabName, itemRow, value)

    // eslint-disable-next-line no-unused-expressions
    value != null ? (itemRow['disableRow'] = value.disableRow) : false
    if (value === null && itemRow != null) {
      $self.customPopupItemRow = itemRow
      if (
        $self.params[tabName].openPopup != null &&
        !$self.params[tabName].openPopup
      ) {
        customPopupAcceptClick(tabName, true)
        return
      }
      let customAddItemPopupDivLocal = customAddItemPopupDiv
      customAddItemPopupDivLocal = customAddItemPopupDivLocal.replace(
        '$tabName',
        tabName
      )
      customAddItemPopupDivLocal = customAddItemPopupDivLocal.replace(
        'CreateOrderLines',
        $self.params[tabName].headerTitle
      )
      $('body').append(customAddItemPopupDivLocal)
      $('.customTableAddItePupop').draggable()
      const customPupopTbody = $('.customPupopTbody')
      const customPupopTbody2 = $('.customPupopTbody2')
      let tr = $('<tr/>')
      let colunmCount = 0
      $.each($self.params[tabName].columns, function (ind, column) {
        const type = column.type
        const showUI = column.showUI
        if (
          showUI === true &&
          $.inArray(type, ['hidden', 'button', 'label', 'file_image']) === -1
        ) {
          colunmCount++
        }
      })
      colunmCount =
        colunmCount % 2 === 0 ? colunmCount / 2 : (colunmCount + 1) / 2
      let count = 1
      $.each($self.params[tabName].columns, function (ind, column) {
        let td
        const name = column.name
        const type = column.type
        const showUI = column.showUI
        const obj = itemRow[name]
        if (
          showUI === true &&
          $.inArray(type, ['hidden', 'button', 'label', 'file_image']) === -1
        ) {
          td = $('<td style="width: 180px;font-weight: bold;"/>')
          td.html(column.headerText)
          tr.append(td)
          td = $('<td style="width: 180px;"/>')
          td.append(obj)
          tr.append(td)
          if (count <= colunmCount) {
            customPupopTbody.append(tr)
          } else {
            customPupopTbody2.append(tr)
          }
          count++
          tr = $('<tr/>')
        }
      })

      // customPupopTbody.sortable({
      //    cursor: 'pointer',
      //    revert: false,
      //    distance: 4,
      //    helper: 'clone',
      //    revert: 'invalid',
      //    stop: function (event, uiVar) {
      //    },
      //    start: function (e, uiVar) {
      //        $(uiVar.helper).addClass('ui-draggable-helperUC');
      //    }
      // });
      //
      // customPupopTbody2.sortable({
      //    cursor: 'pointer',
      //    revert: false,
      //    distance: 4,
      //    helper: 'clone',
      //    revert: 'invalid',
      //    stop: function (event, uiVar) {
      //    },
      //    start: function (e, uiVar) {
      //        $(uiVar.helper).addClass('ui-draggable-helperUC');
      //    }
      // });

      const x = $(window).width() / 2 - 400
      const y = $(window).height() / 2 - 250 + $(window).scrollTop()
      $('.customTableAddItePupop')
        .css('left', x)
        .css('top', y)
        .css('display', 'block')
      $('.customTableAddItePupop').delay(10).fadeIn('slow')
      jQuery('body').append(disableBackendDiv)
    } else {
      return itemRow
    }
  }

  const customPopupAcceptClick = function (tabName, salePopup) {
    const validatHeader = $self.messages.invalidFields
    const itemRows = $self.customPopupItemRow
    const columns = $self.params[tabName].columns
    const resVlidate = $self.validateValues([itemRows], columns)

    if (resVlidate.length > 0 && salePopup === null) {
      notificationMessage(validatHeader, resVlidate)
      return
    }
    const tr = $('<tr/>')
    tr.append(
      '<td style="width:25px!important; white-space: nowrap">' +
        ($self.params[tabName].indexU + 1) +
        '</td>'
    )
    $.each(columns, function (ind, column) {
      const td = $('<td/>')
      const type = column.type
      const name = column.name
      const showUI = column.showUI
      const resultType = column.resultType
      let obj = itemRows[name]
      if (showUI === true) {
        if (type === 'label') {
          if (resultType === 'object') {
            obj = obj.data().text
            td.attr('count-unit-id', 'unit-id')
          }
        }
        td.append(obj)
        tr.append(td)
      }
      if (type === 'list' && column.durl === 'searchProductList2') {
        const div = td.find('[selector-div="selector"]')
        const select = td.find('[product-select="product"]')
        select.off('change').on('change', function (event) {
          if (event.target.value) {
            let fullData = div.attr('full_custom_data')
            fullData = JSON.parse(fullData)
            tr.find('[count-unit-id="unit-id"]').text(fullData.um)
          }
        })
      }
    })
    tr.append(
      '<td> <a class="remove_item" onclick="deleteRowU(\'' +
        tabName +
        '\',this)"></a></td>'
    )
    tr.data('tabName', tabName)
    tr.data('rowIndex', $self.params[tabName].indexU)
    $(customPopupAddAnRowElement).parent('td').parent('tr').before(tr)
    let divElem = $(customPopupAddAnRowElement)
      .parent('td')
      .parent('tr')
      .parent('tbody')
      .parent('table')
      .parent('div.scrollCutomTable')
    divElem = $(customPopupAddAnRowElement)
      .parent('td')
      .parent('tr')
      .parent('tbody')
      .parent('table')
      .parent('div.fht-tbody')
    divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)

    $self.params[tabName].itemRows[$self.params[tabName].indexU] = itemRows
    $self.customPopupItemRow = null
    $('.customTableAddItePupop').remove()
    $('.disableBackendDiv').remove()
  }

  $self.createTable = function (param) {
    const tabName = param.tabName
    const columns = param.columns
    const values = param.values
    const editable = param.editable

    const table = $('<table/>')
    const itemRows = $self.setTableValues(tabName, values)
    table.append($self.createThead(columns, editable))
    table.append($self.createTbody(param, itemRows))
    if (!editable) table.append($self.createTfoot(tabName, columns))
    return table
  }

  $self.createThead = function (columns, editable) {
    const thead = $('<thead/>')
    const tr = $('<tr/>')
    tr.append(
      '<th style="width:25px!important; white-space: nowrap"  data-sorter="' +
        !editable +
        '">№</th>'
    )
    $.each(columns, function (index, column) {
      if (column.showUI === true) {
        const th = $('<th data-sorter="' + !editable + '"/>')
        if (editable) th.css('white-space', 'nowrap')
        th.css('width', column.dwidth)
        th.html(column.headerText)
        tr.append(th)
      }
    })

    if (editable) {
      const th = $('<th data-sorter="false"/>')
      th.html('')
      tr.append(th)
    }
    thead.append(tr)
    return thead
  }

  $self.createTfoot = function (tabName, columns) {
    const tfoot = $('<tfoot tabname="' + tabName + '"/>')
    const tr = $('<tr/>')
    tr.append('<td>Total:</td>')
    $.each(columns, function (index, column) {
      if (column.showUI === true) {
        const td = $('<td></td>')
        tr.append(td)
      }
    })
    tfoot.append(tr)
    return tfoot
  }
  $self.createTbody = function (param, itemRows) {
    const tabName = param.tabName
    const columns = param.columns
    const editable = param.editable
    const forSalePupop = param.forSalePupop
    const parenIdVal = param.parentId
    // eslint-disable-next-line no-unused-vars
    const currencyRateVal = param.currencyRate
    const invoiceItemsEditable = param.invoiceItemsEditable
    // let td;
    // let tr;
    const tbody = $('<tbody/>')

    $self.addItemRowsToBody(param, tbody, itemRows)

    if (editable === true) {
      const result = $self.getColCountAndWidth(columns)
      tbody.append(result.lyingRow)
      const tr = $('<tr/>')
      const td = $(
        '<td id="addanitem" style="padding-top: 1px; padding-bottom: 15px;" colspan=' +
          result.colunm_count +
          '/>'
      )
      const a = $('<a class="btn"/>')
      a.data('tabName', tabName)
      a.data('parentId', parenIdVal)
      $self.params[tabName].customPopupAddAnRowElement2 = a
      a.html('Add an item')
      $('#expenseCurrencyRateName').val('CurrencyRateName')

      if (tabName === 'internalInvoiceItemTable') {
        if (invoiceItemsEditable) {
          if (forSalePupop === true) $self.addAnItemClickForSale(a)
          else $self.addAnItemClick(a)
          td.append(a)
        } else {
          // eslint-disable-next-line no-unused-expressions
          itemRows['disableRow']
        }
      } else {
        if (forSalePupop === true) $self.addAnItemClickForSale(a)
        else $self.addAnItemClick(a)
        td.append(a)
      }
      tbody.append(tr.append(td))
      $self.addAnItem = a
    }
    return tbody
  }

  $self.addItemRowsToBody = function (param, tbody, itemRows) {
    const columns = param.columns
    const tabName = param.tabName
    const editable = param.editable
    const invoiceItemsEditable = param.invoiceItemsEditable
    $.each(itemRows, function (id, itemRow) {
      if (itemRow != null) {
        const tr = $('<tr/>')
        tr.append('<td>' + (id + 1) + '</td>')
        const trStrObj = $('<tr>')
        trStrObj.append('<td>' + (id + 1) + '</td>')
        $.each(columns, function (ind, column) {
          let td = $('<td/>')

          const type = column.type
          if (type === 'file') {
            td = $('<td height="100px"/>')
          }
          const name = column.name
          const showUI = column.showUI
          const dwidth = column.dwidth
          const refColName = column.refColName
          const param = column.param
          const resultType = column.resultType
          const sumColumn = column.sumColumn != null ? column.sumColumn : ''
          let editableElement = column.editableElement
          const editableRowElement = itemRow['disable' + name]
          if (editableRowElement != null) editableElement = false

          let obj = itemRow[name]
          if (showUI === true) {
            let val = ''
            if (type === 'label') {
              val = editable ? obj : obj.data().val
              if (resultType === 'object') {
                val = obj.data().text
                obj = val
              }
              if (param === 'virtualColumn') val = obj.data().val
            } else if ($.inArray(type, ['float', 'integer', 'date']) !== -1) {
              val = obj.val()
            } else if ($.inArray(type, ['string']) !== -1) {
              if (param != null && param === 'showAlways') {
                val = obj
              } else {
                val = obj.val()
              }
            } else if (type === 'checkbox') {
              if (refColName != null) {
                val = obj
              } else {
                val = !!obj.is(':checked')
              }
            } else if (type === 'list') {
              if (param != null && param === 'showAlways') {
                val = obj
              } else val = obj.children('input').val()
            } else if (type === 'button') {
              if (refColName != null) {
                obj.css({
                  margin: '1px',
                  padding: '1px',
                  'font-size': '12px',
                  width: dwidth,
                })
                val = obj
              } else val = obj.html()
            }
            let setNumberFormatClass =
              param != null && (param === 'noFormat' || param === 'objectId')
                ? param
                : ''
            if (
              (type === 'float' || (type === 'label' && param === 'float')) &&
              param !== 'noFormat'
            )
              setNumberFormatClass = tabName + 'setFloatNumberFormat'
            else if (
              (type === 'integer' ||
                (type === 'label' && param === 'integer')) &&
              param !== 'noFormat'
            )
              setNumberFormatClass = 'setIntegerNumberFormat'

            if (
              (type === 'button' ||
                type === 'list' ||
                type === 'checkbox' ||
                type === 'string') &&
              (refColName != null || param === 'showAlways')
            ) {
              if (editableElement === false) val = ''
              trStrObj.append($('<td/>').append(val))
            } else if (type === 'file') {
              val = obj
              trStrObj.append($('<td height="100px"/>').append(obj))
            } else if (type === 'file_image') {
              val = obj
              trStrObj.append($('<td/>').append(obj))
            } else
              trStrObj.append(
                '<td ' +
                  sumColumn +
                  ' class="' +
                  setNumberFormatClass +
                  '">' +
                  (val != null ? val : '') +
                  '</td>'
              )

            if (
              editable === true &&
              tabName === 'internalInvoiceItemTable' &&
              !invoiceItemsEditable
            ) {
              td.html(val)

              tr.append(td)
            } else if (editable === true) {
              if (
                itemRow['disableRow'] &&
                type !== 'button' &&
                type !== 'checkbox'
              )
                td.html(val)
              else if (editableElement === false) {
                if (type === 'button') val = ''
                td.html(val)
              } else td.append(obj)

              tr.append(td)
            }
          }
        })

        if (
          editable === true &&
          tabName === 'internalInvoiceItemTable' &&
          !invoiceItemsEditable
        ) {
          tr.data('rowIndex', id)
          tr.data('tabName', tabName)
          tbody.append(tr)
        } else if (editable === false) {
          tbody.append(trStrObj)
        } else {
          if (itemRow['disableRow'])
            tr.append('<td> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>')
          // todo for deleteRowU
          else
            tr.append(
              '<td> <a class="remove_item" onclick="deleteRowU(\'' +
                tabName +
                '\',this)"></a></td>'
            )
          tr.data('rowIndex', id)
          tr.data('tabName', tabName)
          tbody.append(tr)
        }
      }
    })
  }
  $self.getColCountAndWidth = function (columns) {
    let tableWidth = 0
    let colunmCount = 2
    let lyingRow = '<tr class="lyingRow">'
    $.each(columns, function (ind, column) {
      const showUI = column.showUI
      if (showUI === true) {
        colunmCount++
        lyingRow += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'
        tableWidth += column.dwidth
      }
    })
    lyingRow += '</tr>'
    const result = {}
    result.colunm_count = colunmCount
    result.lyingRow = lyingRow
    result.tableWidth = tableWidth
    return result
  }

  // eslint-disable-next-line no-unused-vars
  const deleteRowU = function (tabName, elem) {
    const index = $(elem).parent('td').parent('tr').data().rowIndex
    const deletItemId = $self.params[tabName].itemRows[index].id.data().val
    if (deletItemId != null && deletItemId.length !== 0) {
      confirmDialog($('areYouSureDeleteItem').html(), function () {
        $self.deleteItemFromDatabse(tabName, deletItemId, elem, index)
      })
    } else {
      $self.params[tabName].itemRows[index] = null
      $(elem).parent('td').parent('tr').remove()
    }
  }

  $self.validateValues = function (itemRows, columns) {
    let error = ''
    $.each(itemRows, function (id, itemRow) {
      if (itemRow != null) {
        $.each(columns, function (ind, column) {
          const type = column.type
          const name = column.name
          const headerText = column.headerText
          const showUI = column.showUI
          const required = column['required']
          let obj = itemRow[name]
          // eslint-disable-next-line no-unused-vars
          const val = ''
          if (
            showUI === true &&
            $.inArray(type, ['label', 'button', 'hidden']) === -1
          ) {
            obj.css('border-color', '')
            if (type === 'list') {
              obj.children('input').css('border-color', '')
            }
            if (
              $.inArray(type, ['float', 'integer']) !== -1 &&
              obj.val().length !== 0 &&
              isNaN(Number(obj.val()))
            ) {
              obj.css('border-color', 'red')
              // eslint-disable-next-line unicorn/prefer-includes
              if (error.indexOf('<li>' + headerText + '</li>') === -1)
                error += '<li>' + headerText + '</li>'
            }
            if (
              type === 'date' &&
              obj.val().length !== 0 &&
              !obj.isDateValid()
            ) {
              obj.css('border-color', 'red')
              // eslint-disable-next-line unicorn/prefer-includes
              if (error.indexOf('<li>' + headerText + '</li>') === -1)
                error += '<li>' + headerText + '</li>'
            }
            if (required === true) {
              let value = obj.val().length === 0 ? null : obj.val()
              if (type === 'list') {
                value = obj.data().val
                obj = obj.children('input')
              }
              if (value === null) {
                obj.css('border-color', 'red')
                // eslint-disable-next-line unicorn/prefer-includes
                if (error.indexOf('<li>' + headerText + '</li>') === -1)
                  error += '<li>' + headerText + '</li>'
              }
            }
          }
        })
      }
    })
    return error
  }

  $self.getTableValues = function (tabName) {
    const validatHeader = $self.messages.invalidFields
    const itemRows = $self.params[tabName].itemRows
    const columns = $self.params[tabName].columns
    const resVlidate = $self.validateValues(itemRows, columns)
    if (resVlidate.length > 0) {
      notificationMessage(validatHeader, resVlidate)
      return
    }
    let allRows = ''
    let tempval = 0
    $.each(itemRows, function (id, itemRow) {
      if (itemRow != null) {
        let rowVals = ''
        $.each(columns, function (ind, column) {
          const name = column.name
          const type = column.type
          const param = column.param
          const resultType = column.resultType

          let elemVal = ''
          let val = ''
          const obj = itemRow[name]
          if (type === 'checkbox') {
            val = !!obj.is(':checked')
          } else if (
            type === 'date' ||
            (type === 'hidden' && param != null && param === 'date')
          ) {
            val = obj.customDateGetVal()
          } else if (
            $.inArray(type, ['hidden', 'label', 'list', 'file_image']) !== -1
          ) {
            val = obj.data().val != null ? obj.data().val : null
            if (resultType === 'object' && val != null && val.id != null)
              val = val.id
          } else if ($.inArray(type, ['string', 'float', 'integer']) !== -1) {
            val = obj.val().length !== 0 ? obj.val() : null
            if (name === 'packNumber') {
              if (val === null) {
                tempval++
                val = tempval
              }
              if (tempval - val < 0) {
                tempval = val
              }
            }
          }
          if (val != null && val.length !== 0) {
            if (resultType === null) elemVal = '"' + name + '":"' + val + '",'
            else elemVal = '"' + name + '":{"id":' + val + '},'
          }
          if (param !== 'virtualColumn') rowVals += elemVal
        })
        allRows += '{' + rowVals.substring(0, rowVals.length - 1) + '},'
      }
    })
    const data = '[' + allRows.substring(0, allRows.length - 1) + ']'
    return data
  }
  // todo start for sale invoicec popup

  $self.GET_BUTTON = null
  $self.acceptSalePopupBtnGlobal = null
  $self.addAnItem = null
  $self.warehouse = null
  $self.salePopupItemRows = []
  $self.orderProductionType = null
  $self.returnCompany = null
  $self.returnEmployee = null
  $self.planningProductId = null
  $self.salesClientCompany = null
  $self.addAnItemClickForSale = function (obj) {
    obj.off('click').on('click', function () {
      const tabName = obj.data().tabName
      const parentId = obj.data().parentId

      const col = $self.params[tabName].columns
      const result = $self.createTable2(tabName, col, [])
      $self.ViewPopup(result.content, tabName, parentId)
    })
  }

  $self.ViewPopup = function (content, tabName, parentId) {
    const salePopupDiv = $('<div class="customTableAddItePupop"></div>')
    const salePopupContentDiv = $('<div class="popupContent"></div>')
    let parentIdVal = null
    if (
      parentId !== 'null' &&
      parentId !== 'undefined' &&
      parentId !== undefined
    ) {
      parentIdVal = parentId
    }
    const fromBatchDetailTableRow = parentId === 'batchDetailTable'

    const batchNumber = $('<input type="text" class="customInput114">')
    // batchNumber.intNumber();
    batchNumber.off('keyup').on('keyup', function (event) {
      // if (batchNumber.val().length > 0 && event.which === 13) {
      if (event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        // itemBarcode.val(null);
        // commonBarcode.val(null);
        // productBarcode.val(null);
        qty.val(null)
        const batchNumberVal =
          batchNumber.val.length > 0 ? batchNumber.val() : -1
        const packingNumbersVal =
          packingNumber.val.length > 0 ? packingNumber.val() : null
        const lotNumberVal = lotNumber.val.length > 0 ? lotNumber.val() : null
        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }
        const data =
          "{'batchNumber': '" +
          batchNumberVal +
          "','warehouseId': " +
          warehouseId +
          ",'lot':'" +
          lotNumberVal +
          "','packingNumbers':'" +
          packingNumbersVal +
          "'"
        findInvoiceItemListJQuery(data)
      }
    })
    const lotNumber = $('<input type="text" class="customInput114">')
    lotNumber.off('keyup').on('keyup', function (event) {
      if (lotNumber.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        // itemBarcode.val(null);
        // commonBarcode.val(null);
        qty.val(null)
        const packingNumbersVal =
          packingNumber.val.length > 0 ? packingNumber.val() : null

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'lot': '" +
          lotNumber.val() +
          "','warehouseId': " +
          warehouseId +
          ",'packingNumbers': '" +
          packingNumbersVal +
          "'"
        findInvoiceItemListJQuery(data)
      }
    })
    const pusNumber = $('<input type="text" class="customInput114">')
    pusNumber.floatNumber()
    pusNumber.off('keyup').on('keyup', function (event) {
      if (pusNumber.val().length > 0 && event.which === 13) {
        qty.val(null)
        const feineVl = feineNumber.val().length > 0 ? feineNumber.val() : null
        const gramVl = grammNumber.val().length > 0 ? grammNumber.val() : null
        const pusVl = pusNumber.val().length > 0 ? pusNumber.val() : null
        const lotVl =
          lotNumber.val().length > 0 ? "'" + lotNumber.val() + "'" : null
        const productIdVl = productLookUpSelect.val()

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'gramm': " +
          gramVl +
          ",'warehouseId': " +
          warehouseId +
          ",'feine':" +
          feineVl +
          ",'pus':" +
          pusVl +
          ",'lot':" +
          lotVl +
          ",'productId':" +
          productIdVl
        findInvoiceItemListJQuery(data)
      }
    })

    const feineNumber = $('<input type="text" class="customInput114">')
    feineNumber.floatNumber()
    feineNumber.off('keyup').on('keyup', function (event) {
      if (feineNumber.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        qty.val(null)
        const feineVl = feineNumber.val().length > 0 ? feineNumber.val() : null
        const gramVl = grammNumber.val().length > 0 ? grammNumber.val() : null
        const pusVl = pusNumber.val().length > 0 ? pusNumber.val() : null
        const lotVl =
          lotNumber.val().length > 0 ? "'" + lotNumber.val() + "'" : null
        const productIdVl = productLookUpSelect.val()

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'gramm': " +
          gramVl +
          ",'warehouseId': " +
          warehouseId +
          ",'feine':" +
          feineVl +
          ",'pus':" +
          pusVl +
          ",'lot':" +
          lotVl +
          ",'productId':" +
          productIdVl
        findInvoiceItemListJQuery(data)
      }
    })

    const grammNumber = $('<input type="text" class="customInput114">')
    grammNumber.floatNumber()
    grammNumber.off('keyup').on('keyup', function (event) {
      if (grammNumber.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        qty.val(null)
        const feineVl = feineNumber.val().length > 0 ? feineNumber.val() : null
        const gramVl = grammNumber.val().length > 0 ? grammNumber.val() : null
        const pusVl = pusNumber.val().length > 0 ? pusNumber.val() : null
        const lotVl =
          lotNumber.val().length > 0 ? "'" + lotNumber.val() + "'" : null
        const productIdVl = productLookUpSelect.val()

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'gramm': " +
          gramVl +
          ",'warehouseId': " +
          warehouseId +
          ",'feine':" +
          feineVl +
          ",'pus':" +
          pusVl +
          ",'lot':" +
          lotVl +
          ",'productId':" +
          productIdVl
        findInvoiceItemListJQuery(data)
      }
    })

    const itemBarcode = $('<input type="text" class="customInput114">')
    itemBarcode.floatNumber()
    itemBarcode.off('keyup').on('keyup', function (event) {
      if (itemBarcode.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        // batchNumber.val(null);
        // productBarcode.val(null);
        // commonBarcode.val(null);
        qty.val(null)

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'itemBarcode': " +
          itemBarcode.val() +
          ",'warehouseId': " +
          warehouseId
        findInvoiceItemListJQuery(data)
      }
    })
    const commonBarcode = $('<input type="text" class="customInput114">')
    commonBarcode.off('keyup').on('keyup', function (event) {
      if (commonBarcode.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        // batchNumber.val(null);
        // productBarcode.val(null);
        // itemBarcode.val(null);
        qty.val(null)
        // lotNumber.val(null);

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'commonBarcode': '" +
          commonBarcode.val() +
          "','warehouseId': " +
          warehouseId
        findInvoiceItemListJQuery(data)
      }
    })
    const productBarcode = $('<input type="text" class="customInput114">')
    productBarcode.off('keyup').on('keyup', function (event) {
      if (productBarcode.val().length > 0 && event.which === 13) {
        // productLookUpDiv.children('input').val(null);
        // batchNumber.val(null);
        // itemBarcode.val(null);
        // commonBarcode.val(null);
        qty.val(null)

        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null

        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }

        const data =
          "{'productBarcode': '" +
          productBarcode.val() +
          "','warehouseId': " +
          warehouseId
        findInvoiceItemListJQuery(data)
      }
    })

    const eBarcode = $('<input type="text" class="customInput114">')
    eBarcode.off('keyup').on('keyup', function (event) {
      if (eBarcode.val().length > 0 && event.which === 13) {
        qty.val(null)
        const warehouseId =
          $self.warehouse != null && $self.warehouse.data().val !== undefined
            ? $self.warehouse.data().val
            : null
        if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
          return
        }
        const data =
          "{'ebarcode': '" + eBarcode.val() + "','warehouseId': " + warehouseId
        findInvoiceItemListJQuery(data)
      }
    })

    const qty = $('<input type="text" class="customInput114 qty_aaa">')
    qty.floatNumber()
    qty.off('keyup').on('keyup', function (event) {
      if (qty.val() > 0 && event.which === 13) {
        acceptSalePopupBtn.click()
      }
      let quantity = parseFloat($(this).val())
      $.each($self.salePopupItemRows, function (i, itemRow) {
        const requiredQtyObj = itemRow.requiredQty
        if (requiredQtyObj != null) {
          requiredQtyObj.val(null)
          requiredQtyObj.data().val = null
        }

        let deltaQty = 0
        itemRow.qty.val(null)
        itemRow.realCount.html(itemRow.realCount.data().val)

        itemRow.qty.removeClass('customBackground')
        if (quantity > 0) {
          const realCount = itemRow.realCount.data().val
          if (realCount < quantity) {
            deltaQty = realCount
            quantity -= realCount
          } else {
            deltaQty = quantity
            quantity = 0
          }
          deltaQty = deltaQty.toFixed(8)
          itemRow.qty.val(deltaQty)
          if (requiredQtyObj != null) {
            requiredQtyObj.html(deltaQty)
            requiredQtyObj.data().val = deltaQty
          }

          itemRow.qty.addClass('customBackground')
        }
      })
    })
    // /const packs = $('<input type="text"  step="1" oninput="this.value = Math.round(this.value);" required style="height: 21px;" class="customInput80">');
    const packsQty = $(
      '<input type="text" step="1" oninput="this.value = Math.round(this.value);" class="customInput114 packsQty_aaa">'
    )

    packsQty.floatNumber()
    packsQty.off('keyup').on('keyup', function (event) {
      if (packsQty.val() > 0 && event.which === 13) {
        acceptSalePopupBtn.click()
      }

      let quantity = parseFloat($(this).val())
      $.each($self.salePopupItemRows, function (i, itemRow) {
        const requiredQtyObj = null

        let deltaQty = 0
        itemRow.packs.val(null)
        itemRow.packsReal.html(itemRow.packsReal.data().val)

        // itemRow.packs.removeClass('customBackground');
        if (quantity > 0) {
          const realCount = itemRow.packsReal.data().val
          if (realCount < quantity) {
            deltaQty = realCount
            quantity -= realCount
          } else {
            deltaQty = quantity
            quantity = 0
          }
          deltaQty = deltaQty.toFixed(8)
          itemRow.packs.val(deltaQty)
          if (requiredQtyObj != null) {
            requiredQtyObj.html(deltaQty)
            requiredQtyObj.data().packs = deltaQty
          }

          itemRow.packs.addClass('customBackground')
          itemRow.packs.attr('oninput', 'this.value = Math.round(this.value);')
        }
      })
    })

    let stillage = $('<input type="text" class="customInput114">')
    stillage.off('keyup').on('keyup', function (event) {
      if (stillage.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })
    // <td><s:text name="getText('Item Barcode')"/></td>
    const marriage = $(
      '<label> <input type="checkbox" class="marriage"> Marriage </label>'
    )
    // spectre
    const allCompanies = $(
      '<label> <input type="checkbox" class="allCompanies"> All Companies </label>'
    )
    // /const clientOrder = $('<input type="text" class="customInput114">');
    // stillage.off('keyup').on('keyup', function (event) {
    //    if (stillage.val().length > 0 && event.which === 13) {
    //        findPlanningItemListJQuery(false);
    //    }
    // });
    //
    const acceptSalePopupBtn = $(
      '<button class="btn" style="margin-right: 2px;width: 67px;padding-bottom: 0px;"> Accept </button>'
    )
    const keepWindowCheckbox = $(
      '<label style="width: max-content !important;"> <input type="checkbox" class="keepWindow"/> Keep window &nbsp</label>'
    )

    $self.acceptSalePopupBtnGlobal = acceptSalePopupBtn
    acceptSalePopupBtn.off('click').on('click', function () {
      $self.customPopupAcceptClick2(
        $self.params[tabName].customPopupAddAnRowElement2,
        tabName,
        $self.salePopupItemRows
      )
      if (!$("input:checkbox[class='keepWindow']").is(':checked')) {
        salePopupDiv.remove()
        $('.disableBackendDiv').remove()
      }
      $self.salePopupItemRows = []

      $('.totalInput').each(function (id, el) {
        $(el).removeClass('totalInput')
      })
    })

    const closeSalePopupBtn = $(
      '<button class="btn" style="margin-right: 2px;width: 67px;padding-bottom: 0px;"> Close </button>'
    )
    closeSalePopupBtn.off('click').on('click', function () {
      salePopupDiv.remove()
      $('.disableBackendDiv').remove()
      $self.salePopupItemRows = []
    })

    const productLookUpDiv = $(
      '<div durl="findAllStockProductListUrl" dwidth-ul="295"></div>'
    )
    const productLookUpSelect = $('<select style="display: none;"></select>')
    productLookUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    productLookUpDiv.append(productLookUpSelect)
    productLookUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    productLookUpSelect.off('change').on('change', function (event) {
      let prOrderId = prOrderUpSelect.data().val
      prOrderId = prOrderId != null ? prOrderId : null

      let packingTypeId = packingTypeUpSelect.data().val
      packingTypeId = packingTypeId != null ? packingTypeId : null

      let colorId = colorUpDivSelect.data().val
      colorId = colorId != null ? colorId : null

      let colorVariantId = colorVariantUpDivSelect.data().val
      colorVariantId = colorVariantId != null ? colorVariantId : null

      let designId = designUpDivSelect.data().val
      designId = designId != null ? designId : null

      let designVariantId = designVariantUpDivSelect.data().val
      designVariantId = designVariantId != null ? designVariantId : null

      let gradeId = gradeUpDivSelect.data().val
      gradeId = gradeId != null ? gradeId : null

      let fiberClassId = fiberClassDivSelect.data().val
      fiberClassId = fiberClassId != null ? fiberClassId : null

      let clientCompanyId = clientCompanyUpDivSelect.data().val
      clientCompanyId = clientCompanyId != null ? clientCompanyId : null

      let sewModelSizeVariantId = sizeVariantInvoiceItemDivSelect.data().val
      sewModelSizeVariantId =
        sewModelSizeVariantId != null ? sewModelSizeVariantId : null

      let equipmentId = equipmentUpDivSelect.data().val
      equipmentId = equipmentId != null ? equipmentId : null

      const dateFrom =
        $('date').children('input').val() !== undefined
          ? $('date').children('input').val()
          : $('date').html()
      const salesClientCompanyId =
        $self.salesClientCompany != null
          ? $self.salesClientCompany.data().val
          : null
      const warehouseId =
        $self.warehouse != null && $self.warehouse.data().val !== undefined
          ? $self.warehouse.data().val
          : null

      if (tabName === 'iplikLotStavkaReserveTable' && warehouseId === null) {
        notificationMessage(
          'WARNING!!!',
          'You have to select Warehouse before.'
        )
        return
      }

      let allCompaniesVal = false
      if ($("input:checkbox[class='allCompanies']").is(':checked')) {
        allCompaniesVal = true
      }

      let marriageVal = false
      if ($("input:checkbox[class='marriage']").is(':checked')) {
        marriageVal = true
      }

      const planningNumberVal =
        planningNumber.val() != null && planningNumber.val().length !== 0
          ? planningNumber.val()
          : null
      const packingNumberVal =
        packingNumber.val() != null && packingNumber.val().length !== 0
          ? packingNumber.val()
          : ''
      const orderNumberVal =
        orderNumber.val() != null && orderNumber.val().length !== 0
          ? orderNumber.val()
          : null
      const lotNumberVal =
        lotNumber.val() != null && lotNumber.val().length !== 0
          ? lotNumber.val()
          : ''
      let planningTypeId = planningTypeUpDivSelect.data().val
      planningTypeId = planningTypeId != null ? planningTypeId : null
      productLookUpDiv.data().dparam =
        filterLookUpProdoct +
        ',' +
        "'prOrderId':" +
        prOrderId +
        ',' +
        "'equipment_id': " +
        equipmentId +
        ', ' +
        "'packingTypeId':" +
        packingTypeId +
        ',' +
        "'colorId':" +
        colorId +
        ',' +
        "'colorVariantId':" +
        colorVariantId +
        ',' +
        "'designId':" +
        designId +
        ',' +
        "'designVariantId':" +
        designVariantId +
        ',' +
        "'salesManagerId':" +
        salesClientCompanyId +
        ',' +
        "'dateFrom':'" +
        dateFrom +
        "'," +
        "'batchNumber':'" +
        (batchNumber.val().length > 0 ? batchNumber.val() : -1) +
        "'," +
        "'warehouseId': " +
        warehouseId +
        ', ' +
        "'gradeId': " +
        gradeId +
        ', ' +
        "'fiberClassId': " +
        fiberClassId +
        ', ' +
        "'id': " +
        parentIdVal +
        ', ' +
        "'clientCompanyId':" +
        clientCompanyId +
        ',' +
        "'orderNumber': " +
        orderNumberVal +
        ',' +
        "'lot': '" +
        lotNumberVal +
        "'," +
        "'packingNumbers': '" +
        packingNumberVal +
        "'," +
        "'allCompanies': " +
        allCompaniesVal +
        ',' +
        "'marriage': " +
        marriageVal +
        ',' +
        "'planningTypeId':" +
        planningTypeId +
        ',' +
        "'sewModelSizeVariantId':" +
        sewModelSizeVariantId +
        ',' +
        "'planningNumber':" +
        planningNumberVal

      const productId = $(this).data().val
      if (productId === null) return
      //            batchNumber.val(null);
      itemBarcode.val(null)
      commonBarcode.val(null)
      qty.val(null)
      const data =
        "{'productId': " +
        productId +
        ",'warehouseId': " +
        warehouseId +
        ",'batchNumber':'" +
        (batchNumber.val().length > 0 ? batchNumber.val() : '') +
        "','lot':'" +
        lotNumberVal +
        "','packingNumbers':'" +
        packingNumberVal +
        "'"
      findInvoiceItemListJQuery(data)
    })

    function findInvoiceItemListJQuery(data) {
      let prOrderId = prOrderUpSelect.data().val
      prOrderId = prOrderId != null ? prOrderId : null
      let packingTypeId = packingTypeUpSelect.data().val
      packingTypeId = packingTypeId != null ? packingTypeId : null

      let colorId = colorUpDivSelect.data().val
      colorId = colorId != null ? colorId : null

      let colorVariantId = colorVariantUpDivSelect.data().val
      colorVariantId = colorVariantId != null ? colorVariantId : null

      let designId = designUpDivSelect.data().val
      designId = designId != null ? designId : null

      let designVariantId = designVariantUpDivSelect.data().val
      designVariantId = designVariantId != null ? designVariantId : null

      let gradeId = gradeUpDivSelect.data().val
      gradeId = gradeId != null ? gradeId : null

      let fiberClassId = fiberClassDivSelect.data().val
      fiberClassId = fiberClassId != null ? fiberClassId : null

      let equipmentId = equipmentUpDivSelect.data().val
      equipmentId = equipmentId != null ? equipmentId : null

      let clientCompanyId = clientCompanyUpDivSelect.data().val
      clientCompanyId = clientCompanyId != null ? clientCompanyId : null

      const returnCompanyId =
        $self.returnCompany != null ? $self.returnCompany.data().val : null
      const returnEmployeeId =
        $self.returnEmployee != null ? $self.returnEmployee.data().val : null

      let sizeId = sizeVariantDivSelect.data().val
      // eslint-disable-next-line no-unused-vars
      sizeId = sizeId != null ? sizeId : null

      let sizeInvoiceItemId = sizeVariantInvoiceItemDivSelect.data().val
      sizeInvoiceItemId = sizeInvoiceItemId != null ? sizeInvoiceItemId : null

      if (tabName === 'outpuToPrOrderReturnItemTable')
        data = data.replace('warehouseId', '0')
      const orderProductionTypeId =
        $self.orderProductionType != null
          ? $self.orderProductionType.data().val
          : null
      const warehouseId =
        $self.warehouse != null && $self.warehouse.data().val !== undefined
          ? $self.warehouse.data().val
          : warehouseUpDiv.data() != null &&
            warehouseUpDiv.data().val !== undefined
          ? warehouseUpDiv.data().val
          : null

      let warehouseVal = ''

      if (tabName !== 'iplikLotStavkaReserveTable') {
        warehouseVal = "'warehouseId': " + warehouseId + ', '
      }

      const salesClientCompanyId =
        $self.salesClientCompany != null
          ? $self.salesClientCompany.data().val
          : null
      const dateFrom =
        $('date').children('input').val() !== undefined
          ? $('date').children('input').val()
          : $('date').html()
      let currencyrate =
        $('currencyrate').children('input').val() !== undefined
          ? $('currencyrate').children('input').val()
          : null
      if (currencyrate === null) {
        currencyrate =
          $('currencyrate').text() !== undefined
            ? $('currencyrate').text()
            : null
      }

      //           const companyIdVal = ( != null) ? $self.companyIdVal.data().val : null;
      //  l("d " + $self.warehouse.data().val)
      //  l("salesClientCompany " + $self.salesClientCompany.data().val)
      //  l("aaaaaaaaaaaa " + $self.salesClientCompany)
      let allCompaniesVal = false
      if ($("input:checkbox[class='allCompanies']").is(':checked')) {
        allCompaniesVal = true
      }
      let marriageVal = false
      if ($("input:checkbox[class='marriage']").is(':checked')) {
        marriageVal = true
      }

      data +=
        ', ' +
        "'prOrderId': " +
        prOrderId +
        ', ' +
        "'packingTypeId': " +
        packingTypeId +
        ',' +
        "'colorId':" +
        colorId +
        ',' +
        "'colorVariantId':" +
        colorVariantId +
        ',' +
        "'designId':" +
        designId +
        ',' +
        "'designVariantId':" +
        designVariantId +
        ',' +
        "'gradeId':" +
        gradeId +
        ',' +
        "'sewModelSizeVariantId':" +
        sizeInvoiceItemId +
        ',' +
        "'fiberClassId':" +
        fiberClassId +
        ',' +
        "'currencyRateVal':" +
        currencyrate +
        ',' +
        "'clientCompanyId':" +
        clientCompanyId +
        ', ' +
        "'tabName':'" +
        tabName +
        "'" +
        ',' +
        warehouseVal +
        "'orderProductionTypeId': " +
        orderProductionTypeId +
        ', ' +
        "'salesManagerId': " +
        salesClientCompanyId +
        ', ' +
        "'equipmentId': " +
        equipmentId +
        ', ' +
        "'companyId': " +
        returnCompanyId +
        ',' +
        "'id': " +
        parentIdVal +
        ',' +
        "'dateFrom': '" +
        dateFrom +
        "'," +
        "'allCompanies': " +
        allCompaniesVal +
        ',' +
        "'marriage': " +
        marriageVal +
        ',' +
        "'employeeId': " +
        returnEmployeeId +
        '}'

      console.log('findInvoiceItemListJQuery:DATA=' + data)
      // loaderIconAnimate();
      $.ajax({
        url: 'findInvoiceItemListUrl.htm',
        type: 'POST',
        cache: false,
        data,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
          const list = JSON.parse(response)

          const col = $self.params[tabName].columns
          $.each(col, function (i, val) {
            if (val['name'] === 'qty') {
              val['type'] = 'float'
            }
          })
          const result = $self.createTable2(tabName, col, list)
          $self.salePopupItemRows = result.itemRows
          let sumRealCount = 0
          let sumRealCountPacks = 0

          $.each(list, function (i, itemRow) {
            sumRealCount += itemRow.realCount
            sumRealCountPacks +=
              itemRow.packsReal != null ? itemRow.packsReal : 0
          })

          sumRealCount = sumRealCount.toFixed(3)
          qty.val(null)
          qty.attr('title', 'Max=' + sumRealCount)
          $('#maxQty').html('Max=' + sumRealCount)
          qty.data('maxValue', sumRealCount)

          sumRealCountPacks = sumRealCountPacks.toFixed(3)
          packsQty.val(null)
          packsQty.attr('title', 'Max=' + sumRealCountPacks)
          $('#maxPackQty').html('Max=' + sumRealCountPacks)
          packsQty.data('maxValue', sumRealCountPacks)

          salePopupContentDiv.html(result.content)

          // loaderIconAnimateRemove();
        },
        error: function () {
          notificationMessage('You Can not Open Sale Invoice.')
        },
      })
    }

    const warehouseId =
      $self.warehouse != null && $self.warehouse.data().val !== undefined
        ? $self.warehouse.data().val
        : null
    const orderProductionTypeId =
      $self.orderProductionType != null
        ? $self.orderProductionType.data().val
        : null
    const returnCompanyId =
      $self.returnCompany != null ? $self.returnCompany.data().val : null
    const returnEmployeeId =
      $self.returnEmployee != null ? $self.returnEmployee.data().val : null

    let filterLookUpProdoct =
      "'tabName':'" +
      tabName +
      "', 'warehouseId':" +
      warehouseId +
      ",'orderProductionTypeId':" +
      orderProductionTypeId +
      ",'companyId':" +
      returnCompanyId +
      ",'employeeId':" +
      returnEmployeeId
    if (tabName === 'outpuToPrOrderReturnItemTable')
      filterLookUpProdoct =
        "'tabName':'" +
        tabName +
        "','orderProductionTypeId':" +
        orderProductionTypeId
    productLookUpDiv.data('dparam', filterLookUpProdoct)

    const clientCompanyUpDiv = $(
      '<div durl="findAllCompanyForInvoice" dwidth-ul="220" style="padding-right: 10px;"></div>'
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

    const prOrderUpDiv = $(
      '<div durl="findAllPrOrder" dwidth-ul="220" style="padding-right: 10px;"></div>'
    )
    const prOrderUpSelect = $('<select style="display: none;"></select>')
    prOrderUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    prOrderUpDiv.append(prOrderUpSelect)
    prOrderUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const packingTypeDiv = $(
      '<div durl="findAllSewModelPackingType" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const packingTypeUpSelect = $('<select style="display: none;"></select>')
    packingTypeDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    packingTypeDiv.append(packingTypeUpSelect)
    packingTypeDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const colorUpDiv = $(
      '<div durl="findAllColor" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const colorUpDivSelect = $('<select style="display: none;"></select>')
    colorUpDivSelect.off('change').on('change', function (event) {
      const colorId = $(this).data().val
      const item = colorVariantUpDiv
      item.data('dparam', "'colorId':" + colorId)
      item.data('val', null)
      item.children('input').val(null)
      item.children('select').find('option:selected').val(null)
      return true
    })
    colorUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    colorUpDiv.append(colorUpDivSelect)
    colorUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const colorVariantUpDiv = $(
      '<div durl="findAllColorVariant" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const colorVariantUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    colorVariantUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    colorVariantUpDiv.append(colorVariantUpDivSelect)
    colorVariantUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const designUpDiv = $(
      '<div durl="findAllDesign" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const designUpDivSelect = $('<select style="display: none;"></select>')
    designUpDivSelect.off('change').on('change', function (event) {
      const designId = $(this).data().val
      const item = designVariantUpDiv
      item.data('dparam', "'designId':" + designId)
      item.data('val', null)
      item.children('input').val(null)
      item.children('select').find('option:selected').val(null)
      return true
    })
    designUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    designUpDiv.append(designUpDivSelect)
    designUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const designVariantUpDiv = $(
      '<div durl="findAllDesignVariant" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const designVariantUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    designVariantUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    designVariantUpDiv.append(designVariantUpDivSelect)
    designVariantUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const gradeUpDiv = $(
      '<div durl="findAllGradeWithNullValue" dwidth-ul="115" style="padding-right: 10px;"></div>'
    ) // findAllGrade
    const gradeUpDivSelect = $('<select style="display: none;"></select>')
    gradeUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    gradeUpDiv.append(gradeUpDivSelect)
    gradeUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const fiberClassDiv = $(
      '<div durl="findAllQualityFiberClass" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const fiberClassDivSelect = $('<select style="display: none;"></select>')
    fiberClassDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    fiberClassDiv.append(fiberClassDivSelect)
    fiberClassDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const equipmentUpDiv = $(
      '<div durl="findAllEquipments" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const equipmentUpDivSelect = $('<select style="display: none;"></select>')
    equipmentUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    equipmentUpDiv.append(equipmentUpDivSelect)
    equipmentUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const warehouseUpDiv = $(
      '<div list="list" required="required" dname="warehouseId" durl="findAllWarehouse" dwidth-ul="205" style="padding-right: 10px;"></div>'
    )
    const warehouseUpDivSelect = $('<select style="display: none;"></select>')
    warehouseUpDiv.append(
      '<input type="text" required="required" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    warehouseUpDiv.append(warehouseUpDivSelect)
    warehouseUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )
    warehouseUpDiv.children('input').val($self.batchReserveWarehouseName)
    warehouseUpDiv.data().val = $self.batchReserveWarehouseId

    const warehouseIplikUpDiv = $(
      '<div list="list" required="required" dname="warehouseId" durl="findAllWarehouseLogic" dwidth-ul="205" style="padding-right: 10px;" dparam="\'actionUrl\':\'iplikReserv\'"></div>'
    )
    const warehouseIplikUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    warehouseIplikUpDiv.append(
      '<input type="text" required="required" class="custom_widget_list" style="width:175px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    warehouseIplikUpDiv.append(warehouseIplikUpDivSelect)
    warehouseIplikUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )
    warehouseIplikUpDiv.children('input').val($self.batchReserveWarehouseName)
    warehouseIplikUpDiv.data().val = $self.batchReserveWarehouseId

    const planningNumber = $('<input type="text" class="customInput70">')
    planningNumber.intNumber()
    planningNumber.off('keyup').on('keyup', function (event) {
      if (planningNumber.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })
    const planningTypeUpDiv = $(
      '<div durl="findAllPlanningType" dname="planningTypeId" dwidth-ul="165" style="padding-right: 10px;"></div>'
    )
    const planningTypeUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    planningTypeUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:145px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    planningTypeUpDiv.append(planningTypeUpDivSelect)
    planningTypeUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const clientOrder = $('<input type="text" class="customInput114">')
    clientOrder.off('keyup').on('keyup', function (event) {
      if (clientOrder.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })

    const packingNumber = $('<input type="text" class="customInput114">')
    packingNumber.off('keyup').on('keyup', function (event) {
      if (packingNumber.val().length > 0 && event.which === 13) {
        const packingNumbersVal =
          packingNumber.val.length > 0 ? packingNumber.val() : null
        const lotNumberVal = lotNumber.val.length > 0 ? lotNumber.val() : null
        const batchNumberVal =
          batchNumber.val.length > 0 ? batchNumber.val() : -1
        const data =
          "{'packingNumbers': '" +
          packingNumbersVal +
          "','lot': '" +
          lotNumberVal +
          "','batchNumber': '" +
          batchNumberVal +
          "'"
        findInvoiceItemListJQuery(data)
      }
    })

    stillage = $('<input type="text" class="customInput100">')
    stillage.off('keyup').on('keyup', function (event) {
      if (stillage.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })

    const pus = $('<input type="text" class="customInput100">')
    pus.off('keyup').on('keyup', function (event) {
      if (pus.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })

    const feine = $('<input type="text" class="customInput100">')
    feine.off('keyup').on('keyup', function (event) {
      if (feine.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })

    const orderNumber = $('<input type="text" class="customInput60">')
    orderNumber.intNumber()
    orderNumber.off('keyup').on('keyup', function (event) {
      if (orderNumber.val().length > 0 && event.which === 13) {
        findPlanningItemListJQuery(false)
      }
    })
    const departmentUpDiv = $(
      '<div durl="findAllDepartment" dwidth-ul="165" style="padding-right: 10px;"></div>'
    )
    const departmentUpDivSelect = $('<select style="display: none;"></select>')
    departmentUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:105px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    departmentUpDiv.append(departmentUpDivSelect)
    departmentUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const planOpenOrCloseUpDiv = $(
      '<div durl="findAllPlanOpenOrClose" dwidth-ul="165" style="padding-right: 10px;"></div>'
    )
    const planOpenOrCloseUpDivSelect = $(
      '<select style="display: none;"></select>'
    )
    planOpenOrCloseUpDiv.append(
      '<input type="text" class="custom_widget_list" style="width:105px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    planOpenOrCloseUpDiv.append(planOpenOrCloseUpDivSelect)
    planOpenOrCloseUpDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const sizeVariantDiv = $(
      '<div durl="findAllSewModelSizeVariantFromPOR" dwidth-ul="165" style="padding-right: 10px;"></div>'
    )
    const sizeVariantDivSelect = $('<select style="display: none;"></select>')
    sizeVariantDiv.append(
      '<input type="text" class="custom_widget_list" style="width:105px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    sizeVariantDiv.append(sizeVariantDivSelect)
    sizeVariantDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    const sizeVariantInvoiceItemDiv = $(
      '<div durl="findAllSewModelVariantSize" dwidth-ul="115" style="padding-right: 10px;"></div>'
    )
    const sizeVariantInvoiceItemDivSelect = $(
      '<select style="display: none;"></select>'
    )
    sizeVariantInvoiceItemDiv.append(
      '<input type="text" class="custom_widget_list" style="width:95px;margin: 0px; padding: 1px; font-size: 12px;">'
    )
    sizeVariantInvoiceItemDiv.append(sizeVariantInvoiceItemDivSelect)
    sizeVariantInvoiceItemDiv.append(
      '<i class="icon-chevron-down icon_list custom_down_click"></i>'
    )

    function findPlanningItemListJQuery(withDate) {
      console.log('find for rezerv')
      let planningTypeId = planningTypeUpDivSelect.data().val
      let sewModelSizeVariantId = sizeVariantDivSelect.data().val
      let planningNumberVal = planningNumber.val()
      let packingNumberVal = packingNumber.val()
      let orderNumberVal = orderNumber.val()
      let clientOrderVal = clientOrder.val()
      const stillageVal = stillage.val()
      sewModelSizeVariantId =
        sewModelSizeVariantId != null ? sewModelSizeVariantId : null
      planningTypeId = planningTypeId != null ? planningTypeId : null
      planningNumberVal =
        planningNumberVal.length !== 0 ? planningNumberVal : null
      packingNumberVal = packingNumberVal.length !== 0 ? packingNumberVal : null
      orderNumberVal = orderNumberVal.length !== 0 ? orderNumberVal : null
      clientOrderVal = clientOrderVal.length !== 0 ? clientOrderVal : null
      let clientCompanyId = clientCompanyUpDivSelect.data().val
      clientCompanyId = clientCompanyId != null ? clientCompanyId : null
      let departmentId = departmentUpDivSelect.data().val
      departmentId = departmentId != null ? departmentId : null
      let planOpenOrCloseId = planOpenOrCloseUpDivSelect.data().val
      planOpenOrCloseId = planOpenOrCloseId != null ? planOpenOrCloseId : null

      const data =
        '{' +
        "'internalStatus':" +
        ($self.internalStatus != null ? $self.internalStatus : null) +
        ',' +
        "'orderNumber': " +
        orderNumberVal +
        ',' +
        "'clientOrder': '" +
        clientOrderVal +
        "'," +
        "'stillage': '" +
        stillageVal +
        "'," +
        "'planningTypeId':" +
        planningTypeId +
        ',' +
        "'planningNumber':" +
        planningNumberVal +
        ',' +
        "'packingNumbers':'" +
        packingNumberVal +
        "'," +
        (withDate && dateFrom.val().length > 0
          ? "'startDate':'" + dateFrom.customDateGetVal() + "',"
          : '') +
        (withDate && dateTo.val().length > 0
          ? "'endDate':'" + dateTo.customDateGetVal() + "',"
          : '') +
        "'clientCompanyId':" +
        clientCompanyId +
        ',' +
        "'departmentId':" +
        departmentId +
        ',' +
        "'sewModelSizeVariantId':" +
        sewModelSizeVariantId +
        ',' +
        "'planOpenOrCloseId':" +
        planOpenOrCloseId
      findInvoiceItemListJQuery(data)
    }

    const pickerOptsPrOrder = {
      dateFormat: 'dd/mm/yy',
      onSelect: function (val) {
        const d = new Date()
        val =
          val + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        $(this).val(val)
      },
    }
    const dateFrom = $('<input class="customInput114" type="text"/>')
    const dateTo = $('<input class="customInput114" type="text"/>')
    dateFrom.datepicker(pickerOptsPrOrder)
    dateTo.datepicker(pickerOptsPrOrder)
    const dateToVal = new Date()
    dateTo.customDateSetVal(dateToVal)
    const dateFromVal = new Date()
    dateFromVal.setDate(dateToVal.getDate() - 7)
    dateFrom.customDateSetVal(dateFromVal)

    const getButton = $(
      '<button class="btn btn-success customTableHeaderSaveButton" style="width: 65px; margin: 1px; padding: 1px; font-size: 12px;"/>'
    ).html('GET')
    $self.GET_BUTTON = getButton
    getButton.off('click').on('click', function () {
      if (
        $.inArray(tabName, [
          'productionInvoiceItemTable',
          'iplikLotStavkaPlanTable',
          'batchDetailTable',
        ]) !== -1
      ) {
        findPlanningItemListJQuery(true)
        productLookUpDiv.removeAttr('title')
        productLookUpDiv.children('input').removeAttr('title')
        productLookUpDiv.children('input').val(null)
      } else if (tabName === 'productionOrderRecipeTable') {
        const warehouseId = warehouseUpDiv.data().val
        const planningId = $self.params[tabName].parentId
        const clientOrderVal =
          clientOrder.val() != null && clientOrder.val().length !== 0
            ? clientOrder.val()
            : null
        const stillageVal =
          stillage.val() != null && stillage.val().length !== 0
            ? stillage.val()
            : null
        const pusVal =
          pus.val() != null && pus.val().length !== 0 ? pus.val() : null
        const feineVal =
          feine.val() != null && feine.val().length !== 0 ? feine.val() : null
        let allCompaniesVal = false

        if ($("input:checkbox[class='allCompanies']").is(':checked')) {
          allCompaniesVal = true
        }

        const data =
          "{'productId': " +
          $self.planningProductId +
          ",'planningId':" +
          planningId +
          ",'clientOrder':" +
          clientOrderVal +
          ",'stillage':" +
          stillageVal +
          ",'pus':" +
          pusVal +
          ",'feine':" +
          feineVal +
          ",'allCompanies':" +
          allCompaniesVal
        console.log('data' + data)
        $self.warehouse.data().val = warehouseId
        if (validateHederElement([warehouseUpDiv]) === 0) {
          findInvoiceItemListJQuery(data)
        } else {
          notificationMessage(
            'WARNING!!!',
            'You have to select Warehouse before.'
          )
        }
      }
    })

    // --------------------------------------------------------------------------------------------------------
    const tableWrapper = $(
      '<div style="background-color: #CFCFD0;width: 100% !important;padding: 10px 0 !important;"></div>'
    )
    const table = $(
      '<table style="width: max-content !important; background-color:transparent;min-width:1340px; border-radius: 3px;" cellpadding="0" cellspacing="0"></table>'
    )
    const tr1 = $('<tr style="white-space: nowrap;"/>')
    const tr2 = $('<tr style="white-space: nowrap;"/>')
    const tr3 = $('<tr style="white-space: nowrap;"/>')
    const tr4 = $('<tr style="white-space: nowrap;"/>')
    const tr5 = $('<tr style="white-space: nowrap;"/>')
    const tr6 = $('<tr style="white-space: nowrap;"/>')
    if (
      $.inArray(tabName, [
        'productionInvoiceItemTable',
        'productionOrderRecipeTable',
        'iplikLotStavkaPlanTable',
        'batchDetailTable',
      ]) === -1
    ) {
      const allCompaniesAccessForReserv =
        $self.params[tabName].allCompaniesAccessForReserv

      table.append(tr1)
      table.append(tr2)
      table.append(tr3)
      table.append(tr4)
      table.append(tr5)
      table.append(tr6)

      if ($.inArray(tabName, ['iplikLotStavkaReserveTable']) !== -1) {
        tr1.append(
          '<th class="warehouse" style="width: 175px; padding: 0px 5px;">Warehouse</th>'
        )
        tr2.append($('<td class="warehouse"/>').html(warehouseIplikUpDiv))
        $self.warehouse = warehouseIplikUpDiv
      }
      let td = $(
        '<th class="productLookUpDiv" style="width: 200px; padding: 0px 5px;"/>'
      )
      tr1.append(td.html('Product'))
      tr2.append($('<td class="productLookUpDiv"/>').html(productLookUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      td.append('Qty  <span id="maxQty"></span>')
      tr1.append(td)
      tr2.append($('<td/>').html(qty))

      tr3.append('<th>Client Company</th>')
      tr4.append($('<td/>').html(clientCompanyUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      td.append('packQty  <span id="maxPackQty"></span>')
      tr1.append(td)
      tr2.append($('<td/>').html(packsQty))

      td = $('<th class="itemBarcode" style="width: 90px;"/>')
      tr1.append(td.html('Item Barcode'))
      tr2.append($('<td class="itemBarcode"/>').html(itemBarcode))

      td = $('<th class="productBarcode" style="width: 110px;"/>')
      tr1.append(td.html('Product Barcode'))
      tr2.append($('<td class="productBarcode"/>').html(productBarcode))

      td = $(
        '<th class="commonBarcode" style="width: 110px; padding: 0px 5px;"/>'
      )
      tr1.append(td.html('Common Barcode'))
      tr2.append($('<td class="commonBarcode"/>').html(commonBarcode))

      tr3.append('<th>Batch №</th>')
      tr4.append($('<td/>').html(batchNumber))

      td = $('<th class="itemLot" style="width: 90px;"/>')
      tr3.append(td.html('Lot'))
      tr4.append($('<td/>').html(lotNumber))

      td = $('<th class="itemPus" style="width: 90px;"/>')
      tr3.append(td.html('Pus'))
      tr4.append($('<td/>').html(pusNumber))

      td = $('<th class="itemFeine" style="width: 90px;"/>')
      tr3.append(td.html('Feine'))
      tr4.append($('<td/>').html(feineNumber))

      td = $('<th class="itemGramm" style="width: 90px;"/>')
      tr3.append(td.html('Gramm'))
      tr4.append($('<td/>').html(grammNumber))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr3.append(td.html('fiberClass'))
      tr4.append($('<td/>').html(fiberClassDiv))

      td = $('<th class="prOrderUp" style="width: 220px;"/>')
      tr5.append(td.html('Pr Order'))
      tr6.append($('<td/>').html(prOrderUpDiv))

      td = $('<th class="packingType" style="width: 90px;"/>')
      tr5.append(td.html('Packing Type'))
      tr6.append($('<td/>').html(packingTypeDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr5.append(td.html('Color'))
      tr6.append($('<td/>').html(colorUpDiv))
      tr5.append(
        '<th style="width: 110px; padding: 0px 5px;">Color Variant</th>'
      )
      tr6.append($('<td/>').html(colorVariantUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr5.append(td.html('Design'))
      tr6.append($('<td/>').html(designUpDiv))
      tr5.append(
        '<th style="width: 110px; padding: 0px 5px;">Design Variant</th>'
      )
      tr6.append($('<td/>').html(designVariantUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append(td.html('eBarcode'))
      tr2.append($('<td/>').html(eBarcode))
      // tr3.append('<th></th>');
      //          tr4.append($('<td/>').html('<td></td>'));

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append('<th style="width: 110px; padding: 0px 5px;">Equipment</th>')
      tr2.append($('<td/>').html(equipmentUpDiv))
      tr3.append(td.html('Size'))
      tr4.append($('<td/>').html(sizeVariantInvoiceItemDiv))
      tr5.append(
        '<th style="width: 110px; padding: 0px 5px;">Client Order</th>'
      )
      tr6.append($('<td/>').html(clientOrder))
      tr5.append(
        '<th style="width: 110px; padding: 0px 5px;">PackingNumbers</th>'
      )
      tr6.append($('<td/>').html(packingNumber))
      tr5.append('<th style="width: 110px; padding: 0px 5px;">Grade</th>')
      tr6.append($('<td/>').html(gradeUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      if (allCompaniesAccessForReserv != null && allCompaniesAccessForReserv) {
        // tr1.append($('<td/>').html(allCompanies));
      } else {
        // tr1.append('<td></td>');
      }

      tr1.append(
        $('<td style="width: 70px; padding: 0px 5px;"/>').html(
          acceptSalePopupBtn
        )
      )
      tr2.append($('<th style=""/>').html(keepWindowCheckbox))
      tr3.append($('<td/>').html(allCompanies))
      tr4.append($('<td/>').html(marriage))
      tr4.append('<td></td>')
      tr1.append(
        $(
          '<th style="width: 70px; padding-left: 5px; padding-right: 10px !important;"/>'
        ).html(closeSalePopupBtn)
      )
    } else if ($.inArray(tabName, ['productionOrderRecipeTable']) !== -1) {
      table.append(tr1)
      table.append(tr2)

      let td = $('<th style="width: 90px; padding: 0px 5px;"/>')
      td.append('Qty  <span id="maxQty"></span>')
      tr1.append(td)
      tr2.append($('<td/>').html(qty))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append(td.html('Color'))
      tr2.append($('<td/>').html(colorUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append(td.html('Color Variant'))
      tr2.append($('<td/>').html(colorVariantUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append(td.html('Design'))
      tr2.append($('<td/>').html(designUpDiv))

      td = $('<th style="width: 110px; padding: 0px 5px;"/>')
      tr1.append(td.html('Design Variant'))
      tr2.append($('<td/>').html(designVariantUpDiv))

      td = $(
        '<th class="clientOrder" style="width: 150px; padding: 0px 5px;"/>'
      )
      tr1.append('<th width="60">Client Order №</th>')
      tr2.append($('<td/>').html(clientOrder))

      td = $('<th class="stillage" style="width: 150px; padding: 0px 5px;"/>')
      tr1.append('<th width="60">stillage</th>')
      tr2.append($('<td/>').html(stillage))

      td = $('<th class="pus" style="width: 150px; padding: 0px 5px;"/>')
      tr1.append('<th width="60">pus</th>')
      tr2.append($('<td/>').html(pus))

      td = $('<th class="feine" style="width: 150px; padding: 0px 5px;"/>')
      tr1.append('<th width="60">feine</th>')
      tr2.append($('<td/>').html(feine))

      td = $('<th class="warehouse" style="width: 150px; padding: 0px 5px;"/>')
      tr1.append(td.html('Warehouse'))
      tr2.append($('<td class="warehouse"/>').html(warehouseUpDiv))

      tr1.append('<th style="width: 50px;"/>')
      tr2.append($('<td/>').html(getButton))
      if (
        $self.allCompaniesAccessForReserv != null &&
        $self.allCompaniesAccessForReserv
      ) {
        tr1.append('<th style="width: 50px;"/>')
        tr2.append($('<td/>').html(allCompanies))
      }

      tr1.append($('<td style="float: right;"/>').html(acceptSalePopupBtn))
      tr2.append($('<td style="float: right;"/>').html(closeSalePopupBtn))
    } else if (
      $.inArray(tabName, [
        'productionInvoiceItemTable',
        'iplikLotStavkaPlanTable',
      ]) !== -1
    ) {
      table.append(tr1)
      table.append(tr2)
      tr1.append('<th width="120">Date From</th>')
      tr2.append($('<td/>').html(dateFrom))

      tr1.append('<th width="120">Date To</th>')
      tr2.append($('<td/>').html(dateTo))

      tr1.append('<th width="60">Planning №</th>')
      tr2.append($('<td/>').html(planningNumber))

      tr1.append('<th width="100">Planning Type</th>')
      tr2.append($('<td/>').html(planningTypeUpDiv))

      tr1.append('<th width="60">Client Order №</th>')
      tr2.append($('<td/>').html(clientOrder))

      tr1.append('<th width="60">Order №</th>')
      tr2.append($('<td/>').html(orderNumber))

      tr1.append('<th style="width: 10px;">Client Company</th>')
      tr2.append($('<td/>').html(clientCompanyUpDiv))

      tr1.append('<th style="width: 30px;">Department</th>')
      tr2.append($('<td/>').html(departmentUpDiv))

      tr1.append('<th style="width: 30px;">Plan Open/Close</th>')
      tr2.append($('<td/>').html(planOpenOrCloseUpDiv))

      tr1.append('<th style="width: 50px;"/>')
      tr2.append($('<td/>').html(getButton))

      tr1.append($('<td style="float: right;"/>').html(acceptSalePopupBtn))
      tr1.append($('<th style="float: right;"/>').html(keepWindowCheckbox))
      tr2.append($('<td style="float: right;"/>').html(closeSalePopupBtn))
    } else if ($.inArray(tabName, ['batchDetailTable']) !== -1) {
      table.append(tr1)
      table.append(tr2)
      if (fromBatchDetailTableRow) {
        let td = $('<th style="width: 120px; padding: 0px 5px;"/>')
        td.append('Qty  <span id="maxQty"></span>')
        tr1.append(td)
        tr2.append($('<td/>').html(qty))
        td = $('<td/>')
        tr1.append($('<td/>').html(acceptSalePopupBtn))
        tr2.append($('<td/>').html(closeSalePopupBtn))
      } else {
        let td = $(
          '<th class="productLookUpDiv" style="width: 200px; padding: 0px 5px;"/>'
        )
        tr1.append(td.html('Product'))
        tr2.append($('<td class="productLookUpDiv"/>').html(productLookUpDiv))

        td = $('<th style="width: 120px; padding: 0px 5px;"/>')
        td.append('Qty  <span id="maxQty"></span>')

        tr1.append(td)
        tr2.append($('<td/>').html(qty))

        tr1.append('<th width="60">Planning #</th>')
        tr2.append($('<td/>').html(planningNumber))

        tr1.append('<th width="100">Planning Type</th>')
        tr2.append($('<td/>').html(planningTypeUpDiv))

        tr1.append('<th width="100">Sew Model Size Variant</th>')
        tr2.append($('<td/>').html(sizeVariantDiv))

        // tr1.append('<th width="100">Sew Model Size Variant </th>');
        // tr2.append($('<td/>').html(sizeVariantDiv));

        tr1.append('<th width="60">Order #</th>')
        tr2.append($('<td/>').html(orderNumber))

        tr1.append('<th style="width: 50px;"/>')
        tr2.append($('<td/>').html(getButton))

        tr1.append($('<td style="float: right;"/>').html(acceptSalePopupBtn))
        tr2.append($('<td style="float: right;"/>').html(closeSalePopupBtn))
      }
    }
    tableWrapper.append(table)
    salePopupDiv.append(tableWrapper)
    salePopupDiv.append(salePopupContentDiv)
    $('body').append(salePopupDiv)
    salePopupDiv
      .css('left', 50)
      .css('top', $(window).scrollTop() + 100)
      .css('display', 'block')
    salePopupDiv.draggable()
    salePopupDiv.css('min-width', 1305)
    salePopupDiv.css('max-width', $('body').width() - 350)
    salePopupDiv.css('width', 'auto')
    $('body').append('<div class="disableBackendDiv"></div>')
    salePopupContentDiv.html(content)
  }

  $self.createTable2 = function (tabName, columns, values) {
    const table = $('<table/>')
    const itemRows = []
    let dataIndex = 0
    $.each(values, function (rowIndex, value) {
      const itemRow = {}
      $.each(columns, function (index, column) {
        const name = column.name
        const type = column.type
        const headerText = column.headerText
        const dwidth = column.dwidth
        const required = column.required
        const resultType = column.resultType
        const durl = column.durl
        const refColName = column.refColName
        const param = column.param
        const showUI = column.showUI
        const editableElement = column.editableElement

        let id = null
        let text = null
        if (value != null && value[column.name] != null) {
          if (
            value[column.name] != null &&
            (type === 'list' ||
              type === 'file_image' ||
              (type === 'label' && resultType === 'object'))
          ) {
            id = value[column.name].id
            text = value[column.name].text
          } else {
            text = value[column.name]
            id = text
          }
        }
        if (name === 'id') {
          id = null
          text = null
        }
        let element
        if (type === 'hidden' && param != null && param === 'date') {
          element = $('<input type="hidden"/>')
          element.customDateSetVal(text)
        } else if (type === 'hidden') {
          element = $('<input type="hidden"/>').data('val', text)
        } else if (type === 'label') {
          element = $('<label/>')
          // eslint-disable-next-line object-shorthand
          element.data({ val: id, text: text })
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
          if (name === 'openDetails') {
            text1 = column.text
            text2 = column.noText
          } else {
            text1 = text
            text2 = '-'
          }

          element =
            value != null
              ? $('<button>' + text1 + '</button>')
              : $('<label> ' + text2 + '</label>')
          // console.log("text11=" + text1);
          // console.log("text22=" + text2);
          element.addClass(param)
        } else if (type === 'checkbox') {
          element = $('<input type="checkbox" />')
          element.attr('checked', text)
        } else if (type === 'date') {
          element = $('<input type="text"/>').datepicker(pickerOpts)
          element.customDateSetVal(text)
        } else if (type === 'list') {
          element = $('<div/>')
          element.data({ durl: durl, val: id, text: id })
          element.attr('durltable', '')
          element.attr('dtext', text)
          element.attr('dwidth', dwidth)
          element.attr('ddisabled', param)
          const select = $('<select/>')
          element.append(select)
          select.data('index', dataIndex)
          const refVal =
            value != null && refColName != null && value[refColName] != null
              ? value[refColName].id
              : null
          if (refVal != null) {
            element.data('dparam', "'" + refColName + "Id':" + refVal)
          }
          select.css('display', 'none')
          const input = $('<input type="text" class="custom_widget_list"/>')
          input.attr('required', required)
          input.css('width', dwidth - 25)
          input.val(text)
          element.append(input)
          element.append(
            '<i class="icon-chevron-down icon_list custom_down_click"/>'
          )
        } else if (type === 'listWithoutLeft') {
          element = $('<div/>')
          element.data({ durl: durl, val: id, text: id })
          element.attr('durltable', '')
          element.attr('dtext', text)
          element.attr('dwidth', dwidth)
          element.attr('ddisabled', param)
          const select = $('<select/>')
          element.append(select)
          select.data('index', dataIndex)
          const refVal =
            value != null && refColName != null && value[refColName] != null
              ? value[refColName].id
              : null
          if (refVal != null) {
            element.data('dparam', "'" + refColName + "Id':" + refVal)
          }
          select.css('display', 'none')
          const input = $(
            '<input type="text" class="custom_widget_list withoutLeft"/>'
          )
          input.attr('required', required)
          input.css('width', dwidth - 25)
          input.val(text)
          element.append(input)
          element.append(
            '<i class="icon-chevron-down icon_list custom_down_click"/>'
          )
        } else if (type === 'file_image') {
          if (text === null) {
            text = 'img/no_image.gif'
          }
          element = $('<img src="' + text + '"/>')
          element.css('height', 70)
          element.data({ val: id, text: text })
        }
        element.css('width', dwidth)
        element.attr('required', required)
        element.attr('index', dataIndex)
        element.data('index', dataIndex)
        itemRow[name] = element
      })
      itemRows[rowIndex] = itemRow
      dataIndex++
      $self.setItemRowOnChangeEventsForSalePopup(tabName, itemRow, value)
    })

    const thead = $('<thead/>')
    const tr = $('<tr/>')
    tr.append(
      '<th style="width:25px; white-space: nowrap"  data-sorter="true">№</th>'
    )
    let tableWidth = 0
    $.each(columns, function (index, column) {
      const editableElement = column.editableElement
      const type = column.type
      const name = column.name
      const showUI = column.showUI
      if (showUI === true && type !== 'button') {
        const th = $('<th/>')
        editableElement === false
          ? th.attr('data-sorter', true)
          : th.attr('data-sorter', false)
        // th.css('white-space', 'nowrap');
        th.css('width', column.dwidth)

        if (name === 'qty') {
          const td = $(
            '<input type="number" value="0" disabled="disabled" style="text-align: center" class="customInput114 customBackground total-qty-value">'
          )
          th.append(column.headerText)
          th.append(td)
        } else {
          th.html(column.headerText)
        }
        tr.append(th)
        tableWidth += column.dwidth
      }
    })
    thead.append(tr)
    table.append(thead)

    const tbody = $('<tbody/>')
    $.each(itemRows, function (id, itemRow) {
      const tr = $('<tr/>')
      tr.append('<td>' + (id + 1) + '</td>')
      $.each(columns, function (ind, column) {
        const td = $('<td/>')
        const type = column.type
        const name = column.name
        const resultType = column.resultType
        const showUI = column.showUI
        const editableElement = column.editableElement
        let obj = itemRow[name]
        if (showUI === true && type !== 'button') {
          let val = ''
          if (type === 'label') {
            if (name === 'realCount' || name === 'requiredQty') {
              val = obj
            } else {
              val = obj.data().val
              if (resultType === 'object') {
                val = obj.data().text
              }
              obj = val
            }
          } else if (
            $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1
          ) {
            val = obj.val()
          } else if (type === 'checkbox') {
            val = !!obj.is(':checked')
          } else if (type === 'list') {
            val = obj.children('input').val()
          } else if (type === 'file_image') {
            val = obj
          }
          if (editableElement === false) {
            if (type === 'button') val = ''
            td.html(val)
          } else td.append(obj)
          tr.append(td)
        }
      })
      tr.data('rowIndex', id)
      tbody.append(tr)
    })
    table.append(tbody)
    table.css('max-width', tableWidth)
    table.css('width', tableWidth)
    const saleContentDiv = $(
      '<div class="custom_content_div scrollCutomTable"/>'
    )
    table.addClass('fancyTableSearch customTableForStyle')
    saleContentDiv.css('height', 300)
    saleContentDiv.append(table)
    table.tablesorter({
      widthFixed: true,
      headerTemplate: '{content} {icon}',
      widgets: ['zebra', 'stickyHeaders', 'filter'],
      widgetOptions: {
        stickyHeaders_attachTo: saleContentDiv,
      },
    })
    const result = { content: saleContentDiv, itemRows: itemRows }
    return result
  }

  $self.customPopupAcceptClick2 = function (
    a,
    tabName,
    itemRows,
    fromCalcTableHeader
  ) {
    const columns = $self.params[tabName].columns
    const saleInvoiceEntryAccess = $self.params[tabName].saleInvoiceEntryAccess
    const allCompaniesAccessForReserv =
      $self.params[tabName].allCompaniesAccessForReserv
    const saleCalcTableRows = $self.params[tabName].itemRows
    $.each(itemRows, function (j, itemRow) {
      if (
        (fromCalcTableHeader != null && fromCalcTableHeader === true) ||
        (itemRow.qty.val().length !== 0 && parseFloat(itemRow.qty.val()) !== 0)
      ) {
        if (
          $.inArray(tabName, [
            'saleInvoiceItemTable',
            'internalInvoiceItemTable',
            'outputToProductionCompanyItemTable',
            'iplikLotStavkaReserveTable',
            'salesReturnItemTable',
          ]) !== -1
        ) {
          const pupopEntryRefId = itemRow.entryRef.data().val
          const qtyPupop1 = itemRow.qty.val()
          $.each(saleCalcTableRows, function (idR, saleRow) {
            if (saleRow != null) {
              const entryRefId = saleRow.entryRef.data().val
              const qty2 = saleRow.qty.val()
              if (
                saleInvoiceEntryAccess !== 'true' &&
                pupopEntryRefId != null &&
                entryRefId != null &&
                pupopEntryRefId === entryRefId &&
                itemRow != null
              ) {
                saleRow.qty.val(
                  parseFloat(parseFloat(qtyPupop1) + parseFloat(qty2)).toFixed(
                    6
                  )
                )

                saleRow.qty.addClass('customBackground')
                itemRow = null
              }
              if (tabName === 'salesReturnItemTable' && itemRow != null) {
                const popupBarcodeId = itemRow.barcodeId.html()
                const barcodeId = saleRow.barcodeId.html()

                // console.log("popupBarcodeId 1 = "+ popupBarcodeId );
                // console.log(barcodeId);
                // if(popupBarcodeId === barcodeId){
                //    console.log("returnRealcounter = " + itemRow.returnRealcounter.html());
                saleRow.qty.val(parseFloat(qty2).toFixed(6))
                // if (itemRow.returnRealcounter.html() === 0 ) {
                // } else if (itemRow.returnRealcounter.html() < parseFloat(parseFloat(qtyPupop1) + parseFloat(qty2)) ) {
                //    saleRow.qty.val(parseFloat(itemRow.returnRealcounter.html()).toFixed(6));
                // }else {
                //    saleRow.qty.val(parseFloat(parseFloat(qtyPupop1) + parseFloat(qty2)).toFixed(6));
                //
                // }
                // itemRow = null;
                // }
              }
            }
          })
        }
        if (itemRow != null) {
          const tr = $('<tr/>')
          tr.append(
            '<td style="width:25px; white-space: nowrap">' +
              (++$self.params[tabName].indexU + 1) +
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
                } else obj = val
              } else if (
                $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1
              ) {
                val = obj.val()
              } else if (type === 'checkbox') {
                val = !!obj.is(':checked')
              } else if (type === 'list') {
                val = obj.children('input').val()
                obj
                  .children('select')
                  .data('index', $self.params[tabName].indexU)
              } else if ($.inArray(type, ['file_image']) !== -1) {
                val = obj
              }
              if (name === 'id' || name === 'realCount') val = ''
              if (editableElement === false) {
                td.html(val)
              } else if (type !== 'list' && type !== 'label') {
                obj.data('index', $self.params[tabName].indexU)
                td.append(obj)
              } else if (type === 'list') {
                val = obj.children('input').val()
                obj
                  .children('select')
                  .data('index', $self.params[tabName].indexU)
                td.append(obj)
              }
              tr.append(td)
            }
          })
          tr.append(
            '<td> <a class="remove_item" onclick="deleteRowU(\'' +
              tabName +
              '\',this)"></a></td>'
          )
          tr.data('tabName', tabName)
          tr.data('rowIndex', $self.params[tabName].indexU)
          $(a).parent('td').parent('tr').before(tr)
          const divElem = $(a)
            .parent('td')
            .parent('tr')
            .parent('tbody')
            .parent('table')
            .parent('div.fht-tbody')
          divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)
          $self.params[tabName].itemRows[$self.params[tabName].indexU] = itemRow
        }
      }
    })
  }

  $self.customPopupAcceptClick3 = function (
    a,
    tabName,
    itemRows,
    fromCalcTableHeader
  ) {
    const columns = $self.params[tabName].columns
    // l('fromCalcTableHeader =' + fromCalcTableHeader)
    const saleCalcTableRows = $self.params[tabName].itemRows
    $.each(itemRows, function (j, itemRow) {
      if (
        (fromCalcTableHeader != null && fromCalcTableHeader === true) ||
        (itemRow.qty.val().length !== 0 && parseFloat(itemRow.qty.val()) !== 0)
      ) {
        if (
          $.inArray(tabName, [
            'saleInvoiceItemTable',
            'internalInvoiceItemTable',
            'outputToProductionCompanyItemTable',
            'iplikLotStavkaReserveTable',
          ]) !== -1
        ) {
          const pupopEntryRefId = itemRow.entryRef.data().val
          const pupopStillage = itemRow.stillage.data().val
          const qtyPupop1 = itemRow.qty.val()
          $.each(saleCalcTableRows, function (idR, saleRow) {
            if (saleRow != null) {
              const entryRefId = saleRow.entryRef.data().val
              const stillageSaleRow = saleRow.stillage.data().val
              const qty2 = saleRow.qty.val()
              if (pupopStillage === stillageSaleRow) {
                if (
                  pupopEntryRefId === entryRefId &&
                  pupopStillage === stillageSaleRow &&
                  itemRow != null
                ) {
                  saleRow.qty.val(
                    parseFloat(
                      parseFloat(qtyPupop1) + parseFloat(qty2)
                    ).toFixed(6)
                  )
                  saleRow.qty.addClass('customBackground')
                  itemRow = null
                }
              }
            }
          })
        }
        if (itemRow != null) {
          const tr = $('<tr/>')
          tr.append(
            '<td style="width:25px; white-space: nowrap">' +
              (++$self.params[tabName].indexU + 1) +
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
                } else obj = val
              } else if (
                $.inArray(type, ['string', 'float', 'integer', 'date']) !== -1
              ) {
                val = obj.val()
              } else if (type === 'checkbox') {
                val = !!obj.is(':checked')
              } else if (type === 'list') {
                val = obj.children('input').val()
                obj
                  .children('select')
                  .data('index', $self.params[tabName].indexU)
              } else if ($.inArray(type, ['file_image']) !== -1) {
                val = obj
              }
              if (name === 'id' || name === 'realCount') val = ''
              if (editableElement === false) {
                td.html(val)
              } else {
                obj.data('index', $self.params[tabName].indexU)
                td.append(obj)
              }
              tr.append(td)
            }
          })
          tr.append(
            '<td> <a class="remove_item" onclick="deleteRowU(\'' +
              tabName +
              '\',this)"></a></td>'
          )
          tr.data('tabName', tabName)
          tr.data('rowIndex', $self.params[tabName].indexU)
          $(a).parent('td').parent('tr').before(tr)
          const divElem = $(a)
            .parent('td')
            .parent('tr')
            .parent('tbody')
            .parent('table')
            .parent('div.fht-tbody')
          divElem.scrollTop(divElem.scrollTop() + tr.height() + 100)
          $self.params[tabName].itemRows[$self.params[tabName].indexU] = itemRow
        }
      }
    })
  }
  // todo end for sale invoicec popup
}

function refreshOpenObjectUI(prepare, query) {
  // loaderIconAnimate();

  const url = prepare + query
  const url2 = prepare.split('.')[0] + 'AjaxLoad.htm' + query
  const forCharisma = '{"ajaxType":"ajaxLoad"}'
  // requestNullAjax(forCharisma);
  jQuery('#content').load(url2, function (msg) {
    window.history.pushState('', '', url)
    notificationMessage('Successfully updated an Invoice.')
  })
}

function setLimitToInput(className) {
  const inputs = document.querySelectorAll(className)

  inputs.forEach(function (input) {
    const limit = input.getAttribute('limit')
    input.addEventListener('beforeinput', function () {
      const valueBeforeInput = event.target.value
      event.target.addEventListener(
        'input',
        function () {
          const indexVal = input.value.indexOf('.')
          if (indexVal > 0) {
            const arr = input.value.split('.')
            if (arr[1].length === parseFloat(limit) + 1) {
              event.target.value = valueBeforeInput
            }
          }
        },
        { once: true }
      )
    })
  })
  // }
}

function selectColor(el, event) {
  const parent = el.parentElement
  const parentEl = parent.parentElement
  const nextSibling = parentEl.nextSibling
  const thirdElem = nextSibling.nextSibling
  thirdElem.children[0].innerHTML = ' '
  if (event.target.value) {
    let fullData = parent.getAttribute('full_custom_data')
    fullData = JSON.parse(fullData)

    thirdElem.children[0].innerHTML = fullData.pantonecode
    thirdElem.children[0].setAttribute('data-val', fullData.pantonecode)
    thirdElem.children[0].setAttribute('data-text', fullData.pantonecode)
  }
}
