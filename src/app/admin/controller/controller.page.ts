import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {

  users: any[] = []

  constructor(private api: ApicontrollerService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data
        console.log(this.users)
      },
      (error) => {
        console.log("Error en la llamada" + error)
      });
  }

  editUser(id: any) {

  }

  deleteUser(id: any) {
    
  }

  addUser() {

  }

}
