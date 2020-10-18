import { Component } from "@angular/core";
import {LoggedInService} from './logged-in.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "RecipeWeb";
  loggedIn;

  constructor(loggedInCheck: LoggedInService ) {
    loggedInCheck.loggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }
}
