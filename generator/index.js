const fs = require('fs')
const writeJson = require('../lib/write-json')

module.exports = (api, { vueI18n }) => {
  api.injectImports(api.entryFile, `import './svgs'`)
  api.injectImports(api.entryFile, `import '@/plugins'`)
  api.injectImports(api.entryFile, `import '@/components'`)
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
      'axios': '^0.19.0',
      'svg-sprite-loader': '^4.2.1'
    }
  })

  if (api.hasPlugin('router')) {
    fs.unlinkSync(api.resolve('src/router/index.ts'))
  }
  if (api.hasPlugin('eslint')) {
    fs.unlinkSync(api.resolve('.eslintrc.js'))
  }

  api.render('./template', {
    vueI18n,
    hasRouter: api.hasPlugin('router'),
    hasEslint: api.hasPlugin('eslint')
  })

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      writeJson(api.resolve('tsconfig.json'), {
        compilerOptions: {
          "noImplicitAny": false
        }
      })
    }
  }
}
