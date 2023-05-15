import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMenuDialogComponent } from './price-menu-dialog.component';

describe('PriceMenuDialogComponent', () => {
  let component: PriceMenuDialogComponent;
  let fixture: ComponentFixture<PriceMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceMenuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
