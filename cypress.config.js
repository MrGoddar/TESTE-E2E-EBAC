const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    video: false, // Desativar vídeo economiza CPU no Jenkins
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Isso ajuda a mitigar o erro de GPU que apareceu no seu log
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-gpu');
          return launchOptions;
        }
      });
    },
  },
});
