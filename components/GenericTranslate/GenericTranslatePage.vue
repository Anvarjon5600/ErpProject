<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {}
  },
  methods: {
    // translate api
    getStaticTableNameValues() {
      axios
        .post(
          `https://192.168.1.55:8443/api/translate`,
          { messages: this.tableNameTranslate },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((res) => {
          this.tableNameTranslateObj = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>

<style></style>
