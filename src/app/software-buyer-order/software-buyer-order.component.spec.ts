import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareBuyerOrderComponent } from './software-buyer-order.component';

describe('SoftwareBuyerOrderComponent', () => {
  let component: SoftwareBuyerOrderComponent;
  let fixture: ComponentFixture<SoftwareBuyerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareBuyerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareBuyerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
