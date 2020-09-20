import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService {

  private baseUrl = 'http://recipeserver.jasondesigns.net/';
  private httpOptions(token) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token
      })
    }
  }

  constructor(private http: HttpClient) { }

  getRecipesByIngredients(token, ingredients): Observable<any> {
    const data = this.http.get(this.baseUrl + 'recipe/ingredients/' + ingredients, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  getRecipesByName(token, name): Observable<any> {
    const data = this.http.get(this.baseUrl + 'recipe/name/' + name, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  getRecipeById(token, recipeId): Observable<any> {
    const data = this.http.get(this.baseUrl + 'recipe/' + recipeId, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  getIngredients(token): Observable<any> {
    const data = this.http.get(this.baseUrl + 'ingredients/', this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  missingIngredient(token, ingredient, username, firstName): Observable<any> {
    const data = this.http.post<any>(this.baseUrl + 'ingredients/missing', {
      ingredient, username, firstName
    }, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  catcher(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError(error.message || 'Service Error');
  }
}