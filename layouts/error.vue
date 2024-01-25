<template>
  <div class="flex flex-col items-center">
    <h1>404 - Sahifa topilmadi</h1>
    <p>Uzur, so'ragan sahifa topilmadi.</p>
  </div>
</template>
<script>
export default {
  layout: 'error-page',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>
