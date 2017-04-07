import {Component, OnInit, Input} from "@angular/core";
import {HierarchicalMenuItem, MenuItemStructure, HierarchicalMenuConfig} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu",
    template: `
        <div class="hierarchical-menu">
            <hierarchical-menu-item [items]="config.menuItems" [config]="config"></hierarchical-menu-item>
        </div>
    `
    // do not add styles here! Any user must include the scss or css theme herself depending on the use case
})
export class HierarchicalMenuComponent implements OnInit {

    private _config: HierarchicalMenuConfig;

    @Input() set config(itemContainer: HierarchicalMenuConfig) {
        if (itemContainer) {
            this._config = itemContainer;
        } else {
            this._config = new HierarchicalMenuConfig();
        }
    }

    get config(): HierarchicalMenuConfig{
        this._config.rebuild();
        return this._config;
    }

    ngOnInit(): void {


    }

    reset() {
        this._config = new HierarchicalMenuConfig();
    }

}