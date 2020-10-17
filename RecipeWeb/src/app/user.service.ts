import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class UserService {
  private baseUrl = "http://recipeserver.jasondesigns.net/";
  private httpOptions(token) {
    if (token) {
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          token,
        }),
      };
    }
    
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }

  constructor(private http: HttpClient) {}

  login(username, password): Observable<any> {
    const data = this.http
      .post<any>(
        this.baseUrl + "login",
        {
          username,
          password,
        },
        this.httpOptions(null)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  signup(firstName, username, password): Observable<any> {
    const data = this.http
      .post<any>(
        this.baseUrl + "signup",
        {
          firstName,
          username,
          password,
        },
        this.httpOptions(null)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  info(token): Observable<any> {
    const data = this.http
      .get(this.baseUrl + "info", this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  addRecipe(
    token,
    recipeId,
    recipeName,
    recipeSummary,
    recipeComments
  ): Observable<any> {
    const data = this.http
      .post<any>(
        this.baseUrl + "saved",
        {
          recipeId,
          recipeName,
          recipeSummary,
          recipeComments,
        },
        this.httpOptions(token)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  editRecipeComments(token, recipeId, recipeComments): Observable<any> {
    const data = this.http
      .put<any>(
        this.baseUrl + "saved",
        {
          recipeId,
          recipeComments,
        },
        this.httpOptions(token)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  deleteRecipe(token, recipeId): Observable<any> {
    const data = this.http
      .delete(this.baseUrl + "saved/" + recipeId, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  getCustomRecipe(token, recipeId): Observable<any> {
    const data = this.http
      .get(this.baseUrl + "custom/" + recipeId, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  addCustomRecipe(
    token,
    recipeName,
    recipeIngredients,
    recipeInstructions,
    recipeSummary,
    recipeComments
  ): Observable<any> {
    const data = this.http
      .post<any>(
        this.baseUrl + "custom",
        {
          recipeName,
          recipeIngredients,
          recipeInstructions,
          recipeSummary,
          recipeComments,
        },
        this.httpOptions(token)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  editCustomRecipe(
    token,
    recipeId,
    recipeName,
    recipeIngredients,
    recipeInstructions,
    recipeSummary,
    recipeComments
  ): Observable<any> {
    const data = this.http
      .put<any>(
        this.baseUrl + "custom",
        {
          recipeId,
          recipeName,
          recipeIngredients,
          recipeInstructions,
          recipeSummary,
          recipeComments,
        },
        this.httpOptions(token)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  deleteCustomRecipe(token, recipeId): Observable<any> {
    const data = this.http
      .delete(this.baseUrl + "custom/" + recipeId, this.httpOptions(token))
      .pipe(catchError(this.catcher));
    return data;
  }
  forgotPassword(firstName, username, suggestedPassword): Observable<any> {
    console.log(firstName + username + suggestedPassword);
    const data = this.http
      .post<any>(
        this.baseUrl + "forgot",
        {
          firstName,
          username,
          suggestedPassword,
        },
        this.httpOptions(null)
      )
      .pipe(catchError(this.catcher));
    return data;
  }
  catcher(error: HttpErrorResponse) {
    console.log(error.message);
    return throwError(error.message || "Service Error");
  }
}
