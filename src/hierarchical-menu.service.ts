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
export class HierarchicalMenuItem {
    id: string | number;
    title: string;
    order: number = 0;

    icon: string | null;
    iconMode: IconMode = IconMode.FONTAWESOME;
    style: string | null;

    expanded: boolean = false;
    parentRef: HierarchicalMenuItem | string | number | null; // references with string must use the idx
    children: Array<HierarchicalMenuItem> = [];

    hasChildren(): boolean {
        return this.children != null && this.children.length > 0;
    }
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

