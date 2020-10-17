import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-forget-password-dialog",
  templateUrl: "./forget-password-dialog.component.html",
  styleUrls: ["./forget-password-dialog.component.css"],
})
export class ForgetPasswordDialogComponent implements OnInit {
  username = new FormControl("", { updateOn: "change" });
  suggestedPassword = new FormControl("", { updateOn: "change" });
  firstName = new FormControl("", { updateOn: "change" });

  constructor(public dialogRef: MatDialogRef<ForgetPasswordDialogComponent>) {}

  ngOnInit() {}

  closeDialog(isSent: boolean) {
    const response = {
      username: this.username.value,
      suggestedPassword: this.suggestedPassword.value,
      firstName: this.firstName.value,
      isSent,
    };
    this.dialogRef.close(response);
  }
}
