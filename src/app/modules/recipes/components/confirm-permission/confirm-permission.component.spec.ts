import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPermissionComponent } from './confirm-permission.component';

describe('ConfirmPermissionComponent', () => {
  let component: ConfirmPermissionComponent;
  let fixture: ComponentFixture<ConfirmPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
