import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import type { IonModal } from '@ionic/angular';


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
    { title: 'Portafolio', content: 'Sección_005B', imgSrc: 'assets/img/portafolio.jpg'  }
  ];
  username = '';
  
  constructor(private router: Router, private animationController: AnimationController) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
  }

  ngOnInit() {}
}

