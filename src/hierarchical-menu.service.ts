import {Injectable} from "@angular/core";
import {deprecate} from "util";


/**
 * Menu item mode describes the form of incoming menu items. Are the already hierarchical or add only referencing their parents.
 */
export enum MenuItemStructure {
    FLAT, HIERARCHICAL
}

@Injectable()
export class HierarchicalMenuConfig {
    public static EXPANDER_ICON_EXPANDED = "arrow-down";
    public static EXPANDER_ICON_COLLAPSED = "arrow-forward";

    private _menuItems: HierarchicalMenuItem[] = [];
    private rebuildRequired: boolean = false;

    menuItemStructure: MenuItemStructure = MenuItemStructure.HIERARCHICAL;
    useTitleAsId: boolean = true;
    onClickLink: Function;
    onClickExpander: Function;
    onTranslate: Function;

    expanderIconExpanded: string;
    expanderIconCollapsed: string;

    private expandedIds: string[];
    private expandedCloseAllOthers: boolean;

    constructor() {
        this.useTitleAsId = true;
    }

    /**
     * Add a menu item at the end of the list
     * @param item
     */
    public add(item: HierarchicalMenuItem) {
        this.addOneBefore(null, item);
    }

    /**
     * Add a array of menuItems to the end
     * @param items
     */
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

    set menuItems(list: HierarchicalMenuItem[]) {
        this._menuItems = list;
        this.rebuildRequired = true;
    }

    get menuItems(): HierarchicalMenuItem[] {
        return this._menuItems || [];
    }

    getExpandedIds(): string[] {
        let ids: string[] = [];
        HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
            if (i.expanded && (i.children && i.children.length > 0)) {
                ids.push(i.id);
            }
        });
        return ids;
    }

    /**
     * Sets the expanded ids but not acutally expand the menu items.
     *
     * This will be done as soon as a rebuild is trigged.
     * @param ids
     * @param closeAllOthers
     */
    expandOnRebuild(ids: string[], closeAllOthers: boolean = false) {
        if (ids) {
            this.expandedIds = ids;
        } else {
            this.expandedIds = [];
        }
        this.expandedCloseAllOthers = closeAllOthers;
    }

    expandNow(ids: string[], closeAllOthers: boolean = false) {
        if (ids && ids.length > 0) {
            if (closeAllOthers) {
                this.collapseAll();
            }

            HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
                if (ids.indexOf(i.id) > -1 && (i.children && i.children.length > 0)) {
                    i.expanded = true;
                }
            });
        }
    }

    /**
     * Expands all menu items with children
     */
    expandAll(): void {
        HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
            if (i.children && i.children.length > 0) {
                i.expanded = true;
            }
        });
    }

    /**
     * Collapses all menu items with children
     */
    collapseAll(): void {
        HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
            if (i.children && i.children.length > 0) {
                i.expanded = false;
            }
        });
    }

    /**
     * Rebuilds the menu item structure and assignes expanded ids if the rebuild required flag is true.
     */
    rebuild(force:boolean = false) {
        if (this.rebuildRequired || force) {
            if (this.menuItemStructure === MenuItemStructure.FLAT) {
                this._menuItems = this.treeify(this._menuItems);
            }
            if (this.expandedIds && this.expandedIds.length > 0) {
                this.expandNow(this.expandedIds, this.expandedCloseAllOthers);
            }
            // rebuild done
            this.rebuildRequired = false;
        }
    }

    private treeify(flatList: HierarchicalMenuItem[]): HierarchicalMenuItem[] {
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

            if (!beforeItem) {
                this._menuItems.push(item);
            } else {
                let beforeIdx = this._menuItems.indexOf(beforeItem);
                this._menuItems.splice(beforeIdx, 0, item);
            }

            this.rebuildRequired = true;
        }
    }

}

// ######################################
// ### Menu Item
// ######################################

@Injectable()
export class HierarchicalMenuItem {
    title: string;
    doNotTranslate?: boolean = false;

    id?: string;
    order?: number = 0;

    icon?: string | null;
    iconMode?: IconMode = IconMode.IONIC;

    styleItem?: string; // ul > li
    styleLine?: string; // ul > li > div
    styleLink?: string; // ul > li > div > div
    styleIcon?: string; // ul > li > div > div > button > ion-icon | i
    styleText?: string; // ul > li > div > div > button > span
    styleExpander?: string; //

    page?: any;
    pageOptions?: any = {};

    expanded?: boolean = false;
    expanderIconExpanded?: string;
    expanderIconCollapsed?: string;

    parentRef?: string | null;
    children?: HierarchicalMenuItem[] = [];

    onClickLink?: Function;
    onClickExpander?: Function;

    static forEachRecursive(objects: HierarchicalMenuItem[], callback: (item: HierarchicalMenuItem) => any) {
        for (let o of objects) {
            if (o) {
                callback(o);

                if (o.children) {
                    HierarchicalMenuItem.forEachRecursive(o.children, callback);
                }
            }
        }
    }
}

export enum IconMode {
    FONTAWESOME, IONIC
}
