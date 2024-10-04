import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AuthenticatorService } from '../services/authenticator.service';

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

  message = '';

  constructor(private router: Router, private auth: AuthenticatorService) {}

  validar() {
    if (this.auth.loginBDD(this.user.username, this.user.password)) {
      let navigationExtras: NavigationExtras = {
        state: {
          username: this.user.username,
          password: this.user.password,
        },
      };
      this.router.navigate(['/loader'],navigationExtras);
        setTimeout(() => {
          this.router.navigate(['/perfil'],navigationExtras);
        }, 3000);
    } else {
      console.log('al else');
      //No funciona
    }
  }
}

