<template>
  <div
    class="max-w-[80%] max-h-[65vh] p-3 rounded-md overflow-auto fixed bg-[lightblue] z-[1000] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-60%] shadow-[0px_0px_50px_rgba(0,0,0,0.2)] flex justify-between"
  >
    <div class=""></div>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    console.log(this.tabledata)
  },
}
</script>
