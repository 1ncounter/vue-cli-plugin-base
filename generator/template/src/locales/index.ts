<%_ if (options.vueI18n) { _%>
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  zh: {
    message: {
      hello: '你好，世界'
    }
  }
}

export const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})
<%_ } _%>
