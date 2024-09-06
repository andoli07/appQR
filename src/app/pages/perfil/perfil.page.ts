import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  cards = [
    { title: 'Título 1', content: 'Contenido de la tarjeta 1' },
    { title: 'Título 2', content: 'Contenido de la tarjeta 2' },
    { title: 'Título 3', content: 'Contenido de la tarjeta 3' },
    { title: 'Título 4', content: 'Contenido de la tarjeta 4' }
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

