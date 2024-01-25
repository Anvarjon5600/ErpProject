<template>
  <div class="w-full h-screen">
    <div
      class="w-full h-[80vh] bg-[url('@/assets/images/fon.png')] bg-no-repeat bg-cover"
    >
      <LoadingPage
        v-if="isLoading"
        class="absolute left-[50%] top-[8px] translate-x-[-50%]"
      />
      <div class="absolute left-[50%] top-[30%] translate-x-[-50%]">
        <button
          class="toggle-button p-[4px_15px] text-[15px] uppercase flex items-center justify-between gap-8 border-[1px] border-[solid] border-[#ddd] bg-[#fff] rounded-[3px] relative hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
          @click="dropdownToggle"
        >
          {{ $t('pages.branches.branchLookUpName') }}
          <img
            src="../../assets/icons/arrow-bottom.png"
            alt="user"
            class="w-[8px]"
            :style="{
              transform: dropToggle ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
          />
        </button>
        <ul
          class="w-[215px] bg-[#fff] absolute top-[35px] border-[1px] border-[solid] border-[#ddd] text-[13px] overflow-hidden duration-[0.3s]"
          :style="{
            height: dropToggle ? '68px' : '0px',
            border: dropToggle ? '1px solid #ddd' : 'none',
          }"
        >
          <li v-for="(item, index) in branchesData" :key="index">
            <a
              :href="item.url"
              class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
              @click="getData(item.id)"
              >{{ item.branchName }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div
      class="w-full h-[20vh] bg-[url('@/assets/images/footer-img.png')] bg-no-repeat bg-cover"
    ></div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingPage from '../Loading/LoadingPage.vue'
export default {
  components: { LoadingPage },
  // Data
  data() {
    return {
      dropToggle: false,
      branchesData: [],
      isLoading: false,
    }
  },
  // Mounted
  mounted() {
    window.addEventListener('click', this.handleWindowClick)
    // Branches request
    this.isLoading = !this.isLoading
    axios
      .get(`https://192.168.1.55:8443/api/branches`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        this.branchesData = res.data
        this.isLoading = !this.isLoading
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        // eslint-disable-next-line no-console
        console.error('Login request failed', error)
      })
  },
  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick)
  },
  // Methods
  methods: {
    // Dropdown toggle
    dropdownToggle() {
      this.dropToggle = !this.dropToggle
    },
    handleWindowClick(event) {
      if (!event.target.closest('.toggle-button')) {
        this.toggleFunction()
      }
    },
    toggleFunction() {
      this.dropToggle = false
    },
    getData(id) {
      this.isLoading = !this.isLoading
      axios
        .post(`https://192.168.1.55:8443/api/postBranch`, {
          id,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(({ data }) => {
          this.branchesData = data
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.error('Login request failed', error)
        })
    },
  },
}
</script>
