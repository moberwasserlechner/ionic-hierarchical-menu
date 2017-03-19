# Hierarchical Menu for Angular [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Travis](https://img.shields.io/travis/moberwasserlechner/ng-hierarchical-menu/master.svg)](https://travis-ci.org/moberwasserlechner/ng-hierarchical-menu) [![npm monthly downloads](https://img.shields.io/npm/dm/ng-hierarchical-menu.svg)](https://www.npmjs.com/package/ng-hierarchical-menu) [![npm version](https://img.shields.io/npm/v/ng-hierarchical-menu.svg)](https://www.npmjs.com/package/ng-hierarchical-menu)

Hierarchical Menu (ng-hierarchical-menu) for Angular 2+ is a hierarchical / multi-level menu component

## Installation
```sh
npm install ng-hierarchical-menu --save
```

## Demo



## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ng-hierarchical-menu': 'node_modules/ng-hierarchical-menu/bundles/index.umd.js'
    }
});
```

#### Import the `HierarchicalMenuModule`

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {HierarchicalMenuModule} from 'ng-hierarchical-menu';

@NgModule({
    imports: [
        BrowserModule,
        HierarchicalMenuModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

#### Use the `HierarchicalMenuService`



#### Use the `HierarchicalMenuComponent`

# License
[MIT](/LICENSE)
