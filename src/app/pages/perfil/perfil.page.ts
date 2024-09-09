<<<<<<< Updated upstream
import { Component, OnInit, ViewChild} from '@angular/core';
=======
import { Component, OnInit, Renderer2 } from '@angular/core';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  
  constructor(private router: Router, private animationController: AnimationController) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      username: '';
      password: '';
    };
    this.username = state.username;
  }

  ngOnInit() {}
=======

  constructor(private router: Router, private animationController: AnimationController, private renderer: Renderer2) {}

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as { username: string };
    this.username = state?.username || 'Alumno';

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
    if (selectedCard) {
      if (previouslySelectedCard) {
        this.resetCardAnimation(previouslySelectedCard);
      }

      
      selectedCard.classList.add('selected');
      
      const animation = this.animationController.create()
        .addElement(selectedCard)
        .duration(500)
        .easing('ease-in-out')
        .fromTo('transform', 'scale(1)', 'scale(1.1)')
        .fromTo('box-shadow', 'none', '0 15px 30px rgba(0, 0, 255, 0.5)');
      animation.play();
    }
  }

  resetCardAnimation(card: any) {
    card.classList.remove('selected');
    
    const resetAnimation = this.animationController.create()
      .addElement(card)
      .duration(500)
      .easing('ease-in-out')
      .fromTo('transform', 'scale(1.1)', 'scale(1)')
      .fromTo('box-shadow', '0 15px 30px rgba(0, 0, 255, 0.5)', 'none'); 
    resetAnimation.play();
  }
>>>>>>> Stashed changes
}

