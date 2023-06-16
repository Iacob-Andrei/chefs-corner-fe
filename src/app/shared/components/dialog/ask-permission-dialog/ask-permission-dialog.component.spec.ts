import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskPermissionDialogComponent } from './ask-permission-dialog.component';

describe('AskPermissionDialogComponent', () => {
  let component: AskPermissionDialogComponent;
  let fixture: ComponentFixture<AskPermissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskPermissionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
