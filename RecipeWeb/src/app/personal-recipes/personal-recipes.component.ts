import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../user.service";
import { AddCustomComponent } from './add-custom/add-custom.component';

@Component({
  selector: "app-personal-recipes",
  templateUrl: "./personal-recipes.component.html",
  styleUrls: ["./personal-recipes.component.css"],
})
export class PersonalRecipesComponent implements OnInit {
  recipeNameFilter = new FormControl("", { updateOn: "change" });
  initialSavedRecipes: any[] = [];
  customNameFilter = new FormControl("", { updateOn: "change" });
  initialCustomRecipes: any[] = [];
  savedRecipes: any[] = [];
  customRecipes: any[] = [];
  isRecipeEmpty = false;
  isCustomEmpty = false;

  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._userService.info(localStorage.getItem("token")).subscribe((res) => {
      if (typeof res.Message.SavedRecipes === "string") {
        this.isRecipeEmpty = true;
        this.snackBar.open(res.Message.SavedRecipes, "", { duration: 3000 });
      } else {
        this.initialSavedRecipes = this.savedRecipes = res.Message.SavedRecipes;
      }
    });

    this._userService.info(localStorage.getItem("token")).subscribe((res) => {
      if (typeof res.Message.CustomRecipes === "string") {
        this.isCustomEmpty = true;
        this.snackBar.open(res.Message.CustomRecipes, "", { duration: 3000 });
      } else {
        this.initialCustomRecipes = this.customRecipes =
          res.Message.CustomRecipes;
      }
    });
  }

  addRecipe(){
      const dialogRef = this.dialog.open(AddCustomComponent, {
        width: "500px",
      });
      dialogRef.afterClosed().subscribe((response) => {
        if (response.confirmed) {
          this._userService
            .addCustomRecipe(
              localStorage.getItem("token"),
              response.recipeName,
              response.recipeIngredients,
              response.recipeInstructions,
              response.recipeSummary,
              response.recipeComments,
              response.image
            )
            .subscribe((res) => {      
              console.log(res);
              this.snackBar.open(res.RecipeResults.Message, "", { duration: 3000 });
            });
        }
      });
  }

  unSaveRecipe(recipeId) {
    this._userService
      .deleteRecipe(localStorage.getItem("token"), recipeId)
      .subscribe((res) => {
        this.initialSavedRecipes = this.initialSavedRecipes.filter(
          (x) => x.RecipeId !== recipeId
        );
        this.savedRecipes = this.savedRecipes.filter(
          (x) => x.RecipeId !== recipeId
        );

        this.snackBar.open(res.Message, "", { duration: 3000 });
        console.log(res.Message);
      });
  }

  filter() {
    this.savedRecipes = this.initialSavedRecipes.filter((x) =>
      x.RecipeName?.includes(this.recipeNameFilter.value)
    );
  }
}
