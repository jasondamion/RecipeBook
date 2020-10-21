import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-missing-ingredient-dialog',
  templateUrl: './missing-ingredient-dialog.component.html',
  styleUrls: ['./missing-ingredient-dialog.component.css']
})
export class MissingIngredientDialogComponent implements OnInit {
  ingredients = new FormControl("", { updateOn: "change" });

  constructor(public dialogRef: MatDialogRef<MissingIngredientDialogComponent>) { }

  ngOnInit(): void {
  }

  
  closeDialog(isSent: boolean) {
    const response = {
      username: this.ingredients.value,
      isSent,
    };
    this.dialogRef.close(response);
  }

}
