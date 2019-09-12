const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [['env', {modules: isTest ? 'commonjs' : false}], '@babel/react'],

  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
  ],
}
