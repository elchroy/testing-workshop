module.exports = {
  // jsdom is the default, but if we're working on just backend test,
  // then we can just use "node" to avoid having the window or other
  // frontend requirements of the jest library
  testEnvironment: 'jsdom',

  // you can also have a module name mapper for graphql files, and some other special file loaders
  moduleNameMapper: {
    // use this to solve for situations where the element class is not appearing in the test element (like div)
    '\\.module\\.css$': require.resolve('identity-obj-proxy'),

    // and use this to resolve if the css files aren't being loaded at all
    '\\.css$': require.resolve('./test/style-mock'),
  },

  // we need to setup support for localstorage in node, by using the setup-test-framework function
  setupTestFrameworkScriptFile: require.resolve('./test/setup-test-framework'),
  // but this is deprecated in favour of 'setupFilesAfterEnv'. Also check out setupFiles (which is an array)

  // this will only collect coverage from the src directory
  collectCoverageFrom: ['**/src/**/*.js'],
  // there is also a blacklist version of this that exclude the tests by default as well

  // here we don't want to test coverage to get below a certain level/threshold
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 10,
      functions: 20,
      lines: 21,
    },
  },
}
