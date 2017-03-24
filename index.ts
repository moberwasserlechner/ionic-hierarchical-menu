import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { CommonModule } from '@angular/common';
import { HierarchicalMenuConfig, HierarchicalMenuItem } from "./src/hierarchical-menu.service";
import { HierarchicalMenuComponent } from "./src/hierarchical-menu.component";
import { HierarchicalMenuItemComponent } from "./src/hierarchical-menu-item.component";

export { HierarchicalMenuConfig } from './src/hierarchical-menu.service';
export { HierarchicalMenuItem } from './src/hierarchical-menu.service';
export { HierarchicalMenuComponent } from './src/hierarchical-menu.component';

export let providers = [
    HierarchicalMenuConfig, HierarchicalMenuItem
];

@NgModule({
    imports: [CommonModule],
    declarations: [HierarchicalMenuComponent, HierarchicalMenuItemComponent],
    exports: [HierarchicalMenuComponent, HierarchicalMenuItemComponent],
    providers: providers,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HierarchicalMenuModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HierarchicalMenuModule,
            providers: providers
        };
    }
}