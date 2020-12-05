import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../user.service";
import { CustomDialogComponent } from "./custom-dialog/custom-dialog.component";

@Component({
  selector: "app-individual-custom",
  templateUrl: "./individual-custom.component.html",
  styleUrls: ["./individual-custom.component.css"],
})
export class IndividualCustomComponent implements OnInit {
  recipe;
  recipeId: string;
  comments;
  image;

  constructor(
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get("id");
    this._userService
      .getCustomRecipe(localStorage.getItem("token"), this.recipeId)
      .subscribe((res) => {
        if (typeof res.Message === "string") {
          this.snackBar.open(res.Message, "", { duration: 3000 });
        } else {
          this.recipe = res.Message;
          this.splitInstructionsAndIngredients();
          this.comments = new FormControl(this.recipe.RecipeComments, {
            updateOn: "change",
          });
        }
      });
    this._userService
      .getImage(localStorage.getItem("token"), this.recipeId)
      .subscribe((res) => {
        if (res) {
          this.image = res;
        }
      });
  }

  printRecipe() {
    window.print();
  }

  deleteRecipe() {
    this._userService
      .deleteCustomRecipe(localStorage.getItem("token"), this.recipeId)
      .subscribe((res) => {
        this.snackBar.open(res.Message, "", { duration: 3000 });
        this.router.navigate(["Personal"]);
      });
  }

  splitInstructionsAndIngredients() {
    this.recipe.RecipeInstructions = this.recipe.RecipeInstructions.replace(
      /(<([^>]+)>)/gi,
      ""
    );
    if (this.recipe.RecipeInstructions.includes(".")) {
      this.recipe.RecipeInstructions = this.recipe.RecipeInstructions.split(
        "."
      );
    }
    this.recipe.RecipeIngredients = this.recipe.RecipeIngredients.replace(
      /(<([^>]+)>)/gi,
      ""
    );
    if (this.recipe.RecipeIngredients.includes(".")) {
      this.recipe.RecipeIngredients = this.recipe.RecipeIngredients.split(".");
    }
  }

  editRecipe() {
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      width: "500px",
      data: { recipe: this.recipe, image: this.image },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response.confirmed) {
        this._userService
          .editCustomRecipe(
            localStorage.getItem("token"),
            this.recipeId,
            response.recipeName,
            response.recipeIngredients,
            response.recipeInstructions,
            response.recipeSummary,
            response.recipeComments
          )
          .subscribe((res) => {
            this.snackBar.open(res.Message, "", { duration: 3000 });
            this.router
              .navigateByUrl("/", { skipLocationChange: true })
              .then(() => {
                this.router.navigate(["/IndividualCustom", this.recipeId]);
              });
          });
      }
    });
  }
}
