<template>
  <div class="w-full h-screen">
    <LanguageSelector class="absolute right-[10px] top-[7px]" />
    <div
      class="w-full h-[80vh] bg-[url('@/assets/images/fon.png')] bg-no-repeat bg-cover flex flex-col items-center justify-center"
    >
      <LoadingPage v-if="isLoading" class="absolute top-[30px]" />
      <img class="w-[200px]" src="@/assets/icons/logo.png" />
      <h1 class="text-[24px] text-[#317eac] leading-[36px] font-bold py-[30px]">
        {{ $t('pages.login.title') }}
      </h1>
      <ValidationObserver ref="formValidation">
        <form
          class="w-[350px] bg-[rgba(0,0,0,0.2)] flex flex-col items-center gap-[15px] p-[30px_25px] rounded-[5px]"
        >
          <div class="flex items-center gap-[10px] mb-[5px]">
            <ValidationProvider
              v-slot="{ errors }"
              class="flex items-center gap-[10px]"
              rules="required"
            >
              <label for="username">
                <img
                  src="@/assets/icons/user.png"
                  class="w-[17px] cursor-pointer"
                />
              </label>
              <input
                id="username"
                ref="usernameInput"
                v-model="form.username"
                :class="{
                  'border-red-200 shadow-[0_0_4px_#ef4444]': errors[0],
                }"
                type="text"
                :placeholder="$t('pages.login.user')"
                class="w-[220px] p-[4px_10px] bg-[rgba(255,255,255,.8)] rounded-[2px] outline-none text-[13px] border-[1px] border-solid border-[#fff] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
              />
            </ValidationProvider>
          </div>
          <div class="flex items-center gap-[10px] relative">
            <ValidationProvider
              v-slot="{ errors }"
              class="flex items-center gap-[10px] relative"
              rules="required"
            >
              <label for="password">
                <img
                  src="@/assets/icons/password.png"
                  class="w-[17px] cursor-pointer"
                />
              </label>
              <input
                id="password"
                v-model="form.password"
                :class="{
                  'border-red-200 shadow-[0_0_4px_#ef4444]': errors[0],
                }"
                :type="typeIcon ? 'text' : 'password'"
                :placeholder="$t('pages.login.password')"
                class="w-[220px] p-[4px_10px] rounded-[2px] bg-[rgba(255,255,255,.8)] outline-none text-[13px] border-[1px] border-solid border-[#fff] focus:border-[1px] focus:border-solid focus:border-[#52a8eccc] duration-[0.4s] focus:shadow-[0_0_5px_#52a8ec99]"
                @keyup.enter="getResponse"
              />
              <img
                v-if="typeIcon"
                src="@/assets/icons/view.png"
                class="w-[15px] absolute right-[10px] cursor-pointer"
                @click="getTypePassword"
              />
              <img
                v-else
                src="@/assets/icons/hide.png"
                class="w-[15px] absolute right-[10px] cursor-pointer"
                @click="getTypePassword"
              />
            </ValidationProvider>
          </div>
          <input
            type="button"
            :value="$t('pages.login.btnValue')"
            class="w-[250px] p-[5px_10px] mt-[10px] rounded-[3px] text-[13px] bg-[#5dc2f4] text-white text-[15px] cursor-pointer hover:bg-[#40b2e9] active:bg-[#249fdb] duration-[0.4s] outline-none"
            @click="getResponse"
          />
          <p class="text-[13px]">{{ $t('pages.login.loginSubText') }}</p>
        </form>
      </ValidationObserver>
    </div>
    <div
      class="w-full h-[20vh] bg-[url('@/assets/images/footer-img.png')] bg-no-repeat bg-cover"
    ></div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingPage from '../Loading/LoadingPage.vue'
import LanguageSelector from '@/components/main/LanguageSelector'

export default {
  components: {
    LanguageSelector,
    LoadingPage,
  },
  data() {
    return {
      typeIcon: false,
      form: {
        username: null,
        password: null,
      },
      isLoading: false,
    }
  },

  mounted() {
    this.$refs.usernameInput.focus()
  },

  methods: {
    getTypePassword() {
      this.typeIcon ? (this.typeIcon = false) : (this.typeIcon = true)
    },

    getResponse() {
      this.$refs.formValidation.validate().then((success) => {
        if (success) {
          this.isLoading = !this.isLoading
          axios
            .post(`https://192.168.1.55:8443/api/security/logIn`, {
              username: this.form.username,
              password: this.form.password,
            })
            .then((res) => {
              localStorage.setItem('token', res.data.token)
              this.$router.push('/branches.htm')
              this.isLoading = !this.isLoading
              this.$message({
                message: "Siz LogIn dan muvaffaqqiyatli o'tdingiz!",
                type: 'success',
              })
              this.getLanguage()
            })
            .catch((error) => {
              this.isLoading = !this.isLoading
              // eslint-disable-next-line no-console
              console.error('Login request failed', error)
              this.$message.error("Siz LogIn dan o'ta olmadingiz.")
            })
        }
      })
    },

    // Language Request
    getLanguage() {
      axios.get(
        `https://192.168.1.55:8443/api/lang?lang=${localStorage.getItem(
          'lang'
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
    },
  },
}
</script>
