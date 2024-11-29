import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  username: string = '';
  isModalOpen: boolean = false;
  qrCodeValue: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const userInfo = navigation.extras.state['userInfo'];
      this.username = userInfo?.username ?? '';
    }
  }

  generateQR() {
    this.qrCodeValue = `https://example.com/class/${this.username}`;
    this.isModalOpen = true; // Abre el modal
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
  }
}

