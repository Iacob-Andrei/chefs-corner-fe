import {ActionReducer, createReducer, INIT, on, UPDATE} from "@ngrx/store";
import {addRecipe, clearCart, removeRecipe} from "./cart.actions";

export const initialCartEntries: number[] = [];

export const cartReducer = createReducer(
  initialCartEntries,
  on(clearCart, _ => []),
  on(addRecipe, (entries , recipe) => {
    const entriesClone: number[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(element => element === recipe.id);
    if(!found){
      entriesClone.push(recipe.id);
    }
    return entriesClone;
  }),
  on(removeRecipe, (entries, recipe) => {
    const entriesClone: number[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(element => element === recipe.id);
    if(found){
      entriesClone.splice(entriesClone.indexOf(found), 1);
    }
    return entriesClone;
  })
)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action.type === INIT || action.type == UPDATE) {
      const storageValue = localStorage.getItem("state");
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem("state");
        }
      }
    }
    const nextState = reducer(state, action);
    localStorage.setItem("state", JSON.stringify(nextState));
    return nextState;
  };
};
