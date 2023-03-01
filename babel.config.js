module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: true,
      verbose: false
    }],
    ['module-resolver', {
      root: ['./src'],
      alias: {
        assets: './src/assets',
        components: './src/components',
        constants: './src/constants',
        hooks: './src/hooks',
        layouts: './src/layouts',
        navigations: './src/navigations',
        screens: './src/screens',
        utils: './src/utils'
      }
    }]
  ]

}
