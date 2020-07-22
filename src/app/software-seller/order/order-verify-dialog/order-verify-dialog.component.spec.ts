import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVerifyDialogComponent } from './order-verify-dialog.component';

describe('OrderVerifyDialogComponent', () => {
  let component: OrderVerifyDialogComponent;
  let fixture: ComponentFixture<OrderVerifyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVerifyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
