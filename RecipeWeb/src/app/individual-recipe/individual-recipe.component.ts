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
  comments: FormControl;

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
          this.recipe = res.Message.Info;
          this.sortIngredientsByAisle();
          this.splitInstructions();
        } else {
          this.snackBar.open(res.Message, "", { duration: 3000 });
          console.log(res.Message);
        }
        this.assignCommentsIfSaved();
      });
  }
  printRecipe() {
    window.print();
  }
  goToSource() {
    window.open(this.recipe.Info.spoonacularSourceUrl);
  }
  assignCommentsIfSaved() {
    this._userService
      .info(localStorage.getItem("token"))
      .subscribe((response) => {
        if (typeof response.Message.SavedRecipes !== "string") {
          if (
            response.Message.SavedRecipes.map((x) => {
              return {
                RecipeId: x.RecipeId,
                RecipeComments: x.RecipeComments,
              };
            }).find((x) => x.RecipeId == this.recipe.id)
          ) {
            this.comments = new FormControl(
              response.Message.SavedRecipes.map((x) => {
                return {
                  RecipeId: x.RecipeId,
                  RecipeComments: x.RecipeComments,
                };
              }).find((x) => x.RecipeId == this.recipe.id).RecipeComments,
              { updateOn: "change" }
            );
          } else {
            this.comments = new FormControl("", { updateOn: "change" });
          }
        }
      });
  }
  sortIngredientsByAisle() {
    this.recipe.extendedIngredients.forEach((x) => {
      if (!x.aisle) {
        x.aisle = "z";
      }
    });
    this.recipe.extendedIngredients = this.recipe.extendedIngredients.sort(
      (a, b) => a.aisle?.localeCompare(b.aisle)
    );
  }
  splitInstructions() {
    this.recipe.instructions = this.recipe.instructions.replace(
      /(<([^>]+)>)/gi,
      ""
    );
    if (this.recipe.instructions.includes("↵")) {
      this.recipe.instructions = this.recipe.instructions.split("↵");
    }
    if (this.recipe.instructions.includes(",")) {
      this.recipe.instructions = this.recipe.instructions.split(",");
    }
    if (this.recipe.instructions.includes(".")) {
      this.recipe.instructions = this.recipe.instructions.split(".");
    }
  }
  saveRecipe() {
    this._userService
      .addRecipe(
        localStorage.getItem("token"),
        this.recipeId,
        this.recipe.title,
        this.recipe.summary,
        this.comments.value
      )
      .subscribe((res) => {
        if (res.Message === "Recipe Already Saved") {
          this._userService
            .editRecipeComments(
              localStorage.getItem("token"),
              this.recipeId,
              this.comments.value
            )
            .subscribe((res) => {
              this.snackBar.open(res.Message, "", { duration: 3000 });
              console.log(res.Message);
            });
        } else {
          this.snackBar.open(res.Message, "", { duration: 3000 });
          console.log(res.Message);
        }
      });
  }
}
