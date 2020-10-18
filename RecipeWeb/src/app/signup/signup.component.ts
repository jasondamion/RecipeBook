import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { LoggedInService } from '../logged-in.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  username = new FormControl("", { updateOn: "change" });
  password = new FormControl("", { updateOn: "change" });
  firstName = new FormControl("", { updateOn: "change" });

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private loggedInCheck: LoggedInService
  ) {}

  ngOnInit(): void {}

  signUp() {
    this.userService
      .signup(this.firstName.value, this.username.value, this.password.value)
      .subscribe((res) => {
        if (res) {
          if (res.Result === "Success") {
            localStorage.setItem("token", res.Token);
            this.loggedInCheck.logOut();
            this.router.navigate(["/"]);
          } else {
            this.snackBar.open(res.Message, "", { duration: 3000 });
            console.log(res.Message);
          }
        }
      });
  }
}
