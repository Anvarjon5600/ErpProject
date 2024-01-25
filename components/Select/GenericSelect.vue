<template>
  <select
    v-model="selectValue"
    class="cursor-pointer py-[4px] rounded-[5px] border-[1px] border-[solid] border-[rgba(228,228,228,1)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[rgba(131,137,150,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_rgba(131,137,150,0.5)]"
    :style="{
      fontSize: `${textsize}px`,
    }"
    @change="getSelectValue"
  >
    <option value="" selected>Please Select</option>
    <template v-if="id === 'departments' || id === 'warehouse'">
      <option v-for="(item, index) in data" :key="index" :value="item.id">
        {{ item.name }}
      </option>
    </template>
    <template v-else>
      <option v-for="(item, index) in data" :key="index" :value="item.value">
        {{ item.name }}
      </option>
    </template>
  </select>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    textsize: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectValue: '',
    }
  },
  methods: {
    getSelectValue() {
      this.$emit('change', this.selectValue, this.id)
    },
  },
}
</script>
