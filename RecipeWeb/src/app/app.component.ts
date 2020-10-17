import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeWeb';
  loggedIn;
  constructor(){
      this.loggedIn = localStorage.getItem('token') !== null;
     console.log(this.loggedIn);

  }
}