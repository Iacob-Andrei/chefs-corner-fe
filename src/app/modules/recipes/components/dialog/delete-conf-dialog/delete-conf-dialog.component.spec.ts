import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfDialogComponent } from './delete-conf-dialog.component';

describe('DeleteConfDialogComponent', () => {
  let component: DeleteConfDialogComponent;
  let fixture: ComponentFixture<DeleteConfDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteConfDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
