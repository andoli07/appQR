import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnimationController, ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';
import { ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  asignaturas: any[] = [];
  selectedSubject: any = null;
  asistencia: any[] = [];
  asistenciaLength: number = 0;
  isModalOpen = false;
  username: string = '';
  userId: number = 0;

  constructor(private router: Router,
    private animationController: AnimationController, 
    private renderer: Renderer2,
    private modalController: ModalController,
    private alertController: AlertController,
    private api: ApicontrollerService,
    private changeDetectorRef: ChangeDetectorRef) {}

  reloadPageGoHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.href = '/home';
    });
  }
  
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.reloadPage();
    });
  }

  reloadPage() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const userInfo = navigation.extras.state['userInfo'];
      this.username = userInfo?.username ?? '';
      this.userId = userInfo?.id ?? null;
    }

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      this.loopProfileAnimation(profileImage as HTMLElement);
    }

    this.getAsignaturasPorUsuario();
  }

  getAsignaturasPorUsuario(): void {
    this.api.getAsignaturasPorUsuario(this.userId).subscribe(
      response => {
        this.asignaturas = response;
        console.log('Asignaturas fetched:', response);
      },
      error => {
        console.error('Error fetching asignaturas:', error);
      }
    );
  }

  loopProfileAnimation(element: HTMLElement) {
    const rotateAnimation = this.animationController.create()
      .addElement(element)
      .duration(2000)
      .iterations(Infinity)
      .easing('ease-in-out')
      .fromTo('transform', 'rotateY(0)', 'rotateY(360deg)');

    rotateAnimation.play();
  }

  onCardSelect(asignatura: any) {
    console.log('Card selected:', asignatura);
    this.selectedSubject = asignatura;
    this.api.getAsistenciaPorAsignatura(asignatura.id).subscribe(
      response => {
        this.asistencia = response;
        this.asistenciaLength = this.asistencia.reduce((contador, item) => contador + item.contador, 0);
        console.log('Asistencia:', this.asistencia);
        console.log('Asistencia Length:', this.asistenciaLength);
        this.isModalOpen = true;
        this.changeDetectorRef.detectChanges();
      },
      error => {
        console.error('Error fetching asistencia:', error);
      }
    );
  }

  closeModal(): void {
    console.log('Closing modal');
    this.isModalOpen = false;
  }

  async openScanner(): Promise<void> {
    const hasPermission = await this.requestCameraPermission();
    if (!hasPermission) {
      this.showPermissionAlert();
      return;
    }

    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      componentProps: {
        formats: ['QR_CODE', 'EAN_13'],
        lensFacing: 'back',
      },
      cssClass: 'barcode-scanning-modal',
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data && result.data.barcode) {
        const scannedText = result.data.barcode.rawValue;
        console.log('Código escaneado:', scannedText);
        await this.showScannedCodeAlert(scannedText);
      }
    });

    await modal.present();
  }

  private async requestCameraPermission(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }


  private async showPermissionAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Se necesita el permiso de cámara para usar el escáner de códigos.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async showScannedCodeAlert(scannedText: string): Promise<void> {
    this.handleQrCodeScanned(scannedText);
    const alert = await this.alertController.create({
      header: 'Código Escaneado',
      message:'Asistencia tomada con exito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  private async handleQrCodeScanned(scannedText: string): Promise<void> {
    const scannedNumber = Number(scannedText);
    if (!isNaN(scannedNumber)) {
      this.api.incrementarAsistencia(scannedNumber, this.userId).subscribe(
      response => { 
        console.log('Request sent successfully', response);
      },
      error => {
        console.error('Error sending request', error);
      }
      );
    } else {
      console.error('Scanned text is not a valid number:', scannedText);
    }
  }
}