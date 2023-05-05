import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRecipesDialogComponent } from './get-recipes-dialog.component';

describe('GetRecipesDialogComponent', () => {
  let component: GetRecipesDialogComponent;
  let fixture: ComponentFixture<GetRecipesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetRecipesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetRecipesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
