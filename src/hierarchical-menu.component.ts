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
            // if (this._mode === MenuItemStructure.FLAT) {
            //     this._config.menuItems = this.treeify(itemContainer.menuItems);
            //     this._config.dirtyList = false;
            // }
        } else {
            this._config = new HierarchicalMenuConfig();
        }
    }

    get config(): HierarchicalMenuConfig{
        if (this._config.menuItemStructure === MenuItemStructure.FLAT && this._config.isDirty()) {
            this._config.menuItems = this.treeify(this._config.menuItems);
        }

        return this._config;
    }

    treeify(flatList: HierarchicalMenuItem[]): HierarchicalMenuItem[] {
        let treeList: HierarchicalMenuItem[] = [];
        let lookup:any = {};
        flatList.forEach(obj => {
            lookup[<string>obj.id] = obj;
        });

        flatList.forEach(obj => {
            if (obj.parentRef) {
                if (lookup[<string>obj.parentRef]) {
                    if (!lookup[<string>obj.parentRef].children) {
                        lookup[<string>obj.parentRef].children = [];
                    }
                    lookup[<string>obj.parentRef].children.push(obj);
                } else {
                    obj.parentRef = null;
                }
            } else {
                treeList.push(obj);
            }
        });
        return treeList;
    }

    ngOnInit(): void {


    }

    reset() {
        this._config = new HierarchicalMenuConfig();
    }

}