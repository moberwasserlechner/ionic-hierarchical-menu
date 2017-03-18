import {Component, OnInit} from "@angular/core";

@Component({
    selector: "hierarchical-menu",
    template: `
        <div [ngClass]="">
            <hierarchical-menu></hierarchical-menu>
        </div>
    `
})
export class HierarchicalMenuComponent implements OnInit {

    ngOnInit(): void {

    }

}