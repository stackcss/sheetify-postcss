# sheetify-postcss

postcss transform for sheetify, use all the plugins!

```shell
npm install --save sheetify-postcss
```

## usage

### programmatic

```js
const sheetify = require('sheetify/stream')
const path = require('path')

const opts = {
  use: [
    [
      'sheetify-postcss', {
        plugins: [
          require('postcss-color-function')
        ]
      }
    ]
  ],
  basedir: __dirname
}

browserify('./entry')
  .transform('sheetify', opts)
  .bundle()
  .pipe(process.stdout)
```

### with `package.json`

add to your `package.json` `browserify.transform` field:

```json
{
  "browserify": {
    "transform": [
      [
        "sheetify/transform",
        {
          "use": [
            [
              "sheetify-postcss",
              {
                "plugins": [
                  "postcss-color-function"
                ]
              }
            ]
          ]
        }
      ]
    ]
  }
}
```

### using `.postcssrc`

Options and plugins can be defined using a config file. Uses [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) which supports `postcss` field in `package.json`, an external JSON or YAML (`.postcssrc`) file as well as JS (`.postcssrc.js` and `postcss.config.js`) file format.

```javascript
// .postcssrc.js
module.exports = function (ctx) {
  var plugins = [require('postcss-color-function')]

  if (ctx.env !== 'development') {
    plugins.push(require('autoprefixer'))
  }

  return {
    map: ctx.env === 'development' ? 'inline' : false
    plugins: plugins
  }
}
```

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
