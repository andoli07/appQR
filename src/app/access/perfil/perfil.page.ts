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

  constructor(
    private router: Router,
    private animationController: AnimationController,
    private renderer: Renderer2,
    private api: ApicontrollerService
  ) {}

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

  async scanQR() {
    try {
      const result = await BarcodeScanner.scan();
      if (result.barcodes.length > 0) {
        alert('Contenido del QR: ' + result.barcodes[0].displayValue);
        console.log('Contenido del QR:', result.barcodes[0].displayValue);
      } else {
        alert('No se detectó ningún código QR.');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      alert('Hubo un error al intentar escanear el código QR.');
    }
  }
}