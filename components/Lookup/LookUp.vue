<template>
  <div
    id="lookUpComponent"
    ref="parentDiv"
    class="custom-lookup-widget relative"
    :style="{ width: widthtype === '%' ? `${dwidth}%` : `${dwidth}px` }"
    @mouseover="handleMouseOverList"
    @mouseout="handleMouseOutList"
  >
    <select v-model="selectedValue" style="display: none">
      <option v-for="value in selected" :key="value.value" :value="value.value">
        {{ value.text }}
      </option>
    </select>
    <input
      v-model="selectedText"
      type="text"
      :style="{
        border: required ? '1px solid rgb(228,228,228)' : '1px solid red',
      }"
      class="custom-widget-list w-full"
      @input="handleInput"
      @keydown="onKeydown"
    />
    <i
      v-if="!disabled"
      class="el-icon-arrow-down icon-arrow text-[17px] absolute right-[10px] top-[50%] translate-y-[-50%]"
      @click="toggleList"
    ></i>
    <ul
      :style="listStyles"
      class="search-results"
      @mouseover="handleMouseOverList"
      @mouseout="handleMouseOutList"
    >
      <li
        v-for="option in options"
        ref="selected"
        :key="option.id"
        :title="option.text"
        :full_custom_data="JSON.stringify(option)"
        :value="option.value"
        class="show-li"
        @click="selectOption(option)"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        {{ option.text }}
      </li>
      <li :style="noData"><i class="el-icon-files"></i> 'No data'</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // PROPS
  props: {
    name: {
      type: String,
      default: '',
    },
    durl: { type: String, default: '' },
    dwidth: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    dlist: {
      type: String,
      default: '',
    },
    defvalue: {
      type: String,
      default: '',
    },
    dparam: {
      type: Object,
      default: () => ({}),
    },
    required: {
      type: Boolean,
      default: true,
    },
  },

  // DATA
  data() {
    return {
      token: null,
      noDataCheck: false,
      disabled: false,
      mouseOver: true,
      searchText: '',
      selectedValue: '',
      selectedText: '',
      old_search_key: '',
      showList: false,
      options: [],
      selected: [],
    }
  },

  // COMPUTED
  computed: {
    // list style
    listStyles() {
      return {
        width: this.widthtype === '%' ? `${this.dwidth}%` : `${this.dwidth}px`,
        display: this.showList ? 'block' : 'none',
      }
    },
    // no data style
    noData() {
      return {
        display: this.noDataCheck ? 'flex' : 'none',
        height: '100px',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }
    },
  },

  // MOUNTED
  mounted() {
    this.selectedText = this.defvalue
  },

  // METHODS
  methods: {
    // event click on icon
    toggleList() {
      this.mouseOver = true
      document.addEventListener('click', this.handleClick)
      this.searchText = ''
      this.selectedText = ''
      this.getDataList()
    },

    // check mouseover
    handleMouseOverList() {
      this.mouseOver = true
    },

    handleMouseOutList() {
      this.mouseOver = false
    },

    handleClick() {
      if (this.mouseOver === false) {
        this.showList = false
        this.mouseOver = true
      }
    },

    // input event
    handleInput(event) {
      const keyCode = event.which // key-code
      this.selectedText = event.target.value
      const thisInput = event.target
      const parentEl = thisInput.parentElement
      const ul = parentEl.querySelector('ul.search-results')
      const showLi = Array.from(ul.querySelectorAll('li.show-li'))

      // if this.selectedText post to backend
      if (
        this.selectedText !== '' &&
        (this.old_search_key !== this.selectedText ||
          keyCode === 8 ||
          keyCode === 46)
      ) {
        this.searchText = event.target.value
        this.getDataList()
        if (showLi.length > 0) {
          showLi[0].classList.add('selectedLi')
        }
      }
      this.$emit('customFunction', this.name, this.selectedText)
    },

    // =>=>=>=> key down event =>=>=>
    onKeydown(event) {
      const keyCode = event.which // key-code
      const thisInput = event.target
      const parentEl = thisInput.parentElement
      const ul = thisInput.parentElement.querySelector('ul.search-results')
      const showLi = Array.from(ul.querySelectorAll('li.show-li'))
      const selectedLi = ul.querySelector('li.selectedLi')
      let firstLi = ''
      let lastLi = ''
      let thisLi = ''
      if (selectedLi) {
        firstLi = showLi[0].getAttribute('value')
        lastLi = showLi[showLi.length - 1].getAttribute('value')
        thisLi = selectedLi.getAttribute('value')
      }

      if (showLi.length > 0) {
        const ulTopY = ul.getBoundingClientRect().top
        if (keyCode !== 38 && keyCode !== 40) {
          ul.scrollTop = 0
          showLi[0].classList.add('selectedLi')
        }

        if (keyCode === 40 && thisLi !== lastLi) {
          const li = selectedLi.nextElementSibling
          selectedLi.classList.remove('selectedLi')
          li.classList.add('selectedLi')
          li.focus()
          const topLi = li.getBoundingClientRect().top
          const heightLi = li.offsetHeight + 20
          if (topLi - ulTopY > 190) ul.scrollTop += heightLi
        } else if (keyCode === 38 && thisLi !== firstLi) {
          const li = selectedLi.previousElementSibling
          selectedLi.classList.remove('selectedLi')
          li.classList.add('selectedLi')
          const topLi = li.getBoundingClientRect().top
          const heightLi = li.offsetHeight + 20
          if (topLi < ulTopY) ul.scrollTop -= heightLi
          return false
        } else if (thisLi === firstLi) {
          showLi[0].classList.add('selectedLi')
        }
      }

      if (selectedLi) {
        if (selectedLi && keyCode === 13) {
          const fullCustomData = selectedLi.getAttribute('full_custom_data')
          parentEl.setAttribute('full_custom_data', fullCustomData)
          const select = parentEl.querySelector('select')

          if (fullCustomData) {
            const optionValue = JSON.parse(fullCustomData)
            this.selected = []
            this.selected.push(optionValue)
            this.selectedValue = optionValue.value
            this.selectedText = optionValue.text
            this.showList = !this.showList
            document.removeEventListener('click', this.handleClick)
            parentEl.setAttribute('title', optionValue.text)
            thisInput.setAttribute('title', optionValue.text)
            thisInput.value = optionValue.text
            parentEl.dataset.val = optionValue.value
            parentEl.dataset.text_val = optionValue.text
            select.dataset.val = optionValue.value
            select.dataset.text_val = optionValue.text
          }
          ul.scrollTop = 0
          this.showList = false
        }
      }
      this.$emit('customFunction', this.name, this.selectedText)
    },

    // click event on li
    selectOption(option) {
      if (this.dparam.param) {
        this.getSelectedList(option)
      }
      const el = this.$refs.selected
      const ul = el[0].parentElement
      const parentEl = ul.parentElement
      const fullCustomData = JSON.stringify(option)
      const select = parentEl.querySelector('select')
      const thisInput = parentEl.querySelector('input')
      if (fullCustomData) {
        parentEl.setAttribute('full_custom_data', fullCustomData)
        const optionValue = JSON.parse(fullCustomData)
        this.selected = []
        this.selected.push(optionValue)
        this.selectedValue = optionValue.value
        this.selectedText = optionValue.text
        this.showList = !this.showList
        document.removeEventListener('click', this.handleClick)
        parentEl.setAttribute('title', optionValue.text)
        thisInput.setAttribute('title', optionValue.text)
        thisInput.value = optionValue.text
        parentEl.dataset.val = optionValue.value
        parentEl.dataset.text_val = optionValue.text
        select.dataset.val = optionValue.value
        select.dataset.text_val = optionValue.text
      }
      ul.scrollTop = 0
      this.showList = false
      this.$emit('customFunction', this.name, this.selectedText)
    },

    // li selected function
    getSelectedList(prop) {
      axios
        .post(
          `https://192.168.1.55:8443/api/invoiceBase/getCurrentCurrencyRate`,
          {
            branchCompanyId: this.dparam.branchId ? Number(prop.value) : null,
            currencyId: this.dparam.currencyId ? Number(prop.value) : null,
            dateFrom: this.dparam.dateFrom,
            employeeId: null,
            settingsRateType: 'PURCHASE',
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.$emit('customEvent', [res.data, this.dparam.companyType])
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // add class slectedLi to li
    handleMouseEnter(event) {
      const ul = document.querySelector('ul.search-results')
      const anyLi = ul.querySelectorAll('li')
      anyLi.forEach((li) => li.classList.remove('selectedLi'))
      event.target.classList.add('selectedLi')
    },

    handleMouseLeave(event) {
      event.target.classList.remove('selectedLi')
    },

    // post search key
    getDataList() {
      if (!this.durl) return
      const data = {
        search_key: this.selectedText,
      }
      if (this.dparam) {
        Object.assign(data, this.dparam)
      }

      axios
        .post(`https://192.168.1.55:8443/api/${this.durl}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          if (response) {
            this.old_search_key = this.selectedText
            this.options = response.data.map((obj) => {
              const value = obj.id
              const text = obj.name
              return { value, text }
            })
            if (response.data.length > 0) {
              const parentEl = document.querySelector('#lookUpComponent')
              const ul = parentEl.querySelector('ul.search-results')
              const showLi = Array.from(ul.querySelectorAll('li.show-li'))
              if (showLi.length > 0) {
                showLi[0].classList.add('selectedLi')
              }
              this.noDataCheck = false
            } else {
              this.noDataCheck = true
            }
          }
          this.showList = true
        })
        .catch(() => {
          this.showList = false
        })
    },
  },
}
</script>

<style scoped>
.custom-lookup-widget {
  border-radius: 5px;
}
.custom-widget-list {
  border: none;
  outline: none;
  height: 23px;
  padding: 2px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 5px;
  border: 1px solid rgb(228, 228, 228);
  transition: 0.4s;
}
.custom-widget-list:focus {
  border: 1px solid #52a8eccc;
  box-shadow: 0 0 5px #52a8ec99;
  transition: 0.4s;
}
.icon-arrow:hover {
  cursor: pointer;
}
.search-results {
  position: absolute;
  z-index: 999;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.search-results li {
  font-size: 13px;
  padding: 3px;
  cursor: pointer;
}
.search-results li:hover,
.search-results li.selectedLi {
  background-color: #b7d6f6;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
