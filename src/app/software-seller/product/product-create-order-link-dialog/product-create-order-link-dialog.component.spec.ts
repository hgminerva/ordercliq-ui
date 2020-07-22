import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreateOrderLinkDialogComponent } from './product-create-order-link-dialog.component';

describe('ProductCreateOrderLinkDialogComponent', () => {
  let component: ProductCreateOrderLinkDialogComponent;
  let fixture: ComponentFixture<ProductCreateOrderLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCreateOrderLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCreateOrderLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
