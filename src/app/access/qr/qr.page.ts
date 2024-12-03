import { Component } from '@angular/core';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage {
  textQR: string = ''; // Texto que se va a convertir en el QR

  // Función para generar el código QR
  generarQRCode() {
    if (this.textQR) {
      // Aquí puedes añadir más lógica si quieres realizar alguna acción adicional
      console.log('Generando QR para:', this.textQR);
    } else {
      console.log('No se ha ingresado texto para generar el QR');
    }
  }
}