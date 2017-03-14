# Simply Nav [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Travis](https://img.shields.io/travis/moberwasserlechner/ngx-simply-nav/master.svg?maxAge=2592000)](https://travis-ci.org/moberwasserlechner/ngx-simply-nav) [![npm monthly downloads](https://img.shields.io/npm/dm/ngx-simply-nav.svg)](https://www.npmjs.com/package/ngx-simply-nav) [![npm version](https://img.shields.io/npm/v/ngx-simply-nav.svg)](https://www.npmjs.com/package/ngx-simply-nav)

Simply Nav is a Angular 2+ Hierarchical / Multi-level navigation component

## Installation
```sh
npm install ngx-simply-nav --save
```

## Demo



## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ngx-simply-nav': 'node_modules/ngx-simply-nav/bundles/index.umd.js'
    }
});
```

#### Import the `SimplyNavModule`

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {SimplyNavModule} from 'ngx-simply-nav';

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
