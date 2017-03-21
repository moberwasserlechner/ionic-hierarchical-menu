import {TestBed, ComponentFixture} from '@angular/core/testing';

import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {
    DefaultI18nSupport, HierarchicalMenuItem, HierarchicalMenuMode,
    HierarchicalMenuConfig
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

        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({ id: "b", title: "item b ref a", parentRef: "a" });
        config.add({ id: "a", title: "item a", parentRef: "" });
        config.add({ id: "c", title: "item c ref b", parentRef: "b" });

        componentFixture.componentInstance.config = config;
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);

        let menuItems: Array<HierarchicalMenuItem> = componentFixture.componentInstance.config.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(1);
        let parentItem = menuItems[0];
        expect(parentItem.id).toBe("a");
        expect(parentItem.children && parentItem.children.length).toBe(1);
    });

    it("should build a little more complex hierarchy from a flat list", () => {
        componentFixture.componentInstance.mode = "flat";

        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({id: "menu.personal.section", title: "menu.personal.section"});
        config.add({id: "menu.personal.home", title: "menu.personal.home", parentRef: "menu.personal.section"});
        config.add({id: "menu.personal.profile", title: "menu.personal.profile", parentRef: "menu.personal.section"});
        config.add({id: "menu.personal.events", title: "menu.personal.events", parentRef: "menu.personal.section"});
        config.add({id: "menu.personal.clubs", title: "menu.personal.clubs", parentRef: "menu.personal.section"});
        config.add({id: "menu.settings.section", title: "menu.settings.section"});
        config.add({id: "menu.settings.feedback", title: "menu.settings.feedback", parentRef: "menu.settings.section"});
        config.add({id: "menu.settings.about", title: "menu.settings.about", parentRef: "menu.settings.section"});

        componentFixture.componentInstance.config = config;
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);

        let menuItems: Array<HierarchicalMenuItem> = componentFixture.componentInstance.config.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(2);
        let parentItem = menuItems[0];
        expect(parentItem.children && parentItem.children.length).toBe(4);
    });


    // it("should use a custom on click function", () => {
    //     let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
    //     config.onClickLink = (item: HierarchicalMenuItem) => {
    //         //expect(item).not.toBeNull();
    //     };
    //     config.add({id: "menu.personal.section", title: "menu.personal.section"});
    //     componentFixture.componentInstance.config = config;
    //     let itemLink = componentFixture.debugElement.nativeElement.chil(".hm-link");
    //     expect(itemLink).not.toBeNull();
    //
    //     itemLink.click();
    // });


});

