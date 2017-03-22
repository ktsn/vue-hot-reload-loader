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

You need to update your webpack config to let webpack awere `vue-hot-reload-loader`.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['vue-hot-reload-loader', 'buble-loader'],
        // You should specify where your components are by include option
        include: /components/
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

For default export that doesn't match a Vue component, you can mark the module with a special comment to bypass 
`vue-hot-reload-loader` processing.

```js
/* vue-hot-reload: false */
export default function() {
    return "This module won't be processed by vue hot reload"
}
```

## License

MIT
