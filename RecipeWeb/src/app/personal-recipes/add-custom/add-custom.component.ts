import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-custom",
  templateUrl: "./add-custom.component.html",
  styleUrls: ["./add-custom.component.css"],
})
export class AddCustomComponent implements OnInit {
  recipeName = new FormControl("", {
    updateOn: "change",
  });
  recipeIngredients = new FormControl("", {
    updateOn: "change",
  });
  recipeInstructions = new FormControl("", {
    updateOn: "change",
  });
  recipeSummary = new FormControl("", {
    updateOn: "change",
  });
  recipeComments = new FormControl("", {
    updateOn: "change",
  });

  constructor(
    public dialogRef: MatDialogRef<AddCustomComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data,
  ) {}

  ngOnInit(): void {}

  closeDialog(confirmed){
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
