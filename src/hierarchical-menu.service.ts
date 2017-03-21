import {Injectable, PipeTransform, Pipe} from "@angular/core";



@Pipe({ name: 'i18nSupport'})
export class DefaultI18nSupport implements PipeTransform  {
    constructor() {}

    transform(value: any, ...args: any[]): any {
        return value;
    }
}
/**
 * Component option data structure form. In which form are the menu items represented
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
    useTitleAsId: boolean = true;
    onClickLink: Function;
    onClickExpander: Function;

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

            if (!beforeItem) {
                this._menuItems.push(item);
            } else {
                let beforeIdx = this._menuItems.indexOf(beforeItem);
                this._menuItems.splice(beforeIdx, 0, item);
            }
        }
    }

    /**
     * Add one or more menu items before a existing
     * @param beforeId the menu item's id
     * @param items
     */
    public addBefore(beforeId: string, ...items: HierarchicalMenuItem[]) {
        items.forEach(i => {
           this.addOneBefore(beforeId, i);
        });
    }

    public addBeforeAsArray(beforeId: string, items: HierarchicalMenuItem[]) {
        items.forEach(i => {
            this.addOneBefore(beforeId, i);
        });
    }

    set menuItems(list: Array<HierarchicalMenuItem>) {
        this._menuItems = list;
    }

    get menuItems() {
        return this._menuItems || [];
    }

}

// ######################################
// ### Menu Item
// ######################################

@Injectable()
export class HierarchicalMenuItem {
    title: string;

    id?: string;
    order?: number = 0;

    icon?: string | null;
    iconMode?: IconMode = IconMode.FONTAWESOME;
    style?: string | null;

    page?: any;

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

