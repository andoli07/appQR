import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignarAsignaturaModalPageRoutingModule } from './asignar-asignatura-modal-routing.module';

import { AsignarAsignaturaModalPage } from './asignar-asignatura-modal.page';

@NgModule({
  declarations: [AsignarAsignaturaModalPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsignarAsignaturaModalPageRoutingModule
  ],
  exports: [AsignarAsignaturaModalPage]
})
export class AsignarAsignaturaModalPageModule {}
