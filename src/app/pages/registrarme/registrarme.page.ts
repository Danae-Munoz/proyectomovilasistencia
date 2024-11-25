import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class RegistrarmePage implements OnInit {

  usuario = new User();
  repeticionPassword = '';

  constructor(private authService: AuthService, private bd: DatabaseService, private router: Router) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

  mostrarMensaje(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }


  registro(){
    if (!this.mostrarMensaje('nombre', this.usuario.firstName)) return;
    if (!this.mostrarMensaje('apellidos', this.usuario.lastName)) return;
    if (!this.mostrarMensaje('correo', this.usuario.email)) return;
    if (!this.mostrarMensaje('pregunta secreta', this.usuario.secretQuestion)) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.secretAnswer)) return;
    if (!this.mostrarMensaje('contraseña', this.usuario.password)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
      return;
    }
    this.bd.loadingUsuario(this.usuario);
    this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Ha sido registrado correctamente');

  }

  volverAlInicio() {
    this.router.navigate(['/login']);
  }



}