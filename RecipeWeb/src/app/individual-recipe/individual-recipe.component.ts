import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-individual-recipe",
  templateUrl: "./individual-recipe.component.html",
  styleUrls: ["./individual-recipe.component.css"],
})
export class IndividualRecipeComponent implements OnInit {
  recipe;
  recipeId: Observable<string>;

  constructor(
    private _recipeService: RecipeService,
    route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.recipeId = route.params.pipe(map((p) => p.id));
  }

  ngOnInit(): void {
    this._recipeService
      .getRecipeById(localStorage.getItem("token"), this.recipeId)
      .subscribe((res) => {
        if (res.Result === "Success") {
          this.recipe = res.Message;
        } else {
          this.snackBar.open(res.Message, "", { duration: 3000 });
          console.log(res.Message);
        }
      });
  }
}
