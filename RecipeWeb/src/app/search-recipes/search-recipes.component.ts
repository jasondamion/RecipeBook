import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeService } from '../recipe.service';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MissingIngredientDialogComponent } from './missing-ingredient-dialog/missing-ingredient-dialog.component';

export interface IngredientData {
  id: number;
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  styleUrls: ['./search-recipes.component.css'],
})
export class SearchRecipesComponent implements OnInit {
  recipeNameQuery = new FormControl('', { updateOn: 'change' });
  displayedColumns: string[] = ['name', 'select'];
  dataSource: MatTableDataSource<IngredientData>;
  selectedIngredients: IngredientData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ingredients;
  recipes;
  constructor(
    private _recipeService: RecipeService,
    private snackBar: MatSnackBar,
    private _userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._recipeService
      .getIngredients(localStorage.getItem('token'))
      .subscribe((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(
          res.Message.map((x) => ({id: x.id, name: x.Name, checked: false}))
        );
        console.log(this.dataSource);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 missingIngredient(){
  const dialogRef = this.dialog.open(MissingIngredientDialogComponent, {
    width: '500px',
  });
  dialogRef.afterClosed().subscribe((response) => {
    console.log(response)
    if (response.isSent) {
      this._recipeService
      .missingIngredient(
        localStorage.getItem("token"),
        response.ingredients,
        localStorage.getItem("userName"),
        localStorage.getItem("fName")
      )
      .subscribe((res) => {
        if (res) {
          res.Result === 'Success'
            ? this.snackBar.open(res.Message, '', { duration: 3000 })
            : this.snackBar.open(
                'Error sending email, check console for more...',
                '',
                { duration: 3000 }
              );
          console.log(res.Message);
        }
      });
    }
  });
 }

  searchByRecipeName() {
    this.recipes = [];
    this._recipeService
      .getRecipesByName(
        localStorage.getItem('token'),
        this.recipeNameQuery.value
      )
      .subscribe((res) => {
        if (res.Result === 'Success') {
          this.recipes = res.Message;
        } else {
          this.snackBar.open(res.Message, '', { duration: 3000 });
          console.log(res.Message);
        }
      });
  }

  searchByIngredients() {
    this.recipes = [];
    this._recipeService
      .getRecipesByIngredients(
        localStorage.getItem('token'),
        this.selectedIngredients.map(x => x.name).toString()
      )
      .subscribe((res) => {
        if (res.Result === 'Success') {
          this.recipes = res.Message;
        } else {
          this.snackBar.open(res.Message.Info, '', { duration: 3000 });
          console.log(res.Message);
        }
      });
  }

  selectIngredient(ingredient: IngredientData, add: boolean) {
    if(add){
      this.selectedIngredients.push(ingredient)
    }
    else{
      this.selectedIngredients = this.selectedIngredients.filter(
        (x) => x !== ingredient
      )
    }
  }

  isRowSelected(row: IngredientData): boolean {
    const existingFormControl = this.selectedIngredients.find(c => c.id === row.id);
    return existingFormControl !== undefined;
  }

  removeFromSelectedIngredients(ingredient: IngredientData) {
    this.selectedIngredients = this.selectedIngredients.filter(
      (x) => x !== ingredient
    );
  }

  saveRecipe(recipeId, recipeName, recipeSummary) {
    this._userService
      .addRecipe(
        localStorage.getItem('token'),
        recipeId,
        recipeName,
        recipeSummary,
        ''
      )
      .subscribe((res) => {
        this.snackBar.open(res.Message, '', { duration: 3000 });
        console.log(res.Message);
      });
  }
}
