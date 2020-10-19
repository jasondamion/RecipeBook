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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ForgetPasswordDialogComponent,
    SignupComponent,
    HomeComponent,
    IndividualRecipeComponent,
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
