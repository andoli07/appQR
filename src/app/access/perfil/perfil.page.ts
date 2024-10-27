import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

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

  constructor(private router: Router, private animationController: AnimationController, private renderer: Renderer2) {}

  reloadPageGoHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.href = '/home';
  });
  }

  ngOnInit() {
     //get userInfo from home
    const navigation = this.router.getCurrentNavigation();
     //display Username
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
}
