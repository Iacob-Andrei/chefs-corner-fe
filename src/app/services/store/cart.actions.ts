import {createAction, props} from "@ngrx/store";

export const clearCart = createAction('Clear Cart');
export const addRecipe = createAction('Add recipe', props<{ id: number }>())
export const removeRecipe = createAction('Remove recipe', props<{ id: number }>())
