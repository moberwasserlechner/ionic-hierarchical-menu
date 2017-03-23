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

#### Theming / Styles

The npm module includes both scss and css files. Depending on your use case you have to include them in your project to get the themes or default styles.

These themes are included
- default ... hierarchical-menu.themes.default
- dark ... TBD

##### Ionic 2

In Ionic we can use SASS but have to customize Ionic's build process so the module styles are recognized.
For that can use the `config` section in our `packages.json`

```json
{
  "dependencies": {
    "@angular/common": "2.4.8",
    "@angular/compiler": "2.4.8",
    "@angular/compiler-cli": "2.4.8",
    "@angular/core": "2.4.8",
    "@angular/forms": "2.4.8",
    "@angular/http": "2.4.8",
    "@angular/platform-browser": "2.4.8",
    "@angular/platform-browser-dynamic": "2.4.8",
    "@angular/platform-server": "2.4.8",
    "@ionic/storage": "2.0.1",
    "angular2-jwt": "0.1.28",
    "ionic-angular": "2.2.0",
    "ionic-native": "2.8.1",
    "ionicons": "3.0.0",
    "ng-hierarchical-menu": "~0.0.1",
    "ng2-translate": "5.0.0",
    "rxjs": "5.0.1",
    "sw-toolbox": "3.4.0",
    "zone.js": "0.7.2"
  },
  "devDependencies": {
    "@ionic/app-scripts": "~1.1.4",
    "typescript": "~2.0.9"
  },
  "config": {
    "ionic_sass": "./config/ionic.sass.config.js"
  }
}
```

In detail you have to overwrite the `ionic_sass` config script. A good starting point is the [original script](https://github.com/driftyco/ionic-app-scripts/blob/master/config/sass.config.js). 
Copy it for example to `./config/ionic.sass.config.js` and add `node_modules/ng-hierarchical-menu/themes/scss` to the `includePaths` property.
 
```js
/**
     * includePaths: Used by node-sass for additional
     * paths to search for sass imports by just name.
     */
    includePaths: [
        'node_modules/ionic-angular/themes',
        'node_modules/ionicons/dist/scss',
        'node_modules/ionic-angular/fonts',
        // add this line
        'node_modules/ng-hierarchical-menu/themes/scss'
    ]
```

*Note:* It would be nices to just add the line instead of overwriting the whole file, because on every new version of the ionic-app-scripts you have to check for changes.

Now simply import the styles in your page.

```scss
page-example {
  // overwrite component variables

  // menu container

  // menu item
  $hierarchical-menu-text-color: $color4;
  // separator
  $hierarchical-menu-item-separator-color: $color4;
  // active
  $hierarchical-menu-active-text-color: $color2;
  $hierarchical-menu-active-bg-color: $color4;
  // hover
  $hierarchical-menu-hover-text-color: $color4;
  $hierarchical-menu-hover-bg-color: $color2;

  @import "hierarchical-menu.themes.default";

  .other-styles {
  
  }
}
```

Resources:
- https://ionicframework.com/docs/v2/resources/app-scripts/
- https://github.com/driftyco/ionic-app-scripts#custom-configuration


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

#### Use the `HierarchicalMenuComponent`

# License
[MIT](/LICENSE)
