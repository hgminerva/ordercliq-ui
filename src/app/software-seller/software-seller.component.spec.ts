import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSellerComponent } from './software-seller.component';

describe('SoftwareSellerComponent', () => {
  let component: SoftwareSellerComponent;
  let fixture: ComponentFixture<SoftwareSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
