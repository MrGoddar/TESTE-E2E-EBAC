const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br/',
    defaultCommandTimeout: 15000, // Aumentamos para 15 segundos
    pageLoadTimeout: 60000,       // 1 minuto para carregar a página
    setupNodeEvents(on, config) {
      // listeners
    },
  },
});
