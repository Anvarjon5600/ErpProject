<template>
  <div>
    <LoadingPage
      v-if="isLoading && !isLoginPage && !isPage"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      v-if="!isLoginPage && !isPage"
      class="w-full h-[50px] bg-[rgba(32,111,162,0.7)] flex justify-between items-center px-3"
    >
      <nuxt-link
        to="/dashboard.htm"
        class="flex items-center gap-2 text-[17px] text-[rgba(255,255,255,0.8)] hover:text-[rgb(255,255,255)] duration-[0.2s] font-medium"
      >
        <img class="w-[30px] ml-1" src="../assets/icons/logo.png" alt="logo" />
        <h1>ERP</h1>
      </nuxt-link>
      <div class="flex items-center gap-[5px]">
        <div>
          <button
            class="toggle-button p-[5px_10px] text-[13px] uppercase flex items-center justify-center gap-4 bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="goToMenuSetting"
          >
            <img
              src="../assets/icons/menuSetting.png"
              alt="menu-setting"
              class="w-[18px]"
            />
          </button>
        </div>
        <div>
          <button
            class="toggle-button p-[4px_10px] text-[13px] uppercase flex items-center justify-center gap-4 bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="dropdownToggle"
          >
            <img
              src="../assets/icons/user-black.png"
              alt="user"
              class="w-[14px]"
            />
            Actuality System
            <img
              src="../assets/icons/arrow-bottom.png"
              alt="user"
              class="w-[8px]"
              :style="{
                transform: dropToggle ? 'rotate(180deg)' : 'rotate(0deg)',
              }"
            />
          </button>
          <ul
            class="w-[203px] bg-[#fff] absolute top-[44px] z-100 text-[13px] overflow-hidden duration-[0.5s]"
            :style="{
              height: dropToggle ? '229px' : '0px',
              border: dropToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
            }"
          >
            <li>
              <nuxt-link
                to="#"
                class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >Change Password</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block p-[7px_15px] bg-[lightgreen] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >setAutoLoginPage</nuxt-link
              >
            </li>
            <div class="w-fll h-[1px] bg-[#ddd] mt-3"></div>
            <li>
              <nuxt-link
                to="/sessions.htm"
                class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >Sessions</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >Sessions</nuxt-link
              >
            </li>
            <li>
              <nuxt-link
                to="#"
                class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s]"
                >Settings</nuxt-link
              >
            </li>
            <div class="w-fll h-[1px] bg-[#ddd] mb-3"></div>
            <li>
              <p
                class="flex items-center gap-3 p-[7px_15px] bg-[rgba(255,0,0,0.5)] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] cursor-pointer"
                @click="logoutMessage = true"
              >
                <img src="../assets/icons/logout.png" alt="logout" />
                Logout
              </p>
            </li>
          </ul>
        </div>
        <div>
          <button
            class="translate-button w-[130px] p-[4px_15px] text-[13px] uppercase flex items-center justify-between bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
            @click="translateToggle"
          >
            <img
              src="../assets/icons/translate.png"
              alt="user"
              class="w-[14px]"
            />
            {{ language ? language : 'English' }}
            <img
              src="../assets/icons/arrow-bottom.png"
              alt="user"
              class="w-[8px]"
              :style="{
                transform: langToggle ? 'rotate(180deg)' : 'rotate(0deg)',
              }"
            />
          </button>
          <ul
            class="w-[130px] bg-[#fff] absolute top-[44px] text-[13px] overflow-hidden duration-[0.4s] z-[100]"
            :style="{
              height: langToggle ? '135px' : '0px',
              border: langToggle ? '1px solid #ddd' : '1px solid #206fa2b3',
            }"
          >
            <li
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="getLanguage(locale.code, locale.title)"
            >
              <nuxt-link
                :to="switchLocalePath(locale.code)"
                class="block p-[7px_15px] hover:bg-[rgba(54,155,215,0.3)] duration-[0.2s] flex items-center gap-2 cursor-pointer"
              >
                <img
                  class="w-[11px]"
                  :src="require(`../assets/icons/${locale.url}`)"
                  :alt="locale.alt"
                />
                {{ locale.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full flex items-start gap-[5px]">
      <el-container>
        <el-aside
          v-if="!isLoginPage && !isPage"
          :width="collapseMune ? '64px' : '300px'"
          class="mt-1 border-t-[1px] border-t-[solid] border-t-[rgba(0,0,0,0.15)]"
        >
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="collapseMune"
          >
            <ul
              class="p-[15px_22px] hover:bg-[#ecf5ff] hover:cursor-pointer hover:duration-[0.4s] duration-[0.4s] border-b-[1px] border-b-[solid] border-b-[rgba(0,0,0,0.15)]"
              @click="isCollapse"
            >
              <li>
                <img
                  src="../assets/icons/toggle.jpg"
                  alt="icons"
                  class="w-[20px] h-[20px]"
                  :style="{
                    transform: collapseMune
                      ? 'rotateY(0deg)'
                      : 'rotateY(180deg)',
                  }"
                />
              </li>
            </ul>
            <el-submenu
              v-for="(item, index) in firstSystemMenuList"
              :key="index"
              :index="String(index)"
              class="border-b-[1px] border-b-[solid] border-b-[rgba(0,0,0,0.15)]"
            >
              <template slot="title">
                <div class="flex items-center gap-[20px]">
                  <img
                    :src="
                      item.icon
                        ? item.icon
                        : require('../assets/icons/list.png')
                    "
                    alt="icons"
                    class="w-[16px] h-[16px] cursor-pointer"
                  />
                  <p
                    :style="{ overflow: collapseMune ? 'hidden' : 'visible' }"
                    class="text-[#000] text-[14px]"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </template>
              <div @click="isCollapse">
                <nuxt-link
                  v-for="(childItem, indexChild) in item.child"
                  :key="indexChild"
                  :to="`${childItem.url}.htm`"
                >
                  <el-menu-item :index="String(childItem.id - indexChild)">
                    {{ childItem.name }}
                  </el-menu-item>
                </nuxt-link>
              </div>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <Nuxt />
        </el-container>
      </el-container>
    </div>
    <div
      v-show="logoutMessage"
      v-if="!isLoginPage && !isPage"
      class="absolute left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]"
    ></div>
    <div
      v-show="logoutMessage"
      class="w-[300px] h-[100px] bg-[#fff] absolute top-[15%] left-[50%] translate-x-[-50%] rounded-[5px] flex flex-col justify-center items-center gap-4"
    >
      <h3 class="font-semibold">Do you want log out?</h3>
      <div class="flex justify-between items-center">
        <el-button size="small" @click="getLogoutCansel">Cansel</el-button>
        <el-button size="small" type="danger" @click="getLogout">Yes</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  // DATA
  data() {
    return {
      isLoginPage: false,
      isPage: false,
      systemMenuList: null,
      firstSystemMenuList: [],
      collapseMune: true,
      isLoading: false,
      logoutMessage: false,
      dropToggle: false,
      langToggle: false,
      language: localStorage.getItem('langValue'),
    }
  },

  // COMPUTED
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },

  // WATCH
  watch: {
    $route(to, from) {
      this.isLoginPage = to.path === '/login.htm'
      this.isPage = to.path === '/branches.htm'
      const token = localStorage.getItem('token')
      if (!token && to.path !== '/login.htm') {
        this.$router.push('/login.htm')
      }
    },
  },

  // CREATED
  created() {
    this.isLoginPage = this.$route.path === '/login.htm'
    this.isPage = this.$route.path === '/branches.htm'
    const token = localStorage.getItem('token')
    if (token === 'undefined' || token === '') {
      localStorage.removeItem('token')
    }
    if (!token && this.$route.path !== '/login.htm') {
      this.$router.push('/login.htm')
    }
  },

  // MOUNTED
  mounted() {
    // System Menu
    this.isLoading = !this.isLoading
    axios
      .get('https://192.168.1.55:8443/api/systemMenu', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        this.isLoading = !this.isLoading
        this.systemMenuList = res.data
        // eslint-disable-next-line array-callback-return
        this.firstSystemMenuList = res.data.filter((value) => {
          if (value.active) return value
        })
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        this.$router.push('/login.htm')
        localStorage.removeItem('token')
        // eslint-disable-next-line no-console
        console.log(error)
      })
    // Drop Toggle
    window.addEventListener('click', this.handleWindowClick)
    window.addEventListener('click', this.handleWindowClickTranslate)
  },

  // beforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick)
    window.removeEventListener('click', this.handleWindowClickTranslate)
  },

  // METHODS
  methods: {
    isCollapse() {
      this.collapseMune = !this.collapseMune
    },

    // Log Out
    getLogout() {
      axios
        .delete('https://192.168.1.55:8443/api/security/logout', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status < 300) {
            localStorage.removeItem('token')
            this.logoutMessage = false
            this.$router.push('login.htm')
            this.$message({
              message: 'Siz Proyekt dan muvaffaqqiyatli chiqdingiz!',
              type: 'success',
            })
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Login request failed', error)
          this.$message.error(
            'Siz Proyekt dan chiqishda xotolikka uchradingiz.'
          )
        })
    },

    getLogoutCansel() {
      this.logoutMessage = false
    },

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

    // Translate toggle
    translateToggle() {
      this.langToggle = !this.langToggle
    },
    handleWindowClickTranslate(event) {
      if (!event.target.closest('.translate-button')) {
        this.toggleFunctionTranslate()
      }
    },
    toggleFunctionTranslate() {
      this.langToggle = false
    },

    // Language Request
    getLanguage(lang, value) {
      axios
        .get(`https://192.168.1.55:8443/api/lang?lang=${lang}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('langValue', value)
            localStorage.setItem('lang', lang)
            this.logoutMessage = false
            this.$message({
              message: `Proyekt tili ${value}ga muvaffaqqiyatli o'zgartirildi!`,
              type: 'success',
            })
            window.location.reload()
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Login request failed', error)
          this.$message.error(
            `Proyekt tili ${value}ga o'zgartirilishida xatolik bo'ldi!`
          )
        })
    },

    // go to Menu Setting
    goToMenuSetting() {
      this.isLoading = !this.isLoading
    },
  },
}
</script>
