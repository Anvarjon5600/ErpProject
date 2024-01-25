<template>
  <div>
    <button
      class="toggle-button p-[4px_10px] text-[13px] uppercase flex items-center justify-center gap-4 bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
      @click="dropdownToggle"
    >
      <img
        src="../../assets/icons/user-black.png"
        alt="user"
        class="w-[14px]"
      />
      Actuality System
      <img
        src="../../assets/icons/arrow-bottom.png"
        alt="user"
        class="w-[8px]"
        :style="{ transform: dropToggle ? 'rotate(180deg)' : 'rotate(0deg)' }"
      />
    </button>
    <ul
      class="w-[203px] bg-[#fff] absolute top-[44px] text-[13px] overflow-hidden duration-[0.5s]"
      :style="{
        height: dropToggle ? '229px' : '0px',
        border: dropToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
      }"
    >
      <li>
        <a
          href="#"
          class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
          >Change Password</a
        >
      </li>
      <li>
        <a
          href="#"
          class="block p-[7px_15px] bg-[lightgreen] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
          >setAutoLoginPage</a
        >
      </li>
      <div class="w-fll h-[1px] bg-[#ddd] mt-3"></div>
      <li>
        <a
          href="#"
          class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
          >Sessions</a
        >
      </li>
      <li>
        <a
          href="#"
          class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
          >Sessions</a
        >
      </li>
      <li>
        <a
          href="#"
          class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
          >Settings</a
        >
      </li>
      <div class="w-fll h-[1px] bg-[#ddd] mb-3"></div>
      <li>
        <a
          href="#"
          class="flex items-center gap-3 p-[7px_15px] bg-[rgba(255,0,0,0.5)] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
        >
          <img src="../../assets/icons/logout.png" alt="logout" />
          Logout</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  // Data
  data() {
    return {
      dropToggle: false,
    }
  },
  //   Mounted
  mounted() {
    window.addEventListener('click', this.handleWindowClick)
  },
  // beforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick)
  },
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
  },
}
</script>
