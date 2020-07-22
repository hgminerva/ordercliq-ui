import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterErrorDialogComponent } from './register-error-dialog.component';

describe('RegisterErrorDialogComponent', () => {
  let component: RegisterErrorDialogComponent;
  let fixture: ComponentFixture<RegisterErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
