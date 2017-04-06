import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {HierarchicalMenuItem, MenuItemStructure, HierarchicalMenuConfig} from "../src/hierarchical-menu.service";
import {HierarchicalMenuComponent} from "../src/hierarchical-menu.component";
import {IonicModule} from "ionic-angular";

describe("HierarchicalMenuComponent", () => {
    let componentFixture: ComponentFixture<HierarchicalMenuComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuComponent, HierarchicalMenuItemComponent],
            imports: [IonicModule.forRoot(HierarchicalMenuComponent)]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HierarchicalMenuComponent);
        componentFixture.componentInstance.reset();
        componentFixture.detectChanges();
    });

    afterEach(() => {
        componentFixture.destroy();
    });

    it('should be defined', () => {
        const element = componentFixture.elementRef.nativeElement;
        expect(element.querySelector('.hierarchical-menu')).toBeDefined();
    });

    it("should be flat mode ", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        expect(config.menuItemStructure).toBe(MenuItemStructure.FLAT);
    });

    it("should build a hierarchy from a simple flat list", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({ id: "b", title: "item b ref a", parentRef: "a" });
        config.add({ id: "a", title: "item a", parentRef: "" });
        config.add({ id: "c", title: "item c ref b", parentRef: "b" });

        componentFixture.componentInstance.config = config;
        expect(config.menuItemStructure).toBe(MenuItemStructure.FLAT);

        let menuItems: HierarchicalMenuItem[] = componentFixture.componentInstance.config.menuItems;
        // only one item or top level item respectively
        expect(menuItems.length).toBe(1);
        let parentItem = menuItems[0];
        expect(parentItem.id).toBe("a");
        expect(parentItem.children && parentItem.children.length).toBe(1);
    });

    it("should build a little more complex hierarchy from a flat list", () => {

        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "menu.personal.section"});
        config.add({title: "menu.personal.home", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.profile", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.events", parentRef: "menu.personal.section"});
        config.add({title: "menu.personal.clubs", parentRef: "menu.personal.section"});
        config.add({title: "menu.settings.section"});
        config.add({title: "menu.settings.feedback", parentRef: "menu.settings.section"});
        config.add({title: "menu.settings.about", parentRef: "menu.settings.section"});

        componentFixture.componentInstance.config = config;
        let menuItems: HierarchicalMenuItem[] = componentFixture.componentInstance.config.menuItems;
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


    it("should have no expanded items", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a"});
        config.add({title: "b"});
        config.add({title: "c"});
        config.add({title: "d"});
        config.add({title: "e"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        expect(config.getExpandedIds().length).toBe(0);
    });

    it("should have expanded items", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a", expanded: true});
        config.add({title: "aa", parentRef: "a"});

        config.add({title: "b"});
        config.add({title: "bb", parentRef: "b"});

        config.add({title: "c", expanded: true});
        config.add({title: "bb", parentRef: "c"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        let ids = config.getExpandedIds();
        expect(ids.length).toBe(2);
        expect(ids).toContain("a");
        expect(ids).toContain("c");
    });

    it("should have all parent items expanded", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a"});
        config.add({title: "aa", parentRef: "a"});
        config.add({title: "aaa", parentRef: "aa"});

        config.add({title: "b"});
        config.add({title: "bb", parentRef: "b"});

        config.add({title: "c"});
        config.add({title: "bb", parentRef: "c"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        expect(config.getExpandedIds().length).toBe(0);

        config.expandAll();

        expect(config.getExpandedIds().length).toBe(4);

        config.collapseAll();

        expect(config.getExpandedIds().length).toBe(0);
    });

    it("should have all parent items collapsed", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a", expanded: true});
        config.add({title: "aa", parentRef: "a"});

        config.add({title: "b"});
        config.add({title: "bb", parentRef: "b"});

        config.add({title: "c", expanded: true});
        config.add({title: "bb", parentRef: "c"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        expect(config.getExpandedIds().length).toBe(2);

        config.collapseAll();

        expect(config.getExpandedIds().length).toBe(0);
    });

    it("should expand defined items and close others", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a", expanded: true});
        config.add({title: "aa", parentRef: "a"});

        config.add({title: "b"});
        config.add({title: "bb", parentRef: "b"});

        config.add({title: "c"});
        config.add({title: "bb", parentRef: "c"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        expect(config.getExpandedIds().length).toBe(1);

        config.expand(["b","c"], true);

        let ids = config.getExpandedIds();
        expect(ids.length).toBe(2);
        expect(ids).toContain("b");
        expect(ids).toContain("c");
    });

    it("should expand defined items and dont touch existing others", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.menuItemStructure = MenuItemStructure.FLAT;
        config.add({title: "a", expanded: true});
        config.add({title: "aa", parentRef: "a"});

        config.add({title: "b"});
        config.add({title: "bb", parentRef: "b"});

        config.add({title: "c"});
        config.add({title: "cc", parentRef: "c"});

        config.add({title: "d"});
        config.add({title: "dd", parentRef: "d"});

        componentFixture.componentInstance.config = config;
        let triggerTreeBuild = componentFixture.componentInstance.config;

        expect(config.getExpandedIds().length).toBe(1);

        config.expand(["b","c"]);

        let ids = config.getExpandedIds();
        expect(ids.length).toBe(3);
        expect(ids).toContain("a");
        expect(ids).toContain("b");
        expect(ids).toContain("c");
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

