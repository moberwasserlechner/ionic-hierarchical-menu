import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";
import {HierarchicalMenuConfig} from "../src/hierarchical-menu.service";

describe("HierarchicalMenuItemComponent", () => {
    let componentFixture: ComponentFixture<HierarchicalMenuItemComponent>;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuItemComponent]
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        componentFixture = TestBed.createComponent(HierarchicalMenuItemComponent);
    });

    it('should be defined', () => {
        const element = componentFixture.elementRef.nativeElement;
        expect(element.querySelector('.hm-level')).toBeDefined();
    });

    it('should be a custom item line style set', () => {
        // componentFixture.componentInstance.menuItems = menuItems;
        // componentFixture.detectChanges();
        let styles = componentFixture.componentInstance.buildStyles({ title: "styleTest", style: "test-style"});
        expect(styles).toBe("hm-item-line test-style");
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


});

