<template>
  <div>
    <GenericInvoiceItemModalPage v-if="isOpenModal" :tabledata="tablehead" />
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              :colspan="tableheadlength"
              class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] py-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <GenericButton
                  class="toggle-button"
                  name="Add an Item"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  bg="rgb(119,191,120)"
                  textsize="14"
                  :url="img.plus"
                  :istherepicture="true"
                  @click="openModal"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import icons
import plus from '../../assets/icons/plus.png'

// import components
import GenericButton from '../Button/GenericButton.vue'
import GenericInvoiceItemModalPage from '../GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'

export default {
  // COMPONENTS
  components: { GenericButton, GenericInvoiceItemModalPage },

  // PROPS
  props: {
    tablehead: {
      type: Array,
      default: () => [],
    },
    tablebody: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
      default: '0',
    },
  },

  // DATA
  data() {
    return {
      img: {
        plus,
      },
      isOpenModal: false,
    }
  },

  // MOUNTED
  mounted() {
    window.addEventListener('click', this.handleWindowClick)
  },

  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick)
  },

  // METHODS
  methods: {
    // MODAL toggle
    openModal() {
      this.isOpenModal = true
    },
    handleWindowClick(event) {
      if (!event.target.closest('.toggle-button')) {
        this.toggleFunction()
      }
    },
    toggleFunction() {
      this.isOpenModal = false
    },
  },
}
</script>
