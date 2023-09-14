import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegisterDialogComponent } from './service-register-dialog.component';

describe('ServiceRegisterDialogComponent', () => {
  let component: ServiceRegisterDialogComponent;
  let fixture: ComponentFixture<ServiceRegisterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRegisterDialogComponent]
    });
    fixture = TestBed.createComponent(ServiceRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
