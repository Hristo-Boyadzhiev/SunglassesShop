import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesReceivedComponent } from './messages-received.component';

describe('MessagesReceivedComponent', () => {
  let component: MessagesReceivedComponent;
  let fixture: ComponentFixture<MessagesReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesReceivedComponent]
    });
    fixture = TestBed.createComponent(MessagesReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
