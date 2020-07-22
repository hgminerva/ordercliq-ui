import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCompleteDialogComponent } from './order-complete-dialog.component';

describe('OrderCompleteDialogComponent', () => {
  let component: OrderCompleteDialogComponent;
  let fixture: ComponentFixture<OrderCompleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCompleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
