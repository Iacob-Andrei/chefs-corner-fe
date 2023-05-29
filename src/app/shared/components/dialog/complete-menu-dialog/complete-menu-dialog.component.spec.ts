import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMenuDialogComponent } from './complete-menu-dialog.component';

describe('CompleteMenuDialogComponent', () => {
  let component: CompleteMenuDialogComponent;
  let fixture: ComponentFixture<CompleteMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteMenuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
