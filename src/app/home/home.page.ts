import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent],
})
export class HomePage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.cdr.detectChanges(); // Obligatorio por el modo Zoneless
  }
}