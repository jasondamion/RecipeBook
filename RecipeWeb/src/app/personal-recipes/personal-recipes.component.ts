import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../user.service";

@Component({
  selector: "app-personal-recipes",
  templateUrl: "./personal-recipes.component.html",
  styleUrls: ["./personal-recipes.component.css"],
})
export class PersonalRecipesComponent implements OnInit {
  recipeNameFilter = new FormControl("", { updateOn: "change" });
  initialSavedRecipes: any[] = [];
  savedRecipes: any[] = [];
  isEmpty = false;

  constructor(
    private _userServce: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._userServce.info(localStorage.getItem("token")).subscribe((res) => {
      if (typeof res.Message.SavedRecipes === "string") {
        this.isEmpty = true;
        this.snackBar.open(res.Message.SavedRecipes, "", { duration: 3000 });
      } else {
          this.initialSavedRecipes = this.savedRecipes = res.Message.SavedRecipes;
      }
    });
  }

  unSaveRecipe(recipeId){
    this._userServce.deleteRecipe(localStorage.getItem("token"),recipeId).subscribe((res)=>{
      this.initialSavedRecipes = this.initialSavedRecipes.filter(x => x.RecipeId !== recipeId)
      this.savedRecipes = this.savedRecipes.filter(x => x.RecipeId !== recipeId)

      this.snackBar.open(res.Message, "", { duration: 3000 });
      console.log(res.Message);
    })
  }

  filter(){
    this.savedRecipes = this.initialSavedRecipes.filter(x => x.RecipeName?.includes(this.recipeNameFilter.value))
  }
}
