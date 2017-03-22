import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {HierarchicalMenuItem, HierarchicalMenuMode, HierarchicalMenuConfig} from "../src/hierarchical-menu.service";
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
        config.add({title: "menu.personal.section"});
        config.add({title: "menu.personal.home", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.profile", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.events", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.clubs", parentRef: "menu.personal.section"});
        config.add({title: "menu.settings.section"});
        config.add({title: "menu.settings.feedback", parentRef: "menu.settings.section"});
        config.add({title: "menu.settings.about", parentRef: "menu.settings.section"});

        componentFixture.componentInstance.config = config;
        expect(componentFixture.componentInstance.getHierarchicalMenuMode()).toBe(HierarchicalMenuMode.FLAT);

        let menuItems: Array<HierarchicalMenuItem> = componentFixture.componentInstance.config.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(2);
        let parentItem = menuItems[0];
        expect(parentItem.children && parentItem.children.length).toBe(4);
    });

    it("should add one item to a existing list", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a"});
        config.add({title: "b"});
        // c is missing and will be added later
        config.add({title: "d"});
        config.add({title: "e"});

        expect(config.menuItems.length).toBe(4);

        config.addBefore("d", {title: "c"});
        expect(config.menuItems.length).toBe(5);
        expect(config.menuItems[2].title).toBe("c");
    });

    it("should add multiple items to a existing list", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a"});
        config.add({title: "b"});
        config.add({title: "c"});
        // gap to add other items
        config.add({title: "m"});

        expect(config.menuItems.length).toBe(4);

        config.addBefore("d", {title: "d"}, {title:"e"}, {title:"f"});
        expect(config.menuItems.length).toBe(7);
        expect(config.menuItems[4].title).toBe("e");

    });

    it("should add item array to a existing list", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a"});
        config.add({title: "b"});
        config.add({title: "c"});
        // gap to add other items
        config.add({title: "m"});

        expect(config.menuItems.length).toBe(4);

        config.addArrayBefore("d", [{title: "d"}, {title:"e"}, {title:"f"}]);
        expect(config.menuItems.length).toBe(7);
        expect(config.menuItems[4].title).toBe("e");

    });

    it("should add item before not existing id", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a"});
        config.add({title: "b"});
        config.add({title: "c"});
        // gap to add other items
        config.add({title: "m"});

        expect(config.menuItems.length).toBe(4);

        config.addBefore("aa", {title: "z"}); // will be added to the end of the list
        expect(config.menuItems.length).toBe(5);
        expect(config.menuItems[(config.menuItems.length -1)].title).toBe("z");
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

