import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // Variables para enlazar a las cajas de texto del HTML
  username = '';
  password = '';
  isLoading = false;

  onSubmit() {
    // Si los campos están vacíos, no hace nada
    if (!this.username || !this.password) return;

    this.isLoading = true;
    this.cdr.detectChanges(); // Forzar cambio en la interfaz (Zoneless)

    // Llamamos al servicio auth que se conecta a Railway
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log('Login exitoso:', res);
        
        // Por ahora lo mandamos a /home para verificar que entra
        this.router.navigate(['/home']);
        this.cdr.detectChanges(); // Forzar redirección inmediata en modo Zoneless
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en login:', err);
        alert('Error: Credenciales incorrectas'); // Alerta sencilla mientras hacemos los modales premium
        this.cdr.detectChanges(); // Forzar actualización del estado de error en pantalla
      }
    });
  }
}