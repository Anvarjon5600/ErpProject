<template>
  <div class="flex items-start overflow-scroll" :class="`h-[${height}px]`">
    <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
      <thead class="bg-[rgb(229,235,245)]">
        <tr>
          <th
            v-for="(headName, key) in tablehead"
            :key="key"
            class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
            :class="`w-[${headName.width}px]`"
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
        <template v-if="istherebody">
          <tr
            v-for="(value, index) in tablebody"
            :key="index"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td
              v-for="(key, inx) in tablehead"
              :key="inx"
              class="border-[1px] text-[12px] p-2"
            >
              <span
                v-if="
                  key.code === 'status' ||
                  key.code === 'invoiceOnWayStatus' ||
                  key.code === 'type' ||
                  key.code === 'orderProductionType'
                "
                class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                v-html="value[key.code]"
              ></span>
              <span
                v-else-if="
                  key.code === 'invoiceBillStatus' ||
                  key.code === 'invoiceConfirmedStatus'
                "
                class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                v-html="value[key.code]"
              ></span>
              <img
                v-else-if="key.code === 'images'"
                src="../../assets/images/no-image.png"
                class="w-[50px]"
              />
              <span v-else>
                {{ value[key.code] }}
              </span>
            </td>
            <td class="flex items-center justify-center gap-2 p-2">
              <GenericButton
                name="Open"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgb(126,183,62)"
                textsize="14"
                @click="getTableRowOpen(tableId[index])"
              />
              <GenericButton
                name="qrCode"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgb(126,183,62)"
                textsize="14"
              />
              <GenericButton
                name="forDevice"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgb(126,183,62)"
                textsize="14"
              />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              :colspan="tableheadlength"
              class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] p-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <span class="flex flex-col items-center">
                  <img
                    src="../../assets/icons/no-data.png"
                    alt="no-data-icons"
                  />
                  No data
                </span>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tablehead: {
      type: Object,
      default: () => ({}),
    },
    tablebody: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    istherebody: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '0',
    },
  },
}
</script>
