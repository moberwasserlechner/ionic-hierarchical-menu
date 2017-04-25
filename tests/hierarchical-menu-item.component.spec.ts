import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {HierarchicalMenuConfig, IconMode} from "../src/hierarchical-menu.service";
import {IonicModule} from "ionic-angular";

describe("HierarchicalMenuItemComponent", () => {
    let componentFixture: ComponentFixture<HierarchicalMenuItemComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuItemComponent],
            imports: [IonicModule.forRoot(HierarchicalMenuItemComponent)]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HierarchicalMenuItemComponent);
    });

    afterEach(() => {
        componentFixture.destroy();
    });


    it('should be defined', () => {
        const element = componentFixture.elementRef.nativeElement;
        expect(element.querySelector('.hm-level')).toBeDefined();
    });

    it('should be a custom item line style set', () => {
        // componentFixture.componentInstance.menuItems = menuItems;
        // componentFixture.detectChanges();
        let styles = componentFixture.componentInstance.buildStyles();
        expect(styles).toBe("");

        styles = componentFixture.componentInstance.buildStyles("hm-link", null);
        expect(styles).toBe("hm-link");

        styles = componentFixture.componentInstance.buildStyles("hm-link", "fa", "icon");
        expect(styles).toBe("hm-link fa icon");
    });


    it("should translate title", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.onTranslate = (title: string) => {
            return "translated+" + title;
        };

        config.add({title: "a"});
        config.add({title: "b"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        componentFixture.componentInstance.items.forEach(i => {
            expect(componentFixture.componentInstance.translateIt(i)).toBe("translated+"+i.title);
        });
    });

    it("should not translate title", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.onTranslate = (title: string) => {
            return "translated a";
        };
        config.add({title: "c", doNotTranslate: true});
        config.add({title: "b", doNotTranslate: true});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.translateIt(componentFixture.componentInstance.items[0])).toBe("c");
        expect(componentFixture.componentInstance.translateIt(componentFixture.componentInstance.items[1])).toBe("b");

    });

    it("should use ionic icons", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a", icon: "add"});

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.useIconsByIonic(componentFixture.componentInstance.items[0])).toBeTruthy();
        expect(componentFixture.componentInstance.useIconsByFontAwesome(componentFixture.componentInstance.items[0])).toBeFalsy();
    });

    it("should use fontawesome icons", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a", icon: "alarm", iconMode: "FA"});

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.useIconsByFontAwesome(componentFixture.componentInstance.items[0])).toBeTruthy();
        expect(componentFixture.componentInstance.useIconsByIonic(componentFixture.componentInstance.items[0])).toBeFalsy();
    });


    it("should use default expanded icon", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a", expanded: true});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe(HierarchicalMenuConfig.EXPANDER_ICON_EXPANDED);

    });

    it("should use default collapse icon", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.add({title: "a", expanded: false});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe(HierarchicalMenuConfig.EXPANDER_ICON_COLLAPSED);

    });

    it("should use expanded icon from config", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.expanderIconExpanded = "add-circle";
        config.add({title: "a", expanded: true});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe("add-circle");

    });

    it("should use expanded icon from item", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.expanderIconExpanded = "add-circle";
        config.add({title: "a", expanded: true, expanderIconExpanded: "add"});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe("add");

    });

    it("should use collapsed icon from config", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.expanderIconCollapsed = "remove-circle";
        config.add({title: "a", expanded: false});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe("remove-circle");

    });

    it("should use collapsed icon from item", () => {
        let config: HierarchicalMenuConfig = new HierarchicalMenuConfig();
        config.expanderIconCollapsed = "remove-circle";
        config.add({title: "a", expanded: false, expanderIconCollapsed: "remove"});
        config.add({title: "b", parentRef: "a"});

        expect(config.menuItems.length).toBe(2);

        componentFixture.componentInstance.config = config;
        componentFixture.componentInstance.items = config.menuItems;

        expect(componentFixture.componentInstance.getExpanderIcon(componentFixture.componentInstance.items[0])).toBe("remove");
    });


});

