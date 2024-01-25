<!-- <template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="dashboardBox border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
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
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
          >
            <img
              class="w-[11px]"
              src="../../assets/icons/gear.png"
              alt="gear"
            />
          </li>
          <li
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
          >
            <img
              class="w-[11px] rotate-180"
              src="../../assets/icons/arrow.png"
              alt="arrow"
            />
          </li>
          <li
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
    <div class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] h-[600px]">
      <GenericButton
        :name="'Add New'"
        :pl="'10'"
        :pt="'3'"
        :pr="'10'"
        :pb="'3'"
        :bg="'rgba(54, 155, 215, 0.8)'"
        :text_size="'15'"
        :margin="'8'"
      />
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
              :width="'200'"
              :height="'30'"
              :pl="'10'"
              :pr="'10'"
              :pt="'2'"
              :pb="'2'"
              :text_size="'13'"
              :type="'text'"
              :placeholder="'Search...'"
              @change="getTableRequest"
            />
            <GenericButton
              :name="'Search'"
              :pl="'10'"
              :pt="'4'"
              :pr="'10'"
              :pb="'4'"
              :bg="'rgba(54, 155, 215, 0.8)'"
              :text_size="'14'"
              :url="imgUrl.search"
              :is_there_picture="true"
              @click="getTableRequest"
            />
            <GenericButton
              :name="'Print Preview'"
              :pl="'10'"
              :pt="'4'"
              :pr="'10'"
              :pb="'4'"
              :bg="'rgb(126,183,62)'"
              :text_size="'14'"
              :url="imgUrl.printer"
              :is_there_picture="true"
            />
          </div>
        </div>
        <div class="h-[500px] flex items-start overflow-scroll">
          <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
            <thead class="bg-[rgb(229,235,245)] sticky">
              <tr>
                <th
                  v-for="(headName, key) in tableHead"
                  :key="key"
                  :style="{ width: `${headName.width}px` }"
                  class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
                >
                  {{ headName.name }}
                </th>
                <th
                  class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="isThereBody">
                <tr
                  v-for="(value, index) in tableBody"
                  :key="index"
                  class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
                >
                  <td
                    v-for="(key, inx) in tableHead"
                    :key="inx"
                    class="border-[1px] text-[12px] p-2"
                  >
                    {{
                      key.code === 'date'
                        ? new Date(value[key.code]).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })
                        : key.code === 'invoiceConfirmedStatus'
                        ? 'Un Confirmed'
                        : value[key.code]
                    }}
                  </td>
                  <td class="flex items-center justify-center gap-2 p-2">
                    <GenericButton
                      :name="'Open'"
                      :pl="'10'"
                      :pt="'4'"
                      :pr="'10'"
                      :pb="'4'"
                      :bg="'rgb(126,183,62)'"
                      :text_size="'14'"
                      @click="getTableRowOpen(tableId[index])"
                    />
                    <GenericButton
                      :name="'qrCode'"
                      :pl="'10'"
                      :pt="'4'"
                      :pr="'10'"
                      :pb="'4'"
                      :bg="'rgb(126,183,62)'"
                      :text_size="'14'"
                    />
                    <GenericButton
                      :name="'forDevice'"
                      :pl="'10'"
                      :pt="'4'"
                      :pr="'10'"
                      :pb="'4'"
                      :bg="'rgb(126,183,62)'"
                      :text_size="'14'"
                    />
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td
                    :colspan="tableHeadLength"
                    class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] p-3"
                  >
                    <div
                      class="flex flex-col items-center justify-center text-[rgba(0,0,0,0.5)]"
                    >
                      <img
                        src="../../assets/icons/no-data.png"
                        alt="no-data-icons"
                      />
                      No data
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// Components
import LoadingPage from '../Loading/LoadingPage.vue'
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
// Icons url
import search from '../../assets/icons/search.png'
import printer from '../../assets/icons/printer.png'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
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
    }
  },
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    getTableRequest(value) {
      this.isLoading = !this.isLoading
      this.keywordValue = value
      axios
        .post(
          `https://192.168.1.55:8443/api/invoice/purchaseInvoiceList`,
          {
            current_page: 1,
            page_size: this.pageSize_value,
            searchForm: { keyword: this.keywordValue || '' },
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
          this.tableData = res.data.invoiceList
          this.getTableBody()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Table function
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
                data.set(value, obj[value].name)
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
          console.log(res)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script> -->
