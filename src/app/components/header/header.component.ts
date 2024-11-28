import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
      CommonModule,    // Permite usar directivas comunes de Angular
      FormsModule,     // Permite usar formularios
      IonicModule,     // Permite usar componentes de Ionic como IonContent, IonItem, etc.
      TranslateModule  // Permite usar pipe 'translate'
  ]
})
export class HeaderComponent implements OnInit {
  
  @Output() headerClick = new EventEmitter<string>();
  admin_: boolean = false; // Propiedad para almacenar si el usuario es admin
  userName_: string | undefined = ''; // Almacena el nombre del usuario

  constructor(private navCtrl: NavController, private authService: AuthService) { 
    addIcons({ logOutOutline, qrCodeOutline });
  }

  ngOnInit() {
    this.authService.leerUsuarioAutenticado().then((userData) => {
      // Verifica si el usuario autenticado es admin
      this.admin_ = userData?.userName === 'admin';
      this.userName_ = userData?.userName || ''; // Almacena el nombre de usuario
    });
  }

  sendClickEvent(buttonName: string) {
    this.headerClick.emit(buttonName);
  }

  logout() {
    this.authService.logout();
  }

  // Método para verificar si los botones "testqr" y "scan" deben ser visibles solo para usuarios no admin
  isVisibleForNonAdmins(): boolean {
    return !this.admin_; // Solo se muestra si no es un administrador
  }

  // Método para verificar si el botón "logout" debe ser visible para todos los usuarios
  isVisibleForAll(): boolean {
    return true; // Siempre es visible para todos los usuarios
  }
}

