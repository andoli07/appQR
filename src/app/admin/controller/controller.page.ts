import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AsignarAsignaturaModalPage } from 'src/app/access/asignar-asignatura-modal/asignar-asignatura-modal.page';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = [];
  asignaturas: any[] = [];

  constructor(private api: ApicontrollerService,
    private alertController: AlertController,
    private modalController: ModalController) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarAsignaturas();
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

  cargarAsignaturas() {
    this.api.getAsignaturas().subscribe(
      (data) => {
        this.asignaturas = data;
        console.log(this.asignaturas);
      },
      (error) => {
        console.log("Error en la llamada: " + error);
      }
    );
  }

  async crearAsignatura() {
    const alert = await this.alertController.create({
      header: 'Crear Asignatura',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre de Asignatura'
        },
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción'
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
            this.api.crearAsignatura(data).subscribe(response => {
              console.log('Asignatura creada:', response);
            }, error => {
              console.error("Error al crear asignatura: ", error);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async asignarAsignaturaAUsuario() {
    const modal = await this.modalController.create({
      component: AsignarAsignaturaModalPage
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        const { usuarioId, asignaturaId } = result.data;
        this.api.asignarAsignaturaAUsuario(usuarioId, asignaturaId).subscribe(response => {
          console.log('Asignatura asignada:', response);
        }, error => {
          console.error("Error al asignar asignatura: ", error);
        });
      }
    });

    await modal.present();
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
              this.cargarUsuarios();
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
    const user = this.users[index];
  
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: user.username, 
          placeholder: 'Nombre de Usuario'
        },
        {
          name: 'password',
          type: 'password',
          value: user.password,
          placeholder: 'Contraseña'
        },
        {
          name: 'email',
          type: 'text',
          value: user.email, 
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
  
            this.api.updateUser(updatedUser.id, updatedUser).subscribe(() => {
              this.cargarUsuarios(); 
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
      this.cargarUsuarios();
    }, (error) => {
      console.error("Error al eliminar usuario:", error);
    });
  }
  
}
