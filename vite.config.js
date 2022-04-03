export default {
  base: '/bug-firefox-fetch-cors/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    // disable some optimization so that it is easier for Firefox developers to check the source
    minify: false,
    polyfillModulePreload: false
  }
}
