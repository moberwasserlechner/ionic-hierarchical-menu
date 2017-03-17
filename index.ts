import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HierarchicalMenuConfig, hierarchicalMenuServiceFactory, HierarchicalMenuService } from "./src/hierarchical-menu.service";
import { HierarchicalMenuComponent } from "./src/hierarchical-menu.component";

export * from './src/hierarchical-menu.service';
export * from './src/hierarchical-menu.component';

export let providers = [
    HierarchicalMenuConfig,
    { provide: HierarchicalMenuService, useFactory: hierarchicalMenuServiceFactory, deps: [HierarchicalMenuConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [HierarchicalMenuComponent],
    exports: [HierarchicalMenuComponent],
    providers: providers
})
export class HierarchicalMenuModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: HierarchicalMenuModule,
            providers: providers
        };
    }
}