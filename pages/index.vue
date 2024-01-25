<template>
  <div>
    <h1>Bu page hali yaratilmadi</h1>
    <button
      class="border-[1px] border-[solid] border-[rgba(0,0,0,0.2)] rounded-[10px] p-[5px]"
      @click="fetchUsersFromStore"
    >
      getUsers
    </button>
    <pre v-for="user in getUsers" :key="user.id">{{ user }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IndexPage',

  computed: {
    ...mapGetters(['getUsers']),
  },

  methods: {
    ...mapActions(['fetchUsers']),
    fetchUsersFromStore() {
      this.fetchUsers()
    },
  },
}
</script>
