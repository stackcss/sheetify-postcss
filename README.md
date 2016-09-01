# sheetify-postcss

postcss transform for sheetify, use all the plugins!

```shell
npm install --save sheetify-postcss
```

## usage

### programmatic

```
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
