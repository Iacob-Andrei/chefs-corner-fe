import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationContainer } from './authentification-container.component';

describe('ContainerComponent', () => {
  let component: AuthentificationContainer;
  let fixture: ComponentFixture<AuthentificationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificationContainer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthentificationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
