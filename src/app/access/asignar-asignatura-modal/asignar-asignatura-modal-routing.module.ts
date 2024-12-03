import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsignarAsignaturaModalPage } from './asignar-asignatura-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AsignarAsignaturaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsignarAsignaturaModalPageRoutingModule {}
