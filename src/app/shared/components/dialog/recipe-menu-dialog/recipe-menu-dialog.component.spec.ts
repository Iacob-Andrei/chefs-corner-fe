import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMenuDialogComponent } from './recipe-menu-dialog.component';

describe('RecipeMenuDialogComponent', () => {
  let component: RecipeMenuDialogComponent;
  let fixture: ComponentFixture<RecipeMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeMenuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
