import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem, IconMode} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    template: `
        <ul class="hierarchical-menu-level">
            <li *ngFor="let item of menuItems" id="item.id" [ngClass]="">
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

    toggle(item: HierarchicalMenuItem) {
        item.expanded = !item.expanded;
    }

    ngOnInit(): void {

    }


    hasChildren(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.children != null && menuItem.children.length > 0;
    }

    useIconsByFontAwesome(menuItem: HierarchicalMenuItem): boolean {
        return menuItem.iconMode === IconMode.FONTAWESOME;
    }

    useIconsByIonic(menuItem: HierarchicalMenuItem) {
        return menuItem.iconMode === IconMode.IONIC;
    }

}