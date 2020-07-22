import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareBuyerComponent } from './software-buyer.component';

describe('SoftwareBuyerComponent', () => {
  let component: SoftwareBuyerComponent;
  let fixture: ComponentFixture<SoftwareBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
