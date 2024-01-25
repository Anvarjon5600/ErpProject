<template>
  <div class="w-full p-[0px_10px_4px_4px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <ColumnConfig
      :style="'top:' + (checkModal ? '15%' : '-70%')"
      :right="tableHead"
      :left="leftMap"
      :url="actionUrl"
      @checkModal="handleValue"
    />
    <form class="flex flex-wrap items-center gap-3 py-4">
      <div>
        <label
          for="from"
          class="text-[13px] text-[] cursor-pointer tracking-[1.1]"
          >Date from</label
        >
        <GenericInputDatePage
          id="from"
          v-model="formData.from"
          width="165"
          height="30"
          pl="10"
          pr="10"
          pt="1"
          pb="1"
          textsize="13"
          type="datetime-local"
          valuecolor="rgba(0,0,0,0.7)"
          @change="getSelectValue"
        />
      </div>
      <div>
        <label for="to" class="text-[13px] text-[] cursor-pointer"
          >Date to</label
        >
        <GenericInputDatePage
          id="to"
          v-model="formData.to"
          width="165"
          height="30"
          pl="10"
          pr="10"
          pt="2"
          pb="2"
          textsize="13"
          type="datetime-local"
          valuecolor="rgba(0,0,0,0.7)"
          @change="getSelectValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="bill" class="text-[13px] text-[] cursor-pointer"
          >Status (Bill)</label
        >
        <GenericSelect
          id="bill"
          v-model="formData.from"
          :data="selectData.billStatusList"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
      <div class="flex items-center gap-1">
        <label for="pay" class="text-[13px] text-[] cursor-pointer"
          >Status (Pay)</label
        >
        <GenericSelect
          id="pay"
          v-model="formData.pay"
          :data="selectData.payStatusList"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
    </form>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img
            src="../../assets/icons/user-black.png"
            alt="user"
            class="w-[14px]"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ $t('pages.purchaseinvoice.headerName') }}
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img
                class="w-[11px]"
                src="../../assets/icons/gear.png"
                alt="gear"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="../../assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="../../assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[700px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex items-center gap-2 m-[8px]">
          <GenericButton
            name="Add New"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgba(54, 155, 215, 0.8)"
            textsize="15"
            @click="$router.push('/prepareSalesReturnNew.htm')"
          />
          <GenericButton
            name="Add New For Person"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgba(54, 155, 215, 0.8)"
            textsize="15"
            @click="$router.push('/prepareSalesReturnNew.htm')"
          />
        </div>
        <div class="mt-3 p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-[solid] border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest()"
              >
                <option value="1">1</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              Records
            </div>
            <div class="flex items-center gap-2">
              <GenericInput
                v-model="keywordValue"
                width="200"
                height="30"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                placeholder="Search..."
                @change="getTableRequest"
                @input="getInputValue"
              />
              <GenericButton
                name="Search"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgba(54, 155, 215, 0.8)"
                textsize="14"
                :url="imgUrl.search"
                :istherepicture="true"
                @click="getTableRequest"
              />
              <GenericButton
                name="Print Preview"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgb(126,183,62)"
                textsize="14"
                :url="imgUrl.printer"
                :istherepicture="true"
              />
            </div>
          </div>
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
// Icons url
import search from '../../assets/icons/search.png'
import printer from '../../assets/icons/printer.png'
// Components
import LoadingPage from '../Loading/LoadingPage.vue'
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
import GenericSelect from '../Select/GenericSelect.vue'
import GenericInputDatePage from '../InputDate/GenericInputDatePage.vue'
import ColumnConfig from '../ColumnConfig/ColumnConfig.vue'
import GenericTablePage from '../GenericTable/GenericTablePage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericSelect,
    GenericInputDatePage,
    ColumnConfig,
    GenericTablePage,
  },
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      users: [],
      tableData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      imgUrl: {
        search,
        printer,
      },
      tableId: [],
      selectData: {},
      formData: new Map(),
      checkModal: false,
      actionUrl: '',
      leftMap: {},
      isOpenTable: true,
      isCloseTable: true,
    }
  },
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    getTableRequest() {
      this.isLoading = !this.isLoading
      axios
        .post(
          `https://192.168.1.55:8443/api/invoice/saleInvoiceList`,
          {
            current_page: 1,
            page_size: this.pageSize_value,
            searchForm: {
              keyword: this.keywordValue,
              from_date: new Date(Object.fromEntries(this.formData).from)
                .toLocaleString('en-GB')
                .split(',')
                .join(''),
              to_date: new Date(Object.fromEntries(this.formData).to)
                .toLocaleString('en-GB')
                .split(',')
                .join(''),
            },
            billStatus: Object.fromEntries(this.formData).bill,
            payStatus: Object.fromEntries(this.formData).pay,
            invoiceOnWayStatus: Object.fromEntries(this.formData).invoice,
            departmentId: Object.fromEntries(this.formData).departments,
            warehouseId: Object.fromEntries(this.formData).warehouse,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.tableBody = []
          this.isLoading = !this.isLoading
          this.tableHead = res.data.rightMap
          this.leftMap = res.data.leftMap
          this.actionUrl = res.data.actionUrl
          this.tableData = res.data.invoiceList
          this.selectData = res.data.invoiceSearchDTO
          this.getTableBody()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table function Start
    getTableBody() {
      const arr = new Set()
      for (const obj of this.tableData) {
        arr.add(obj.id)
        const data = new Map()
        for (const key in this.tableHead) {
          const value = this.tableHead[key].code
          if (this.tableHead[key].code in obj) {
            if (obj[value]) {
              if (typeof obj[value] === 'object')
                data.set(value, obj[value].value)
              else data.set(value, obj[value])
            } else data.set(value, '-')
          } else data.set(value, false)
        }
        this.tableBody.push(Object.fromEntries(data))
      }
      this.tableHeadLength = Object.entries(this.tableHead).length
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
      this.tableId = Array.from(arr)
    },
    // Generic Table function End

    // Table Action Open button
    getTableRowOpen(thisId) {
      this.isLoading = !this.isLoading
      axios
        .post(
          `https://192.168.1.55:8443/api/invoice/preparePurchaseInvoice`,
          {
            current_page: 1,
            page_size: this.pageSize_value,
            searchForm: { keyword: this.keywordValue || '', id: thisId },
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.isLoading = !this.isLoading
          this.$router.push('/preparePurchaseInvoiceNew.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Select value
    getSelectValue(value, id) {
      this.formData.set(id, value)
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
  },
}
</script>
