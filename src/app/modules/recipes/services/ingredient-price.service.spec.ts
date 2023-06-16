import { TestBed } from '@angular/core/testing';

import { IngredientPriceService } from './ingredient-price.service';

describe('IngredientPriceService', () => {
  let service: IngredientPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
