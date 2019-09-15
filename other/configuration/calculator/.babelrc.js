const isTest = false //String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    // putting them in brackets because of this error
    // - https://github.com/babel/babel/issues/9679#issuecomment-472640723
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
  ],
  plugins: [
    'syntax-dynamic-import',
    'transform-class-properties',
    'transform-object-rest-spread',
    isTest ? 'dynamic-import-node' : null,
  ].filter(Boolean),
}

/*
Solution snippets below


const isTest = String(process.env.NODE_ENV) === 'test'


for the env plugin modules config:
isTest ? 'commonjs' : false

For dynamic import config in plugins
isTest ? 'dynamic-import-node' : null
 */
