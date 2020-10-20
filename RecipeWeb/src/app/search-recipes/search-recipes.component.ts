import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RecipeService } from "../recipe.service";
import { FormControl } from "@angular/forms";
import { UserService } from '../user.service';

@Component({
  selector: "app-search-recipes",
  templateUrl: "./search-recipes.component.html",
  styleUrls: ["./search-recipes.component.css"],
})
export class SearchRecipesComponent implements OnInit {
  recipeNameQuery = new FormControl("", { updateOn: "change" });
  recipes;
  constructor(
    private _recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  searchByRecipeName(query) {
    this.recipes = [];
    this._recipeService
      .getRecipesByName(localStorage.getItem("token"), query)
      .subscribe((res) => {
        if (res.Result === "Success") {
          this.recipes = res.Message;
          console.log(res.Message)
        } else {
          this.snackBar.open(res.Message, "", { duration: 3000 });
          console.log(res.Message);
        }
      });
  }

  saveRecipe(recipeId, recipeName, recipeSummary) {
    this._userService
      .addRecipe(
        localStorage.getItem("token"),
        recipeId,
        recipeName,
        recipeSummary,
        ""
      )
      .subscribe((res) => {
        this.snackBar.open(res.Message, "", { duration: 3000 });
        console.log(res.Message);
      });
  }
}
