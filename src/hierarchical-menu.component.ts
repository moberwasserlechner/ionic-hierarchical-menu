import {Component, OnInit, Input} from "@angular/core";
import {HierarchicalMenuItem, HierarchicalMenuMode, HierarchicalMenuConfig} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu",
    template: `
        <div class="hierarchical-menu">
            <hierarchical-menu-item [items]="config.menuItems" [config]="config"></hierarchical-menu-item>
        </div>
    `
    // styleUrls: [ "src/hierarchical-menu.style.scss" ],
    // encapsulation: ViewEncapsulation.None
})
export class HierarchicalMenuComponent implements OnInit {

    private _mode: HierarchicalMenuMode = HierarchicalMenuMode.HIERARCHICAL;

    private _config: HierarchicalMenuConfig;

    @Input() set mode(value: string) {
        if (value && value.toLowerCase() === "flat") {
            this._mode = HierarchicalMenuMode.FLAT;
        } else {
            this._mode = HierarchicalMenuMode.HIERARCHICAL;
        }
    }

    get mode(): string {
        return this._mode.toString();
    }

    public getHierarchicalMenuMode(): HierarchicalMenuMode {
        return this._mode;
    }

    @Input() set config(itemContainer: HierarchicalMenuConfig) {
        if (itemContainer) {
            this._config = itemContainer;
            // if (this._mode === HierarchicalMenuMode.FLAT) {
            //     this._config.menuItems = this.treeify(itemContainer.menuItems);
            //     this._config.dirtyList = false;
            // }
        } else {
            this._config = new HierarchicalMenuConfig();
        }
    }

    get config(): HierarchicalMenuConfig{
        if (this._mode === HierarchicalMenuMode.FLAT && this._config.isDirty()) {
            this._config.menuItems = this.treeify(this._config.menuItems);
        }

        return this._config;
    }

    treeify(flatList: Array<HierarchicalMenuItem>): Array<HierarchicalMenuItem> {
        let treeList: Array<HierarchicalMenuItem> = [];
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
        this.mode = '';
        this._config = new HierarchicalMenuConfig();
    }

}