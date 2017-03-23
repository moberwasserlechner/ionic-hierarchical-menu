import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";

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


});

