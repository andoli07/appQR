import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControllerPageRoutingModule } from './controller-routing.module';

import { ControllerPage } from './controller.page';

import { AsignarAsignaturaModalPage } from 'src/app/access/asignar-asignatura-modal/asignar-asignatura-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControllerPageRoutingModule
  ],
  declarations: [ControllerPage]
})
export class ControllerPageModule {}
