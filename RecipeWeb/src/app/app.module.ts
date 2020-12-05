import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPasswordDialogComponent } from './login/forget-password-dialog/forget-password-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { RecipeService } from './recipe.service';
import {AppMatModule} from './app-mat';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoggedInService } from './logged-in.service';
import { IndividualRecipeComponent } from './individual-recipe/individual-recipe.component';
import { SearchRecipesComponent } from './search-recipes/search-recipes.component';
import { MissingIngredientDialogComponent } from './search-recipes/missing-ingredient-dialog/missing-ingredient-dialog.component';
import { PersonalRecipesComponent } from './personal-recipes/personal-recipes.component';
import { IndividualCustomComponent } from './individual-custom/individual-custom.component';
import { CustomDialogComponent } from './individual-custom/custom-dialog/custom-dialog.component';
import { AddCustomComponent } from './personal-recipes/add-custom/add-custom.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ForgetPasswordDialogComponent,
    SignupComponent,
    HomeComponent,
    IndividualRecipeComponent,
    SearchRecipesComponent,
    MissingIngredientDialogComponent,
    PersonalRecipesComponent,
    IndividualCustomComponent,
    CustomDialogComponent,
    AddCustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMatModule,
  ],
  providers: [UserService, RecipeService, LoggedInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
