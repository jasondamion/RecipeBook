import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { MDCSnackbar } from '@material/snackbar';
import { Router } from '@angular/router';
import { ForgetPasswordDialogComponent } from './forget-password-dialog/forget-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = new FormControl('', { updateOn: 'change' });
  password = new FormControl('', { updateOn: 'change' });
  snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
  disableForgetPasswordButton: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((res) => {
        if (res) {
          if (res.Result === 'Success') {
            localStorage.setItem('token', res.Token);
            this.router.navigate(['Home']);
          } else {
            this.snackbar.labelText = res.Message;
            this.snackbar.open();
            console.log(res.Message);
          }
        }

      });
  }

  forgetPassword() {
    this.disableForgetPasswordButton = true;
    const dialogRef = this.dialog.open(ForgetPasswordDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((response) => {
      this.userService.forgotPassword(response.firstName,
        response.username,
        response.suggestedPassword).subscribe((res) => {
          if (res) {
            this.snackbar.labelText = res.Result === 'Success' ? res.Message : 'Error sending email, check console for more...'
            this.snackbar.open();
            console.log(res.Message);
          }

        });
    });
  }

}
