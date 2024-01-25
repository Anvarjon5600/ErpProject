<template>
  <div>
    <button
      class="translate-button w-[130px] p-[4px_15px] text-[13px] uppercase flex items-center justify-between bg-[#fff] rounded-[3px] relative z-[1] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-gray-200"
      @click="translateToggle"
    >
      <img src="../../assets/icons/translate.png" alt="user" class="w-[14px]" />
      {{ language ? language : 'English' }}
      <img
        src="../../assets/icons/arrow-bottom.png"
        alt="user"
        class="w-[8px]"
        :style="{
          transform: langToggle ? 'rotate(180deg)' : 'rotate(0deg)',
        }"
      />
    </button>
    <ul
      class="w-[130px] bg-[#fff] absolute top-[32px] text-[13px] overflow-hidden duration-[0.4s]"
      :style="{
        height: langToggle ? '135px' : '0px',
        border: langToggle ? '1px solid #ddd' : '1px solid #8B98A6',
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
            :src="require(`../../assets/icons/${locale.url}`)"
            :alt="locale.alt"
          />
          {{ locale.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      langToggle: false,
      dropToggle: false,
      language: localStorage.getItem('langValue'),
    }
  },

  // COMPUTED
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
  },

  // Mounted
  mounted() {
    // language
    this.$i18n.locale = localStorage.getItem('lang') || 'en'
    // toggle language
    window.addEventListener('click', this.handleWindowClickTranslate)
  },

  // BeforeDestroy
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClickTranslate)
  },

  // Method
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
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

    // Language
    getLanguage(lang, value) {
      if (lang && value) {
        localStorage.setItem('langValue', value)
        localStorage.setItem('lang', lang)
        this.$i18n.locale = lang
        this.language = value
        this.$message({
          message: `Proyekt tili ${value}ga muvaffaqqiyatli o'zgartirildi!`,
          type: 'success',
        })
      } else {
        this.$message.error(
          `Proyekt tili ${value}ga o'zgartirilishida xatolik bo'ldi!`
        )
      }
    },
  },
}
</script>
