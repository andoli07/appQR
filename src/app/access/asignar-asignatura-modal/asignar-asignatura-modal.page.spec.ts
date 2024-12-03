import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignarAsignaturaModalPage } from './asignar-asignatura-modal.page';

describe('AsignarAsignaturaModalPage', () => {
  let component: AsignarAsignaturaModalPage;
  let fixture: ComponentFixture<AsignarAsignaturaModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarAsignaturaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
