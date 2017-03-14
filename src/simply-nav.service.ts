import {Injectable} from "@angular/core";

/**
 * Component config
 */
@Injectable()
export class SimplyNavConfig {
    // demo mode to just see sth
    demo: boolean = false;
    dataMode: SimplyNavMode = SimplyNavMode.HIERARCHICAL;
}

/**
 * Component option data structure form. In which form are the menu items represented
 */
export enum SimplyNavMode {
    FLAT, HIERARCHICAL
}

// ######################################
// ### Component item
// ######################################

@Injectable()
export class SimplyNavItem {
    id: string | number;
    title: string;
    order: number = 0;
    icon: string | null;
    iconMode: IconMode = IconMode.IONIC;
    iconOnly: boolean = false; // if true the title is shown as tooltip
    style: string | null;
    badgeValue: string | number | null;
    badgeClass: string | null;
    opened: boolean;
    parentRef: SimplyNavItem | string | number | null; // references with string must use the id
    children: Array<SimplyNavItem> = [];
}

export enum IconMode {
    FONTAWESOME, IONIC
}

export function simplyNavServiceFactory(config: SimplyNavConfig): SimplyNavService  {
    return new SimplyNavService(config);
}

@Injectable()
export class SimplyNavService {

    constructor(private config: SimplyNavConfig) {}

}

