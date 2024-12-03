import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ModalController, AlertController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cards = [
    { title: 'Programación Móvil', content: 'Sección 003_D', imgSrc: 'assets/img/tec.webp' },
    { title: 'Programación Base de Datos', content: 'sección_008A', imgSrc: 'assets/img/tecno.png' },
    { title: 'Arquitectura', content: 'Sección_002C', imgSrc: 'assets/img/tecnologia.jpg' },
    { title: 'Portafolio', content: 'Sección_005B', imgSrc: 'assets/img/portafolio.jpg' }
  ];
  selectedCardIndex: number | null = null;
  username: string = '';

  constructor(private router: Router,
    private animationController: AnimationController, 
    private renderer: Renderer2,
    private modalController: ModalController,
    private alertController: AlertController,) {}

  reloadPageGoHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.href = '/home';
  });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const userInfo = navigation.extras.state['userInfo'];
      console.log("UserInfo received:", userInfo);
      this.username = userInfo?.username ?? '';
    }
    

    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      this.loopProfileAnimation(profileImage);
    }
  }

  loopProfileAnimation(element: any) {
    const rotateAnimation = this.animationController.create()
      .addElement(element)
      .duration(2000)
      .iterations(Infinity)
      .easing('ease-in-out')
      .fromTo('transform', 'rotateY(0)', 'rotateY(360deg)');

    rotateAnimation.play();
  }

  onCardSelect(index: number) {
    const previouslySelectedCard = this.selectedCardIndex !== null 
      ? document.querySelectorAll('.card')[this.selectedCardIndex] 
      : null;

    this.selectedCardIndex = index;

    const selectedCard = document.querySelectorAll('.card')[index];

    if (previouslySelectedCard === selectedCard) {
      this.resetCardAnimation(previouslySelectedCard);
      this.selectedCardIndex = null;
      previouslySelectedCard.classList.remove('selected');
      return;
    }

    if (previouslySelectedCard) {
      this.resetCardAnimation(previouslySelectedCard);
      this.selectedCardIndex = null;
      previouslySelectedCard.classList.remove('selected');
      }
  
    if (selectedCard) {
      this.selectedCardIndex = index;
      selectedCard.classList.add('selected');
      
      const animation = this.animationController.create()
        .addElement(selectedCard)
        .duration(500)
        .easing('ease-in-out')
        .fromTo('transform', 'scale(1)', 'scale(1.05)')
        .fromTo('box-shadow', 'none', '0 7px 15px rgba(0, 0, 255, 0.5)');
      animation.play();
      }
    }

  resetCardAnimation(card: any) {
    card.classList.remove('selected');
    
    const resetAnimation = this.animationController.create()
      .addElement(card)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('transform', 'scale(1.05)', 'scale(1)')
      .fromTo('box-shadow', '0 7px 15px rgba(0, 0, 255, 0.5)', 'none');
    resetAnimation.play();
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
