<template>
  <div>
    <menu-settings
      v-if="activeMenuList !== null && menuObject !== null"
      :activemenu="activeMenuList"
      :menuobj="menuObject"
    />
  </div>
</template>

<script>
import MenuSettings from '../../components/MenuSettings/MenuSettings.vue'

export default {
  components: {
    MenuSettings,
  },
  data() {
    return {
      menuObject: null,
      activeMenuList: null,
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get(
        'https://192.168.1.55:8443/api/user/quickMenuSettings',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response) {
        this.menuObject = response
        this.activeMenuList = response.children.map((item) => ({
          ...item,
          isOpen: false,
        }))
      }
    } catch (error) {
      console.error(error)
    }
  },
}
</script>
