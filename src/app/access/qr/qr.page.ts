import { Component } from '@angular/core';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage {
  textQR: string = '';
  
  generarQRCode() {
    if (this.textQR) {
      console.log('Generando QR para:', this.textQR);
    } else {
      console.log('No se ha ingresado texto para generar el QR');
    }
  }
}