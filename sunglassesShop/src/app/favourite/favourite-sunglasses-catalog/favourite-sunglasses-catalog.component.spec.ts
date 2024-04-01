import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteSunglassesCatalogComponent } from './favourite-sunglasses-catalog.component';

describe('FavouriteSunglassesCatalogComponent', () => {
  let component: FavouriteSunglassesCatalogComponent;
  let fixture: ComponentFixture<FavouriteSunglassesCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteSunglassesCatalogComponent]
    });
    fixture = TestBed.createComponent(FavouriteSunglassesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
