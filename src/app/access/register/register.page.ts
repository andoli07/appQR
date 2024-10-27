import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {
    'username':'',
    'email':'',
    'password':''
  }

  message = '';
  color = 'danger';

  constructor(private api: ApicontrollerService, private router : Router) { }

  ngOnInit() {
  }

  registrarse() {
    if (!this.user.username || this.user.username.trim().length === 0) {
      this.color = 'danger';
      this.message = 'El nombre de usuario no puede estar vacío.';
      return;
    }

    this.api.register(this.user).subscribe(
      (response: any) => {
        this.color = 'success';
        this.message = 'Usuario creado con exito';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error => {
        this.color = 'danger';
    
        if (error.status === 400) {
          if (error.error.username) {
            this.message = 'Un usuario con ese nombre ya existe'
          } else if (error.error.email) {
            this.message = 'Ingrese un correo valido';
          } else if (error.error.password) {
            this.message = 'La contraseña no puede estar vacia';
          } else {
            this.message = 'Error en la validación de datos. Por favor, inténtelo nuevamente.';
          }
        } else if (error.status === 500) {
          this.message = 'Error interno del servidor. Por favor, inténtelo más tarde.';
        }
    
        console.error('Error en el registro:', error);
      }
    )
  }
}


