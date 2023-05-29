import {Component, Inject} from '@angular/core';
import {RecipeService} from "../../../../modules/recipes/services/recipe.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MYRECIPE} from "@app-shared/constants";

@Component({
  selector: 'app-delete-conf-dialog',
  templateUrl: './delete-conf-dialog.component.html',
  styleUrls: ['./delete-conf-dialog.component.scss']
})
export class DeleteConfDialogComponent {
  constructor(private recipeService: RecipeService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onClickDelete() {
    this.recipeService.deleteRecipe(this.data.idRecipe).subscribe(
      () => {
        this.router.navigateByUrl(MYRECIPE).then();
      }
    ).unsubscribe();
  }
}
