const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://merchants.sandbox-utrust.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      MAILOSAUR_API_KEY: "XisEGoWdHeRn8VNu",
    },
  },
});
