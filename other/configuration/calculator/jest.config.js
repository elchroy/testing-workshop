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
}
