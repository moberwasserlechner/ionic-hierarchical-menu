# Hierarchical Menu for Angular [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![Travis](https://img.shields.io/travis/moberwasserlechner/ng-hierarchical-menu/master.svg)](https://travis-ci.org/moberwasserlechner/ng-hierarchical-menu) [![npm monthly downloads](https://img.shields.io/npm/dm/@byteowls/ng-hierarchical-menu.svg)](https://www.npmjs.com/package/@byteowls/ng-hierarchical-menu) [![npm version](https://img.shields.io/npm/v/@byteowls/ng-hierarchical-menu.svg)](https://www.npmjs.com/package/@byteowls/ng-hierarchical-menu)

Hierarchical Menu (@byteowls/ng-hierarchical-menu) for Angular 2+ is a hierarchical / multi-level menu component

## Installation
```sh
npm install @byteowls/ng-hierarchical-menu --save
```

## Demo



## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        '@byteowls/ng-hierarchical-menu': 'node_modules/@byteowls/ng-hierarchical-menu/bundles/index.umd.js'
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
    "@byteowls/ng-hierarchical-menu": "~0.1.0",
    "angular2-jwt": "0.1.28",
    "ionic-angular": "2.2.0",
    "ionic-native": "2.8.1",
    "ionicons": "3.0.0",
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
Copy it for example to `./config/ionic.sass.config.js` and add `node_modules/@byteowls/ng-hierarchical-menu/themes/scss` to the `includePaths` property.
 
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
        'node_modules/@byteowls/ng-hierarchical-menu/themes/scss'
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
import {HierarchicalMenuModule} from '@byteowls/ng-hierarchical-menu';

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

This example show a menu page I use in a Ionic 2 project.


```ts
@Component({
    selector: 'page-menu',
    template: '<hierarchical-menu [config]="menuConfig"></hierarchical-menu>'
})
export class MenuPage {

    menuConfig: HierarchicalMenuConfig;
    
    constructor(
        // ionic2 event bus
        public eventBus: Events,
        // ngx-translate translation service
        public i18n: TranslateService) {
        this.buildMenu();
    }
    
    buildMenu() {
        // create the config object
        this.menuConfig = new HierarchicalMenuConfig();
        // the menu items are structured a flat list
        this.menuConfig.menuItemStructure = MenuItemStructure.FLAT;
        // translate menu item titles using this callback
        this.menuConfig.onTranslate = (code: string) => {
            return this.i18n.instant(code);
        };
        // if there is a page assigned to the menu item send a navigation event
        this.menuConfig.onClickLink = (item: HierarchicalMenuItem) => {
            if (item.page) {
                let navEvent = new NavEvent();
                navEvent.page = item.page;
                if (item.pageIndex) {
                    navEvent.pageIndex = item.pageIndex;
                }
                this.eventBus.publish(AppConstants.Event.GO_TO_PAGE, navEvent);
            }
        };
        // run this callback if the expander is clicked
        this.menuConfig.onClickExpander = (item: HierarchicalMenuItem) => {
             console.info("config: parent menu#"+item.id+" "+(item.expanded?"opened":"closed"));
        };

        // add a parent menu item with a special style and expand it per default
        this.menuConfig.add({title: "menu.personal.section", style: "top-section", expanded: true});
        // Add simple menu item with a reference to the parent. Because we said that items are delivered as flat list. 
        // The component will create the hierarchical structure by itself
        this.menuConfig.add({title: "menu.personal.home", parentRef: "menu.personal.section", page: HomePage});
        // Another menu item
        this.menuConfig.add({title: "menu.personal.profile", parentRef: "menu.personal.section", page: ProfilePage});
        // Another menu item with a pageIndex because its a tabbed page
        this.menuConfig.add({title: "menu.personal.events", parentRef: "menu.personal.section", page: TabsPage, pageIndex: 0});
        // A parent menu item
        this.menuConfig.add({title: "menu.settings.section", style: "top-section", expanded: true});
        this.menuConfig.add({title: "menu.settings.feedback", parentRef: "menu.settings.section"});
        this.menuConfig.add({title: "menu.settings.about", parentRef: "menu.settings.section"});
        // use a special click callback for this menu item
        this.menuConfig.add({title: "menu.settings.logout", parentRef: "menu.settings.section", onClickLink: ()=> {
            this.logout();
        }});
     }
```

It's also possible to load menu items after first init, e.g. from a backend service.
   
```ts   
     // 
     loadMenuItems() {
         const ITEM_ID = "menu.chosen_club.section";
         this.menuConfig.addBefore("menu.settings.section", { id: ITEM_ID, title: "Special section", expanded: true, style: "special-section"});
         
         // this is a 
         this.backendService.getMenuItems().subscribe(
             (menuItems) => {
                 menuItems.forEach(i => {
                     if (i.parentRef == null) {
                         i.style = "top-section";
                         i.parentRef = ITEM_ID;
                     } else {
                         i.onClickLink = (item: HierarchicalMenuItem) => {
                            this.openRemoteMenuItemPage(item);
                         }
                     }
                 });
    
                 this.menuConfig.addArray(moduleMenuItems);
             },
             error => {
                 console.log(error);
             }
         );
     }
    
}
```

# License
[MIT](/LICENSE)
