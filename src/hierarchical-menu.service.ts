import {Injectable, PipeTransform} from "@angular/core";


/**
 * Menu item mode describes the form of incoming menu items. Are the already hierarchical or add only referencing their parents.
 */
export enum HierarchicalMenuMode {
    FLAT, HIERARCHICAL
}

// ######################################
// ### Config
// ######################################

@Injectable()
export class HierarchicalMenuConfig {
    private _menuItems: Array<HierarchicalMenuItem> = [];
    private _menuItemMode: HierarchicalMenuMode = HierarchicalMenuMode.HIERARCHICAL;
    private dirtyList: boolean = false;

    useTitleAsId: boolean = true;
    onClickLink: Function;
    onClickExpander: Function;
    onTranslate: Function;

    constructor(menuItems?: Array<HierarchicalMenuItem>) {
        this.useTitleAsId = true;
        if (menuItems) {
            menuItems.forEach(i => {
                this.add(i);
            });
        }
    }

    /**
     * Add a menu item at the end of the list
     * @param item
     */
    public add(item: HierarchicalMenuItem) {
        this.addOneBefore(null, item);
    }

    private addOneBefore(beforeId: string | null, item: HierarchicalMenuItem) {
        if (item != null) {
            if ((!item.id || item.id == null) && this.useTitleAsId === true) {
                item.id = item.title;
            }

            let beforeItem: HierarchicalMenuItem | null = null;
            if (beforeId) {
                this._menuItems.forEach(i => {
                    if (i.id === beforeId) {
                        beforeItem = i;
                        return;
                    }
                });
            }

            this.dirtyList = true;

            if (!beforeItem) {
                this._menuItems.push(item);
            } else {
                let beforeIdx = this._menuItems.indexOf(beforeItem);
                this._menuItems.splice(beforeIdx, 0, item);
            }
        }
    }

    public addArray(items: HierarchicalMenuItem[]) {
        items.forEach(i => {
            this.addOneBefore(null, i);
        });
    }

    /**
     * Add one or more (argument list) menu items before a existing item identified by its id.
     * @param beforeId the menu item's id
     * @param items
     */
    public addBefore(beforeId: string, ...items: HierarchicalMenuItem[]) {
        items.forEach(i => {
           this.addOneBefore(beforeId, i);
        });
    }

    /**
     * Add a array of menu items before a existing item identified by its id.
     * @param beforeId the menu item's id
     * @param items
     */
    public addArrayBefore(beforeId: string, items: HierarchicalMenuItem[]) {
        items.forEach(i => {
            this.addOneBefore(beforeId, i);
        });
    }

    set menuItems(list: Array<HierarchicalMenuItem>) {
        this._menuItems = list;
        this.dirtyList = true;
    }

    get menuItems(): Array<HierarchicalMenuItem> {
        return this._menuItems || [];
    }

    isDirty():boolean {
        return this.dirtyList;
    }

    /**
     * Menu item mode describes the form of incoming menu items. Are the already hierarchical or add only referencing their parents.
     * @param value use flat for not hierarchical items. defaults to hierarchical.
     */
    set menuItemMode(value: string) {
        if (value && value.toLowerCase() === "flat") {
            this._menuItemMode = HierarchicalMenuMode.FLAT;
        } else {
            this._menuItemMode = HierarchicalMenuMode.HIERARCHICAL;
        }
    }

    get menuItemMode(): string {
        return this._menuItemMode.toString();
    }

    getHierarchicalMenuMode(): HierarchicalMenuMode {
        return this._menuItemMode;
    }

}

// ######################################
// ### Menu Item
// ######################################

@Injectable()
export class HierarchicalMenuItem {
    title: string;
    translateTitleEnabled?: boolean = true;

    id?: string;
    order?: number = 0;

    icon?: string | null;
    iconMode?: IconMode = IconMode.FONTAWESOME;
    style?: string | null;

    page?: any;
    pageIndex?: number;

    expanded?: boolean = false;
    parentRef?: string | null;
    children?: Array<HierarchicalMenuItem> = [];

    onClickLink?: Function;
    onClickExpander?: Function;
}

export enum IconMode {
    FONTAWESOME, IONIC
}

export function hierarchicalMenuServiceFactory(config: HierarchicalMenuConfig): HierarchicalMenuService  {
    return new HierarchicalMenuService(config);
}

@Injectable()
export class HierarchicalMenuService {

    constructor(private config: HierarchicalMenuConfig) {}

}

