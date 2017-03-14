import {Injectable} from "@angular/core";

/**
 * Component config
 */
@Injectable()
export class JamConfig {
    // demo mode to just see sth
    demo: boolean = false;
    dataMode: JamMode = JamMode.HIERARCHICAL;
}

/**
 * Component option data structure form. In which form are the menu items represented
 */
export enum JamMode {
    FLAT, HIERARCHICAL
}

// ######################################
// ### Component item
// ######################################

@Injectable()
export class JamItem {
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
    parentRef: JamItem | string | number | null; // references with string must use the id
    children: Array<JamItem> = [];
}

export enum IconMode {
    FONTAWESOME, IONIC
}

export function justAnotherMenuServiceFactory(config: JamConfig): JustAnotherMenuService  {
    return new JustAnotherMenuService(config);
}

@Injectable()
export class JustAnotherMenuService {

    constructor(private config: JamConfig) {}

}

