
import { Component, OnInit } from '@angular/core';
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
  username = '';

  constructor(private router: Router, private animationController: AnimationController) {}

  ngOnInit() {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as { username: string };
    this.username = state?.username || 'Alumno';
  }

  onCardSelect(index: number) {
    this.selectedCardIndex = index;

    const selectedCard = document.querySelectorAll('.card')[index];
    if (selectedCard) {
      const animation = this.animationController.create()
        .addElement(selectedCard)
        .duration(500)
        .easing('ease-in-out')
        .fromTo('transform', 'scale(1)', 'scale(1.1)')
        .fromTo('box-shadow', 'none', '0 10px 20px rgba(0, 0, 0, 0.2)');
      animation.play();
    }
  }

  markAttendance() {
    if (this.selectedCardIndex !== null) {
      alert(`Asistencia marcada para ${this.cards[this.selectedCardIndex].title}`);
    } else {
      alert('Por favor, selecciona una asignatura.');
    }
  }
}
