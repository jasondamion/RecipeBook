import { Component, Inject, OnInit, ElementRef, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-custom-dialog",
  templateUrl: "./custom-dialog.component.html",
  styleUrls: ["./custom-dialog.component.css"],
})
export class CustomDialogComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<CustomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
  ) {}

  ngOnInit(): void {console.log(this.data.recipe)}

  formatArray() {
   this.recipeIngredients.setValue(this.recipeIngredients.value.toString());
   this.recipeInstructions.setValue(this.recipeInstructions.value.toString());
   
    if (this.recipeInstructions.value.includes(",")) {
      this.recipeInstructions.setValue(this.recipeInstructions.value.replace(/,/g, "."));
    }

    if (this.recipeIngredients.value.includes(",")) {
      this.recipeIngredients.setValue(this.recipeIngredients.value.replace(/,/g, ".")); 
    }
  }

  closeDialog(confirmed){
    this.formatArray();
    this.dialogRef.close({
      confirmed,
      recipeName: this.recipeName.value,
      recipeIngredients: this.recipeIngredients.value,
      recipeInstructions: this.recipeInstructions.value,
      recipeSummary: this.recipeSummary.value,
      recipeComments: this.recipeComments.value,
    })
  }
}
