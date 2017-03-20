import {Component, OnInit, Input} from "@angular/core";
import {HierarchicalMenuItem, HierarchicalMenuMode, HierarchicalMenuItemContainer} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu",
    template: `
        <div class="hierarchical-menu">
            <hierarchical-menu-item [menuItems]="itemContainer.menuItems"></hierarchical-menu-item>
        </div>
    `
    // styleUrls: [ "src/hierarchical-menu.style.scss" ],
    // encapsulation: ViewEncapsulation.None
})
export class HierarchicalMenuComponent implements OnInit {

    private _mode: HierarchicalMenuMode = HierarchicalMenuMode.HIERARCHICAL;

    private _itemContainer: HierarchicalMenuItemContainer;

    @Input() set mode(value: string) {
        if (value === "flat") {
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

    @Input() set itemContainer(itemContainer: HierarchicalMenuItemContainer) {
        if (itemContainer) {
            if (this._mode === HierarchicalMenuMode.FLAT) {
                this._itemContainer = new HierarchicalMenuItemContainer();
                this._itemContainer.menuItems = this.treeify(itemContainer.menuItems);
            } else {
                this._itemContainer = itemContainer;
            }
        } else {
            this._itemContainer = new HierarchicalMenuItemContainer();
        }
    }

    get itemContainer(): HierarchicalMenuItemContainer{
        return this._itemContainer;
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
        this.itemContainer = new HierarchicalMenuItemContainer();
    }

}