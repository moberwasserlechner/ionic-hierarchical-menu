import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import {JamConfig, justAnotherMenuServiceFactory, JustAnotherMenuService} from "./src/jam.service";
import {JustAnotherMenuComponent} from "./src/jam.component";

export * from './src/jam.service';
export * from './src/jam.component';

export let providers = [
    JamConfig,
    { provide: JustAnotherMenuService, useFactory: justAnotherMenuServiceFactory, deps: [JamConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [JustAnotherMenuComponent],
    exports: [JustAnotherMenuComponent],
    providers: providers
})
export class JustAnotherMenuModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JustAnotherMenuModule,
            providers: providers
        };
    }
}