import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { IndividualCustomComponent } from './individual-custom/individual-custom.component';
import { IndividualRecipeComponent } from "./individual-recipe/individual-recipe.component";
import { LoginComponent } from "./login/login.component";
import { PersonalRecipesComponent } from './personal-recipes/personal-recipes.component';
import { SearchRecipesComponent } from "./search-recipes/search-recipes.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "Login",
    component: LoginComponent,
  },
  {
    path: "Signup",
    component: SignupComponent,
  },
  {
    path: "IndividualRecipe/:id",
    component: IndividualRecipeComponent,
  },
  {
    path: "Search",
    component: SearchRecipesComponent,
  },
  {
    path: "Personal",
    component: PersonalRecipesComponent
  },
  {
    path: "IndividualCustom/:id",
    component: IndividualCustomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
