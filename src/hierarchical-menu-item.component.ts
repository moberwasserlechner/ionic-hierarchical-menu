import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem, IconMode, HierarchicalMenuConfig} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    template: `
        <ul class="hm-level">
            <li *ngFor="let item of items">
                <div [ngClass]="buildStyles(item)">
                    <div class="hm-link">
                        <button (click)="onClickLink(item)">
                            <ion-icon *ngIf="useIconsByIonic(item)" [name]="item.icon"></ion-icon>
                            <i *ngIf="useIconsByFontAwesome(item)" class="fa {{ item.icon }}" aria-hidden="true"></i>
                            {{ translateIt(item) }}
                        </button>
                    </div>
                    <div class="hm-expander">
                        <button *ngIf="hasChildren(item)" (click)="onClickExpander(item)">
                            <ion-icon [name]="getExpanderIcon(item)"></ion-icon>
                        </button>
                    </div>
                </div>
                <hierarchical-menu-item *ngIf="item.expanded && hasChildren(item)" [items]="item.children" [config]="config"></hierarchical-menu-item>
            </li>
        </ul>
    `
})
export class HierarchicalMenuItemComponent implements OnInit {

    @Input() items: HierarchicalMenuItem[];

    @Input() config: HierarchicalMenuConfig;

    ngOnInit(): void {

    }

    onClickExpander(item: HierarchicalMenuItem) {
        item.expanded = !item.expanded;
        let func: Function | null = null;
        if (item.onClickExpander) {
            func = item.onClickExpander;
        } else if (this.config.onClickExpander) {
            func = this.config.onClickExpander;
        }

        if (func) {
            func.call(this, item);
        }
    }

    onClickLink(menuItem: HierarchicalMenuItem) {
        let func: Function | null = null;
        if (menuItem.onClickLink) {
            func = menuItem.onClickLink;
        } else if (this.config.onClickLink) {
            func = this.config.onClickLink;
        }

        if (func) {
            func.call(this, menuItem);
        }

        if ((!func || !menuItem.page) && this.hasChildren(menuItem)) {
            this.onClickExpander(menuItem);
        }
    }


    hasChildren(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.children != null && menuItem.children.length > 0;
    }

    useIconsByFontAwesome(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.icon != null && menuItem.iconMode === IconMode.FONTAWESOME;
    }

    useIconsByIonic(menuItem: HierarchicalMenuItem) {
        return menuItem.icon != null && (menuItem.iconMode === IconMode.IONIC || menuItem.iconMode == null);
    }

    buildStyles(menuItem: HierarchicalMenuItem) {
        return "hm-item-line " + (menuItem.style || "");
    }

    translateIt(menuItem: HierarchicalMenuItem):string {
        if (this.config.onTranslate && !menuItem.doNotTranslate) {
            return this.config.onTranslate.call(this, menuItem.title);
        }
        return menuItem.title;
    }

    getExpanderIcon(menuItem: HierarchicalMenuItem): string {
        let icon: string;
        if (menuItem.expanded) {
            if (menuItem.expanderIconExpanded) {
                icon = menuItem.expanderIconExpanded;
            } else if (this.config.expanderIconExpanded) {
                icon = this.config.expanderIconExpanded;
            } else {


                icon = HierarchicalMenuConfig.EXPANDER_ICON_EXPANDED;
            }
        } else {
            if (menuItem.expanderIconCollapsed) {
                icon = menuItem.expanderIconCollapsed;
            } else if (this.config.expanderIconCollapsed) {
                icon = this.config.expanderIconCollapsed;
            } else {
                icon = HierarchicalMenuConfig.EXPANDER_ICON_COLLAPSED;
            }
        }
        return icon;
    }

}