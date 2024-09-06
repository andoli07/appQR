import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

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

  constructor(private router: Router) {

  }

  validar() {
    if (this.user.username.length != 0) {
      if (this.user.password.length != 0) {
        //Funciona
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
        console.log('Contraseña vacia');
        //No funciona
      }
    } else {
      console.log('Usuario vacio');
      //Tampoco funciona
    }
  }

}
