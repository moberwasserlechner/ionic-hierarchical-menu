import {TestBed, ComponentFixture} from '@angular/core/testing';

import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {DefaultI18nSupport, HierarchicalMenuItem} from "../src/hierarchical-menu.service";

describe("HierarchicalMenuItemComponent", () => {
    let componentFixture: ComponentFixture<HierarchicalMenuItemComponent>;

    const menuItems: Array<HierarchicalMenuItem> = [
        {
            title: "A",
        },
        {
            title: "B",
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuItemComponent, DefaultI18nSupport]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HierarchicalMenuItemComponent);
        componentFixture.componentInstance.menuItems = menuItems;
        componentFixture.detectChanges();
    });

    it('should be defined', () => {
        const element = componentFixture.elementRef.nativeElement;
        expect(element.querySelector('.hierarchical-menu-level')).toBeDefined();
    });

});

