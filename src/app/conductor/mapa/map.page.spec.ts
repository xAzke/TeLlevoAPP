import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MapaPage } from "./map.page";

describe("MapPage", () => {
    let component: MapaPage;
    let fixture: ComponentFixture<MapaPage>;

    beforeEach(() => {
        fixture = TestBed.createComponent(MapaPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
