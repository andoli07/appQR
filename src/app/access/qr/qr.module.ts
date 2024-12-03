import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QRPage } from './qr.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule,
    QrCodeModule
  ],
  declarations: [QRPage]
})
export class QrPageModule {}
