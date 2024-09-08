import { createI18n } from 'vue-i18n'
import { en as vuetifyEn, zhHans as vuetifyZh } from 'vuetify/locale'
import en from './en'
import zh from './zh'

const messages = {
  en: {
    $vuetify: {
      ...vuetifyEn,
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}',
      },
    },
    ...en,
  },
  zh: {
    $vuetify: {
      ...vuetifyZh,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}',
      },
    },
    ...zh,
  },
}

export const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'en',
  fallbackLocale: 'zh',
  messages,
})
