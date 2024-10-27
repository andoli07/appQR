import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = [];

  constructor(private api: ApicontrollerService, private alertController: AlertController) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.log("Error en la llamada: " + error);
      }
    );
  }

  async addUser() {
    const alert = await this.alertController.create({
      header: 'Agregar Usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Correo Electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            this.api.postUser(data).subscribe(response => {
              this.cargarUsuarios(); // Recargar usuarios después de agregar
            }, error => {
              console.error("Error al agregar usuario: ", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editUser(index: number) {
    const user = this.users[index];  // Obtener los datos del usuario seleccionado
  
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: user.username,  // Prellenar con el valor actual
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'password',
          type: 'password',
          value: user.password,  // Prellenar con el valor actual
          placeholder: 'Contraseña'
        },
        {
          name: 'email',
          type: 'text',
          value: user.email,  // Prellenar con el valor actual
          placeholder: 'Correo Electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            const updatedUser = {
              id: user.id,
              username: data.username,
              password: data.password,
              email: data.email
            };
  
            // Llamar al servicio para actualizar los datos en el backend
            this.api.updateUser(updatedUser.id, updatedUser).subscribe(() => {
              this.cargarUsuarios();  // Recargar la lista de usuarios después de la actualización
            }, (error) => {
              console.error("Error al actualizar usuario:", error);
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  deleteUser(index: number) {
    const userId = this.users[index].id;
    this.api.deleteUser(userId).subscribe(() => {
      this.cargarUsuarios(); // Recargar usuarios después de eliminar
    }, (error) => {
      console.error("Error al eliminar usuario:", error);
    });
  }
  
}
