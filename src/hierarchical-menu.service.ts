import {Injectable, PipeTransform, Pipe} from "@angular/core";



@Pipe({ name: 'i18nSupport'})
export class DefaultI18nSupport implements PipeTransform  {
    constructor() {}

    transform(value: any, ...args: any[]): any {
        return value;
    }
}
/**
 * Component config
 */
@Injectable()
export class HierarchicalMenuConfig {
    itemMode: HierarchicalMenuMode = HierarchicalMenuMode.HIERARCHICAL;
    i18nSupport: PipeTransform = new DefaultI18nSupport();
}

/**
 * Component option data structure form. In which form are the menu items represented
 */
export enum HierarchicalMenuMode {
    FLAT, HIERARCHICAL
}

// ######################################
// ### Component item
// ######################################

@Injectable()
export class HierarchicalMenuItemContainer {
    private idCounter: number = 0;
    private _menuItems: Array<HierarchicalMenuItem> = [];

    constructor(menuItems?: Array<HierarchicalMenuItem>) {
        this.idCounter = 0;
        if (menuItems) {
            menuItems.forEach(i => {
                this.add(i);
            });
        }
    }

    public add(item: HierarchicalMenuItem) {
        if (item != null) {
            if (item.id == null) {
                this.idCounter++;
                item.id = this.idCounter.toString();
            }
        }
        this._menuItems.push(item);
    }

    set menuItems(list: Array<HierarchicalMenuItem>) {
        this._menuItems = list;
    }

    get menuItems() {
        return this._menuItems || [];
    }

}

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
    parentRef?: string | null; // references with string must use the idx
    children?: Array<HierarchicalMenuItem> = [];
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

