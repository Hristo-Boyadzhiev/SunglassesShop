import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesSunglassesCatalogComponent } from './favourites-sunglasses-catalog.component';

describe('FavouritesSunglassesCatalogComponent', () => {
  let component: FavouritesSunglassesCatalogComponent;
  let fixture: ComponentFixture<FavouritesSunglassesCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouritesSunglassesCatalogComponent]
    });
    fixture = TestBed.createComponent(FavouritesSunglassesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
