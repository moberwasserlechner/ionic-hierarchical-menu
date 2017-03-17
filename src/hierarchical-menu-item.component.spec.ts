import {TestBed} from '@angular/core/testing';

import {HierarchicalMenuItemComponent} from "../src/hierarchical-menu-item.component";

describe("Component: HierarchicalMenuItemComponent", () => {
    let component: HierarchicalMenuItemComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HierarchicalMenuItemComponent],
        });

        const fixture = TestBed.createComponent(HierarchicalMenuItemComponent);
        component = fixture.componentInstance;
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

});

