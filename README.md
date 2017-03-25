# vue-hot-reload-loader

Enable hot module replacement (HMR) on your Vue components.

This loader is for Vue components written in `.js` (or other non single file components format) file. If you are using `.vue` file, you don't need this loader because they already have HMR feature.

## Installation

```bash
# NPM
$ npm install --save-dev vue-hot-reload-loader

# Yarn
$ yarn add --dev vue-hot-reload-loader
```

## Usage

You need to update your webpack config to let webpack awere `vue-hot-reload-loader`. Note that you should carefuly set webpack's [rule condition](https://webpack.js.org/configuration/module/#rule-conditions) so that `vue-hot-reload-loader` is only used for actual component files. See [a discussion](https://github.com/ktsn/vue-hot-reload-loader/issues/6).

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['vue-hot-reload-loader', 'buble-loader'],
        // If and only if all your components are in `path/to/components` directory
        include: path.resolve(__dirname, 'path/to/components')
      }
    ]
  }
}
```

And you have to export each component as default export.

```js
export default {
  data () {
    return {
      message: 'hi'
    }
  }
}
```

## License

MIT
