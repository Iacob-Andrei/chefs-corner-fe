import {createAction, props} from "@ngrx/store";
import {Recipe} from "@app-shared/models";

export const clearCart = createAction('Clear Cart');
export const addRecipe = createAction('Add recipe', props<Recipe>())
export const removeRecipe = createAction('Remove recipe', props<Recipe>())
