import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem, IconMode} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    template: `
        <ul class="hm-level">
            <li class="hm-item" *ngFor="let item of menuItems">
                <div [ngClass]="buildStyles(item)">
                    <button class="hm-link" (click)="open(item)" >
                        <span class="hm-icon" *ngIf="item.icon">
                            <i *ngIf="useIconsByFontAwesome(item)" class="fa {{ item.icon }}" aria-hidden="true"></i>
                            <!--#7 <i on-icon *ngIf="useIconsByIonic(item)" name="{{ item.icon }}"></ion-icon>-->
                        </span>
                        {{ item.title }}
                    </button>
                    <button class="hm-opener" *ngIf="hasChildren(item)" (click)="toggle(item)">{{ item.expanded ? '-' : '+'}}</button>
                </div>
                <hierarchical-menu-item *ngIf="item.expanded && hasChildren(item)" [menuItems]="item.children"></hierarchical-menu-item>
            </li>
        </ul>
    `
})
export class HierarchicalMenuItemComponent implements OnInit {

    @Input() menuItems: Array<HierarchicalMenuItem>;

    ngOnInit(): void {

    }

    toggle(item: HierarchicalMenuItem) {
        item.expanded = !item.expanded;
    }

    open(item: HierarchicalMenuItem) {
        if (item) {
            console.info("TBD: Open menu item with id="+item.id);
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

}