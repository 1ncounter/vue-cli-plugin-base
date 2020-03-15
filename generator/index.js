module.exports = (api, { vueI18n }) => {
  api.injectImports(api.entryFile, `import '@/plugins'`)
  api.injectImports(api.entryFile, `import '@/common/directives'`)

  if (vueI18n) {
    api.injectImports(api.entryFile, `import { i18n } from '@/locales'`)

    api.injectRootOptions(api.entryFile, `i18n`)

    api.extendPackage({
      dependencies: {
        'vue-i18n': '^8.3.2'
      }
    })
  }

  api.extendPackage({
    dependencies: {
      'axios': '^0.19.0'
    }
  })

  api.render('./template', {
    vueI18n,
    hasRouter: api.hasPlugin('router')
  })
}