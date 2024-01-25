<template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md"
    >
      <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
        {{ $t('pages.dashboard.headerName') }}
      </h1>
    </div>
    <div class="flex flex-wrap justify-start items-start h-[0px] gap-10 m-5">
      <nuxt-link
        v-for="(item, index) of items"
        :key="index"
        :to="item.url"
        class="flex flex-col items-center hover:shadow-lg duration-[0.2s] w-full max-w-[150px] h-[] bg-white border border-gray-200 rounded-lg shadow"
      >
        <div class="flex justify-center items-center w-full p-3">
          <img
            class="w-[110px]"
            src="@/assets/images/desktop.png"
            alt="image"
          />
        </div>
        <div class="p-5 w-full">
          <div class="flex justify-center">
            <h5
              class="mb-2 text-[14px] truncate font-bold tracking-tight text-gray-900"
            >
              {{ item.name }}
            </h5>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingPage from '../Loading/LoadingPage.vue'
export default {
  components: { LoadingPage },
  data() {
    return {
      menuList: null,
      items: null,
      systemMenuList: null,
      isLoading: false,
    }
  },
  mounted() {
    // Menu request
    this.isLoading = !this.isLoading
    axios
      .get(`https://192.168.1.55:8443/api/menu`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        this.isLoading = !this.isLoading
        this.menuList = res.data
        this.items = res.data.items
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
}
</script>
