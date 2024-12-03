import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';

@Component({
  selector: 'app-asignar-asignatura-modal',
  templateUrl: './asignar-asignatura-modal.page.html',
  styleUrls: ['./asignar-asignatura-modal.page.scss'],
})
export class AsignarAsignaturaModalPage implements OnInit {
  users: any[] = [];
  asignaturas: any[] = [];
  selectedUserId: number | null = null;
  selectedAsignaturaId: number | null = null;

  constructor(private api: ApicontrollerService, private modalController: ModalController) { }

  ngOnInit() {
    this.api.getUsers().subscribe(users => {
      this.users = users;
    });

    this.api.getAsignaturas().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
    });
  }

  asignar() {
    if (this.selectedUserId && this.selectedAsignaturaId) {
      this.modalController.dismiss({
        usuarioId: this.selectedUserId,
        asignaturaId: this.selectedAsignaturaId
      });
    }
  }

  close() {
    this.modalController.dismiss();
  }
}