import {Recipe} from "@app-shared/models";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectCountRecipes = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Recipe[]) => {
    return state.length;
  }
);

export const selectCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Recipe[]) => {
    return state;
  }
);

export const selectCartObject = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Recipe[], recipe: Recipe) => {
    return state.find(element => element.id === recipe.id);
  }
);
