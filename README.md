# Just Another Menu [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Travis](https://img.shields.io/travis/moberwasserlechner/ngx-jam/master.svg?maxAge=2592000)](https://travis-ci.org/moberwasserlechner/ngx-jam) [![npm monthly downloads](https://img.shields.io/npm/dm/ngx-jam.svg)](https://www.npmjs.com/package/ngx-jam) [![npm version](https://img.shields.io/npm/v/ngx-jam.svg)](https://www.npmjs.com/package/ngx-jam)

Just Another Menu (ngx-jam) is a Angular 2+ Hierarchical / Multi-level navigation component

## Installation
```sh
npm install ngx-jam --save
```

## Demo



## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ngx-jam': 'node_modules/ngx-jam/bundles/index.umd.js'
    }
});
```

#### Import the `SimplyNavModule`

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {SimplyNavModule} from 'ngx-jam';

@NgModule({
    imports: [
        BrowserModule,
        SimplyNavModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

#### Use the `SimplyNavService`



#### Use the `SimplyNavComponent`

# License
[MIT](/LICENSE)
