<template>
  <input
    v-model="keywordValue"
    class="rounded-[5px] border-[1px] border-[solid] border-[rgb(228,228,228)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
    :type="type"
    :style="{
      width: widthtype === '%' ? `${width}%` : `${width}px`,
      height: `${height}px`,
      padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
      fontSize: `${textsize}px`,
      color: valuecolor,
    }"
    :placeholder="placeholder"
    @input="getInputValue"
    @change="getTableRequest"
  />
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    widthtype: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    pl: {
      type: String,
      default: '',
    },
    pt: {
      type: String,
      default: '',
    },
    pr: {
      type: String,
      default: '',
    },
    pb: {
      type: String,
      default: '',
    },
    textsize: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    valuecolor: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      keywordValue: '',
    }
  },
  methods: {
    getTableRequest(event) {
      this.$emit('change', event.target.value)
    },
    getInputValue() {
      this.$emit('input', this.keywordValue)
    },
  },
}
</script>
