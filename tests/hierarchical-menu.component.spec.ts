import {TestBed, ComponentFixture} from '@angular/core/testing';

import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {
    DefaultI18nSupport, HierarchicalMenuItem, HierarchicalMenuMode,
    HierarchicalMenuItemContainer
} from "../src/hierarchical-menu.service";
import {HierarchicalMenuComponent} from "../src/hierarchical-menu.component";

describe("HierarchicalMenuComponent", () => {
    let componentFixture: ComponentFixture<HierarchicalMenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuComponent, HierarchicalMenuItemComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HierarchicalMenuComponent);
        componentFixture.componentInstance.reset();
        componentFixture.detectChanges();
    });

    it('should be defined', () => {
        const element = componentFixture.elementRef.nativeElement;
        expect(element.querySelector('.hierarchical-menu')).toBeDefined();
    });

    it("should be flat mode ", () => {
        componentFixture.componentInstance.mode = "flat";
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);
    });

    it("should be hierarchical mode ", () => {
        componentFixture.componentInstance.mode = "foobar";
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.HIERARCHICAL);

        componentFixture.componentInstance.mode = "";
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.HIERARCHICAL);
    });

    it("should build a hierarchy from a simple flat list", () => {
        componentFixture.componentInstance.mode = "flat";

        let itemContainer: HierarchicalMenuItemContainer = new HierarchicalMenuItemContainer();
        itemContainer.add({ id: "b", title: "item b ref a", parentRef: "a" });
        itemContainer.add({ id: "a", title: "item a", parentRef: "" });
        itemContainer.add({ id: "c", title: "item c ref b", parentRef: "b" });

        componentFixture.componentInstance.itemContainer = itemContainer;
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);

        let menuItems: Array<HierarchicalMenuItem> = componentFixture.componentInstance.itemContainer.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(1);
        let parentItem = menuItems[0];
        expect(parentItem.id).toBe("a");
        expect(parentItem.children && parentItem.children.length).toBe(1);
    });

    it("should build a little more complex hierarchy from a flat list", () => {
        componentFixture.componentInstance.mode = "flat";

        let itemContainer: HierarchicalMenuItemContainer = new HierarchicalMenuItemContainer();
        itemContainer.add({id: "menu.personal.section", title: "menu.personal.section"});
        itemContainer.add({id: "menu.personal.home", title: "menu.personal.home", parentRef: "menu.personal.section"});
        itemContainer.add({id: "menu.personal.profile", title: "menu.personal.profile", parentRef: "menu.personal.section"});
        itemContainer.add({id: "menu.personal.events", title: "menu.personal.events", parentRef: "menu.personal.section"});
        itemContainer.add({id: "menu.personal.clubs", title: "menu.personal.clubs", parentRef: "menu.personal.section"});
        itemContainer.add({id: "menu.settings.section", title: "menu.settings.section"});
        itemContainer.add({id: "menu.settings.feedback", title: "menu.settings.feedback", parentRef: "menu.settings.section"});
        itemContainer.add({id: "menu.settings.about", title: "menu.settings.about", parentRef: "menu.settings.section"});

        componentFixture.componentInstance.itemContainer = itemContainer;
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);

        let menuItems: Array<HierarchicalMenuItem> = componentFixture.componentInstance.itemContainer.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(2);
        let parentItem = menuItems[0];
        expect(parentItem.children && parentItem.children.length).toBe(4);
    });


});

