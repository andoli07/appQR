import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarqrPage } from './generarqr.page';

describe('GenerarqrPage', () => {
  let component: GenerarqrPage;
  let fixture: ComponentFixture<GenerarqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
