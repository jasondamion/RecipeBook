import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "../user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ForgetPasswordDialogComponent } from "./forget-password-dialog/forget-password-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { LoggedInService } from '../logged-in.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  username = new FormControl("", { updateOn: "change" });
  password = new FormControl("", { updateOn: "change" });
  disableForgetPasswordButton: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private loggedInCheck: LoggedInService
  ) {}

  ngOnInit() {}

  login() {
    this.userService
      .login(this.username.value, this.password.value)
      .subscribe((res) => {
        if (res) {
          if (res.Result === "Success") {
            localStorage.setItem("token", res.Token);
            this.loggedInCheck.logIn();
            this.router.navigate(["/"]);
          } else {
            this.snackBar.open(res.Message, "", { duration: 3000 });
            console.log(res.Message);
          }
        }
      });
  }

  forgetPassword() {
    const dialogRef = this.dialog.open(ForgetPasswordDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response.isSent) {
        this.disableForgetPasswordButton = true;
        this.userService
        .forgotPassword(
          response.firstName,
          response.username,
          response.suggestedPassword
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
}
