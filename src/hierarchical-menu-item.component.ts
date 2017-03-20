import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem, IconMode} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    template: `
        <ul class="hierarchical-menu-level">
            <li class="hierarchical-menu-item" *ngFor="let item of menuItems">
                <button>
                    <i *ngIf="useIconsByFontAwesome(item)" class="fa {{ item.icon }}" aria-hidden="true"></i>
                    <!--#7 <ion-icon *ngIf="useIconsByIonic(item)" name="{{ item.icon }}"></ion-icon>-->
                    {{ item.title }}
                    <span *ngIf="hasChildren(item)" (click)="toggle(item)">{{ item.expanded ? '-' : '+'}}</span>
                </button>
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


    hasChildren(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.children != null && menuItem.children.length > 0;
    }

    useIconsByFontAwesome(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.icon != null && menuItem.iconMode === IconMode.FONTAWESOME;
    }

    useIconsByIonic(menuItem: HierarchicalMenuItem) {
        return menuItem.icon != null && menuItem.iconMode === IconMode.IONIC;
    }

}