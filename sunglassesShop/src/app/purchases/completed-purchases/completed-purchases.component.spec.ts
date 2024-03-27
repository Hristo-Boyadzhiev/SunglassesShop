import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedPurchasesComponent } from './completed-purchases.component';

describe('CompletedPurchasesComponent', () => {
  let component: CompletedPurchasesComponent;
  let fixture: ComponentFixture<CompletedPurchasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedPurchasesComponent]
    });
    fixture = TestBed.createComponent(CompletedPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
