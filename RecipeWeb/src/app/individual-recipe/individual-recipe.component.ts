import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-individual-recipe",
  templateUrl: "./individual-recipe.component.html",
  styleUrls: ["./individual-recipe.component.css"],
})
export class IndividualRecipeComponent implements OnInit {
  recipe;
  recipeId: string;
  aisles: any;
  comments = new FormControl("", { updateOn: "change" });

  constructor(
    private _recipeService: RecipeService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get("id");

    this._recipeService
      .getRecipeById(localStorage.getItem("token"), this.recipeId)
      .subscribe((res) => {
        if (res.Result === "Success") {
          this.recipe = res.Message;
          this.recipe.Info.extendedIngredients = this.recipe.Info.extendedIngredients.sort(
            (a, b) => a.aisle.localeCompare(b.aisle)
          );
          this.recipe.Info.instructions = this.recipe.Info.instructions
            .replace(/(<([^>]+)>)/gi, "")
            .split(".");
        } else {
          this.snackBar.open(res.Message, "", { duration: 3000 });
          console.log(res.Message);
        }
      });
  }
  printRecipe() {
    window.print();
  }
  goToSource() {
    window.open(this.recipe.Info.spoonacularSourceUrl);
  }
  saveRecipe() {
    this._userService
      .addRecipe(
        localStorage.getItem("token"),
        this.recipeId,
        this.recipe.Info.title,
        this.recipe.Info.summary,
        this.comments.value
      )
      .subscribe((res) => {
        this.snackBar.open(res.Message, "", { duration: 3000 });
        console.log(res.Message);
      });
  }
}
