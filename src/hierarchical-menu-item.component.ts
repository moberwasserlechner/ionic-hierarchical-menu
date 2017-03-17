import {Component, Input, OnInit} from "@angular/core";
import {HierarchicalMenuItem} from "./hierarchical-menu.service";

@Component({
    selector: "hierarchical-menu-item",
    templateUrl: "hierarchical-menu-item.component.ts"
})
export class HierarchicalMenuItemComponent implements OnInit {

    @Input() menuItems: Array<HierarchicalMenuItem>;

    toggle(item: HierarchicalMenuItem) {
        item.expanded = !item.expanded;
    }

    ngOnInit(): void {

    }

}