import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoggedInService } from '../logged-in.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(    private router: Router, private loggedInCheck: LoggedInService
    ) { }

  ngOnInit() {
  }

  logOut(){
   localStorage.removeItem('token');
   this.loggedInCheck.logOut();
   this.router.navigate(["/Login"]);
  }
}
