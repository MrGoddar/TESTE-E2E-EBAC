const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    defaultCommandTimeout: 10000, // Aumentado para lidar com lentidão do servidor
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Desativa vídeos para economizar recursos no Jenkins
  video: false, 
  screenshotOnRunFailure: true
});
