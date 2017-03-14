import {Component, Input, OnInit} from "@angular/core";
import {JamItem} from "./jam.service";

@Component({
    selector: "ngx-jam",
    templateUrl: "jam-item.component.ts"
})
export class JamItemComponent implements OnInit {

    jamItems: JamItem;

    ngOnInit(): void {

    }

}