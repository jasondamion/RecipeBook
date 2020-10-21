import {AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RecipeService } from "../recipe.service";
import { FormControl } from "@angular/forms";
import { UserService } from '../user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface IngredientData{
  name: string;
}

@Component({
  selector: "app-search-recipes",
  templateUrl: "./search-recipes.component.html",
  styleUrls: ["./search-recipes.component.css"],
})
export class SearchRecipesComponent implements OnInit, AfterViewInit {
  recipeNameQuery = new FormControl("", { updateOn: "change" });
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<IngredientData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ingredients;
  recipes;
  constructor(
    private _recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private _userService: UserService
  ) {}

  ngOnInit(): void {

    this._recipeService.getIngredients(localStorage.getItem("token")).subscribe((res)=>{
      console.log(res)
     // this.dataSource = new MatTableDataSource(res.Message.map(x => x.Name));
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
