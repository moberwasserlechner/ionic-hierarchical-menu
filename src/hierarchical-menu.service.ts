import {Injectable} from "@angular/core";


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
    private dirtyList: boolean = false;

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
        this.dirtyList = true;
    }

    get menuItems(): HierarchicalMenuItem[] {
        return this._menuItems || [];
    }

    isDirty():boolean {
        return this.dirtyList;
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

    expandAll(): void {
        HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
            if (i.children && i.children.length > 0) {
                i.expanded = true;
            }
        });
    }

    setExpandedIds(ids: string[], closeAllOthers: boolean = false) {
        this.expandedIds = ids;
        this.expandedCloseAllOthers = closeAllOthers;
    }

    expandFromStored() {
        if (this.expandedIds != null && this.expandedIds.length > 0) {
            this.expand(this.expandedIds, this.expandedCloseAllOthers);
            this.expandedIds = null;
        }
    }

    expand(ids: string[], closeAllOthers: boolean = false) {
        if (ids) {
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

    collapseAll(): void {
        HierarchicalMenuItem.forEachRecursive(this.menuItems, (i) => {
            i.expanded = false;
        });
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
    style?: string | null;

    page?: any;
    pageIndex?: number;

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
