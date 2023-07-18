const envConfig = require("./src/core/config/config");
require("dotenv").config();

module.exports = {
  preset: 'jest-puppeteer',
  testRegex: '.*\\/src\\/tests\\/.*\\.spec\\.js$',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: Number(envConfig.getTimeOutTest)
};
