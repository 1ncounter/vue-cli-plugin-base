const fs = require('fs')

module.exports = (api, { vueI18n }) => {
  api.injectImports(api.entryFile, `import './svgs';`)
  api.injectImports(api.entryFile, `import '@/plugins';`)
  api.injectImports(api.entryFile, `import '@/components';`)
  api.injectImports(api.entryFile, `import '@/common/directives';`)

  if (vueI18n) {
    api.injectImports(api.entryFile, `import { i18n } from '@/locales';`)

    api.injectRootOptions(api.entryFile, `i18n`)

    api.extendPackage({
      dependencies: {
        'vue-i18n': '^8.3.2',
      }
    })
  }

  api.extendPackage({
    dependencies: {
      'axios': '^0.19.0'
    },
    devDependencies: {
      'svg-sprite-loader': '^4.2.1'
    }
  })

  api.render('./template', {
    vueI18n,
  })

  api.afterAnyInvoke(() => {
    api.postProcessFiles((files) => {
      if (files['src/router/index.ts']) {
        files['src/router/index.ts'] = fs.readFileSync(api.resolve('src/router/index.ts'), 'utf8')
      }
  
      if (files['.eslintrc.js']) {
        files['.eslintrc.js'] = fs.readFileSync(api.resolve('.eslintrc.js'), 'utf8')
      }
  
      if (files['tsconfig.json']) {
        files['tsconfig.json'] = fs.readFileSync(api.resolve('tsconfig.json'), 'utf8')
      }
    })
  })
}
