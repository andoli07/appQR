import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApicontrollerService } from 'src/app/services/apicontroller.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cards = [
    { id: 1, title: 'Programación Móvil', content: 'Sección 003_D', imgSrc: 'assets/img/tec.webp' },
    { id: 2, title: 'Programación Base de Datos', content: 'Sección_008A', imgSrc: 'assets/img/tecno.png' },
    { id: 3, title: 'Arquitectura', content: 'Sección_002C', imgSrc: 'assets/img/tecnologia.jpg' },
    { id: 4, title: 'Portafolio', content: 'Sección_005B', imgSrc: 'assets/img/portafolio.jpg' },
  ];
  selectedSubject: any = null;
  asistencia: any[] = [];
  isModalOpen = false;
  username: string = '';

  constructor(private router: Router,
    private animationController: AnimationController, 
    private renderer: Renderer2,
    private modalController: ModalController,
    private alertController: AlertController,
    private api: ApicontrollerService) {}

  reloadPageGoHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.href = '/home';
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const userInfo = navigation.extras.state['userInfo'];
      this.username = userInfo?.username ?? '';
    }

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      this.loopProfileAnimation(profileImage as HTMLElement);
    }
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

  async onCardSelect(card: any) {
    this.selectedSubject = card;

    try {
      const response = await this.api.getAsistencia(card.id).toPromise();
      this.asistencia = response;
      this.isModalOpen = true;
    } catch (error) {
      console.error('Error al obtener la asistencia:', error);
      alert('Hubo un problema al obtener la asistencia.');
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedSubject = null;
    this.asistencia = [];
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
    const alert = await this.alertController.create({
      header: 'Código Escaneado',
      message: scannedText || 'No se pudo leer el código.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  navigateToQrPage() {
    this.router.navigate(['/qrpage']);
  }
}