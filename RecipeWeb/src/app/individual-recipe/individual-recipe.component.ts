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
  comments;

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
          this.recipe.extendedIngredients = this.recipe.extendedIngredients.sort(
            (a, b) => a.aisle.localeCompare(b.aisle)
          );
          this.assignCommentsIfSaved();
          this.recipe.instructions = this.recipe.instructions
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
  assignCommentsIfSaved() {
    this._userService.info(localStorage.getItem("token")).subscribe((res) => {
      if (res.Message.SavedRecipes.find((x) => x.RecipeId === this.recipeId)) {
        console.log("Recipe Found");
        this.comments = new FormControl(
          res.Message.SavedRecipes.find(
            (x) => x.RecipeId === this.recipeId
          ).RecipeComments,
          { updateOn: "change" }
        );
      } else {
        this.comments = new FormControl("", { updateOn: "change" });
      }
    });
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
