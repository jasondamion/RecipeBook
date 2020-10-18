import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RecipeService } from "../recipe.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userFName;
  randomRecipes;

  constructor(
    private _userService: UserService,
    private _recipeService: RecipeService,
    private snackBar: MatSnackBar
  ) {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/Login";
    }
  }

  ngOnInit(): void {
    this._userService.info(localStorage.getItem("token")).subscribe((res) => {
      if (res.Result === "Success") {
        localStorage.setItem("fName", res.Message.Info.FirstName);
        this.userFName = res.Message.Info.FirstName;
      } else {
        this.snackBar.open(res.Message, "", { duration: 3000 });
        console.log(res.Message);
      }
    });

    this._recipeService
      .getRandomRecipes(localStorage.getItem("token"))
      .subscribe((res) => {
        if (res.Result === "Success") {
          this.randomRecipes = res.Message;
        }
      });
  }
}
