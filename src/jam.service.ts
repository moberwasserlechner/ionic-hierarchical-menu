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
export class JamConfig {
    itemMode: JamMode = JamMode.HIERARCHICAL;
    i18nSupport: PipeTransform = new DefaultI18nSupport();
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
    iconMode: IconMode = IconMode.FONTAWESOME;
    style: string | null;

    expanded: boolean = false;
    parentRef: JamItem | string | number | null; // references with string must use the idx
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

