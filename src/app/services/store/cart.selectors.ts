import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectCountRecipes = createSelector(
  createFeatureSelector('cartEntries'),
  (state: number[]) => {
    return state.length;
  }
);

export const selectCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: number[]) => {
    return state;
  }
);

export const selectCartObject = createSelector(
  createFeatureSelector('cartEntries'),
  (state: number[], recipe: number) => {
    return state.find(element => element === recipe);
  }
);
