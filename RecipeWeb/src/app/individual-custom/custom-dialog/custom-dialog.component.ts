import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { requiredFileType } from 'src/app/app-file-upload/requiredFileType';

@Component({
  selector: "app-custom-dialog",
  templateUrl: "./custom-dialog.component.html",
  styleUrls: ["./custom-dialog.component.css"],
})
export class CustomDialogComponent implements OnInit {
  progress = 0;
  recipeName = new FormControl(this.data.recipe.RecipeName, {
    updateOn: "change",
  });
  recipeIngredients = new FormControl(this.data.recipe.RecipeIngredients, {
    updateOn: "change",
  });
  recipeInstructions = new FormControl(this.data.recipe.RecipeInstructions, {
    updateOn: "change",
  });
  recipeSummary = new FormControl(this.data.recipe.RecipeSummary, {
    updateOn: "change",
  });
  recipeComments = new FormControl(this.data.recipe.RecipeComments, {
    updateOn: "change",
  });
  image = new FormControl(null, [Validators.required, requiredFileType('png')])
  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data
  ) {}

  ngOnInit(): void {}
}
