import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    username: '',
    password: '',
  };

  constructor(private router: Router) {}

  goToProfile() {
   
    this.router.navigate(['/perfil'], {
      state: {
        username: this.user.username
      }
    });
  }

}
