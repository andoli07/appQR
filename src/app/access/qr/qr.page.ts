import { Component, OnInit } from '@angular/core';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {
  textQR: string = '';
  asignaturas: any[] = [];
  selectedClassId: number | null = null;
  userId: number = 0;

  constructor(private api: ApicontrollerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ngOnInit called');
    this.fetchUserProfile();
  }

  getAsignaturasPorUsuario(): void {
    const userId = this.userId;
    console.log('Fetching asignaturas for userId:', userId);
    this.api.getAsignaturasPorUsuario(userId).subscribe(
      response => {
        this.asignaturas = response;
        console.log('Asignaturas fetched:', response);
      },
      error => {
        console.error('Error fetching asignaturas:', error);
      }
    );
  }

  onClassChange(event: any) {
    this.selectedClassId = event.detail.value;
    console.log('Selected class ID:', this.selectedClassId);
    this.generarQRCode();
  }

  generarQRCode() {
    console.log('Generating QR code');
    if (this.selectedClassId && this.userId) {
      this.textQR = this.selectedClassId.toString();
      console.log('Generando QR para:', this.textQR);
    } else {
      console.log('Falta seleccionar clase o usuario.');
      alert('Por favor, seleccione una clase y asegúrese de que el perfil del usuario esté cargado.');
    }
  }

  fetchUserProfile() {
    const token = this.authService.getToken();
    if (token) {
      this.api.getProfile(token).subscribe(
        (response: any) => {
          this.userId = response.id;
          console.log('User profile fetched:', response);
          this.getAsignaturasPorUsuario();
        },
        error => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }
}