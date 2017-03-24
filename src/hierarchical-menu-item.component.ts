import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem, IconMode, HierarchicalMenuConfig} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    template: `
        <ul class="hm-level">
            <li class="hm-item" *ngFor="let item of items">
                <div [ngClass]="buildStyles(item)">
                    <button class="hm-link" (click)="onClickLink(item)" >
                        <span class="hm-icon" *ngIf="item.icon">
                            <i *ngIf="useIconsByFontAwesome(item)" class="fa {{ item.icon }}" aria-hidden="true"></i>
                            <!--#7 <i on-icon *ngIf="useIconsByIonic(item)" name="{{ item.icon }}"></ion-icon>-->
                        </span>
                        {{ translateIt(item) }}
                    </button>
                    <button class="hm-expander" *ngIf="hasChildren(item)" (click)="onClickExpander(item)">{{ item.expanded ? '-' : '+'}}</button>
                </div>
                <hierarchical-menu-item *ngIf="item.expanded && hasChildren(item)" [items]="item.children" [config]="config"></hierarchical-menu-item>
            </li>
        </ul>
    `
})
export class HierarchicalMenuItemComponent implements OnInit {

    @Input() items: Array<HierarchicalMenuItem>;

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

    onClickLink(item: HierarchicalMenuItem) {
        let func: Function | null = null;
        if (item.onClickLink) {
            func = item.onClickLink;
        } else if (this.config.onClickLink) {
            func = this.config.onClickLink;
        }

        if (func) {
            func.call(this, item);
        }
    }


    hasChildren(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.children != null && menuItem.children.length > 0;
    }

    useIconsByFontAwesome(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.icon != null && menuItem.iconMode === IconMode.FONTAWESOME;
    }

    useIconsByIonic(menuItem: HierarchicalMenuItem) {
        return menuItem.icon != null && menuItem.iconMode === IconMode.IONIC;
    }

    buildStyles(menuItem: HierarchicalMenuItem) {
        return "hm-item-line " + (menuItem.style || "");
    }

    translateIt(menuItem: HierarchicalMenuItem):string {
        if (this.config.onTranslate && menuItem.translateable) {
            return this.config.onTranslate.call(this, menuItem.title);
        }
        return menuItem.title;
    }

}