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

  message = '';

  constructor(private router: Router) {

  }

  validar() {
    if (this.user.username == 'test' && this.user.password == 'test') {
      let navigationExtras: NavigationExtras = {
        state: {
          username: 'test',
          password: 'test',
        },
      };
      this.router.navigate(['/loader'],navigationExtras);
        setTimeout(() => {
          this.router.navigate(['/perfil'],navigationExtras);
        }, 3000);
    } else {
      if (this.user.username.length != 0) {
        if (this.user.password.length != 0) {
          //Funciona pero q no pase
          console.log('Usuario no existe');
          this.message = 'Usuario no existe';
        } else {
          console.log('Contraseña vacia');
          this.message = 'Contraseña vacia';
          //No funciona
        }
      } else {
        //No funciona
        console.log('Usuario vacio');
        this.message = 'Usuario Vacio';
      }
    }
  }
}
