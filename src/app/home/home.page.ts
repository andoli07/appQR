import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService } from '../services/apicontroller.service';
import { NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private router: Router, private api: ApicontrollerService,private authService: AuthService) {}

  validar() {
    this.api.login(this.user).subscribe(
      (response: any) => {
        const token = response.token;
        const userInfo = response.user;

        console.log("Login successful. Token:", token);
        console.log("User data:", userInfo);

        const navigationExtras: NavigationExtras = {
          state: {
            userInfo: userInfo
          }
        };
        this.authService.login();
        this.router.navigate(['/loader'],navigationExtras);
        this.message = '';
        setTimeout(() => {
          this.router.navigate(['/perfil'],navigationExtras);
        }, 3000);
      },
      error => {
        if (error.status === 404) {
          console.error("Username not found.");
          this.message = 'Usuario no encontrado';
        } else if (error.status === 400) {
          this.message = 'Contraseña incorrecta',
          console.error("Incorrect password.");
        } else {
          console.error("Unexpected error occurred:", error);
        }
      });
  }
}

